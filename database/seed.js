// 1. COLLECTION: manufacturers (20 Datensätze, 8 Attribute)
db.manufacturers.drop();
db.manufacturers.insertMany([
  { "name": "Porsche", "country": "Germany", "founded": 1931, "hq": "Stuttgart", "ceo": "Oliver Blume", "stock": "P911", "employees": 39165, "web": "porsche.com" },
  { "name": "Tesla", "country": "USA", "founded": 2003, "hq": "Austin", "ceo": "Elon Musk", "stock": "TSLA", "employees": 140473, "web": "tesla.com" },
  { "name": "BMW", "country": "Germany", "founded": 1916, "hq": "Munich", "ceo": "Oliver Zipse", "stock": "BMW", "employees": 149000, "web": "bmw.com" },
  { "name": "Mercedes-Benz", "country": "Germany", "founded": 1926, "hq": "Stuttgart", "ceo": "Ola Källenius", "stock": "MBG", "employees": 170000, "web": "mercedes-benz.com" },
  { "name": "Audi", "country": "Germany", "founded": 1909, "hq": "Ingolstadt", "ceo": "Gernot Döllner", "stock": "NSU", "employees": 87000, "web": "audi.com" },
  { "name": "Ferrari", "country": "Italy", "founded": 1947, "hq": "Maranello", "ceo": "Benedetto Vigna", "stock": "RACE", "employees": 5000, "web": "ferrari.com" },
  { "name": "Toyota", "country": "Japan", "founded": 1937, "hq": "Toyota City", "ceo": "Koji Sato", "stock": "TM", "employees": 375000, "web": "toyota.com" },
  { "name": "Rimac", "country": "Croatia", "founded": 2009, "hq": "Sveta Nedelja", "ceo": "Mate Rimac", "stock": "PRIV", "employees": 2000, "web": "rimac.com" },
  { "name": "Lamborghini", "country": "Italy", "founded": 1963, "hq": "Sant Agata", "ceo": "S. Winkelmann", "stock": "VW", "employees": 2000, "web": "lamborghini.com" },
  { "name": "Aston Martin", "country": "UK", "founded": 1913, "hq": "Gaydon", "ceo": "Amedeo Felisa", "stock": "AML", "employees": 2500, "web": "astonmartin.com" },
  { "name": "Lucid Motors", "country": "USA", "founded": 2007, "hq": "Newark", "ceo": "Peter Rawlinson", "stock": "LCID", "employees": 7200, "web": "lucidmotors.com" },
  { "name": "Rivian", "country": "USA", "founded": 2009, "hq": "Irvine", "ceo": "RJ Scaringe", "stock": "RIVN", "employees": 14000, "web": "rivian.com" },
  { "name": "BYD", "country": "China", "founded": 1995, "hq": "Shenzhen", "ceo": "Wang Chuanfu", "stock": "BYD", "employees": 600000, "web": "byd.com" },
  { "name": "Nio", "country": "China", "founded": 2014, "hq": "Shanghai", "ceo": "William Li", "stock": "NIO", "employees": 15000, "web": "nio.com" },
  { "name": "Bugatti", "country": "France", "founded": 1909, "hq": "Molsheim", "ceo": "Mate Rimac", "stock": "PRIV", "employees": 300, "web": "bugatti.com" },
  { "name": "Volvo", "country": "Sweden", "founded": 1927, "hq": "Gothenburg", "ceo": "Jim Rowan", "stock": "VOLV", "employees": 40000, "web": "volvocars.com" },
  { "name": "Lotus", "country": "UK", "founded": 1948, "hq": "Hethel", "ceo": "Feng Qingfeng", "stock": "LOT", "employees": 1500, "web": "lotuscars.com" },
  { "name": "Alpine", "country": "France", "founded": 1955, "hq": "Dieppe", "ceo": "P. Krief", "stock": "RENA", "employees": 500, "web": "alpinecars.com" },
  { "name": "Polestar", "country": "Sweden", "founded": 1996, "hq": "Gothenburg", "ceo": "T. Ingenlath", "stock": "PSNY", "employees": 2500, "web": "polestar.com" },
  { "name": "Ford", "country": "USA", "founded": 1903, "hq": "Dearborn", "ceo": "Jim Farley", "stock": "F", "employees": 177000, "web": "ford.com" }
]);
 
// 2. COLLECTION: engines (20 Datensätze, Spezial-Attribute für Punkt 2.7)
db.engines.drop();
db.engines.insertMany([
  { "code": "V8-4.0", "type": "ICE", "hp": 650, "nm": 850, "displacement_ccm": 3996, "cylinders": 8, "fuel": "Benzin", "weight": 210 },
  { "code": "Plaid-Tri", "type": "EV", "hp": 1020, "nm": 1420, "battery_kwh": 100, "voltage": 800, "charging_kw": 250, "weight": 185 },
  { "code": "I6-3.0", "type": "ICE", "hp": 510, "nm": 650, "displacement_ccm": 2993, "cylinders": 6, "fuel": "Benzin", "weight": 170 },
  { "code": "EQ-Dual", "type": "EV", "hp": 523, "nm": 855, "battery_kwh": 108, "voltage": 400, "charging_kw": 200, "weight": 230 },
  { "code": "V12-6.5", "type": "ICE", "hp": 800, "nm": 718, "displacement_ccm": 6496, "cylinders": 12, "fuel": "Benzin", "weight": 250 },
  { "code": "H-V6-3.0", "type": "Hybrid", "hp": 680, "nm": 720, "displacement_ccm": 2992, "battery_kwh": 7.4, "fuel": "Benzin", "weight": 200 },
  { "code": "Rimac-Q", "type": "EV", "hp": 1914, "nm": 2360, "battery_kwh": 120, "voltage": 800, "charging_kw": 500, "weight": 250 },
  { "code": "B6-4.0", "type": "ICE", "hp": 500, "nm": 450, "displacement_ccm": 3996, "cylinders": 6, "fuel": "Benzin", "weight": 160 },
  { "code": "Lucid-D", "type": "EV", "hp": 819, "nm": 1200, "battery_kwh": 112, "voltage": 900, "charging_kw": 300, "weight": 190 },
  { "code": "V10-5.2", "type": "ICE", "hp": 640, "nm": 565, "displacement_ccm": 5204, "cylinders": 10, "fuel": "Benzin", "weight": 220 },
  { "code": "Rivian-Q", "type": "EV", "hp": 835, "nm": 1231, "battery_kwh": 135, "voltage": 400, "charging_kw": 220, "weight": 240 },
  { "code": "W16-8.0", "type": "ICE", "hp": 1600, "nm": 1600, "displacement_ccm": 7993, "cylinders": 16, "fuel": "Benzin", "weight": 400 },
  { "code": "Nio-150", "type": "EV", "hp": 653, "nm": 850, "battery_kwh": 150, "voltage": 400, "charging_kw": 180, "weight": 210 },
  { "code": "I4-2.0-A", "type": "ICE", "hp": 421, "nm": 500, "displacement_ccm": 1991, "cylinders": 4, "fuel": "Benzin", "weight": 140 },
  { "code": "PS-Dual", "type": "EV", "hp": 408, "nm": 660, "battery_kwh": 78, "voltage": 400, "charging_kw": 150, "weight": 170 },
  { "code": "V8-5.5", "type": "ICE", "hp": 670, "nm": 623, "displacement_ccm": 5500, "cylinders": 8, "fuel": "Benzin", "weight": 195 },
  { "code": "Lotus-E", "type": "EV", "hp": 905, "nm": 985, "battery_kwh": 112, "voltage": 800, "charging_kw": 350, "weight": 220 },
  { "code": "D-V6-3.0", "type": "ICE", "hp": 286, "nm": 600, "displacement_ccm": 2967, "cylinders": 6, "fuel": "Diesel", "weight": 190 },
  { "code": "A110-I4", "type": "ICE", "hp": 300, "nm": 340, "displacement_ccm": 1798, "cylinders": 4, "fuel": "Benzin", "weight": 130 },
  { "code": "Taycan-S", "type": "EV", "hp": 761, "nm": 1050, "battery_kwh": 93.4, "voltage": 800, "charging_kw": 270, "weight": 200 }
]);
 
// 3. COLLECTION: car_models (20 Datensätze, 8 Attribute)
db.car_models.drop();
db.car_models.insertMany([
  { "model": "911 Turbo S", "brand": "Porsche", "engine": "B6-4.0", "year": 2024, "cat": "Sport", "price": 270000, "drive": "AWD", "color": "Silver" },
  { "model": "Model S Plaid", "brand": "Tesla", "engine": "Plaid-Tri", "year": 2024, "cat": "Sedan", "price": 110000, "drive": "AWD", "color": "Red" },
  { "model": "M3 Comp", "brand": "BMW", "engine": "I6-3.0", "year": 2024, "cat": "Sedan", "price": 105000, "drive": "RWD", "color": "Blue" },
  { "model": "EQS 580", "brand": "Mercedes-Benz", "engine": "EQ-Dual", "year": 2024, "cat": "Luxury", "price": 150000, "drive": "AWD", "color": "Black" },
  { "model": "812 Comp", "brand": "Ferrari", "engine": "V12-6.5", "year": 2023, "cat": "Sport", "price": 500000, "drive": "RWD", "color": "Yellow" },
  { "model": "Nevera", "brand": "Rimac", "engine": "Rimac-Q", "year": 2024, "cat": "Hypercar", "price": 2000000, "drive": "AWD", "color": "Blue" },
  { "model": "Huracán STO", "brand": "Lamborghini", "engine": "V10-5.2", "year": 2023, "cat": "Sport", "price": 320000, "drive": "RWD", "color": "Green" },
  { "model": "Air Sapphire", "brand": "Lucid Motors", "engine": "Lucid-D", "year": 2024, "cat": "Luxury", "price": 250000, "drive": "AWD", "color": "Grey" },
  { "model": "R1S", "brand": "Rivian", "engine": "Rivian-Q", "year": 2024, "cat": "SUV", "price": 90000, "drive": "AWD", "color": "White" },
  { "model": "Chiron", "brand": "Bugatti", "engine": "W16-8.0", "year": 2022, "cat": "Hypercar", "price": 3500000, "drive": "AWD", "color": "Blue" },
  { "model": "ET7", "brand": "Nio", "engine": "Nio-150", "year": 2024, "cat": "Sedan", "price": 85000, "drive": "AWD", "color": "Brown" },
  { "model": "A45 S", "brand": "Mercedes-Benz", "engine": "I4-2.0-A", "year": 2024, "cat": "Compact", "price": 80000, "drive": "AWD", "color": "Grey" },
  { "model": "Polestar 2", "brand": "Polestar", "engine": "PS-Dual", "year": 2024, "cat": "Sedan", "price": 60000, "drive": "AWD", "color": "Gold" },
  { "model": "Eletre R", "brand": "Lotus", "engine": "Lotus-E", "year": 2024, "cat": "SUV", "price": 140000, "drive": "AWD", "color": "Yellow" },
  { "model": "Taycan S", "brand": "Porsche", "engine": "Taycan-S", "year": 2024, "cat": "Luxury", "price": 200000, "drive": "AWD", "color": "Blue" },
  { "model": "A110 S", "brand": "Alpine", "engine": "A110-I4", "year": 2024, "cat": "Sport", "price": 75000, "drive": "RWD", "color": "Orange" },
  { "model": "Urus", "brand": "Lamborghini", "engine": "V8-4.0", "year": 2024, "cat": "SUV", "price": 260000, "drive": "AWD", "color": "Black" },
  { "model": "Vantage", "brand": "Aston Martin", "engine": "V8-4.0", "year": 2024, "cat": "Sport", "price": 180000, "drive": "RWD", "color": "Silver" },
  { "model": "XC90", "brand": "Volvo", "engine": "H-V6-3.0", "year": 2024, "cat": "SUV", "price": 95000, "drive": "AWD", "color": "White" },
  { "model": "Han EV", "brand": "BYD", "engine": "Nio-150", "year": 2024, "cat": "Sedan", "price": 55000, "drive": "AWD", "color": "Grey" }
]);