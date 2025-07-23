import pymysql
from pymysql.cursors import DictCursor
import bcrypt
from fastapi import FastAPI, HTTPException,Body,Request
from passlib.context import CryptContext
from collections import defaultdict
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
from fastapi.responses import HTMLResponse, JSONResponse
from pydantic import BaseModel, EmailStr
from starlette.middleware.cors import CORSMiddleware
from typing import Optional, List
from datetime import timedelta,time,date
import logging
from enum import Enum
import json
app = FastAPI(debug=True)

import jwt
from datetime import datetime, timedelta

SECRET_KEY = "Xzo2JEQwRExLwfRr0WA7R2pcCMotVtG7k-txgaA2jjk6PBmJ_1n8D03NBHaq96AxZDbsdn1efVTqEe-QS_2n9w"
ALGORITHM = "HS256"

from models import Base
from database import get_db_connection
from schools import school_router
app.include_router(school_router,prefix="/school")


import matplotlib 
matplotlib.use("Agg")
import matplotlib.pyplot as plt
import io
from fastapi import FastAPI, Response

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
# MySQL
def get_db_connection():
    return pymysql.connect(
        host="localhost",
        user="root",
        password="Sneha@12345",
        database="hmm",
        cursorclass=DictCursor
    )


# Password functions
def hash_password(password: str) -> str:
    return bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')

def verify_password(password: str, hashed: str) -> bool:
    return bcrypt.checkpw(password.encode('utf-8'), hashed.encode('utf-8'))
app.get("/")
def read_root():
    return {"message": "Welcome to the Attendance Management System!"}

class UserSignup(BaseModel):
    email: str
    password: str
    role: str
    college_name : Optional[str] = None

    # Office
    office_name: Optional[str] = None
    location: Optional[str] = None
    user_type: Optional[str] = None
    ceo_name: Optional[str] = None
    ceo_age: Optional[int] = None
    ceo_qualification: Optional[str] = None
    ceo_experience_years: Optional[int] = None
    # School
    school_name: Optional[str] = None
    school_location: Optional[str] = None
    school_user_type: Optional[str] = None
   
    
   
    
#organization
class OrgTypeEnum(str, Enum):
    School ="School"
    College ="College"
    SoftwareCompany = "SoftwareCompany"
class OrganizationCreate(BaseModel):
    name: str
    type: OrgTypeEnum
    location: str
#department
class DepartmentCreate(BaseModel):
    org_id: int
    dept_id: int 
    name: str

#designation
class DesignationCreate(BaseModel):
    designation_id : int
    Title : str
#employee
class EmployeeOut(BaseModel):
    emp_id : int
    org_id : int
    dept_id : int
    designation_id : int
    name : str
    email : Optional[str]
    contact_number : int
    date_of_joining : date

#attendance
class AttendanceStatus(str,Enum):
    PRESENT = "Present"
    ABSENT = "Absent"
    LEAVE = "On Leave"
    HOLIDAY = "Holiday"
    HALF_DAY = "Half Day"
class AttendanceOut(BaseModel):
    emp_id : int
    date : date
    status : AttendanceStatus
    check_in : Optional[time] = None
    check_out : Optional[time] = None
#leave_type
class LeavetypeBase(BaseModel):
    name : str
    description : Optional[str] = None
class LeaveType(LeavetypeBase):
    leave_type_id : int

#leave_request
class LeaveStatus(str, Enum):
    pending = "Pending"
    approved = "Approved"
    rejected = "Rejected"

class LeaveRequestBase(BaseModel):
    emp_id : int
    leave_type_id:int
    from_date : date
    to_date : date
    reason : str
    status: LeaveStatus = LeaveStatus.pending
class LeaveRequestOut(LeaveRequestBase):
    leave_id: int
    request_date: date

#role
class RoleBase(BaseModel):
    name : str
    description : Optional[str] = None
class RoleOut(RoleBase):
    role_id : int

#permission
class permissionBase(BaseModel):
    name : str
    description : Optional[str] = None
class PermissionOut(permissionBase):
    permission_id : int
#role permission
class RolepermissionBase(BaseModel):
    role_id : int
    permission_id : int

#useraccount
class UserAccountBase(BaseModel):
  
    username: str
    password: str  
    is_active : Optional[bool] = True

class UserAccountUpdate(BaseModel):
    user_id: int
    username: str
    password: str
# For update
class UserAccountUpdate(BaseModel):
    user_id: int
    username: str
    password: str

# For deletion or querying
class UserID(BaseModel):
    user_id: int

#user role 
class UserRoleBase(BaseModel):
    user_id: int
    role_id: int

class UserLogin(BaseModel):
    email: EmailStr
    password: str
    

class UserSignup(BaseModel):
    email: EmailStr
    password: str
    role: str

#school
class SchoolCreate(BaseModel):
    school_name: str
    school_location: str
    principal_id: Optional[int] = None

class SchoolOut(SchoolCreate):
    id: int

#college
class CollegeCreate(BaseModel):
    college_name: str
    college_location: str
    dean_id: Optional[int] = None

class CollegeOut(CollegeCreate):
    id: int
    college_name: str
    college_location: str
    dean_id: int
#office
class OfficeCreate(BaseModel):
    office_name: str
    location: str
    ceo_id: Optional[int] = None
    ceo_name: str
    ceo_email: Optional[EmailStr]
    

class OfficeOut(OfficeCreate):
    id: int

class AttendanceResponse(BaseModel):
    attendance_id: int
    emp_id: int
    date: date
    status: str
    check_in: time | None
    check_out: time | None

    class Config:
        orm_mode = True

def create_token(data: dict):
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(hours=24)
    to_encode.update({"exp": expire})
    token = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return token

# Signup API
@app.post("/signup")
def signup(user: UserSignup):
    db = get_db_connection()
    cursor = db.cursor()

    # Check if email already exists
    cursor.execute("SELECT * FROM users WHERE email=%s", (user.email,))
    if cursor.fetchone():
        db.close()
        raise HTTPException(status_code=400, detail="Email already exists")

    hashed_password = hash_password(user.password)

    # Insert based on role
    if user.role == "office":
        if not all([user.office_name, user.location, user.user_type]):
            db.close()
            raise HTTPException(status_code=400, detail="Missing office details")

        cursor.execute(
            "INSERT INTO users (email, password, role, office_name, location, user_type, access) VALUES (%s, %s, %s, %s, %s, %s, %s)",
            (user.email, hashed_password, user.role, user.office_name, user.location, user.user_type, "office")
        )

    elif user.role == "college":
        if not user.college_name:
            db.close()
            raise HTTPException(status_code=400, detail="College name is required")

        cursor.execute(
            "INSERT INTO users (email, password, role, college_name, access) VALUES (%s, %s, %s, %s, %s)",
            (user.email, hashed_password, user.role, user.college_name, "college")
        )

    else:
        # Default insert for school, superadmin, etc.
        cursor.execute(
            "INSERT INTO users (email, password, role, access) VALUES (%s, %s, %s, %s)",
            (user.email, hashed_password, user.role, user.role)  # use role as access
        )

    db.commit()
    db.close()
    return {"message": "User registered successfully"}


ROLE_ACCESS_MAP = {
    "admin": ["dashboard", "schools", "offices", "colleges", "settings"],
    "school": ["dashboard", "students", "teachers", 'classes',"attendance"],
    "college": ["dashboard", "departments", "Students", "attendance"],
    "office": ["dashboard", "employees", "payroll", "settings"]
}

@app.post("/login")
def login(user: UserLogin):
    db = get_db_connection()
    cursor = db.cursor()
    cursor.execute("SELECT * FROM users WHERE email=%s", (user.email,))
    result = cursor.fetchone()
    db.close()

    if not result or not verify_password(user.password, result['password']):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    # ✅ Get access based on role instead of DB
    role = result["role"]
    access_data = ROLE_ACCESS_MAP.get(role.lower(), [])

    # ✅ Create JWT
    token_data = {
        "email": result["email"],
        "role": role,
        "access": access_data
    }
    token = create_token(token_data)  # Assume this uses jwt.encode()

    # ✅ Send cookie
    response = JSONResponse(content={
        "message": "Login successful",
        "user": token_data
    })
    response.set_cookie(
        key="user",
        value=token,  # this is the JWT token
        httponly=False,
        max_age=86400,
        path="/",
        samesite="Lax",
        secure=False,
    )
    return response
    

# @app.post("/login")
# def login(user: UserLogin):
#     db = get_db_connection()
#     cursor = db.cursor()
#     cursor.execute("SELECT * FROM users WHERE email=%s", (user.email,))
#     result = cursor.fetchone()
#     db.close()

#     if not result or not verify_password(user.password, result['password']):
#         raise HTTPException(status_code=401, detail="Invalid credentials")
   
#     access_data = result.get("access", [])
#     if isinstance(access_data, str):
#         try:
#             access_data = json.loads(access_data)
#         except:
#             access_data = []

#     token = jwt.encode({
#         "email": result["email"],
#         "role": result["role"],
#         "access": access_data,
#         "exp": datetime.utcnow() + timedelta(days=1)
#     }, SECRET_KEY, algorithm=ALGORITHM)

#     response = JSONResponse(content={
#         "message": "Login successful",
#         "user": {
#             "email": result["email"],
#             "role": result["role"],
#             "access": access_data
#         }
#     })

#     response.set_cookie(
#         key="user",
#         value=token,
#         max_age=86400,
#         httponly=True,
#         samesite="Lax",
#         secure=False, 
#         path="/"
#     )

#     return response

#     @app.get("/me")
# def get_current_user(request: Request):
#     token = request.cookies.get("user")
#     if not token:
#         raise HTTPException(status_code=401, detail="Not authenticated")

#     try:
#         payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
#         return {"email": payload["email"], "role": payload["role"], "access": payload["access"]}
#     except JWTError:
#         raise HTTPException(status_code=403, detail="Invalid token")

@app.post("/demopannelaccess")
def demopannelaccess(request: Request):
    token = request.cookies.get("user")
    
    if not token:
        raise HTTPException(status_code=401, detail="Not authenticated")

    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return {
            "email": payload["email"],
            "role": payload["role"],
            "access": payload["access"]
        }
    except JWTError:
        raise HTTPException(status_code=403, detail="Invalid token")

@app.get("/", response_class=HTMLResponse)
def home():
    return "<h2>FastAPI User Management is running ✅</h2>"

# =============================
# add organization

@app.post("/add-organization")
def add_organization(org: OrganizationCreate):
    db = get_db_connection()
    cursor = db.cursor()
    query = "INSERT INTO organization (name, type, location) VALUES (%s, %s, %s)"
    values = (org.name, org.type.value, org.location)

    try:
        cursor.execute(query, values)
        db.commit()
        return {"message": "Organization added successfully"}
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        cursor.close()
        db.close()

#add a Department
@app.post("/add-department")
def add_department(dept: DepartmentCreate):
    db = get_db_connection()
    cursor = db.cursor()

    try:
        # Check if organization exists
        cursor.execute("SELECT org_id FROM organization WHERE org_id = %s", (dept.org_id,))
        org = cursor.fetchone()
        if not org:
            raise HTTPException(status_code=404, detail="Organization not found")

        # Insert department
        query = "INSERT INTO department (org_id,dept_id,name) VALUES (%s, %s)"
        values = (dept.id,dept.org_id, dept.name)
        cursor.execute(query, values)
        db.commit()

        return {"message": "Department added successfully"}
    
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=str(e))

    finally:
        cursor.close()
        db.close()

#get a department
@app.get("/get-departments", response_model=List[DepartmentCreate])
def get_departments():
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM department")
    result = cursor.fetchall()
    cursor.close()
    conn.close()
    return result

#update department
@app.put("/update-department")
def update_department(data:DepartmentCreate):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM department WHERE dept_id =%s")
    existing =cursor.fetchone()
    if not existing:
        cursor.close()
        conn.close()
        raise HTTPException(status_code=404, detail="Department not found")
    cursor.execute("UPDATE designation SET title=%s WHERE designation id=%s")
    conn.commit()
    cursor.close()
    conn.close()
    return {"message":"Designation updated Successfully"}

#dlete department
@app.delete("/delete-departement/{dept_id)")
def delete_department(dept_id:int):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM department WHERE dept_id = %s", (dept_id,))
    existing = cursor.fetchone()
    if not existing:
        cursor.close()
        conn.close()
        raise HTTPException(status_code=404, detail="Departemnt not found")
    
    cursor.execute("DELETE FROM department WHERE dept_id = %s", (dept_id,))
    conn.commit()
    cursor.close()
    conn.close()
    return {"message":"Department deleted successfully"}
#add designation
@app.post("/add-designation")
def add_designation(data: DesignationCreate):
    conn = get_db_connection()
    cursor = conn.cursor()
    query = "INSERT INTO designation (title) VALUES (%s)"
    cursor.execute(query, (data.title,))
    conn.commit()
    cursor.close()
    conn.close()
    return {"message": "Designation added successfully"}
#get designation
@app.get("/get-designations")
def get_designations():
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM designation")
    result = cursor.fetchall()
    cursor.close()
    conn.close()
    return result

#update designation
@app.put("/update-designations")
def update_designations(data:DesignationCreate):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM designation WHERE designation_id =%s")
    existing =cursor.fetchone()
    if not existing:
        cursor.close()
        conn.close()
        raise HTTPException(status_code=404, detail="Designation not found")
    cursor.execute("UPDATE designation SET title=%s WHERE designation id=%s")
    conn.commit()
    cursor.close()
    conn.close()
    return {"message":"Designation updated Successfully"}

#delete designation
@app.delete("/delete-designation/{designation_id)")
def delete_designation(designation_id:int):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM designation WHERE designation_id = %s", (designation_id,))
    existing = cursor.fetchone()
    if not existing:
        cursor.close()
        conn.close()
        raise HTTPException(status_code=404, detail="Designation not found")
    
    cursor.execute("DELETE FROM designation WHERE designation_id = %s", (designation_id,))
    conn.commit()
    cursor.close()
    conn.close()
    return {"message":"Designation deleted successfully"}

#create employee
@app.post("/add-employee")
def add_employee(employee:EmployeeOut):
    conn = get_db_connection()
    cursor = conn.cursor()
    try:
        cursor.execute("""
            INSERT INTO employee (org_id, dept_id, designation_id, name, email, contact_number, date_of_joining)
            VALUES (%s, %s, %s, %s, %s, %s, %s)
        """, (
            employee.org_id,
            employee.dept_id,
            employee.designation_id,
            employee.name,
            employee.email,
            employee.contact_number,
            employee.date_of_joining
        ))
        conn.commit()
        return {"message": "Employee added successfully"}
    except Exception as e:
        conn.rollback()
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        cursor.close()
        conn.close()
#get employees
@app.get("/get-employees",response_model=List[EmployeeOut])
def get_employees():
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    try:
        cursor.execute("SELECT * FROM employee")
        result =  cursor.fetchall()
        return result
    except Exception as e:
        raise HTTPEXception(status_code=500,detail=str(e))
    finally:
        cursor.close()
        conn.close()

#update employees
@app.put("/update-employee/{emp_id}")
def update_employee(emp_id: int, employee: EmployeeOut):
    conn = get_db_connection()
    cursor = conn.cursor()
    try:
        cursor.execute("""
            UPDATE employee
            SET org_id = %s, dept_id = %s, designation_id = %s,
                name = %s, email = %s, contact_number = %s, date_of_joining = %s
            WHERE emp_id = %s
        """, (
            employee.org_id,
            employee.dept_id,
            employee.designation_id,
            employee.name,
            employee.email,
            employee.contact_number,
            employee.date_of_joining,
            emp_id
        ))
        conn.commit()
        if cursor.rowcount == 0:
            raise HTTPException(status_code=404, detail="Employee not found")
        return {"message": "Employee updated successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        cursor.close()
        conn.close()
#delete employees
@app.delete("/delete-employee/{emp_id}")
def delete_employee(emp_id:int):
    conn = get_db_connection()
    cursor = conn.cursor()
    try:
        cursor.execute("DELETE FROM employee WHERE emp_id = %s", (emp_id,))
        conn.commit()
        if cursor.rowcount == 0:
            raise HTTPException(status_code=404, detail="Employee not found")
        return {"message": "Employee deleted successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        cursor.close()
        conn.close()

#create attendance
@app.post("/add-attendance")
def add_attendance(attendance:AttendanceOut):
    conn = get_db_connection()
    cursor = conn.cursor()
    try:
        cursor.execute(""" INSERT INTO attendance(emp_id,date,status,check_in,check_out)
                       VALUES(%s,%s,%s,%s,%s)""",
                       (
                          
                           attendance.emp_id,
                           attendance.date,
                           attendance.status,
                           attendance.check_in,
                           attendance.check_out,   
                        )
        )
        conn.commit()
        return{"message":"Attendance added successfully"}
    except mysql.connector.IntegrityError as e:
        conn.rollback()
        raise HTTPException(status_code=400, detail="Duplicate entry or foreign key constraint failed")
    except Exception as e:
        conn.rollback()
        raise HTTPException(status_code=500, detail=str(e))
    finally:
       cursor.close()
       conn.close()
#get attendance
@app.get("/get-attendance",response_model=List[AttendanceOut])
def get_attendance():
    conn = get_db_connection()
    cursor = conn.cursor()
    try:
        cursor.execute("SELECT * FROM attendance")
        result =  cursor.fetchall()
        return result
    except Exception as e:
        raise HTTPException(status_code=500,detail=str(e))
    finally:
        cursor.close()
        conn.close()
#update attendance
@app.put("/update-attendance/{attendance_id}")
def update_attendance(attendance_id: int, updated: AttendanceOut):
    conn = get_db_connection()
    cursor = conn.cursor()
    try:
        cursor.execute("""
            UPDATE attendance
            SET emp_id=%s, date=%s, status=%s, check_in=%s, check_out=%s
            WHERE attendance_id=%s
        """, (updated.emp_id, updated.date, updated.status, updated.check_in, updated.check_out, attendance_id))
        conn.commit()
        return {"message": "Attendance updated successfully"}
    except Exception as e:
        conn.rollback()
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        cursor.close()
        conn.close()
#delete attendance
@app.delete("/delete-attendance/{attendance_id}")
def delete_attendance(attendance_id: int):
    conn = get_db_connection()
    cursor = conn.cursor()
    try:
        cursor.execute("DELETE FROM attendance WHERE attendance_id = %s", (attendance_id,))
        conn.commit()
        return {"message": "Attendance deleted successfully"}
    except Exception as e:
        conn.rollback()
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        cursor.close()
        conn.close()

# Create leave type
@app.post("/create-leave-type")
def create_leave_type(leave_type: LeavetypeBase):
    conn = get_db_connection()
    cursor = conn.cursor()
    try:
        query = "INSERT INTO leave_type (name, description) VALUES (%s, %s)"
        cursor.execute(query, (leave_type.name, leave_type.description))
        conn.commit()
        return {"message": "Leave type added successfully"}
    except Exception as e:
        conn.rollback()
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        cursor.close()
        conn.close()


# Get all leave types
@app.get("/leave-types", response_model=List[LeaveType])
def get_leave_types():
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM leave_type")
    result = cursor.fetchall()
    cursor.close()
    conn.close()
    return result

# Get a single leave type by ID
@app.get("/leave-types/{leave_type_id}", response_model=LeaveType)
def get_leave_type(leave_type_id: int):
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM leave_type WHERE leave_type_id = %s", (leave_type_id,))
    result = cursor.fetchone()
    cursor.close()
    conn.close()
    if result:
        return result
    raise HTTPException(status_code=404, detail="Leave type not found")

# Update leave type
@app.put("/update-leave-type/{leave_type_id}")
def update_leave_type(leave_type_id: int, leave_type: LeavetypeBase):
    conn = get_db_connection()
    cursor = conn.cursor()
    try:
        # Check if the leave type exists
        cursor.execute("SELECT * FROM leave_type WHERE leave_type_id = %s", (leave_type_id,))
        if cursor.fetchone() is None:
            raise HTTPException(status_code=404, detail="Leave type not found")
        
        # Perform update
        cursor.execute("""
            UPDATE leave_type
            SET name = %s, description = %s
            WHERE leave_type_id = %s
        """, (leave_type.name, leave_type.description, leave_type_id))
        conn.commit()
        return {"message": "Leave type updated successfully"}
    except Exception as e:
        conn.rollback()
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        cursor.close()
        conn.close()

# Delete leave type
@app.delete("/delete-leave-type/{leave_type_id}")
def delete_leave_type(leave_type_id: int):
    conn = get_db_connection()
    cursor = conn.cursor()
    try:
        # Check if the leave type exists
        cursor.execute("SELECT * FROM leave_type WHERE leave_type_id = %s", (leave_type_id,))
        if cursor.fetchone() is None:
            raise HTTPException(status_code=404, detail="Leave type not found")

        # Perform delete
        cursor.execute("DELETE FROM leave_type WHERE leave_type_id = %s", (leave_type_id,))
        conn.commit()
        return {"message": "Leave type deleted successfully"}
    except Exception as e:
        conn.rollback()
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        cursor.close()
        conn.close()

#add leave-request

@app.post("/leave-requests")
def create_leave_request(request: LeaveRequestBase):
    conn = get_db_connection()
    cursor = conn.cursor()
    try:
        cursor.execute("""
            INSERT INTO leave_request (emp_id, leave_type_id, from_date, to_date, reason, status)
            VALUES (%s, %s, %s, %s, %s, %s)
        """, (
            request.emp_id,
            request.leave_type_id,
            request.from_date,
            request.to_date,
            request.reason,
            request.status.value
        ))
        conn.commit()
        return {"message": "Leave request submitted successfully"}
    except Exception as e:
        conn.rollback()
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        cursor.close()
        conn.close()

#get leave request
@app.get("/leave-requests", response_model=List[LeaveRequestOut])
def get_all_leave_requests():
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    try:
        cursor.execute("SELECT * FROM leave_request")
        results = cursor.fetchall()
        return results
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        cursor.close()
        conn.close()
@app.get("/leave-requests/{leave_id}", response_model=LeaveRequestOut)
def get_leave_request_by_id(leave_id: int):
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    try:
        cursor.execute("SELECT * FROM leave_request WHERE leave_id = %s", (leave_id,))
        result = cursor.fetchone()
        if result:
            return result
        else:
            raise HTTPException(status_code=404, detail="Leave request not found")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        cursor.close()
        conn.close()
#update leave request
@app.put("/leave-requests/{leave_id}")
def update_leave_request(leave_id: int, request: LeaveRequestBase):
    conn = get_db_connection()
    cursor = conn.cursor()
    try:
        cursor.execute("SELECT * FROM leave_request WHERE leave_id = %s", (leave_id,))
        if cursor.fetchone() is None:
            raise HTTPException(status_code=404, detail="Leave request not found")

        cursor.execute("""
            UPDATE leave_request
            SET emp_id=%s, leave_type_id=%s, from_date=%s, to_date=%s, reason=%s, status=%s
            WHERE leave_id=%s
        """, (
            request.emp_id,
            request.leave_type_id,
            request.from_date,
            request.to_date,
            request.reason,
            request.status.value,
            leave_id
        ))
        conn.commit()
        return {"message": "Leave request updated successfully"}
    except Exception as e:
        conn.rollback()
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        cursor.close()
        conn.close()

#delete leave request
@app.delete("/leave-requests/{leave_id}")
def delete_leave_request(leave_id: int):
    conn = get_db_connection()
    cursor = conn.cursor()
    try:
        cursor.execute("SELECT * FROM leave_request WHERE leave_id = %s", (leave_id,))
        if cursor.fetchone() is None:
            raise HTTPException(status_code=404, detail="Leave request not found")

        cursor.execute("DELETE FROM leave_request WHERE leave_id = %s", (leave_id,))
        conn.commit()
        return {"message": "Leave request deleted successfully"}
    except Exception as e:
        conn.rollback()
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        cursor.close()
        conn.close()

#create role
@app.post("/roles")
def create_role(role: RoleBase):
    conn = get_db_connection()
    cursor = conn.cursor()
    try:
        cursor.execute("INSERT INTO role (name, description) VALUES (%s, %s)", 
                       (role.name, role.description))
        conn.commit()
        return {"message": "Role created successfully"}
    except Exception as e:
        conn.rollback()
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        cursor.close()
        conn.close()
#get all roles
@app.get("/roles", response_model=List[UserAccountBase])
def get_all_roles():
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    try:
        cursor.execute("SELECT * FROM role")
        results = cursor.fetchall()
        return results
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        cursor.close()
        conn.close()
#get role by id 
@app.get("/roles/{role_id}", response_model=RoleOut)
def get_role_by_id(role_id: int):
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    try:
        cursor.execute("SELECT * FROM role WHERE role_id = %s", (role_id,))
        result = cursor.fetchone()
        if result:
            return result
        raise HTTPException(status_code=404, detail="Role not found")
    finally:
        cursor.close()
        conn.close()
#update role
@app.put("/roles/{role_id}")
def update_role(role_id: int, role: RoleBase):
    conn = get_db_connection()
    cursor = conn.cursor()
    try:
        cursor.execute("""
            UPDATE role
            SET name = %s, description = %s
            WHERE role_id = %s
        """, (role.name, role.description, role_id))
        if cursor.rowcount == 0:
            raise HTTPException(status_code=404, detail="Role not found")
        conn.commit()
        return {"message": "Role updated successfully"}
    except Exception as e:
        conn.rollback()
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        cursor.close()
        conn.close()
#delete roles
@app.delete("/roles/{role_id}")
def delete_role(role_id: int):
    conn = get_db_connection()
    cursor = conn.cursor()
    try:
        cursor.execute("DELETE FROM role WHERE role_id = %s", (role_id,))
        if cursor.rowcount == 0:
            raise HTTPException(status_code=404, detail="Role not found")
        conn.commit()
        return {"message": "Role deleted successfully"}
    except Exception as e:
        conn.rollback()
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        cursor.close()
        conn.close()

#create permission
@app.post("/permissions")
def create_permission(permission: permissionBase):
    conn = get_db_connection()
    cursor = conn.cursor()
    try:
        cursor.execute(
            "INSERT INTO permission (name, description) VALUES (%s, %s)",
            (permission.name, permission.description)
        )
        conn.commit()
        return {"message": "Permission created successfully"}
    except Exception as e:
        conn.rollback()
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        cursor.close()
        conn.close()
#get all permission
@app.get("/permissions", response_model=list[PermissionOut])
def get_permissions():
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    try:
        cursor.execute("SELECT * FROM permission")
        return cursor.fetchall()
    finally:
        cursor.close()
        conn.close()
#get permission by id
@app.get("/permissions/{permission_id}", response_model=PermissionOut)
def get_permission_by_id(permission_id: int):
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    try:
        cursor.execute("SELECT * FROM permission WHERE permission_id = %s", (permission_id,))
        result = cursor.fetchone()
        if result:
            return result
        raise HTTPException(status_code=404, detail="Permission not found")
    finally:
        cursor.close()
        conn.close()
#update permission
@app.put("/permissions/{permission_id}")
def update_permission(permission_id: int, permission: permissionBase):
    conn = get_db_connection()
    cursor = conn.cursor()
    try:
        cursor.execute("""
            UPDATE permission
            SET name = %s, description = %s
            WHERE permission_id = %s
        """, (permission.name, permission.description, permission_id))
        if cursor.rowcount == 0:
            raise HTTPException(status_code=404, detail="Permission not found")
        conn.commit()
        return {"message": "Permission updated successfully"}
    except Exception as e:
        conn.rollback()
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        cursor.close()
        conn.close()
#delete permisssion
@app.delete("/permissions/{permission_id}")
def delete_permission(permission_id: int):
    conn = get_db_connection()
    cursor = conn.cursor()
    try:
        cursor.execute("DELETE FROM permission WHERE permission_id = %s", (permission_id,))
        if cursor.rowcount == 0:
            raise HTTPException(status_code=404, detail="Permission not found")
        conn.commit()
        return {"message": "Permission deleted successfully"}
    except Exception as e:
        conn.rollback()
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        cursor.close()
        conn.close()

#assign permission to role
@app.post("/role-permissions")
def assign_permission_to_role(data: RolepermissionBase):
    conn = get_db_connection()
    cursor = conn.cursor()
    try:
        cursor.execute("""
            INSERT INTO role_permission (role_id, permission_id)
            VALUES (%s, %s)
        """, (data.role_id, data.permission_id))
        conn.commit()
        return {"message": "Permission assigned to role successfully"}
    except Exception as e:
        conn.rollback()
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        cursor.close()
        conn.close()
#get permission for role
@app.get("/role/{role_id}/permissions")
def get_permissions_by_role(role_id: int):
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    try:
        cursor.execute("""
            SELECT p.permission_id, p.name, p.description
            FROM permission p
            JOIN role_permission rp ON p.permission_id = rp.permission_id
            WHERE rp.role_id = %s
        """, (role_id,))
        return cursor.fetchall()
    finally:
        cursor.close()
        conn.close()
#get permisssions by role id
@app.get("/roles/{role_id}/permissions")
def get_permissions_by_role_id(role_id: int):
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    try:
        cursor.execute("""
            SELECT p.permission_id, p.name, p.description
            FROM permission p
            INNER JOIN role_permission rp ON p.permission_id = rp.permission_id
            WHERE rp.role_id = %s
        """, (role_id,))
        permissions = cursor.fetchall()
        if not permissions:
            raise HTTPException(status_code=404, detail="No permissions found for this role")
        return permissions
    finally:
        cursor.close()
        conn.close()
#update  permission by role id


@app.put("/role-permissions/update")
def update_permission_for_role(
    role_id: int = Body(...),
    old_permission_id: int = Body(...),
    new_permission_id: int = Body(...)
):
    conn = get_db_connection()
    cursor = conn.cursor()
    try:
        # Check if the mapping exists
        cursor.execute("""
            SELECT * FROM role_permission
            WHERE role_id = %s AND permission_id = %s
        """, (role_id, old_permission_id))
        if not cursor.fetchone():
            raise HTTPException(status_code=404, detail="Original permission mapping not found.")
      # Update the permission
        cursor.execute("""
            UPDATE role_permission
            SET permission_id = %s
            WHERE role_id = %s AND permission_id = %s
        """, (new_permission_id, role_id, old_permission_id))

        conn.commit()
        return {"message": "Permission updated successfully for the role"}
    except Exception as e:
        conn.rollback()
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        cursor.close()
        conn.close()
#delete permisssion from role
@app.delete("/role-permissions")
def remove_permission_from_role(data: RolepermissionBase):
    conn = get_db_connection()
    cursor = conn.cursor()
    try:
        cursor.execute("""
            DELETE FROM role_permission
            WHERE role_id = %s AND permission_id = %s
        """, (data.role_id, data.permission_id))
        if cursor.rowcount == 0:
            raise HTTPException(status_code=404, detail="Mapping not found")
        conn.commit()
        return {"message": "Permission removed from role"}
    except Exception as e:
        conn.rollback()
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        cursor.close()
        conn.close()

# CREATE user account
@app.post("/user-accounts")
def create_user_account(data: UserAccountBase):
    conn = get_db_connection()
    cursor = conn.cursor()
    try:
        hashed_password = pwd_context.hash(data.password)
        cursor.execute(
            "INSERT INTO user_account (username,email, password_hash, is_active) VALUES (%s, %s, %s)",
            (data.username, hashed_password, data.is_active)
        )
        conn.commit()
        return {"message": "User account created"}
    except Exception as e:
        conn.rollback()
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        cursor.close()
        conn.close()


# GET all user accounts
@app.get("/user-accounts")
def get_user_accounts():
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    try:
        cursor.execute("SELECT * FROM user_account")
        users = cursor.fetchall()
        return users
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        cursor.close()
        conn.close()


# UPDATE user account
@app.put("/user-accounts")
def update_user_account(data: UserAccountUpdate):
    conn = get_db_connection()
    cursor = conn.cursor()
    try:
        cursor.execute("UPDATE user_account SET username = %s, password = %s WHERE user_id = %s",
                       (data.username, data.password, data.user_id))
        if cursor.rowcount == 0:
            raise HTTPException(status_code=404, detail="User not found")
        conn.commit()
        return {"message": "User account updated"}
    except Exception as e:
        conn.rollback()
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        cursor.close()
        conn.close()


# DELETE user account
@app.delete("/user-accounts")
def delete_user_account(data: UserID):
    conn = get_db_connection()
    cursor = conn.cursor()
    try:
        cursor.execute("DELETE FROM user_account WHERE user_id = %s", (data.user_id,))
        if cursor.rowcount == 0:
            raise HTTPException(status_code=404, detail="User not found")
        conn.commit()
        return {"message": "User account deleted"}
    except Exception as e:
        conn.rollback()
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        cursor.close()
        conn.close()
# CREATE user role mapping
@app.post("/user-roles")
def assign_role_to_user(data: UserRoleBase):
    conn = get_db_connection()
    cursor = conn.cursor()
    try:
        cursor.execute("INSERT INTO user_role (user_id, role_id) VALUES (%s, %s)",
                       (data.user_id, data.role_id))
        conn.commit()
        return {"message": "Role assigned to user"}
    except Exception as e:
        conn.rollback()
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        cursor.close()
        conn.close()


# GET all user-role mappings
@app.get("/user-roles")
def get_user_roles():
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    try:
        cursor.execute("""
            SELECT u.user_id, u.username, r.name AS role_name
            FROM user_account u
            JOIN user_role ur ON u.user_id = ur.user_id
            JOIN role r ON ur.role_id = r.role_id
        """)
        return cursor.fetchall()
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        cursor.close()
        conn.close()


# DELETE user-role mapping
@app.delete("/user-roles")
def remove_user_role(data: UserRoleBase):
    conn = get_db_connection()
    cursor = conn.cursor()
    try:
        cursor.execute("DELETE FROM user_role WHERE user_id = %s AND role_id = %s",
                       (data.user_id, data.role_id))
        if cursor.rowcount == 0:
            raise HTTPException(status_code=404, detail="Mapping not found")
        conn.commit()
        return {"message": "Role removed from user"}
    except Exception as e:
        conn.rollback()
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        cursor.close()
        conn.close()

#get school
@app.get("/schools", response_model=List[SchoolOut])
def get_all_schools():
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT id, school_name, school_location, principal_id FROM schools")
    results = cursor.fetchall()
    conn.close()
    return [
    {
        "id": int(row["id"]),
        "school_name": row["school_name"],
        "school_location": row["school_location"],
        "principal_id": int(row["principal_id"]) if row["principal_id"] is not None else None
    }
    for row in results
]


#get school by id
@app.get("/schools/{school_id}", response_model=SchoolOut)
def get_school(school_id: int):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT id, school_name, school_location, principal_id FROM schools WHERE id = %s", (school_id,))
    row = cursor.fetchone()
    conn.close()
    if row:
        return dict(zip(['id', 'school_name', 'school_location', 'principal_id'], row))
    else:
        raise HTTPException(status_code=404, detail="School not found")

#add new school
@app.post("/schools", response_model=SchoolOut)
def add_school(school: SchoolCreate):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute(
        "INSERT INTO schools (school_name, school_location, principal_id) VALUES (%s, %s, %s)",
        (school.school_name, school.school_location, school.principal_id)
    )
    conn.commit()
    school_id = cursor.lastrowid
    conn.close()
    return {**school.dict(), "id": school_id}

#update school
@app.put("/schools/{school_id}", response_model=SchoolOut)
def update_school(school_id: int, school: SchoolCreate):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute(
        "UPDATE schools SET school_name = %s, school_location = %s, principal_id = %s WHERE id = %s",
        (school.school_name, school.school_location, school.principal_id, school_id)
    )
    conn.commit()
    conn.close()
    return {**school.dict(), "id": school_id}

#delete school
@app.delete("/schools/{school_id}")
def delete_school(school_id: int):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("DELETE FROM schools WHERE id = %s", (school_id,))
    conn.commit()
    conn.close()
    return {"message": "School deleted successfully"}

#get all colleges
@app.get("/colleges", response_model=List[CollegeOut])
def get_colleges():
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT id, college_name, college_location, dean_id FROM colleges")
    results = cursor.fetchall()
    conn.close()
    return [
         {
                "id": row["id"],
                "college_name": row["college_name"],
                "college_location": row["college_location"],
                "dean_id": row["dean_id"]
            }
            for row in results
    ]
#college by id
@app.get("/colleges/{college_id}", response_model=CollegeOut)
def get_college(college_id: int):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT id, college_name, college_location, dean_id FROM colleges WHERE id = %s", (college_id,))
    row = cursor.fetchone()
    conn.close()
    if row:
        return dict(zip(['id', 'college_name', 'college_location', 'dean_id'], row))
    else:
        raise HTTPException(status_code=404, detail="College not found")

#create new college
@app.post("/colleges", response_model=CollegeOut)
def create_college(college: CollegeCreate):
    try:
       conn = get_db_connection()
       cursor = conn.cursor()
       cursor.execute(
        "INSERT INTO colleges (college_name, college_location, dean_id) VALUES (%s, %s, %s)",
        (college.college_name, college.college_location, college.dean_id)
       )
       conn.commit()
       college_id = cursor.lastrowid
       conn.close()
       return {**college.dict(), "id": college_id}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error creating college: {str(e)}")

#update college
@app.put("/colleges/{college_id}", response_model=CollegeOut)
def update_college(college_id: int, college: CollegeCreate):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute(
        "UPDATE colleges SET college_name = %s, college_location = %s, dean_id = %s WHERE id = %s",
        (college.college_name, college.college_location, college.dean_id, college_id)
    )
    conn.commit()
    conn.close()
    return {**college.dict(), "id": college_id}

#delete college
@app.delete("/colleges/{college_id}")
def delete_college(college_id: int):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("DELETE FROM colleges WHERE id = %s", (college_id,))
    conn.commit()
    conn.close()
    return {"message": "College deleted successfully"}

#get all offices
@app.get("/offices", response_model=List[OfficeOut])
def get_all_offices():
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM offices")
    results = cursor.fetchall()
    conn.close()
    return results

#get office by id
@app.get("/offices/{office_id}", response_model=OfficeOut)
def get_office(office_id: int):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM offices WHERE id = %s", (office_id,))
    row = cursor.fetchone()
    conn.close()

    if row:
        fields = [col[0] for col in cursor.description]
        return dict(zip(fields, row))
    else:
        raise HTTPException(status_code=404, detail="Office not found")

#create office
@app.post("/offices", response_model=OfficeOut)
def create_office(office: OfficeCreate):
    conn = get_db_connection()
    cursor = conn.cursor()
    query = """
        INSERT INTO offices (
            office_name, location, ceo_id, ceo_name,
            ceo_email
            
        )
        VALUES (%s, %s, %s, %s, %s)
    """
    values = (
        office.office_name, office.location, office.ceo_id, office.ceo_name,
        office.ceo_email
    )
    cursor.execute(query, values)
    conn.commit()
    office_id = cursor.lastrowid
    conn.close()
    return {**office.dict(), "id": office_id}

#update office
@app.put("/offices/{office_id}", response_model=OfficeOut)
def update_office(office_id: int, office: OfficeCreate):
    conn = get_db_connection()
    cursor = conn.cursor()
    query = """
        UPDATE offices SET
            office_name=%s, location=%s, ceo_id=%s, ceo_name=%s, ceo_age=%s,
            ceo_qualification=%s, ceo_phone=%s, ceo_email=%s, ceo_address=%s,
            ceo_joining_date=%s, ceo_salary=%s, ceo_experience_years=%s
        WHERE id = %s
    """
    values = (
        office.office_name, office.location, office.ceo_id, office.ceo_name,
        office.ceo_age, office.ceo_qualification, office.ceo_phone,
        office.ceo_email, office.ceo_address, office.ceo_joining_date,
        office.ceo_salary, office.ceo_experience_years, office_id
    )
    cursor.execute(query, values)
    conn.commit()
    conn.close()
    return {**office.dict(), "id": office_id}

#delete office
@app.delete("/offices/{office_id}")
def delete_office(office_id: int):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("DELETE FROM offices WHERE id = %s", (office_id,))
    conn.commit()
    conn.close()
    return {"message": "Office deleted successfully"}

def format_time(value):
    if isinstance(value, timedelta):
        total_seconds = int(value.total_seconds())
        hours = total_seconds // 3600
        minutes = (total_seconds % 3600) // 60
        seconds = total_seconds % 60
        return f"{hours:02}:{minutes:02}:{seconds:02}"
    elif value:
        return str(value)
    return ""

@app.get("/school/{school_id}/attendance")
def get_attendance_by_school(school_id: int):
    conn = get_db_connection()
    cursor = conn.cursor()

    try:
        query = """
            SELECT 
                a.attendance_id,
                a.date,
                a.status,
                a.check_in,
                a.check_out,
                u.student_name,
                u.teacher_name,
                u.school_user_type
            FROM 
                attendance a
            JOIN 
                users u ON a.emp_id = u.id
            WHERE 
                u.school_id = %s
            ORDER BY a.date DESC;
        """
        cursor.execute(query, (school_id,))
        rows = cursor.fetchall()

        result = []  # Ensure result is declared
        for row in rows:
            user_display_name = row[5] or row[6] or "Unknown"
            result.append({
                "id": int(row[0]),
                "date": row[1].strftime('%Y-%m-%d') if row[1] else "",
                "status": str(row[2]),
                "check_in": format_time(row[3]),
                "check_out": format_time(row[4]),
                "name": user_display_name,
                "user_type": row[7]
            })

        return result

    except Exception as e:
        logging.error(f"Error fetching attendance: {e}")
        raise HTTPException(status_code=500, detail=f"Server Error: {str(e)}")



#get attendance by college id
@app.get("/colleges/{college_id}/attendance", response_model=List[AttendanceResponse])
def get_attendance_by_college_id(college_id: int):
    conn = get_db_connection()
    cursor = conn.cursor()

    query = """
     SELECT 
            a.attendance_id,
            a.date,
            a.status,
            a.check_in,
            a.check_out,
            u.student_name,
            u.teacher_name,
            u.college_user_type
        FROM 
           attendance a
        JOIN 
          users u ON a.emp_id = u.id
        JOIN 
          colleges c ON c.dean_id = u.id
        WHERE 
            c.id = %s
        ORDER BY 
            a.date DESC;
        
    """
    cursor.execute(query, (college_id,))
    results = cursor.fetchall()

    cursor.close()
    conn.close()

    if not results:
        raise HTTPException(status_code=404, detail="No attendance records found for this college.")
    
    return results


@app.get("/offices/{office_id}/attendance", response_model=List[AttendanceResponse])
def get_attendance_by_office_id(office_id: int):
    conn = get_db_connection()
    cursor = conn.cursor()

    query = """
        SELECT 
            a.attendance_id,
            a.date,
            a.status,
            a.check_in,
            a.check_out,
            u.employee_name,
            u.office_user_type
        FROM 
            attendance a
        JOIN 
            users u ON a.emp_id = u.id
        JOIN 
            offices o ON o.ceo_id = u.id
        WHERE 
            o.id = %s
        ORDER BY 
            a.date DESC;
    """
    cursor.execute(query, (office_id,))
    results = cursor.fetchall()

    cursor.close()
    conn.close()
    
    if not results:
        raise HTTPException(status_code=404, detail="No attendance records found for this college.")
    return results

@app.get("/dashboard-counts")
def get_counts():
    conn = get_db_connection()
    cursor = conn.cursor()  # Important!

    cursor.execute("SELECT COUNT(*) AS count FROM schools")
    result = cursor.fetchone()
    school_count = result["count"] if result else 0

    cursor.execute("SELECT COUNT(*) AS count FROM colleges")
    result = cursor.fetchone()
    college_count = result["count"] if result else 0

    cursor.execute("SELECT COUNT(*) AS count FROM offices")
    result = cursor.fetchone()
    office_count = result["count"] if result else 0

    cursor.close()
    conn.close()

    return {
        "schools": school_count,
        "colleges": college_count,
        "offices": office_count
    }

@app.get("/get-location-chart")
async def get_location_chart():
    # Query to get count of schools, colleges, and offices by location
    conn = get_db_connection()
    cursor = conn.cursor()
    
    query = """
        SELECT location, 
               SUM(CASE WHEN type = 'school' THEN 1 ELSE 0 END) AS schools,
               SUM(CASE WHEN type = 'college' THEN 1 ELSE 0 END) AS colleges,
               SUM(CASE WHEN type = 'office' THEN 1 ELSE 0 END) AS offices
       
        FROM (
            SELECT school_location AS location, 'school' AS type FROM schools
            UNION ALL
            SELECT college_location AS location, 'college' AS type FROM colleges
            UNION ALL
            SELECT location AS location, 'office' AS type FROM offices
        ) AS combined
        GROUP BY location;
    """
    cursor.execute(query)
    result = cursor.fetchall()

    locations,schools,colleges,offices =[],[],[],[]  
     # Extract data from result
    locations = []
    schools = []
    colleges = []
    offices = []

    for row in result:
        locations.append(row["location"])
        schools.append(row["schools"])
        colleges.append(row["colleges"])
        offices.append(row["offices"])

    # Create the bar chart
    fig, ax = plt.subplots(figsize=(10, 6))
    x = range(len(locations))

    ax.bar(x, schools, width=0.25, label="Schools", align="center")
    ax.bar(x, colleges, width=0.25, label="Colleges", bottom=schools, align="center")
    ax.bar(x, offices, width=0.25, label="Offices", bottom=[i+j for i,j in zip(schools, colleges)], align="center")

    ax.set_xlabel('Location')
    ax.set_ylabel('Count')
    ax.set_title('Institution Count by Location')
    ax.set_xticks(x)
    ax.set_xticklabels(locations)
    ax.legend()


    ax.yaxis.set_major_locator(plt.MultipleLocator(1))  # Sets the interval of y-axis ticks to 2
    ax.yaxis.set_major_formatter(plt.FuncFormatter(lambda x, _: f'{int(x)}'))  # Format y-axis as integers


    # Save the chart to a BytesIO object and return as an image
    buf = io.BytesIO()
    plt.savefig(buf, format="png")
    buf.seek(0)
    return Response(content=buf.read(), media_type="image/png")





































































































