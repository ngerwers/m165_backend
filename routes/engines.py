from flask import Blueprint, jsonify
from bson import ObjectId

engines_bp = Blueprint("engines", __name__)


def get_db():
    from main import db
    return db


def serialize(doc):
    doc["_id"] = str(doc["_id"])
    return doc


# GET ALL engines
@engines_bp.route("/engines", methods=["GET"])
def get_engines():
    db = get_db()
    engines = list(db.engines.find())
    return jsonify([serialize(e) for e in engines])


# GET ONE engine by ID
@engines_bp.route("/engines/<id>", methods=["GET"])
def get_engine(id):
    db = get_db()
    engine = db.engines.find_one({"_id": ObjectId(id)})
    if not engine:
        return jsonify({"error": "Engine not found"}), 404
    return jsonify(serialize(engine))