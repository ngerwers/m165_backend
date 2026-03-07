from flask import Blueprint, jsonify, request
from bson import ObjectId

manufacturers_bp = Blueprint("manufacturers", __name__)


def get_db():
    from main import db
    return db


def serialize(m):
    m["_id"] = str(m["_id"])
    if "car_model_ids" in m:
        m["car_model_ids"] = [str(i) for i in m["car_model_ids"]]
    return m


def serialize_car(c):
    c["_id"] = str(c["_id"])
    c["engine_id"] = str(c["engine_id"])
    c["manufacturer_id"] = str(c["manufacturer_id"])
    return c


# ── GET ALL ──────────────────────────────────────────────────
@manufacturers_bp.route("/manufacturers", methods=["GET"])
def get_manufacturers():
    db = get_db()
    return jsonify([serialize(m) for m in db.manufacturers.find()])


# ── GET ONE ──────────────────────────────────────────────────
@manufacturers_bp.route("/manufacturers/<id>", methods=["GET"])
def get_manufacturer(id):
    db = get_db()
    m = db.manufacturers.find_one({"_id": ObjectId(id)})
    if not m:
        return jsonify({"error": "Manufacturer not found"}), 404
    return jsonify(serialize(m))


# ── GET BY COUNTRY ───────────────────────────────────────────
@manufacturers_bp.route("/manufacturers/country/<country>", methods=["GET"])
def get_by_country(country):
    db = get_db()
    results = list(db.manufacturers.find({"country": country}))
    return jsonify([serialize(m) for m in results])


# ── GET ALL CARS FROM THIS MANUFACTURER ──────────────────────
@manufacturers_bp.route("/manufacturers/<id>/cars", methods=["GET"])
def get_cars_by_manufacturer(id):
    db = get_db()
    if not db.manufacturers.find_one({"_id": ObjectId(id)}):
        return jsonify({"error": "Manufacturer not found"}), 404
    cars = list(db.car_models.find({"manufacturer_id": ObjectId(id)}))
    return jsonify([serialize_car(c) for c in cars])


# ── CREATE ───────────────────────────────────────────────────
@manufacturers_bp.route("/manufacturers", methods=["POST"])
def create_manufacturer():
    db = get_db()
    data = request.json
    required = ["name", "country", "founded", "hq", "ceo", "stock", "employees", "web"]
    for field in required:
        if field not in data:
            return jsonify({"error": f"Missing field: {field}"}), 400
    result = db.manufacturers.insert_one(data)
    return jsonify({"id": str(result.inserted_id)}), 201


# ── UPDATE ───────────────────────────────────────────────────
@manufacturers_bp.route("/manufacturers/<id>", methods=["PUT"])
def update_manufacturer(id):
    db = get_db()
    data = request.json
    data.pop("_id", None)
    result = db.manufacturers.update_one({"_id": ObjectId(id)}, {"$set": data})
    if result.matched_count == 0:
        return jsonify({"error": "Manufacturer not found"}), 404
    return jsonify({"status": "updated"})


# ── DELETE ───────────────────────────────────────────────────
@manufacturers_bp.route("/manufacturers/<id>", methods=["DELETE"])
def delete_manufacturer(id):
    db = get_db()
    result = db.manufacturers.delete_one({"_id": ObjectId(id)})
    if result.deleted_count == 0:
        return jsonify({"error": "Manufacturer not found"}), 404
    return jsonify({"status": "deleted"})