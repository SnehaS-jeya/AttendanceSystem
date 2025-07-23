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

const initialColleges = [
  {
    id: '01',
    name: 'Government Engineering College',
    district: 'Chennai',
    type: 'Engineering',
  },
  {
    id: '02',
    name: 'St. Marys Arts College',
    district: 'Coimbatore',
    type: 'Arts',
  },
  {
    id: '03',
    name: 'National Polytechnic College',
    district: 'Madurai',
    type: 'Polytechnic',
  },
]

const Colleges= () => {
  const [district, setDistrict] = useState('')
  const [search, setSearch] = useState('')
  const [colleges, setColleges] = useState(initialColleges)
  const [newCollege, setNewCollege] = useState({
    id: '',
    name: '',
    district: '',
    type: '',
  })

  const handleAddCollege = () => {
    if (
      newCollege.id &&
      newCollege.name &&
      newCollege.district &&
      newCollege.type
    ) {
      setColleges([...colleges, newCollege])
      setNewCollege({ id: '', name: '', district: '', type: '' })
    } else {
      alert('Please fill all fields to add a college')
    }
  }

  const handleDelete = (id) => {
    setColleges(colleges.filter((c) => c.id !== id))
  }

  const filteredColleges = colleges.filter(
    (college) =>
      (!district || college.district === district) &&
      (!search || college.name.toLowerCase().includes(search.toLowerCase()))
  )

  return (
    <CCard className="mb-4">
      <CCardHeader>
        <strong>College Dashboard</strong>
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
              placeholder="Enter school or college name"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </CCol>
        </CRow>

        <h5 className="mt-4 mb-3">Add New College</h5>
        <CRow className="mb-3">
          <CCol md={3}>
            <CFormInput
              placeholder="College ID"
              value={newCollege.id}
              onChange={(e) =>
                setNewCollege({ ...newCollege, id: e.target.value })
              }
            />
          </CCol>
          <CCol md={3}>
            <CFormInput
              placeholder="College Name"
              value={newCollege.name}
              onChange={(e) =>
                setNewCollege({ ...newCollege, name: e.target.value })
              }
            />
          </CCol>
          <CCol md={3}>
            <CFormInput
              placeholder="District"
              value={newCollege.district}
              onChange={(e) =>
                setNewCollege({ ...newCollege, district: e.target.value })
              }
            />
          </CCol>
          <CCol md={2}>
            <CFormSelect
              value={newCollege.type}
              onChange={(e) =>
                setNewCollege({ ...newCollege, type: e.target.value })
              }
            >
              <option value="">Select Type</option>
              <option>Engineering</option>
              <option>Arts</option>
              <option>Polytechnic</option>
            </CFormSelect>
          </CCol>
          <CCol md={1}>
            <CButton color="success" onClick={handleAddCollege}>
              Add
            </CButton>
          </CCol>
        </CRow>

        <CTable bordered responsive>
          <CTableHead color="primary">
            <CTableRow>
              <CTableHeaderCell>College ID</CTableHeaderCell>
              <CTableHeaderCell>College Name</CTableHeaderCell>
              <CTableHeaderCell>District</CTableHeaderCell>
              <CTableHeaderCell>Type</CTableHeaderCell>
              <CTableHeaderCell>Action</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {filteredColleges.map((college, index) => (
              <CTableRow key={index}>
                <CTableDataCell>{college.id}</CTableDataCell>
                <CTableDataCell>{college.name}</CTableDataCell>
                <CTableDataCell>{college.district}</CTableDataCell>
                <CTableDataCell>{college.type}</CTableDataCell>
                <CTableDataCell>
                  <CIcon icon={cilPencil} className="me-2 text-primary" />
                  <CIcon
                    icon={cilTrash}
                    className="text-danger"
                    style={{ cursor: 'pointer' }}
                    onClick={() => handleDelete(college.id)}
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

export default Colleges
