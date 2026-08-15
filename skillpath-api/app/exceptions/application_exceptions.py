class PasswordMismatchException(Exception):
    def __init__(self):
        super().__init__("Password and confirm password do not match.")

class UserAlreadyExistsException(Exception):
    def __init__(self):
        super().__init__("A user with this email already exists.")

class InvalidCredentialsException(Exception):
    def __init__(self):
        super().__init__("Invalid email or password.")