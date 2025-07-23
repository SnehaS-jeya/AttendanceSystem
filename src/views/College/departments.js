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
  CInputGroup,
  CFormInput,
  CButton,
  CRow,
  CCol,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilSearch, cilPencil, cilTrash, cilDescription } from '@coreui/icons'

const Departments = () => {
  const departmentsData = [
    { id: '01', name: 'Computer Science', head: 'Dr. Ramesh', courses: 8 },
    { id: '02', name: 'Electronics', head: 'Dr. Anitha', courses: 6 },
    { id: '03', name: 'Mechanical', head: 'Dr. Raj', courses: 7 },
    { id: '04', name: 'Civil', head: 'Dr. Kavitha', courses: 5 },
    { id: '05', name: 'IT', head: 'Dr. Arun', courses: 6 },
  ]

  return (
    <CCard className="mb-4">
      <CCardHeader>
        <CRow className="align-items-center g-3">
          <CCol md={8}>
            <h5 className="mb-0">Departments</h5>
          </CCol>
          <CCol md={2}>
            <CButton color="primary" className="w-100">
              + Add Department
            </CButton>
          </CCol>
          <CCol md={2}>
            <CInputGroup>
              <CFormInput placeholder="Search Departments..." />
              <CButton type="button" color="primary">
                <CIcon icon={cilSearch} />
              </CButton>
            </CInputGroup>
          </CCol>
        </CRow>
      </CCardHeader>

      <CCardBody>
        <CTable hover responsive>
          <CTableHead color="light">
            <CTableRow>
              <CTableHeaderCell>Department ID</CTableHeaderCell>
              <CTableHeaderCell>Department Name</CTableHeaderCell>
              <CTableHeaderCell>Head of Department</CTableHeaderCell>
              <CTableHeaderCell>No. of Courses</CTableHeaderCell>
              <CTableHeaderCell>Actions</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {departmentsData.map((dept, index) => (
              <CTableRow key={index}>
                <CTableDataCell>{dept.id}</CTableDataCell>
                <CTableDataCell>{dept.name}</CTableDataCell>
                <CTableDataCell>{dept.head}</CTableDataCell>
                <CTableDataCell>{dept.courses}</CTableDataCell>
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

export default Departments
