from flask import Flask
from flask_cors import CORS
from dotenv import load_dotenv
from pymongo import MongoClient
from bson import ObjectId
from flask.json.provider import DefaultJSONProvider
import os

load_dotenv()

# ─── Custom JSON Provider (fix für ObjectId) ────────────────
class MongoJSONProvider(DefaultJSONProvider):
    def default(self, obj):
        if isinstance(obj, ObjectId):
            return str(obj)
        return super().default(obj)

# ─── Flask App ───────────────────────────────────────────────
app = Flask(__name__)
app.json_provider_class = MongoJSONProvider
app.json = MongoJSONProvider(app)

CORS(app)

# ─── MongoDB Verbindung ──────────────────────────────────────
client = MongoClient(os.getenv("MONGO_URI"))
db = client[os.getenv("DB_NAME")]

# ─── Routen registrieren ─────────────────────────────────────
from routes.manufacturers import manufacturers_bp
from routes.engines import engines_bp
from routes.car_models import car_models_bp

app.register_blueprint(manufacturers_bp)
app.register_blueprint(engines_bp)
app.register_blueprint(car_models_bp)


@app.route("/")
def index():
    return {"status": "Backend is running ✅"}


if __name__ == "__main__":
    app.run(debug=True, port=int(os.getenv("FLASK_PORT", 5000)))