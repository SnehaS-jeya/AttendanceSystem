import React, { useState } from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CRow,
  CCol,
  CButton,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CBadge,
  CFormInput,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CForm,
  CFormLabel,
  CFormSelect,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilPlus } from '@coreui/icons'

const Requests = () => {
  const [visible, setVisible] = useState(false)
  const [leaveData, setLeaveData] = useState([
    {
      name: 'Ananya R',
      email: 'ananya@company.com',
      type: 'Casual Leave',
      duration: '23-05-2025 to 23-05-2025',
      days: 1,
      appliedOn: '22-05-2025',
      status: 'Approved',
    },
    {
      name: 'Rohit S',
      email: 'rohit@company.com',
      type: 'Sick Leave',
      duration: '17-06-2025 to 17-06-2025',
      days: 1,
      appliedOn: '17-06-2025',
      status: 'Approved',
    },
    {
      name: 'Divya K',
      email: 'divya@company.com',
      type: 'Sick Leave',
      duration: '15-07-2025 to 15-07-2025',
      days: 1,
      appliedOn: '15-07-2025',
      status: 'Pending',
    },
  ])

  const [form, setForm] = useState({
    name: '',
    email: '',
    type: '',
    from: '',
    to: '',
  })

  const handleAddLeave = () => {
    const newLeave = {
      name: form.name,
      email: form.email,
      type: form.type,
      duration: `${form.from} to ${form.to}`,
      days: 1,
      appliedOn: new Date().toISOString().split('T')[0],
      status: 'Pending',
    }

    setLeaveData([newLeave, ...leaveData])
    setVisible(false)
    setForm({ name: '', email: '', type: '', from: '', to: '' })
  }

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Approved':
        return <CBadge color="success">{status}</CBadge>
      case 'Pending':
        return <CBadge color="warning" textColor="dark">{status}</CBadge>
      case 'Rejected':
        return <CBadge color="danger">{status}</CBadge>
      default:
        return <CBadge color="secondary">{status}</CBadge>
    }
  }

  const leaveStats = {
    total: leaveData.length,
    approved: leaveData.filter((l) => l.status === 'Approved').length,
    rejected: leaveData.filter((l) => l.status === 'Rejected').length,
    pending: leaveData.filter((l) => l.status === 'Pending').length,
  }

  return (
    <>
      {/* Leave Stats Summary */}
      <CCard className="mb-4">
        <CCardHeader>Leave Summary</CCardHeader>
        <CCardBody>
          <CRow className="text-center">
            <CCol md={3}>
              <h5>Total Leave</h5>
              <h3>{leaveStats.total}</h3>
            </CCol>
            <CCol md={3}>
              <h5>Approved</h5>
              <h3 className="text-success">{leaveStats.approved}</h3>
            </CCol>
            <CCol md={3}>
              <h5>Rejected</h5>
              <h3 className="text-danger">{leaveStats.rejected}</h3>
            </CCol>
            <CCol md={3}>
              <h5>Pending</h5>
              <h3 className="text-warning">{leaveStats.pending}</h3>
            </CCol>
          </CRow>
        </CCardBody>
      </CCard>

      {/* List Table */}
      <CCard>
        <CCardHeader className="d-flex justify-content-between align-items-center">
          <strong>List All Leaves</strong>
          <CButton size="sm" color="primary" onClick={() => setVisible(true)}>
            <CIcon icon={cilPlus} className="me-1" />
            Add New
          </CButton>
        </CCardHeader>
        <CCardBody>
          <CRow className="mb-3">
            <CCol md={4}>
              <CFormInput placeholder="Search..." />
            </CCol>
          </CRow>
          <CTable hover responsive>
            <CTableHead color="light">
              <CTableRow>
                <CTableHeaderCell>Employee Name</CTableHeaderCell>
                <CTableHeaderCell>Leave Type</CTableHeaderCell>
                <CTableHeaderCell>Leave Duration</CTableHeaderCell>
                <CTableHeaderCell>Days</CTableHeaderCell>
                <CTableHeaderCell>Applied On</CTableHeaderCell>
                <CTableHeaderCell>Status</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {leaveData.map((leave, index) => (
                <CTableRow key={index}>
                  <CTableDataCell>
                    <div>{leave.name}</div>
                    <small className="text-medium-emphasis">{leave.email}</small>
                  </CTableDataCell>
                  <CTableDataCell>{leave.type}</CTableDataCell>
                  <CTableDataCell>{leave.duration}</CTableDataCell>
                  <CTableDataCell>{leave.days}</CTableDataCell>
                  <CTableDataCell>{leave.appliedOn}</CTableDataCell>
                  <CTableDataCell>{getStatusBadge(leave.status)}</CTableDataCell>
                </CTableRow>
              ))}
            </CTableBody>
          </CTable>
        </CCardBody>
      </CCard>

      {/* Add Modal */}
      <CModal visible={visible} onClose={() => setVisible(false)}>
        <CModalHeader>
          <CModalTitle>Add Leave Request</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CForm>
            <CFormLabel>Employee Name</CFormLabel>
            <CFormInput value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            <CFormLabel className="mt-2">Email</CFormLabel>
            <CFormInput type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
            <CFormLabel className="mt-2">Leave Type</CFormLabel>
            <CFormSelect value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}>
              <option>Select Type</option>
              <option value="Casual Leave">Casual Leave</option>
              <option value="Sick Leave">Sick Leave</option>
              <option value="Emergency Leave">Emergency Leave</option>
            </CFormSelect>
            <CRow className="mt-2">
              <CCol>
                <CFormLabel>From</CFormLabel>
                <CFormInput type="date" value={form.from} onChange={(e) => setForm({ ...form, from: e.target.value })} />
              </CCol>
              <CCol>
                <CFormLabel>To</CFormLabel>
                <CFormInput type="date" value={form.to} onChange={(e) => setForm({ ...form, to: e.target.value })} />
              </CCol>
            </CRow>
          </CForm>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setVisible(false)}>
            Cancel
          </CButton>
          <CButton color="primary" onClick={handleAddLeave}>
            Submit
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  )
}

export default Requests
