from flask import Blueprint, jsonify, request
from bson import ObjectId

engines_bp = Blueprint("engines", __name__)


def get_db():
    from main import db
    return db


def serialize(e):
    e["_id"] = str(e["_id"])
    return e


def serialize_car(c):
    c["_id"] = str(c["_id"])
    c["engine_id"] = str(c["engine_id"])
    c["manufacturer_id"] = str(c["manufacturer_id"])
    return c


# ── GET ALL ──────────────────────────────────────────────────
@engines_bp.route("/engines", methods=["GET"])
def get_engines():
    db = get_db()
    return jsonify([serialize(e) for e in db.engines.find()])


# ── GET ONE ──────────────────────────────────────────────────
@engines_bp.route("/engines/<id>", methods=["GET"])
def get_engine(id):
    db = get_db()
    e = db.engines.find_one({"_id": ObjectId(id)})
    if not e:
        return jsonify({"error": "Engine not found"}), 404
    return jsonify(serialize(e))


# ── GET BY TYPE (ICE / EV / Hybrid) ──────────────────────────
@engines_bp.route("/engines/type/<type>", methods=["GET"])
def get_by_type(type):
    db = get_db()
    results = list(db.engines.find({"type": type}))
    return jsonify([serialize(e) for e in results])


# ── GET ALL CARS USING THIS ENGINE ───────────────────────────
@engines_bp.route("/engines/<id>/cars", methods=["GET"])
def get_cars_by_engine(id):
    db = get_db()
    if not db.engines.find_one({"_id": ObjectId(id)}):
        return jsonify({"error": "Engine not found"}), 404
    cars = list(db.car_models.find({"engine_id": ObjectId(id)}))
    return jsonify([serialize_car(c) for c in cars])


# ── CREATE ───────────────────────────────────────────────────
@engines_bp.route("/engines", methods=["POST"])
def create_engine():
    db = get_db()
    data = request.json
    required = ["code", "type", "hp", "nm", "weight_kg"]
    for field in required:
        if field not in data:
            return jsonify({"error": f"Missing field: {field}"}), 400
    result = db.engines.insert_one(data)
    return jsonify({"id": str(result.inserted_id)}), 201


# ── UPDATE ───────────────────────────────────────────────────
@engines_bp.route("/engines/<id>", methods=["PUT"])
def update_engine(id):
    db = get_db()
    data = request.json
    data.pop("_id", None)
    result = db.engines.update_one({"_id": ObjectId(id)}, {"$set": data})
    if result.matched_count == 0:
        return jsonify({"error": "Engine not found"}), 404
    return jsonify({"status": "updated"})


# ── DELETE ───────────────────────────────────────────────────
@engines_bp.route("/engines/<id>", methods=["DELETE"])
def delete_engine(id):
    db = get_db()
    result = db.engines.delete_one({"_id": ObjectId(id)})
    if result.deleted_count == 0:
        return jsonify({"error": "Engine not found"}), 404
    return jsonify({"status": "deleted"})