import React, { useState } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CFormSelect,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'

const Register = () => {
  const [role, setRole] = useState('')
  const [userType, setUserType] = useState('')
  const [institutionName, setInstitutionName] = useState('')
  const [location, setLocation] = useState('')

  const userTypes = {
    School: ['Principal', 'Teacher', 'Student'],
    College: ['Dean', 'Lecturer', 'Student'],
    Office: ['Manager','HR','Staff'],
  }

  const showInstitutionFields = role === 'School' || role === 'College' || role === 'Office'

  return (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={9} lg={7} xl={6}>
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <CForm>
                  <h1>Register</h1>
                  <p className="text-body-secondary">Create your account</p>

                  {/* Username */}
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilUser} />
                    </CInputGroupText>
                    <CFormInput placeholder="Username" autoComplete="username" />
                  </CInputGroup>

                  {/* Email */}
                  <CInputGroup className="mb-3">
                    <CInputGroupText>@</CInputGroupText>
                    <CFormInput placeholder="Email" autoComplete="email" />
                  </CInputGroup>

                  {/* Password */}
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      type="password"
                      placeholder="Password"
                      autoComplete="new-password"
                    />
                  </CInputGroup>

                  {/* Role Selection */}
                  <CInputGroup className="mb-3">
                    <CInputGroupText>Role</CInputGroupText>
                    <CFormSelect value={role} onChange={(e) => setRole(e.target.value)}>
                      <option value="">Select Role</option>
                      <option value="Admin">Admin</option>
                      <option value="School">School</option>
                      <option value="College">College</option>
                      <option value="Office">Office</option>
                    </CFormSelect>
                  </CInputGroup>

                  {/* Institution Name + Location if applicable */}
                  {showInstitutionFields && (
                    <>
                      <CInputGroup className="mb-3">
                        <CInputGroupText>{role} Name</CInputGroupText>
                        <CFormInput
                          placeholder={`Enter ${role} Name`}
                          value={institutionName}
                          onChange={(e) => setInstitutionName(e.target.value)}
                        />
                      </CInputGroup>

                      <CInputGroup className="mb-3">
                        <CInputGroupText>Location</CInputGroupText>
                        <CFormInput
                          placeholder="Enter Location"
                          value={location}
                          onChange={(e) => setLocation(e.target.value)}
                        />
                      </CInputGroup>

                      {/* User Type dropdown */}
                      <CInputGroup className="mb-3">
                        <CInputGroupText>User Type</CInputGroupText>
                        <CFormSelect
                          value={userType}
                          onChange={(e) => setUserType(e.target.value)}
                        >
                          <option value="">Select User Type</option>
                          {userTypes[role]?.map((type) => (
                            <option key={type} value={type}>
                              {type}
                            </option>
                          ))}
                        </CFormSelect>
                      </CInputGroup>
                    </>
                  )}

                  {/* Submit Button */}
                  <div className="d-grid">
                    <CButton color="primary">Create Account</CButton>
                  </div>
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Register
