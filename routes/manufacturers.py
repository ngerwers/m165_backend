from flask import Blueprint, jsonify
from bson import ObjectId

manufacturers_bp = Blueprint("manufacturers", __name__)


def get_db():
    from main import db
    return db


def serialize(doc):
    doc["_id"] = str(doc["_id"])
    return doc


# GET ALL manufacturers
@manufacturers_bp.route("/manufacturers", methods=["GET"])
def get_manufacturers():
    db = get_db()
    manufacturers = list(db.manufacturers.find())
    return jsonify([serialize(m) for m in manufacturers])


# GET ONE manufacturer by ID
@manufacturers_bp.route("/manufacturers/<id>", methods=["GET"])
def get_manufacturer(id):
    db = get_db()
    manufacturer = db.manufacturers.find_one({"_id": ObjectId(id)})
    if not manufacturer:
        return jsonify({"error": "Manufacturer not found"}), 404
    return jsonify(serialize(manufacturer))