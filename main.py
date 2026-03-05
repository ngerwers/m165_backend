from flask import Flask
from flask_cors import CORS
from dotenv import load_dotenv
import os

load_dotenv()

app = Flask(__name__)

CORS(app)

@app.route("/")
def index():
    return {"status": "Backend is running "}

if __name__ == "__main__":
    app.run(debug=False, port=os.getenv("FLASK_PORT", 5000))