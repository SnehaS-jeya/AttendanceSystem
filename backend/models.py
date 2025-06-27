from sqlalchemy import Column, Integer, String, ForeignKey, Date, DateTime
from sqlalchemy.orm import relationship
from sqlalchemy.ext.declarative import declarative_base
from pydantic import BaseModel
Base = declarative_base()

# School Model
class School(Base):
    __tablename__ = 'schools'
    school_id = Column(Integer, primary_key=True, index=True)
    school_name = Column(String, index=True)
    school_location = Column(String)
    principal_id = Column(Integer, ForeignKey('users.id'))

    principal = relationship("User", back_populates="schools")


# College Model
class College(Base):
    __tablename__ = 'colleges'
    id = Column(Integer, primary_key=True, index=True)
    college_name = Column(String, index=True)
    college_location = Column(String)
    dean_id = Column(Integer, ForeignKey('users.id'))

    dean = relationship("User", back_populates="colleges")


# Employee Model
class Employee(Base):
    __tablename__ = 'employee'

    emp_id = Column(Integer, primary_key=True, autoincrement=True)
    org_id = Column(Integer, ForeignKey('organization.org_id'))
    dept_id = Column(Integer, ForeignKey('department.dept_id'))
    designation_id = Column(Integer, ForeignKey('designation.designation_id'))
    name = Column(String, nullable=False)
    email = Column(String)
    contact_number = Column(String)
    date_of_joining = Column(Date)

    # Relationships
    organization = relationship("Organization", back_populates="employees")
    department = relationship("Department", back_populates="employees")
    designation = relationship("Designation", back_populates="employees")


# Office Model
class Office(Base):
    __tablename__ = 'offices'
    id = Column(Integer, primary_key=True, index=True)
    office_name = Column(String, index=True)
    location = Column(String)
    ceo_id = Column(Integer, ForeignKey('users.id'))

    ceo = relationship("User", back_populates="offices")


# User Model
class User(Base):
    __tablename__ = "user"

    user_id = Column(Integer, primary_key=True, index=True)
    username = Column(String(100), nullable=False, unique=True)
    email = Column(String(255), nullable=False, unique=True)
    password = Column(String(200), nullable=False)
    role = Column(String(50), nullable=False)  # e.g., Admin, Teacher, Student, etc.

    user_account = relationship("UserAccount", back_populates="user")
    user_roles = relationship("UserRole", back_populates="user")


# UserAccount Model
class UserAccount(Base):
    __tablename__ = "user_account"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey('user.id'), nullable=False)  # Linking to the 'user' table
    emp_id = Column(Integer, ForeignKey('employee.emp_id'), nullable=False)  # Assuming emp_id relates to 'employee'
    created_at = Column(DateTime, nullable=False)

    # Relationships
    user = relationship("User", back_populates="user_account")
    employee = relationship("Employee", back_populates="user_account")


# UserRole Model
class UserRole(Base):
    __tablename__ = "user_role"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey('user.id'), nullable=False)  # Linking to the 'user' table
    role_id = Column(Integer, ForeignKey('role.role_id'), nullable=False)  # Assuming 'role' table exists

    # Relationships
    user = relationship("User", back_populates="user_roles")
    role = relationship("Role", back_populates="user_roles")


# Attendance Model
class Attendance(Base):
    __tablename__ = "attendance"

    attendance_id = Column(Integer, primary_key=True, index=True)
    emp_id = Column(Integer, ForeignKey('employee.emp_id'), nullable=False)  # Assuming 'employee' table exists
    date = Column(Date, nullable=False)
    status = Column(String(50), nullable=False)  # 'Present', 'Absent', 'On Leave', etc.

    # Relationships
    employee = relationship("Employee", back_populates="attendance")
class Role(Base):
    __tablename__ = 'role'
    role_id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), unique=True, index=True)
    description = Column(String(255))
    organization_type = Column(String(255))

    def __repr__(self):
        return f"<Role(name={self.name})>"
    
