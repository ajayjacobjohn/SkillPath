from fastapi import FastAPI

from app.api.routers import health

app = FastAPI(
    title="SkillPath API",
    description="Backend API for the SkillPath learning platform",
    version="1.0.0"
)

app.include_router(health.router)

@app.get("/")
def root():
    return {
        "message": "Welcome to SkillPath API!!!"
    }