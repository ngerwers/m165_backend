// ============================================================
// seed.js – car_db
// Ausführen mit: mongosh --file database/seed.js
// ============================================================

use("car_db");

// ─── DROP ───────────────────────────────────────────────────
db.manufacturers.drop();
db.engines.drop();
db.car_models.drop();


// ─── 1. MANUFACTURERS ───────────────────────────────────────
db.manufacturers.insertMany([
  { "name": "Porsche",       "country": "Germany", "founded": 1931, "hq": "Stuttgart",    "ceo": "Oliver Blume",    "stock": "P911",  "employees": 39165,  "web": "porsche.com" },
  { "name": "Tesla",         "country": "USA",     "founded": 2003, "hq": "Austin",        "ceo": "Elon Musk",       "stock": "TSLA",  "employees": 140473, "web": "tesla.com" },
  { "name": "BMW",           "country": "Germany", "founded": 1916, "hq": "Munich",        "ceo": "Oliver Zipse",    "stock": "BMW",   "employees": 149000, "web": "bmw.com" },
  { "name": "Mercedes-Benz", "country": "Germany", "founded": 1926, "hq": "Stuttgart",    "ceo": "Ola Källenius",   "stock": "MBG",   "employees": 170000, "web": "mercedes-benz.com" },
  { "name": "Ferrari",       "country": "Italy",   "founded": 1947, "hq": "Maranello",     "ceo": "Benedetto Vigna","stock": "RACE",  "employees": 5000,   "web": "ferrari.com" },
  { "name": "Rimac",         "country": "Croatia", "founded": 2009, "hq": "Sveta Nedelja", "ceo": "Mate Rimac",      "stock": "PRIV",  "employees": 2000,   "web": "rimac.com" },
  { "name": "Lamborghini",   "country": "Italy",   "founded": 1963, "hq": "Sant Agata",    "ceo": "S. Winkelmann",  "stock": "VW",    "employees": 2000,   "web": "lamborghini.com" },
  { "name": "Lucid Motors",  "country": "USA",     "founded": 2007, "hq": "Newark",        "ceo": "Peter Rawlinson","stock": "LCID",  "employees": 7200,   "web": "lucidmotors.com" },
  { "name": "Rivian",        "country": "USA",     "founded": 2009, "hq": "Irvine",        "ceo": "RJ Scaringe",    "stock": "RIVN",  "employees": 14000,  "web": "rivian.com" },
  { "name": "Bugatti",       "country": "France",  "founded": 1909, "hq": "Molsheim",      "ceo": "Mate Rimac",      "stock": "PRIV",  "employees": 300,    "web": "bugatti.com" },
  { "name": "Nio",           "country": "China",   "founded": 2014, "hq": "Shanghai",      "ceo": "William Li",     "stock": "NIO",   "employees": 15000,  "web": "nio.com" },
  { "name": "Polestar",      "country": "Sweden",  "founded": 1996, "hq": "Gothenburg",    "ceo": "T. Ingenlath",   "stock": "PSNY",  "employees": 2500,   "web": "polestar.com" },
  { "name": "Lotus",         "country": "UK",      "founded": 1948, "hq": "Hethel",        "ceo": "Feng Qingfeng",  "stock": "LOT",   "employees": 1500,   "web": "lotuscars.com" },
  { "name": "Alpine",        "country": "France",  "founded": 1955, "hq": "Dieppe",        "ceo": "P. Krief",       "stock": "RENA",  "employees": 500,    "web": "alpinecars.com" },
  { "name": "Aston Martin",  "country": "UK",      "founded": 1913, "hq": "Gaydon",        "ceo": "Amedeo Felisa",  "stock": "AML",   "employees": 2500,   "web": "astonmartin.com" },
  { "name": "Volvo",         "country": "Sweden",  "founded": 1927, "hq": "Gothenburg",    "ceo": "Jim Rowan",      "stock": "VOLV",  "employees": 40000,  "web": "volvocars.com" },
  { "name": "BYD",           "country": "China",   "founded": 1995, "hq": "Shenzhen",      "ceo": "Wang Chuanfu",   "stock": "BYD",   "employees": 600000, "web": "byd.com" },
  { "name": "Toyota",        "country": "Japan",   "founded": 1937, "hq": "Toyota City",   "ceo": "Koji Sato",      "stock": "TM",    "employees": 375000, "web": "toyota.com" },
  { "name": "Audi",          "country": "Germany", "founded": 1909, "hq": "Ingolstadt",    "ceo": "Gernot Döllner", "stock": "NSU",   "employees": 87000,  "web": "audi.com" },
  { "name": "Ford",          "country": "USA",     "founded": 1903, "hq": "Dearborn",      "ceo": "Jim Farley",     "stock": "F",     "employees": 177000, "web": "ford.com" }
]);

const mfMap = {};
db.manufacturers.find().forEach(m => { mfMap[m.name] = m._id; });


// ─── 2. ENGINES ─────────────────────────────────────────────
db.engines.insertMany([
  { "code": "B6-4.0",    "type": "ICE",    "hp": 650,  "nm": 850,  "displacement_ccm": 3996, "cylinders": 6,  "fuel": "Benzin", "weight_kg": 210 },
  { "code": "Taycan-S",  "type": "EV",     "hp": 761,  "nm": 1050, "battery_kwh": 93.4, "voltage": 800, "charging_kw": 270, "weight_kg": 200 },
  { "code": "Plaid-Tri", "type": "EV",     "hp": 1020, "nm": 1420, "battery_kwh": 100,  "voltage": 800, "charging_kw": 250, "weight_kg": 185 },
  { "code": "I6-3.0",    "type": "ICE",    "hp": 510,  "nm": 650,  "displacement_ccm": 2993, "cylinders": 6,  "fuel": "Benzin", "weight_kg": 170 },
  { "code": "EQ-Dual",   "type": "EV",     "hp": 523,  "nm": 855,  "battery_kwh": 108,  "voltage": 400, "charging_kw": 200, "weight_kg": 230 },
  { "code": "I4-2.0-A",  "type": "ICE",    "hp": 421,  "nm": 500,  "displacement_ccm": 1991, "cylinders": 4,  "fuel": "Benzin", "weight_kg": 140 },
  { "code": "V12-6.5",   "type": "ICE",    "hp": 800,  "nm": 718,  "displacement_ccm": 6496, "cylinders": 12, "fuel": "Benzin", "weight_kg": 250 },
  { "code": "Rimac-Q",   "type": "EV",     "hp": 1914, "nm": 2360, "battery_kwh": 120,  "voltage": 800, "charging_kw": 500, "weight_kg": 250 },
  { "code": "V10-5.2",   "type": "ICE",    "hp": 640,  "nm": 565,  "displacement_ccm": 5204, "cylinders": 10, "fuel": "Benzin", "weight_kg": 220 },
  { "code": "V8-4.0",    "type": "ICE",    "hp": 650,  "nm": 850,  "displacement_ccm": 3996, "cylinders": 8,  "fuel": "Benzin", "weight_kg": 210 },
  { "code": "Lucid-D",   "type": "EV",     "hp": 819,  "nm": 1200, "battery_kwh": 112,  "voltage": 900, "charging_kw": 300, "weight_kg": 190 },
  { "code": "Rivian-Q",  "type": "EV",     "hp": 835,  "nm": 1231, "battery_kwh": 135,  "voltage": 400, "charging_kw": 220, "weight_kg": 240 },
  { "code": "W16-8.0",   "type": "ICE",    "hp": 1600, "nm": 1600, "displacement_ccm": 7993, "cylinders": 16, "fuel": "Benzin", "weight_kg": 400 },
  { "code": "Nio-150",   "type": "EV",     "hp": 653,  "nm": 850,  "battery_kwh": 150,  "voltage": 400, "charging_kw": 180, "weight_kg": 210 },
  { "code": "PS-Dual",   "type": "EV",     "hp": 408,  "nm": 660,  "battery_kwh": 78,   "voltage": 400, "charging_kw": 150, "weight_kg": 170 },
  { "code": "Lotus-E",   "type": "EV",     "hp": 905,  "nm": 985,  "battery_kwh": 112,  "voltage": 800, "charging_kw": 350, "weight_kg": 220 },
  { "code": "A110-I4",   "type": "ICE",    "hp": 300,  "nm": 340,  "displacement_ccm": 1798, "cylinders": 4,  "fuel": "Benzin", "weight_kg": 130 },
  { "code": "V8-5.5",    "type": "ICE",    "hp": 670,  "nm": 623,  "displacement_ccm": 5500, "cylinders": 8,  "fuel": "Benzin", "weight_kg": 195 },
  { "code": "H-V6-3.0",  "type": "Hybrid", "hp": 680,  "nm": 720,  "displacement_ccm": 2992, "battery_kwh": 7.4, "fuel": "Benzin", "weight_kg": 200 },
  { "code": "Nio-150-B", "type": "EV",     "hp": 653,  "nm": 850,  "battery_kwh": 150,  "voltage": 400, "charging_kw": 180, "weight_kg": 210 }
]);

const engMap = {};
db.engines.find().forEach(e => { engMap[e.code] = e._id; });


// ─── 3. CAR_MODELS (Haupt-Collection) ───────────────────────
// engine_id        → Fremdschlüssel zu engines      ✅
// manufacturer_id  → Fremdschlüssel zu manufacturers ✅
// colors           → Array                           ✅
// specs            → eingebettetes Dokument          ✅
// Nicht alle Dokumente gleich (range_km nur bei EVs) ✅
db.car_models.insertMany([
  {
    "model": "911 Turbo S", "year": 2024, "cat": "Sport", "price": 270000,
    "colors": ["Silver", "Black", "White", "Guards Red"],
    "specs": { "drive": "AWD", "top_speed_kmh": 330, "weight_kg": 1640, "seats": 4 },
    "engine_id": engMap["B6-4.0"],
    "manufacturer_id": mfMap["Porsche"]
  },
  {
    "model": "Taycan S", "year": 2024, "cat": "Luxury", "price": 200000,
    "colors": ["Blue", "White", "Black"],
    "specs": { "drive": "AWD", "top_speed_kmh": 250, "weight_kg": 2295, "seats": 4, "range_km": 490 },
    "engine_id": engMap["Taycan-S"],
    "manufacturer_id": mfMap["Porsche"]
  },
  {
    "model": "Model S Plaid", "year": 2024, "cat": "Sedan", "price": 110000,
    "colors": ["Red", "White", "Black", "Silver"],
    "specs": { "drive": "AWD", "top_speed_kmh": 322, "weight_kg": 2162, "seats": 5, "range_km": 600 },
    "engine_id": engMap["Plaid-Tri"],
    "manufacturer_id": mfMap["Tesla"]
  },
  {
    "model": "M3 Competition", "year": 2024, "cat": "Sedan", "price": 105000,
    "colors": ["Blue", "Black", "White"],
    "specs": { "drive": "RWD", "top_speed_kmh": 290, "weight_kg": 1730, "seats": 5 },
    "engine_id": engMap["I6-3.0"],
    "manufacturer_id": mfMap["BMW"]
  },
  {
    "model": "EQS 580", "year": 2024, "cat": "Luxury", "price": 150000,
    "colors": ["Black", "Silver", "White"],
    "specs": { "drive": "AWD", "top_speed_kmh": 210, "weight_kg": 2585, "seats": 5, "range_km": 780 },
    "engine_id": engMap["EQ-Dual"],
    "manufacturer_id": mfMap["Mercedes-Benz"]
  },
  {
    "model": "A45 S", "year": 2024, "cat": "Compact", "price": 80000,
    "colors": ["Grey", "White", "Black"],
    "specs": { "drive": "AWD", "top_speed_kmh": 270, "weight_kg": 1625, "seats": 5 },
    "engine_id": engMap["I4-2.0-A"],
    "manufacturer_id": mfMap["Mercedes-Benz"]
  },
  {
    "model": "812 Competizione", "year": 2023, "cat": "Sport", "price": 500000,
    "colors": ["Yellow", "Red", "Black"],
    "specs": { "drive": "RWD", "top_speed_kmh": 340, "weight_kg": 1525, "seats": 2 },
    "engine_id": engMap["V12-6.5"],
    "manufacturer_id": mfMap["Ferrari"]
  },
  {
    "model": "Nevera", "year": 2024, "cat": "Hypercar", "price": 2000000,
    "colors": ["Blue", "Carbon Black"],
    "specs": { "drive": "AWD", "top_speed_kmh": 412, "weight_kg": 1900, "seats": 2, "range_km": 550 },
    "engine_id": engMap["Rimac-Q"],
    "manufacturer_id": mfMap["Rimac"]
  },
  {
    "model": "Huracán STO", "year": 2023, "cat": "Sport", "price": 320000,
    "colors": ["Green", "Orange", "White"],
    "specs": { "drive": "RWD", "top_speed_kmh": 310, "weight_kg": 1339, "seats": 2 },
    "engine_id": engMap["V10-5.2"],
    "manufacturer_id": mfMap["Lamborghini"]
  },
  {
    "model": "Urus", "year": 2024, "cat": "SUV", "price": 260000,
    "colors": ["Black", "White", "Yellow", "Blue"],
    "specs": { "drive": "AWD", "top_speed_kmh": 305, "weight_kg": 2197, "seats": 5 },
    "engine_id": engMap["V8-4.0"],
    "manufacturer_id": mfMap["Lamborghini"]
  },
  {
    "model": "Air Sapphire", "year": 2024, "cat": "Luxury", "price": 250000,
    "colors": ["Grey", "White", "Black"],
    "specs": { "drive": "AWD", "top_speed_kmh": 330, "weight_kg": 2394, "seats": 5, "range_km": 687 },
    "engine_id": engMap["Lucid-D"],
    "manufacturer_id": mfMap["Lucid Motors"]
  },
  {
    "model": "R1S", "year": 2024, "cat": "SUV", "price": 90000,
    "colors": ["White", "Green", "Black", "Blue"],
    "specs": { "drive": "AWD", "top_speed_kmh": 180, "weight_kg": 3107, "seats": 7, "range_km": 515 },
    "engine_id": engMap["Rivian-Q"],
    "manufacturer_id": mfMap["Rivian"]
  },
  {
    "model": "Chiron", "year": 2022, "cat": "Hypercar", "price": 3500000,
    "colors": ["Blue", "Black", "Silver"],
    "specs": { "drive": "AWD", "top_speed_kmh": 420, "weight_kg": 1995, "seats": 2 },
    "engine_id": engMap["W16-8.0"],
    "manufacturer_id": mfMap["Bugatti"]
  },
  {
    "model": "ET7", "year": 2024, "cat": "Sedan", "price": 85000,
    "colors": ["Brown", "White", "Black"],
    "specs": { "drive": "AWD", "top_speed_kmh": 200, "weight_kg": 2379, "seats": 5, "range_km": 1000 },
    "engine_id": engMap["Nio-150"],
    "manufacturer_id": mfMap["Nio"]
  },
  {
    "model": "Polestar 2", "year": 2024, "cat": "Sedan", "price": 60000,
    "colors": ["Gold", "White", "Black", "Blue"],
    "specs": { "drive": "AWD", "top_speed_kmh": 205, "weight_kg": 2123, "seats": 5, "range_km": 476 },
    "engine_id": engMap["PS-Dual"],
    "manufacturer_id": mfMap["Polestar"]
  },
  {
    "model": "Eletre R", "year": 2024, "cat": "SUV", "price": 140000,
    "colors": ["Yellow", "Black", "White"],
    "specs": { "drive": "AWD", "top_speed_kmh": 265, "weight_kg": 2580, "seats": 5, "range_km": 490 },
    "engine_id": engMap["Lotus-E"],
    "manufacturer_id": mfMap["Lotus"]
  },
  {
    "model": "A110 S", "year": 2024, "cat": "Sport", "price": 75000,
    "colors": ["Orange", "Blue", "White"],
    "specs": { "drive": "RWD", "top_speed_kmh": 250, "weight_kg": 1115, "seats": 2 },
    "engine_id": engMap["A110-I4"],
    "manufacturer_id": mfMap["Alpine"]
  },
  {
    "model": "Vantage", "year": 2024, "cat": "Sport", "price": 180000,
    "colors": ["Silver", "Green", "Black"],
    "specs": { "drive": "RWD", "top_speed_kmh": 313, "weight_kg": 1530, "seats": 2 },
    "engine_id": engMap["V8-5.5"],
    "manufacturer_id": mfMap["Aston Martin"]
  },
  {
    "model": "XC90", "year": 2024, "cat": "SUV", "price": 95000,
    "colors": ["White", "Black", "Silver"],
    "specs": { "drive": "AWD", "top_speed_kmh": 210, "weight_kg": 2196, "seats": 7 },
    "engine_id": engMap["H-V6-3.0"],
    "manufacturer_id": mfMap["Volvo"]
  },
  {
    "model": "Han EV", "year": 2024, "cat": "Sedan", "price": 55000,
    "colors": ["Grey", "White", "Black"],
    "specs": { "drive": "AWD", "top_speed_kmh": 180, "weight_kg": 2030, "seats": 5, "range_km": 521 },
    "engine_id": engMap["Nio-150-B"],
    "manufacturer_id": mfMap["BYD"]
  }
]);


// ─── 4. MANUFACTURERS updaten mit car_model_ids ──────────────
db.car_models.find().forEach(car => {
  db.manufacturers.updateOne(
    { _id: car.manufacturer_id },
    { $push: { car_model_ids: car._id } }
  );
});


// ─── DONE ────────────────────────────────────────────────────
print("✅ Seed erfolgreich!");
print("   manufacturers: " + db.manufacturers.countDocuments());
print("   engines:       " + db.engines.countDocuments());
print("   car_models:    " + db.car_models.countDocuments());