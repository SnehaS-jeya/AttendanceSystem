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

const Employees = () => {
  const employeesData = [
    { id: '01', name: 'Arun Kumar', department: 'HR', designation: 'HR Manager', gender: 'Male' },
    { id: '02', name: 'Priya Sharma', department: 'Finance', designation: 'Accountant', gender: 'Female' },
    { id: '03', name: 'Vikram Singh', department: 'IT', designation: 'System Admin', gender: 'Male' },
    { id: '04', name: 'Deepa R', department: 'Admin', designation: 'Office Assistant', gender: 'Female' },
    { id: '05', name: 'Rakesh T', department: 'Operations', designation: 'Coordinator', gender: 'Male' },
  ]

  return (
    <CCard className="mb-4">
      <CCardHeader>
        <CRow className="align-items-center g-3">
          <CCol md={3}>
            <CFormSelect>
              <option>All Departments</option>
              <option>HR</option>
              <option>Finance</option>
              <option>IT</option>
              <option>Admin</option>
              <option>Operations</option>
            </CFormSelect>
          </CCol>
          <CCol md={6}>
            <CInputGroup>
              <CFormInput placeholder="Search Employee" />
              <CButton type="button" color="primary">
                <CIcon icon={cilSearch} />
              </CButton>
            </CInputGroup>
          </CCol>
          <CCol md={3} className="text-end">
            <CButton color="primary" className="w-100">+ Add Employee</CButton>
          </CCol>
        </CRow>
      </CCardHeader>

      <CCardBody>
        <CTable hover responsive>
          <CTableHead color="light">
            <CTableRow>
              <CTableHeaderCell>Employee ID</CTableHeaderCell>
              <CTableHeaderCell>Name</CTableHeaderCell>
              <CTableHeaderCell>Department</CTableHeaderCell>
              <CTableHeaderCell>Designation</CTableHeaderCell>
              <CTableHeaderCell>Gender</CTableHeaderCell>
              <CTableHeaderCell>Actions</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {employeesData.map((emp, index) => (
              <CTableRow key={index}>
                <CTableDataCell>{emp.id}</CTableDataCell>
                <CTableDataCell>{emp.name}</CTableDataCell>
                <CTableDataCell>{emp.department}</CTableDataCell>
                <CTableDataCell>{emp.designation}</CTableDataCell>
                <CTableDataCell>{emp.gender}</CTableDataCell>
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
export default Employees
