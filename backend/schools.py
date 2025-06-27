import pymysql
from fastapi import Query
from fastapi import FastAPI, APIRouter, HTTPException
from pydantic import BaseModel
from datetime import date
from models import Employee, Role, Attendance
from database import get_db_connection
from typing import List,Optional
app = FastAPI()
# Create a router for school-related endpoints
school_router = APIRouter(tags=["School Dashboard"])
app.include_router(school_router)

class ClassCreate(BaseModel):
    class_name: str
    section: str
    school_id: int
class ClassBase(BaseModel):                       
    id: int
    class_name: str
    section: str
class TeacherBase(BaseModel):
    id: int
    teacher_name: str
    handling_subject: str
    teacher_age: int
    teacher_qualification: str
    teacher_experience: str

class TeacherCreate(BaseModel):
    teacher_name: str
    handling_subject: str
    teacher_age: int
    teacher_qualification: str
    teacher_experience: str
class Student(BaseModel):
    student_name: str
    student_age: int
    student_class: str
    student_section: str
    student_roll_no: int
class ClassOut(BaseModel):
    id: int
    class_name: str
    section: str
    school_id: int


# Get school dashboard data
@school_router.get("/dashboard/{school_id}")
def get_school_dashboard(school_id: int):
    conn = get_db_connection()
    cursor = conn.cursor()
    try:
        today = date.today()

        # Fetch role IDs for Teacher and Student
        cursor.execute("SELECT role_id FROM role WHERE name = %s", ("Teacher",))
        teacher_role = cursor.fetchone()
        if not teacher_role:
            raise HTTPException(status_code=404, detail="Teacher role not found")
        teacher_role_id = teacher_role[0]

        cursor.execute("SELECT role_id FROM role WHERE name = %s", ("Student",))
        student_role = cursor.fetchone()
        if not student_role:
            raise HTTPException(status_code=404, detail="Student role not found")
        student_role_id = student_role[0]

        # Count Teachers
        cursor.execute(
            "SELECT COUNT(*) FROM employee WHERE org_id = %s AND designation_id = %s",
            (school_id, teacher_role_id)
        )
        teacher_count = cursor.fetchone()[0]

        # Count Students
        cursor.execute(
            "SELECT COUNT(*) FROM employee WHERE org_id = %s AND designation_id = %s",
            (school_id, student_role_id)
        )
        student_count = cursor.fetchone()[0]

        # Attendance Summary (Present/Absent/Leave)
        cursor.execute("""
            SELECT a.status, COUNT(*) 
            FROM attendance a
            JOIN employee e ON a.emp_id = e.emp_id
            WHERE e.org_id = %s AND a.date = %s
            GROUP BY a.status
        """, (school_id, today))

        attendance_summary = cursor.fetchall()
        attendance_counts = {status: count for status, count in attendance_summary}

        return {
            "school_id": school_id,
            "teacher_count": teacher_count,
            "student_count": student_count,
            "attendance_today": attendance_counts
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        cursor.close()
        conn.close()

@school_router.post("/add-class")
def add_class(new_class: ClassCreate):
    db = get_db_connection()
    cursor = db.cursor()
    query = "INSERT INTO class (class_name, section, school_id) VALUES (%s, %s, %s)"
    values = (new_class.class_name, new_class.section, new_class.school_id)

    try:
        cursor.execute(query, values)
        db.commit()
        return {"message": "Class added successfully"}
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        cursor.close()
        db.close()

# Get Classes API
@school_router.get("/get-classes/{school_id}", response_model=List[ClassBase])
def get_classes(school_id:int):
    conn = get_db_connection()
    cursor = conn.cursor(pymysql.cursors.DictCursor)
    cursor.execute("SELECT id, class_name, section FROM class WHERE school_id=%s",(school_id,))  # Only selecting required fields
    result = cursor.fetchall()
    cursor.close()
    conn.close()
    return result

@school_router.get("/get-teachers", response_model=List[TeacherBase])
def get_teachers():
    conn = get_db_connection()
    cursor = conn.cursor(pymysql.cursors.DictCursor)
    cursor.execute("""
        SELECT id, teacher_name, handling_subject, teacher_age, 
               teacher_qualification, teacher_experience 
        FROM teacher
    """)
    result = cursor.fetchall()
    cursor.close()
    conn.close()
    return result

# 🔹 Create Teacher
@school_router.post("/create-teacher")
def create_teacher(teacher: TeacherCreate):
    conn = get_db_connection()
    cursor = conn.cursor()
    try:
        cursor.execute("""
            INSERT INTO teacher 
            (teacher_name, handling_subject, teacher_age, 
             teacher_qualification, teacher_experience) 
            VALUES (%s, %s, %s, %s, %s)
        """, (
            teacher.teacher_name,
            teacher.handling_subject,
            teacher.teacher_age,
            teacher.teacher_qualification,
            teacher.teacher_experience
        ))
        conn.commit()
    except Exception as e:
        conn.rollback()
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        cursor.close()
        conn.close()
    return {"message": "Teacher created successfully"}

# Create student
@school_router.post("/add-student")
def add_student(student: Student):
    conn = get_db_connection()
    cursor = conn.cursor(pymysql.cursors.DictCursor)
    try:
        cursor.execute(
            """
            INSERT INTO students (student_name, student_age, student_class, student_section, student_roll_no)
            VALUES (%s, %s, %s, %s, %s)
            """,
            (
                student.student_name,
                student.student_age,
                student.student_class,
                student.student_section,
                student.student_roll_no
            )
        )
        conn.commit()
    except Exception as e:
        conn.rollback()
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        cursor.close()
        conn.close()
        return {"message": "Student created successfully"}
# Get all students
@school_router.get("/get-students", response_model=List[Student])
def get_students():
    conn = get_db_connection()
    cursor = conn.cursor(pymysql.cursors.DictCursor)
    try:
        cursor.execute("SELECT student_name, student_age, student_class, student_section, student_roll_no FROM students")
        result = cursor.fetchall()
        
    finally:
        cursor.close()
        conn.close()
        return result
#get classes
@school_router.get("/get-classes", response_model=List[ClassBase])
def get_classes():
    conn = get_db_connection()
    cursor = conn.cursor(pymysql.cursors.DictCursor)
    cursor.execute("SELECT id, name, section FROM class")  # Only selecting required fields
    result = cursor.fetchall()
    cursor.close()
    conn.close()
    return result

@school_router.get("/get-studentslist", response_model=List[Student])
def get_students(class_name: str = Query(...), section: str = Query(...)):
    conn = get_db_connection()
    cursor = conn.cursor(pymysql.cursors.DictCursor)
    try:
        query = """
            SELECT student_name, student_age, student_class, student_section, student_roll_no 
            FROM students 
            WHERE student_class = %s AND student_section = %s
        """
        cursor.execute(query, (class_name, section))
        result = cursor.fetchall()
    finally:
        cursor.close()
        conn.close()
    return result


@school_router.get("/school/{school_id}/attendance")
def get_attendance_by_school_class_section(
    school_id: int,
    class_name: Optional[str] = Query(None),
    section: Optional[str] = Query(None)
):
    conn = get_db_connection()
    cursor = conn.cursor()

    try:
        base_query = """
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
            LEFT JOIN 
                class c ON u.class_id = c.id
            WHERE 
                u.school_id = %s
        """
        params = [school_id]

        if class_name:
            base_query += " AND c.class_name = %s"
            params.append(class_name)

        if section:
            base_query += " AND c.section = %s"
            params.append(section)

        base_query += " ORDER BY a.date DESC"

        cursor.execute(base_query, tuple(params))
        rows = cursor.fetchall()

        result = []
        for row in rows:
            user_display_name = row[5] or row[6] or "Unknown"
            result.append({
                "id": int(row[0]),
                "date": row[1].strftime('%Y-%m-%d') if row[1] else "",
                "status": str(row[2]),
                "check_in": str(row[3]) if row[3] else "",
                "check_out": str(row[4]) if row[4] else "",
                "name": user_display_name,
                "user_type": row[7]
            })
 
        return result

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        cursor.close()
        conn.close()



        