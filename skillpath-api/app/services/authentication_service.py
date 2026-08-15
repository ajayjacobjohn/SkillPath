from app.exceptions.application_exceptions import (
    PasswordMismatchException,
    UserAlreadyExistsException,
    InvalidCredentialsException
)
from app.models.user import User
from app.repositories.user_repository import UserRepository
from app.schemas.authentication_schema import RegisterRequest
from app.utils.security import hash_password, verify_password
from app.schemas.auth import LoginRequest, LoginResponse


class AuthenticationService:

    def __init__(self, user_repository: UserRepository):
        self.user_repository = user_repository

    def register_user(self, request: RegisterRequest):
        if request.password != request.confirm_password:
            raise PasswordMismatchException()

        existing_user = self.user_repository.get_by_email(request.email)

        if existing_user:
            raise UserAlreadyExistsException()

        password_hash = hash_password(request.password)

        user = User(
            email=request.email,
            password_hash=password_hash,
            is_fresher=True
        )

        created_user = self.user_repository.create(user)

        return {
            "id": str(created_user.id),
            "email": created_user.email,
        }

    def login_user(self, request: LoginRequest) -> LoginResponse:
        user = self.user_repository.get_by_email(request.email)

        if user is None:
            raise InvalidCredentialsException()

        if not verify_password(request.password, user.password_hash):
            raise InvalidCredentialsException()

        return LoginResponse(
            user_id=str(user.id),
            email=user.email
        )