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

const Students = () => {
  const studentsData = [
    { rollNo: '01', name: 'Ananya R', class: 'VI', section: 'A', gender: 'Female' },
    { rollNo: '02', name: 'Rohit S', class: 'VI', section: 'A', gender: 'Male' },
    { rollNo: '03', name: 'Sneha M', class: 'VI', section: 'A', gender: 'Female' },
    { rollNo: '04', name: 'Karthik P', class: 'VI', section: 'B', gender: 'Male' },
    { rollNo: '05', name: 'Divya K', class: 'VI', section: 'B', gender: 'Female' },
    { rollNo: '06', name: 'Manoj R', class: 'VI', section: 'B', gender: 'Male' },
    { rollNo: '07', name: 'Priya S', class: 'VI', section: 'C', gender: 'Female' },
    { rollNo: '08', name: 'Arun T', class: 'VI', section: 'C', gender: 'Male' },
    { rollNo: '09', name: 'Lakshmi V', class: 'VI', section: 'C', gender: 'Female' },
    { rollNo: '10', name: 'Vijay D', class: 'VI', section: 'C', gender: 'Male' },
  ]

  return (
    <CCard className="mb-4">
      <CCardHeader>
        <CRow className="align-items-center g-3">
          <CCol md={2}>
            <CFormSelect>
              <option>All Classes</option>
              <option>VI</option>
              <option>VII</option>
              <option>VIII</option>
            </CFormSelect>
          </CCol>
          <CCol md={2}>
            <CFormSelect>
              <option>All Sections</option>
              <option>A</option>
              <option>B</option>
              <option>C</option>
            </CFormSelect>
          </CCol>
          <CCol md={6}>
            <CInputGroup>
              <CFormInput placeholder="Search Student" />
              <CButton type="button" color="primary">
                <CIcon icon={cilSearch} />
              </CButton>
            </CInputGroup>
          </CCol>
          <CCol md={2} className="text-end">
            <CButton color="primary" className="w-100">+ Create New</CButton>
          </CCol>
        </CRow>
      </CCardHeader>

      <CCardBody>
        <CTable hover responsive>
          <CTableHead color="light">
            <CTableRow>
              <CTableHeaderCell>Roll No</CTableHeaderCell>
              <CTableHeaderCell>Name</CTableHeaderCell>
              <CTableHeaderCell>Class</CTableHeaderCell>
              <CTableHeaderCell>Section</CTableHeaderCell>
              <CTableHeaderCell>Gender</CTableHeaderCell>
              <CTableHeaderCell>Action</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {studentsData.map((student, index) => (
              <CTableRow key={index}>
                <CTableDataCell>{student.rollNo}</CTableDataCell>
                <CTableDataCell>{student.name}</CTableDataCell>
                <CTableDataCell>{student.class}</CTableDataCell>
                <CTableDataCell>{student.section}</CTableDataCell>
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

export default Students
