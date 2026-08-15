from fastapi import FastAPI
from app.api.routers import health
from app.api.routers import authentication
from fastapi.middleware.cors import CORSMiddleware
from app.exceptions.exception_handlers import (
    password_mismatch_exception_handler,
    user_already_exists_exception_handler,
    invalid_credentials_exception_handler
)
from app.exceptions.application_exceptions import (
    PasswordMismatchException,
    UserAlreadyExistsException,
    InvalidCredentialsException
)

app = FastAPI(
    title="SkillPath API",
    description="Backend API for the SkillPath learning platform",
    version="1.0.0"
)

origins = [
    "http://localhost:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.add_exception_handler(
    PasswordMismatchException, 
    password_mismatch_exception_handler
)

app.include_router(health.router)
app.include_router(authentication.router)

app.add_exception_handler(
    UserAlreadyExistsException,
    user_already_exists_exception_handler
)

app.add_exception_handler(
    InvalidCredentialsException,
    invalid_credentials_exception_handler
)

@app.get("/")
def root():
    return {
        "message": "Welcome to SkillPath API!!!"
    }