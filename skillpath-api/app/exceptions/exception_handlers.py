from fastapi import Request
from fastapi.responses import JSONResponse

from app.exceptions.application_exceptions import (
    PasswordMismatchException,
    UserAlreadyExistsException,
    InvalidCredentialsException,
)


async def password_mismatch_exception_handler(
    request: Request,
    exc: PasswordMismatchException
):
    return JSONResponse(
        status_code=400,
        content={
            "httpStatusCode": 400,
            "message": str(exc),
            "data": None
        }
    )

async def user_already_exists_exception_handler(
    request: Request,
    exc: UserAlreadyExistsException
):
    return JSONResponse(
        status_code=409,
        content={
            "httpStatusCode": 409,
            "message": str(exc),
            "data": None
        }
    )

async def invalid_credentials_exception_handler(
    request: Request,
    exc: InvalidCredentialsException
):
    return JSONResponse(
        status_code=401,
        content={
            "httpStatusCode": 401,
            "message": str(exc),
            "data": None
        }
    )