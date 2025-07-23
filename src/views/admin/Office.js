import React, { useState } from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CFormSelect,
  CFormInput,
  CButton,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CRow,
  CCol,
} from '@coreui/react'
import { cilPencil, cilTrash } from '@coreui/icons'
import CIcon from '@coreui/icons-react'

const initialOffices = [
  {
    id: 'O01',
    name: 'TCS Corporate Office',
    city: 'Chennai',
    department: 'IT Services',
  },
  {
    id: 'O02',
    name: 'Infosys Delivery Center',
    city: 'Bangalore',
    department: 'Consulting',
  },
  {
    id: 'O03',
    name: 'Wipro Tech Park',
    city: 'Hyderabad',
    department: 'Infrastructure',
  },
]

const Office = () => {
  const [city, setCity] = useState('')
  const [search, setSearch] = useState('')
  const [offices, setOffices] = useState(initialOffices)
  const [newOffice, setNewOffice] = useState({
    id: '',
    name: '',
    city: '',
    department: '',
  })

  const handleAddOffice = () => {
    if (
      newOffice.id &&
      newOffice.name &&
      newOffice.city &&
      newOffice.department
    ) {
      setOffices([...offices, newOffice])
      setNewOffice({ id: '', name: '', city: '', department: '' })
    } else {
      alert('Please fill all fields to add an office')
    }
  }

  const handleDelete = (id) => {
    setOffices(offices.filter((o) => o.id !== id))
  }

  const filteredOffices = offices.filter(
    (office) =>
      (!city || office.city === city) &&
      (!search || office.name.toLowerCase().includes(search.toLowerCase()))
  )

  return (
    <CCard className="mb-4">
      <CCardHeader>
        <strong>Office Dashboard</strong>
      </CCardHeader>
      <CCardBody>
        <CRow className="mb-3">
          <CCol md={4}>
            <CFormSelect
              label="Select City"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            >
              <option value="">All Cities</option>
              <option>Chennai</option>
              <option>Bangalore</option>
              <option>Hyderabad</option>
              <option>Pune</option>
            </CFormSelect>
          </CCol>
          <CCol md={4}>
            <CFormInput
              label="Search Office"
              placeholder="Enter office name"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </CCol>
        </CRow>

        <h5 className="mt-4 mb-3">Add New Office</h5>
        <CRow className="mb-3">
          <CCol md={3}>
            <CFormInput
              placeholder="Office ID"
              value={newOffice.id}
              onChange={(e) =>
                setNewOffice({ ...newOffice, id: e.target.value })
              }
            />
          </CCol>
          <CCol md={3}>
            <CFormInput
              placeholder="Office Name"
              value={newOffice.name}
              onChange={(e) =>
                setNewOffice({ ...newOffice, name: e.target.value })
              }
            />
          </CCol>
          <CCol md={3}>
            <CFormInput
              placeholder="City"
              value={newOffice.city}
              onChange={(e) =>
                setNewOffice({ ...newOffice, city: e.target.value })
              }
            />
          </CCol>
          <CCol md={2}>
            <CFormSelect
              value={newOffice.department}
              onChange={(e) =>
                setNewOffice({ ...newOffice, department: e.target.value })
              }
            >
              <option value="">Select Department</option>
              <option>IT Services</option>
              <option>Consulting</option>
              <option>Infrastructure</option>
              <option>HR</option>
            </CFormSelect>
          </CCol>
          <CCol md={1}>
            <CButton color="success" onClick={handleAddOffice}>
              Add
            </CButton>
          </CCol>
        </CRow>

        <CTable bordered responsive>
          <CTableHead color="primary">
            <CTableRow>
              <CTableHeaderCell>Office ID</CTableHeaderCell>
              <CTableHeaderCell>Office Name</CTableHeaderCell>
              <CTableHeaderCell>City</CTableHeaderCell>
              <CTableHeaderCell>Department</CTableHeaderCell>
              <CTableHeaderCell>Action</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {filteredOffices.map((office, index) => (
              <CTableRow key={index}>
                <CTableDataCell>{office.id}</CTableDataCell>
                <CTableDataCell>{office.name}</CTableDataCell>
                <CTableDataCell>{office.city}</CTableDataCell>
                <CTableDataCell>{office.department}</CTableDataCell>
                <CTableDataCell>
                  <CIcon icon={cilPencil} className="me-2 text-primary" />
                  <CIcon
                    icon={cilTrash}
                    className="text-danger"
                    style={{ cursor: 'pointer' }}
                    onClick={() => handleDelete(office.id)}
                  />
                </CTableDataCell>
              </CTableRow>
            ))}
          </CTableBody>
        </CTable>
      </CCardBody>
    </CCard>
  )
}

export default Office
