from datetime import datetime, timedelta
from jose import jwt, JWTError

SECRET_KEY = "Xzo2JEQwRExLwfRr0WA7R2pcCMotVtG7k-txgaA2jjk6PBmJ_1n8D03NBHaq96AxZDbsdn1efVTqEe-QS_2n9w"
ALGORITHM = "HS256"

def create_token(data: dict, expires_delta: timedelta = timedelta(days=1)):
    to_encode = data.copy()
    to_encode.update({"exp": datetime.utcnow() + expires_delta})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

def decode_token(token: str):
    try:
        return jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
    except JWTError:
        return None
