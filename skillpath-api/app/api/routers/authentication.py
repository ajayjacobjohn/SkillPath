from fastapi import APIRouter, Depends, status

from app.dependencies.repositories import get_user_repository
from app.repositories.user_repository import UserRepository
from app.schemas.authentication_schema import RegisterRequest
from app.services.authentication_service import AuthenticationService
from app.schemas.auth import LoginRequest, LoginResponse
from app.dependencies.authentication import get_current_user
from app.models.user import User


router = APIRouter(
    prefix="/api/v1/auth",
    tags=["Authentication"]
)


@router.post("/register", status_code=status.HTTP_201_CREATED)
def register_user(
    request: RegisterRequest,
    user_repository: UserRepository = Depends(get_user_repository),
):
    authentication_service = AuthenticationService(user_repository)

    data = authentication_service.register_user(request)

    return {
        "http_status": status.HTTP_201_CREATED,
        "message": "User registration request received.",
        "data": data
    }

@router.post(
    "/login",
    response_model=LoginResponse
)
def login(
    request: LoginRequest,
    user_repository: UserRepository = Depends(get_user_repository)
):
    service = AuthenticationService(user_repository)

    return service.login_user(request)

@router.get("/me")
def get_current_user_info(
    current_user: User = Depends(get_current_user)
):
    return {
        "user_id": str(current_user.id),
        "email": current_user.email
    }