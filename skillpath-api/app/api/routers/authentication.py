from fastapi import APIRouter, Depends, status

from app.dependencies.authentication import get_current_user
from app.dependencies.repositories import get_user_repository
from app.models.user import User
from app.repositories.user_repository import UserRepository
from app.schemas.api_response import ApiResponse
from app.schemas.auth import (
    CurrentUserResponse,
    LoginRequest,
    LoginResponse,
    RegisterRequest,
    RegisterResponse,
)
from app.services.authentication_service import AuthenticationService


router = APIRouter(
    prefix="/api/v1/auth",
    tags=["Authentication"],
)


@router.post(
    "/register",
    status_code=status.HTTP_201_CREATED,
    response_model=ApiResponse[RegisterResponse],
)
def register_user(
    request: RegisterRequest,
    user_repository: UserRepository = Depends(get_user_repository),
):
    authentication_service = AuthenticationService(user_repository)
    data = authentication_service.register_user(request)

    return ApiResponse(
        httpStatusCode=status.HTTP_201_CREATED,
        message="User registered successfully.",
        data=data,
    )


@router.post(
    "/login",
    response_model=ApiResponse[LoginResponse],
)
def login(
    request: LoginRequest,
    user_repository: UserRepository = Depends(get_user_repository),
):
    service = AuthenticationService(user_repository)
    data = service.login_user(request)

    return ApiResponse(
        httpStatusCode=status.HTTP_200_OK,
        message="Login successful.",
        data=data,
    )


@router.get(
    "/me",
    response_model=ApiResponse[CurrentUserResponse],
)
def get_current_user_info(
    current_user: User = Depends(get_current_user),
):
    data = CurrentUserResponse(
        user_id=str(current_user.id),
        email=current_user.email,
    )

    return ApiResponse(
        httpStatusCode=status.HTTP_200_OK,
        message="Current user retrieved successfully.",
        data=data,
    )
