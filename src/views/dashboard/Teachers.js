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

const Teachers = () => {
  const teachersData = [
    { id: '01', name: 'Ravi Kumar', subject: 'Mathematics', phone: '9876543210' },
    { id: '02', name: 'Anita Sharma', subject: 'English', phone: '9876543211' },
    { id: '03', name: 'Suresh Menon', subject: 'Science', phone: '9876543212' },
    { id: '04', name: 'Lakshmi Priya', subject: 'Computer Science', phone: '9876543213' },
    { id: '05', name: 'Vignesh S.', subject: 'History', phone: '9876543214' },
    { id: '06', name: 'Shalini R.', subject: 'Chemistry', phone: '9876543215' },
    { id: '07', name: 'Naveen Raj', subject: 'Physics', phone: '9876543216' },
    { id: '08', name: 'Kavitha Rani', subject: 'Tamil', phone: '9876543217' },
    { id: '09', name: 'Mohammed Faiz', subject: 'Biology', phone: '9876543218' },
    { id: '10', name: 'Deepika N.', subject: 'Economics', phone: '9876543219' },
  ]

  return (
    <CCard className="mb-4">
      <CCardHeader>
        <CRow className="align-items-center g-3">
          <CCol md={8}>
            <h5 className="mb-0">Teachers</h5>
          </CCol>
          <CCol md={2}>
            <CButton color="primary" className="w-100">+ Create New</CButton>
          </CCol>
          <CCol md={2}>
            <CInputGroup>
              <CFormInput placeholder="Search Teacher..." />
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
              <CTableHeaderCell>Teacher ID</CTableHeaderCell>
              <CTableHeaderCell>Name</CTableHeaderCell>
              <CTableHeaderCell>Subject</CTableHeaderCell>
              <CTableHeaderCell>Phone</CTableHeaderCell>
              <CTableHeaderCell>Action</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {teachersData.map((teacher, index) => (
              <CTableRow key={index}>
                <CTableDataCell>{teacher.id}</CTableDataCell>
                <CTableDataCell>{teacher.name}</CTableDataCell>
                <CTableDataCell>{teacher.subject}</CTableDataCell>
                <CTableDataCell>{teacher.phone}</CTableDataCell>
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

export default Teachers
