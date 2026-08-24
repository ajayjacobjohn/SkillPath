from fastapi import HTTPException, Request
from fastapi.encoders import jsonable_encoder
from fastapi.exceptions import RequestValidationError
from fastapi.responses import JSONResponse

from app.exceptions.application_exceptions import (
    InvalidCredentialsException,
    PasswordMismatchException,
    UserAlreadyExistsException,
)


def build_error_response(status_code: int, message: str, data=None) -> JSONResponse:
    return JSONResponse(
        status_code=status_code,
        content={
            "httpStatusCode": status_code,
            "message": message,
            "data": jsonable_encoder(data),
        },
    )


async def password_mismatch_exception_handler(
    request: Request,
    exc: PasswordMismatchException,
):
    return build_error_response(400, str(exc))


async def user_already_exists_exception_handler(
    request: Request,
    exc: UserAlreadyExistsException,
):
    return build_error_response(409, str(exc))


async def invalid_credentials_exception_handler(
    request: Request,
    exc: InvalidCredentialsException,
):
    return build_error_response(401, str(exc))


async def http_exception_handler(
    request: Request,
    exc: HTTPException,
):
    message = exc.detail if isinstance(exc.detail, str) else "Request failed."
    return build_error_response(exc.status_code, message)


async def validation_exception_handler(
    request: Request,
    exc: RequestValidationError,
):
    return build_error_response(
        422,
        "Validation failed.",
        exc.errors(),
    )
