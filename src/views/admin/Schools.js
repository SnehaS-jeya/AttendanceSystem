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

const initialSchools = [
  {
    id: 'S01',
    name: 'Government Higher Secondary School',
    district: 'Chennai',
    category: 'Government',
  },
  {
    id: 'S02',
    name: 'St. Joseph Matric School',
    district: 'Coimbatore',
    category: 'Private',
  },
  {
    id: 'S03',
    name: 'Sunrise Public School',
    district: 'Madurai',
    category: 'Public',
  },
]

const SchoolDashboard = () => {
  const [district, setDistrict] = useState('')
  const [search, setSearch] = useState('')
  const [schools, setSchools] = useState(initialSchools)
  const [newSchool, setNewSchool] = useState({
    id: '',
    name: '',
    district: '',
    category: '',
  })

  const handleAddSchool = () => {
    if (
      newSchool.id &&
      newSchool.name &&
      newSchool.district &&
      newSchool.category
    ) {
      setSchools([...schools, newSchool])
      setNewSchool({ id: '', name: '', district: '', category: '' })
    } else {
      alert('Please fill all fields to add a school')
    }
  }

  const handleDelete = (id) => {
    setSchools(schools.filter((s) => s.id !== id))
  }

  const filteredSchools = schools.filter(
    (school) =>
      (!district || school.district === district) &&
      (!search || school.name.toLowerCase().includes(search.toLowerCase()))
  )

  return (
    <CCard className="mb-4">
      <CCardHeader>
        <strong>School Dashboard</strong>
      </CCardHeader>
      <CCardBody>
        <CRow className="mb-3">
          <CCol md={4}>
            <CFormSelect
              label="Select District"
              value={district}
              onChange={(e) => setDistrict(e.target.value)}
            >
              <option value="">All Districts</option>
              <option>Chennai</option>
              <option>Coimbatore</option>
              <option>Madurai</option>
              <option>Salem</option>
            </CFormSelect>
          </CCol>
          <CCol md={4}>
            <CFormInput
              label="Search School"
              placeholder="Enter school name"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </CCol>
        </CRow>

        <h5 className="mt-4 mb-3">Add New School</h5>
        <CRow className="mb-3">
          <CCol md={3}>
            <CFormInput
              placeholder="School ID"
              value={newSchool.id}
              onChange={(e) =>
                setNewSchool({ ...newSchool, id: e.target.value })
              }
            />
          </CCol>
          <CCol md={3}>
            <CFormInput
              placeholder="School Name"
              value={newSchool.name}
              onChange={(e) =>
                setNewSchool({ ...newSchool, name: e.target.value })
              }
            />
          </CCol>
          <CCol md={3}>
            <CFormInput
              placeholder="District"
              value={newSchool.district}
              onChange={(e) =>
                setNewSchool({ ...newSchool, district: e.target.value })
              }
            />
          </CCol>
          <CCol md={2}>
            <CFormSelect
              value={newSchool.category}
              onChange={(e) =>
                setNewSchool({ ...newSchool, category: e.target.value })
              }
            >
              <option value="">Select Category</option>
              <option>Government</option>
              <option>Private</option>
              <option>Public</option>
            </CFormSelect>
          </CCol>
          <CCol md={1}>
            <CButton color="success" onClick={handleAddSchool}>
              Add
            </CButton>
          </CCol>
        </CRow>

        <CTable bordered responsive>
          <CTableHead color="primary">
            <CTableRow>
              <CTableHeaderCell>School ID</CTableHeaderCell>
              <CTableHeaderCell>School Name</CTableHeaderCell>
              <CTableHeaderCell>District</CTableHeaderCell>
              <CTableHeaderCell>Category</CTableHeaderCell>
              <CTableHeaderCell>Action</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {filteredSchools.map((school, index) => (
              <CTableRow key={index}>
                <CTableDataCell>{school.id}</CTableDataCell>
                <CTableDataCell>{school.name}</CTableDataCell>
                <CTableDataCell>{school.district}</CTableDataCell>
                <CTableDataCell>{school.category}</CTableDataCell>
                <CTableDataCell>
                  <CIcon icon={cilPencil} className="me-2 text-primary" />
                  <CIcon
                    icon={cilTrash}
                    className="text-danger"
                    style={{ cursor: 'pointer' }}
                    onClick={() => handleDelete(school.id)}
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

export default SchoolDashboard
