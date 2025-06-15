from app.database import db
from datetime import datetime

def create_company(name, domain):
    company = {
        "name": name,
        "domain": domain,
        "created_at": datetime.utcnow()
    }
    result = db.companies.insert_one(company)
    return str(result.inserted_id)

def get_company_by_domain(domain):
    return db.companies.find_one({"domain": domain})


def get_company_by_id(company_id):
    return db.companies.find_one({"_id": company_id})
