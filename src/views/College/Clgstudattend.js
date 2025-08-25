import React, { useState } from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CRow,
  CCol,
  CFormInput,
  CFormSelect,
  CButton,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import { cilSearch, cilCloudDownload } from '@coreui/icons'
import CIcon from '@coreui/icons-react'

const CollegeStudent = () => {
  const [search, setSearch] = useState('')
  const [fromDate, setFromDate] = useState('')
  const [toDate, setToDate] = useState('')
  const [reportType, setReportType] = useState('Monthly')

  const attendanceData = [
    {
      name: 'Vignesh S',
      email: 'vignesh@notasco.com',
      date: '2025-07-25',
      status: 'Present',
      checkIn: '10:11 AM',
      checkOut: '00:00',
      late: '0h 11m',
      earlyLeaving: '00:00',
      totalWork: '00:00',
    },
    {
      name: 'Arun R',
      email: 'arun@notasco.com',
      date: '2025-07-25',
      status: 'Absent',
      checkIn: '--',
      checkOut: '--',
      late: '--',
      earlyLeaving: '--',
      totalWork: '--',
    },
  ]

  const filteredData = attendanceData.filter((item) => {
    return item.name.toLowerCase().includes(search.toLowerCase())
  })

  const handleDownload = () => {
    alert('Download triggered (implement export as CSV/pdf here)')
  }

  return (
    <CCard className="mb-4">
      <CCardHeader>
        <CRow className="g-3 align-items-end">
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
              <option value="Monthly">Monthly</option>
              <option value="Weekly">Weekly</option>
              <option value="Half-Yearly">Half-Yearly</option>
            </CFormSelect>
          </CCol>
          <CCol md={3}>
            <label>Search Employee</label>
            <CFormInput
              placeholder="Enter name or email"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </CCol>
          <CCol md={3} className="text-end">
            <CButton color="primary" className="mt-3 w-100" onClick={handleDownload}>
              <CIcon icon={cilCloudDownload} className="me-2" />
              Download
            </CButton>
          </CCol>
        </CRow>
      </CCardHeader>

      <CCardBody>
        <CTable striped responsive>
          <CTableHead color="light">
            <CTableRow>
              <CTableHeaderCell>Employee Name</CTableHeaderCell>
              <CTableHeaderCell>Email</CTableHeaderCell>
              <CTableHeaderCell>Date</CTableHeaderCell>
              <CTableHeaderCell>Status</CTableHeaderCell>
              <CTableHeaderCell>Check In</CTableHeaderCell>
              <CTableHeaderCell>Check Out</CTableHeaderCell>
              <CTableHeaderCell>Late</CTableHeaderCell>
              <CTableHeaderCell>Early Leaving</CTableHeaderCell>
              <CTableHeaderCell>Total Work</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {filteredData.length > 0 ? (
              filteredData.map((item, index) => (
                <CTableRow key={index}>
                  <CTableDataCell>{item.name}</CTableDataCell>
                  <CTableDataCell>{item.email}</CTableDataCell>
                  <CTableDataCell>{item.date}</CTableDataCell>
                  <CTableDataCell>
                    <span
                      className={`badge ${
                        item.status === 'Present'
                          ? 'bg-success'
                          : item.status === 'Absent'
                          ? 'bg-danger'
                          : 'bg-warning'
                      }`}
                    >
                      {item.status}
                    </span>
                  </CTableDataCell>
                  <CTableDataCell>{item.checkIn}</CTableDataCell>
                  <CTableDataCell>{item.checkOut}</CTableDataCell>
                  <CTableDataCell>{item.late}</CTableDataCell>
                  <CTableDataCell>{item.earlyLeaving}</CTableDataCell>
                  <CTableDataCell>{item.totalWork}</CTableDataCell>
                </CTableRow>
              ))
            ) : (
              <CTableRow>
                <CTableDataCell colSpan="9" className="text-center">
                  No records found
                </CTableDataCell>
              </CTableRow>
            )}
          </CTableBody>
        </CTable>
      </CCardBody>
    </CCard>
  )
}

export default CollegeStudent
