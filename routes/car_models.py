from flask import Blueprint, jsonify, request
from bson import ObjectId

car_models_bp = Blueprint("car_models", __name__)


def get_db():
    from main import db
    return db


def serialize(c):
    c["_id"] = str(c["_id"])
    c["engine_id"] = str(c["engine_id"])
    c["manufacturer_id"] = str(c["manufacturer_id"])
    return c


# ── GET ALL ──────────────────────────────────────────────────
@car_models_bp.route("/car_models", methods=["GET"])
def get_car_models():
    db = get_db()
    return jsonify([serialize(c) for c in db.car_models.find()])


# ── GET ONE ──────────────────────────────────────────────────
@car_models_bp.route("/car_models/<id>", methods=["GET"])
def get_car_model(id):
    db = get_db()
    c = db.car_models.find_one({"_id": ObjectId(id)})
    if not c:
        return jsonify({"error": "Car model not found"}), 404
    return jsonify(serialize(c))


# ── GET BY CATEGORY ──────────────────────────────────────────
@car_models_bp.route("/car_models/category/<cat>", methods=["GET"])
def get_by_category(cat):
    db = get_db()
    results = list(db.car_models.find({"cat": cat}))
    return jsonify([serialize(c) for c in results])


# ── GET BY DRIVE TYPE (AWD / RWD / FWD) ──────────────────────
@car_models_bp.route("/car_models/drive/<drive>", methods=["GET"])
def get_by_drive(drive):
    db = get_db()
    results = list(db.car_models.find({"specs.drive": drive}))
    return jsonify([serialize(c) for c in results])


# ── GET BY COLOR ─────────────────────────────────────────────
@car_models_bp.route("/car_models/color/<color>", methods=["GET"])
def get_by_color(color):
    db = get_db()
    results = list(db.car_models.find({"colors": color}))
    return jsonify([serialize(c) for c in results])


# ── GET BY MAX PRICE ─────────────────────────────────────────
@car_models_bp.route("/car_models/price/<int:max_price>", methods=["GET"])
def get_by_max_price(max_price):
    db = get_db()
    results = list(db.car_models.find({"price": {"$lte": max_price}}))
    return jsonify([serialize(c) for c in results])


# ── GET ONE CAR WITH FULL DETAILS (joined manufacturer + engine) ─────
@car_models_bp.route("/car_models/<id>/details", methods=["GET"])
def get_car_details(id):
    db = get_db()
    pipeline = [
        {"$match": {"_id": ObjectId(id)}},
        {"$lookup": {
            "from": "manufacturers",
            "localField": "manufacturer_id",
            "foreignField": "_id",
            "as": "manufacturer"
        }},
        {"$lookup": {
            "from": "engines",
            "localField": "engine_id",
            "foreignField": "_id",
            "as": "engine"
        }},
        {"$unwind": "$manufacturer"},
        {"$unwind": "$engine"},
    ]
    results = list(db.car_models.aggregate(pipeline))
    if not results:
        return jsonify({"error": "Car model not found"}), 404
    c = results[0]
    c["_id"] = str(c["_id"])
    c["engine_id"] = str(c["engine_id"])
    c["manufacturer_id"] = str(c["manufacturer_id"])
    c["manufacturer"]["_id"] = str(c["manufacturer"]["_id"])
    c["engine"]["_id"] = str(c["engine"]["_id"])
    if "car_model_ids" in c["manufacturer"]:
        c["manufacturer"]["car_model_ids"] = [str(i) for i in c["manufacturer"]["car_model_ids"]]
    return jsonify(c)


# ── GET ALL WITH FULL DETAILS (joined) ───────────────────────
@car_models_bp.route("/car_models/details", methods=["GET"])
def get_all_car_details():
    db = get_db()
    pipeline = [
        {"$lookup": {
            "from": "manufacturers",
            "localField": "manufacturer_id",
            "foreignField": "_id",
            "as": "manufacturer"
        }},
        {"$lookup": {
            "from": "engines",
            "localField": "engine_id",
            "foreignField": "_id",
            "as": "engine"
        }},
        {"$unwind": "$manufacturer"},
        {"$unwind": "$engine"},
    ]
    results = list(db.car_models.aggregate(pipeline))
    for c in results:
        c["_id"] = str(c["_id"])
        c["engine_id"] = str(c["engine_id"])
        c["manufacturer_id"] = str(c["manufacturer_id"])
        c["manufacturer"]["_id"] = str(c["manufacturer"]["_id"])
        c["engine"]["_id"] = str(c["engine"]["_id"])
        if "car_model_ids" in c["manufacturer"]:
            c["manufacturer"]["car_model_ids"] = [str(i) for i in c["manufacturer"]["car_model_ids"]]
    return jsonify(results)

# ── CREATE ───────────────────────────────────────────────────
@car_models_bp.route("/car_models", methods=["POST"])
def create_car_model():
    db = get_db()
    data = request.json
    required = ["model", "year", "cat", "price", "colors", "specs", "engine_id", "manufacturer_id"]
    for field in required:
        if field not in data:
            return jsonify({"error": f"Missing field: {field}"}), 400
    data["engine_id"] = ObjectId(data["engine_id"])
    data["manufacturer_id"] = ObjectId(data["manufacturer_id"])
    result = db.car_models.insert_one(data)
    # update manufacturer's car_model_ids
    db.manufacturers.update_one(
        {"_id": data["manufacturer_id"]},
        {"$push": {"car_model_ids": result.inserted_id}}
    )
    return jsonify({"id": str(result.inserted_id)}), 201


# ── UPDATE ───────────────────────────────────────────────────
@car_models_bp.route("/car_models/<id>", methods=["PUT"])
def update_car_model(id):
    db = get_db()
    data = request.json
    data.pop("_id", None)
    if "engine_id" in data:
        data["engine_id"] = ObjectId(data["engine_id"])
    if "manufacturer_id" in data:
        data["manufacturer_id"] = ObjectId(data["manufacturer_id"])
    result = db.car_models.update_one({"_id": ObjectId(id)}, {"$set": data})
    if result.matched_count == 0:
        return jsonify({"error": "Car model not found"}), 404
    return jsonify({"status": "updated"})


# ── DELETE ───────────────────────────────────────────────────
@car_models_bp.route("/car_models/<id>", methods=["DELETE"])
def delete_car_model(id):
    db = get_db()
    car = db.car_models.find_one({"_id": ObjectId(id)})
    if not car:
        return jsonify({"error": "Car model not found"}), 404
    db.car_models.delete_one({"_id": ObjectId(id)})
    # remove from manufacturer's car_model_ids
    db.manufacturers.update_one(
        {"_id": car["manufacturer_id"]},
        {"$pull": {"car_model_ids": ObjectId(id)}}
    )
    return jsonify({"status": "deleted"})