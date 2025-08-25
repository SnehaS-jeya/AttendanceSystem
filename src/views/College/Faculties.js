import React, { useState } from 'react'
import {
  CCard,
  CCardHeader,
  CCardBody,
  CRow,
  CCol,
  CFormInput,
  CFormSelect,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CButton,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilSearch, cilCloudDownload } from '@coreui/icons'

const Faculty = () => {
  const [fromDate, setFromDate] = useState('')
  const [toDate, setToDate] = useState('')
  const [reportType, setReportType] = useState('Monthly')
  const [searchTerm, setSearchTerm] = useState('')

  const dummyData = [
    { id: 1, name: 'Dr. Suresh', subject: 'Maths', attendance: '85%' },
    { id: 2, name: 'Prof. Anitha', subject: 'Physics', attendance: '90%' },
    { id: 3, name: 'Dr. Rahul', subject: 'Chemistry', attendance: '82%' },
    
  ]

  const filteredData = dummyData.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleDownload = () => {
    alert('Download feature will be implemented here!')
  }

  return (
    <CCard>
      <CCardHeader>
        <CRow className="g-3 align-items-center">
          <CCol md={2}>
            <label>From Date</label>
            <CFormInput type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} />
          </CCol>
          <CCol md={2}>
            <label>To Date</label>
            <CFormInput type="date" value={toDate} onChange={(e) => setToDate(e.target.value)} />
          </CCol>
          <CCol md={2}>
            <label>Report Type</label>
            <CFormSelect value={reportType} onChange={(e) => setReportType(e.target.value)}>
              <option>Monthly</option>
              <option>Weekly</option>
              <option>Half-Yearly</option>
            </CFormSelect>
          </CCol>
          <CCol md={4}>
            <label>Search</label>
            <CFormInput
              type="text"
              placeholder="Search Faculty Name"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </CCol>
          <CCol md={2} className="text-end">
            <CButton color="primary" className="mt-4 w-100" onClick={handleDownload}>
              <CIcon icon={cilCloudDownload} className="me-2" />
              Download
            </CButton>
          </CCol>
        </CRow>
      </CCardHeader>

      <CCardBody>
        <CTable striped responsive>
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell>#</CTableHeaderCell>
              <CTableHeaderCell>Name</CTableHeaderCell>
              <CTableHeaderCell>Subject</CTableHeaderCell>
              <CTableHeaderCell>Attendance</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {filteredData.map((faculty) => (
              <CTableRow key={faculty.id}>
                <CTableDataCell>{faculty.id}</CTableDataCell>
                <CTableDataCell>{faculty.name}</CTableDataCell>
                <CTableDataCell>{faculty.subject}</CTableDataCell>
                <CTableDataCell>{faculty.attendance}</CTableDataCell>
              </CTableRow>
            ))}
          </CTableBody>
        </CTable>
      </CCardBody>
    </CCard>
  )
}

export default Faculty
