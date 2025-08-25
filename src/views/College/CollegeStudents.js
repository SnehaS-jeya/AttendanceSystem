import React from 'react'
import {
  CCard,
  CCardHeader,
  CCardBody,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CFormSelect,
  CInputGroup,
  CFormInput,
  CButton,
  CRow,
  CCol,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilSearch, cilPencil, cilTrash, cilDescription } from '@coreui/icons'

const CollegeStudents = () => {
  const studentData = [
    { rollNo: '01', name: 'Aishwarya R', department: 'Computer Science', year: 'I', gender: 'Female' },
    { rollNo: '02', name: 'Rahul M', department: 'Computer Science', year: 'I', gender: 'Male' },
    { rollNo: '03', name: 'Divya S', department: 'Electronics', year: 'II', gender: 'Female' },
    { rollNo: '04', name: 'Manoj K', department: 'Mechanical', year: 'II', gender: 'Male' },
    { rollNo: '05', name: 'Sneha V', department: 'Civil', year: 'III', gender: 'Female' },
    { rollNo: '06', name: 'Arjun T', department: 'Electrical', year: 'III', gender: 'Male' },
    { rollNo: '07', name: 'Lakshmi D', department: 'Electronics', year: 'IV', gender: 'Female' },
    { rollNo: '08', name: 'Karthik S', department: 'Mechanical', year: 'IV', gender: 'Male' },
  ]

  return (
    <CCard className="mb-4">
      <CCardHeader>
        <CRow className="align-items-center g-3">
          <CCol md={3}>
            <CFormSelect>
              <option>All Departments</option>
              <option>Computer Science</option>
              <option>Electronics</option>
              <option>Mechanical</option>
              <option>Civil</option>
              <option>Electrical</option>
            </CFormSelect>
          </CCol>
          <CCol md={3}>
            <CFormSelect>
              <option>All Years</option>
              <option>I</option>
              <option>II</option>
              <option>III</option>
              <option>IV</option>
            </CFormSelect>
          </CCol>
          <CCol md={4}>
            <CInputGroup>
              <CFormInput placeholder="Search Student" />
              <CButton type="button" color="primary">
                <CIcon icon={cilSearch} />
              </CButton>
            </CInputGroup>
          </CCol>
          <CCol md={2}>
            <CButton color="primary" className="w-100">+ Add Student</CButton>
          </CCol>
        </CRow>
      </CCardHeader>

      <CCardBody>
        <CTable hover responsive>
          <CTableHead color="light">
            <CTableRow>
              <CTableHeaderCell>Roll No</CTableHeaderCell>
              <CTableHeaderCell>Name</CTableHeaderCell>
              <CTableHeaderCell>Department</CTableHeaderCell>
              <CTableHeaderCell>Year</CTableHeaderCell>
              <CTableHeaderCell>Gender</CTableHeaderCell>
              <CTableHeaderCell>Actions</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {studentData.map((student, index) => (
              <CTableRow key={index}>
                <CTableDataCell>{student.rollNo}</CTableDataCell>
                <CTableDataCell>{student.name}</CTableDataCell>
                <CTableDataCell>{student.department}</CTableDataCell>
                <CTableDataCell>{student.year}</CTableDataCell>
                <CTableDataCell>{student.gender}</CTableDataCell>
                <CTableDataCell>
                  <CButton size="sm" color="info" className="me-1">
                    <CIcon icon={cilDescription} />
                  </CButton>
                  <CButton size="sm" color="warning" className="me-1">
                    <CIcon icon={cilPencil} />
                  </CButton>
                  <CButton size="sm" color="danger">
                    <CIcon icon={cilTrash} />
                  </CButton>
                </CTableDataCell>
              </CTableRow>
            ))}
          </CTableBody>
        </CTable>
      </CCardBody>
    </CCard>
  )
}

export default CollegeStudents
