import os

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

LOCAL_DATABASE_URL = (
    "mssql+pyodbc://(localdb)\\MSSQLLocalDB/SkillPath"
    "?driver=ODBC+Driver+18+for+SQL+Server"
    "&trusted_connection=yes"
    "&TrustServerCertificate=yes"
)

DATABASE_URL = os.getenv(
    "DATABASE_URL",
    LOCAL_DATABASE_URL
)

engine = create_engine(
    DATABASE_URL,
    echo=True
)

SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine
)