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
import { cilSearch, cilPencil, cilTrash, cilDescription, cilPlus } from '@coreui/icons'

const Classes = () => {
  const classData = [
    { id: '01', className: 'VI A', classTeacher: 'Mrs. Raji', noOfStudents: 32 },
    { id: '02', className: 'VI B', classTeacher: 'Mr. Senthil', noOfStudents: 28 },
    { id: '03', className: 'VII A', classTeacher: 'Ms. Sangeetha', noOfStudents: 30 },
    { id: '04', className: 'VII B', classTeacher: 'Mr. Manikandan', noOfStudents: 46 },
    { id: '05', className: 'VIII A', classTeacher: 'Mrs. Priya', noOfStudents: 33 },
    { id: '06', className: 'VIII B', classTeacher: 'Mr. Karthik', noOfStudents: 47 },
    { id: '07', className: 'IX A', classTeacher: 'Ms. Latha', noOfStudents: 35 },
    { id: '08', className: 'IX B', classTeacher: 'Mr. Balaji', noOfStudents: 59 },
    { id: '09', className: 'X A', classTeacher: 'Mrs. Rekha', noOfStudents: 31 },
    { id: '10', className: 'X B', classTeacher: 'Mr. Dinesh', noOfStudents: 60 },
  ]

  return (
    <CCard className="mb-4">
      <CCardHeader>
        <CRow className="align-items-center g-3">
          <CCol md={8}>
            <h5 className="mb-0">Classes</h5>
          </CCol>
          <CCol md={2}>
            <CButton color="primary" className="w-100">
              + Create New
            </CButton>
          </CCol>
          <CCol md={2}>
            <CInputGroup>
              <CFormInput placeholder="Search Classes.." />
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
              <CTableHeaderCell>Class ID</CTableHeaderCell>
              <CTableHeaderCell>Class</CTableHeaderCell>
              <CTableHeaderCell>Class Teacher</CTableHeaderCell>
              <CTableHeaderCell>No. of Students</CTableHeaderCell>
              <CTableHeaderCell>Actions</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {classData.map((item, index) => (
              <CTableRow key={index}>
                <CTableDataCell>{item.id}</CTableDataCell>
                <CTableDataCell>{item.className}</CTableDataCell>
                <CTableDataCell>{item.classTeacher}</CTableDataCell>
                <CTableDataCell>{item.noOfStudents}</CTableDataCell>
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

export default Classes
