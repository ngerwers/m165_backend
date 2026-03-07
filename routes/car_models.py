from flask import Blueprint, jsonify
from bson import ObjectId

car_models_bp = Blueprint("car_models", __name__)


def get_db():
    from main import db
    return db


def serialize(doc):
    doc["_id"] = str(doc["_id"])
    return doc


# GET ALL car models
@car_models_bp.route("/car_models", methods=["GET"])
def get_car_models():
    db = get_db()
    car_models = list(db.car_models.find())
    return jsonify([serialize(c) for c in car_models])


# GET ONE car model by ID
@car_models_bp.route("/car_models/<id>", methods=["GET"])
def get_car_model(id):
    db = get_db()
    car_model = db.car_models.find_one({"_id": ObjectId(id)})
    if not car_model:
        return jsonify({"error": "Car model not found"}), 404
    return jsonify(serialize(car_model))