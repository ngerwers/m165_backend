from pymongo import MongoClient

def seed_database():
    # Verbindung zur lokalen MongoDB (Server muss laufen!)
    client = MongoClient("mongodb://localhost:27017")
    db = client["car_tech_db"]

    print("--- Starte Datenbank-Seed ---")

    # 1. MANUFACTURERS (20 Stück)
    db.manufacturers.drop()
    brands = ["Porsche", "Tesla", "BMW", "Mercedes", "Audi", "Ferrari", "Toyota", "Rimac", 
              "Lamborghini", "Aston Martin", "Lucid", "Rivian", "BYD", "Nio", "Bugatti", 
              "Volvo", "Lotus", "Alpine", "Polestar", "Ford"]
    
    manufacturers = []
    for brand in brands:
        manufacturers.append({
            "name": brand,
            "country": "International",
            "founded": 1900,
            "hq": "City",
            "ceo": "CEO Name",
            "stock": brand[:3].upper(),
            "employees": 50000,
            "web": f"www.{brand.lower()}.com"
        })
    db.manufacturers.insert_many(manufacturers)

    # 2. ENGINES (20 Stück mit NoSQL-Unterschieden)
    db.engines.drop()
    engines = []
    for i in range(20):
        is_ev = i % 2 == 0
        engine = {
            "code": f"ENG-{'EV' if is_ev else 'ICE'}-{i}",
            "type": "EV" if is_ev else "ICE",
            "hp": 300 + (i * 10),
            "nm": 400 + (i * 10),
            "weight": 180,
            "class": "A",
            "cooling": "Liquid"
        }
        # Punkt 2.7: Unterschiedliche Attribute je nach Typ
        if is_ev:
            engine["battery_kwh"] = 75 + i
        else:
            engine["displacement_ccm"] = 2000 + (i * 50)
        engines.append(engine)
    db.engines.insert_many(engines)

    # 3. CARS (20 Stück)
    db.cars.drop()
    cars = []
    for i in range(20):
        cars.append({
            "model": f"Model-Series-{i}",
            "brand": brands[i],
            "engine_ref": f"ENG-{'EV' if i % 2 == 0 else 'ICE'}-{i}",
            "year": 2024,
            "price": 60000 + (i * 1000),
            "category": "Sedan" if i % 2 == 0 else "Sport",
            "drive": "AWD",
            "color": "Midnight Blue"
        })
    db.cars.insert_many(cars)

    print(f"✅ Fertig! Hersteller: {db.manufacturers.count_documents({})} | "
          f"Motoren: {db.engines.count_documents({})} | "
          f"Autos: {db.cars.count_documents({})}")

if __name__ == "__main__":
    seed_database()