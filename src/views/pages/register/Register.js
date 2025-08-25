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
import { useNavigate } from 'react-router-dom'

const Register = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [role, setRole] = useState('')
  const [userType, setUserType] = useState('')
  const [institutionName, setInstitutionName] = useState('')
  const [location, setLocation] = useState('')

  const navigate = useNavigate()

  const userTypes = {
    School: ['Principal', 'Teacher', 'Student'],
    College: ['Dean', 'Lecturer', 'Student'],
    Office: ['Manager', 'HR', 'Staff'],
  }

  const showInstitutionFields = role === 'School' || role === 'College' || role === 'Office'

  const handleRegister = async (e) => {
    e.preventDefault()
    if (!email || !password || !name || !role) {
      alert('Please fill all required fields')
      return
    }
    
    const bodyData = {
      email,
      password,
      name,
      role,
      location,
      user_type: userType,
    }

    if (role === 'College') {
      bodyData.college_name = institutionName
    } else if (role === 'School') {
      bodyData.school_name = institutionName
    } else if (role === 'Office') {
      bodyData.office_name = institutionName
    }

    try {
      const response = await fetch('http://localhost:8000/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(bodyData),
      })

      const data = await response.json()

      if (response.ok) {
        alert('Registration successful! Please login.')
        navigate('/login')
      } else {
        alert(data.detail || 'Registration failed')
      }
    } catch (error) {
      console.error('Register error:', error)
      alert('Something went wrong during registration')
    }
  }

  return (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={9} lg={7} xl={6}>
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <CForm onSubmit={handleRegister}>
                  <h1>Register</h1>
                  <p className="text-body-secondary">Create your account</p>

                  {/* Name */}
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilUser} />
                    </CInputGroupText>
                    <CFormInput
                      placeholder="Username"
                      autoComplete="username"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </CInputGroup>

                  {/* Email */}
                  <CInputGroup className="mb-3">
                    <CInputGroupText>@</CInputGroupText>
                    <CFormInput
                      placeholder="Email"
                      autoComplete="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
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
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
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

                  {/* Conditional Fields */}
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
                    <CButton color="primary" type="submit">
                      Create Account
                    </CButton>
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
