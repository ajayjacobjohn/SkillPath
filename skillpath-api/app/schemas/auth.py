from pydantic import BaseModel, EmailStr


class RegisterRequest(BaseModel):
    email: EmailStr
    password: str
    confirm_password: str


class RegisterResponse(BaseModel):
    id: str
    email: EmailStr


class LoginRequest(BaseModel):
    email: EmailStr
    password: str


class LoginResponse(BaseModel):
    access_token: str
    token_type: str


class CurrentUserResponse(BaseModel):
    user_id: str
    email: EmailStr
