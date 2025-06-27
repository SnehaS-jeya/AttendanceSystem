import React, { useState } from 'react'
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom'
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
const Login = () => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('')
  const [roleId, setRoleId] = useState('')
  const navigate = useNavigate()

  const handleRoleChange = (e) => {
    setRole(e.target.value)
    setRoleId('')
  }

  const handleLogin = (e) => {
    e.preventDefault()

    if (username && password && role) {
      Cookies.set('userRole', role, { expires: 1 }) 

      switch (role) {
        case 'Admin':
          navigate('/admin-dashboard')
          break
        case 'School':
          navigate('/dashboard')
          break
        case 'College':
          navigate('/college-dashboard')
          break
        case 'Office':
          navigate('/office-dashboard')
          break
        default:
          navigate('/login')
      }
    } else {
      alert('Please fill all fields')
    }
  }   

  return (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={9} lg={7} xl={6}>
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <CForm onSubmit={handleLogin}>
                  <h1>Login</h1>
                  <p className="text-body-secondary">Signin to your account</p>

                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilUser} />
                    </CInputGroupText>
                    <CFormInput
                      placeholder="Username"
                      autoComplete="username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </CInputGroup>

                  <CInputGroup className="mb-3">
                    <CInputGroupText>@</CInputGroupText>
                    <CFormInput
                      placeholder="Email"
                      autoComplete="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </CInputGroup>

                  <CInputGroup className="mb-3">
                    <CInputGroupText>Role</CInputGroupText>
                    <CFormSelect value={role} onChange={handleRoleChange}>
                      <option value="">Select Role</option>
                      <option value="Admin">Admin</option>
                      <option value="School">School</option>
                      <option value="College">College</option>
                      <option value="Office">Office</option>
                    </CFormSelect>
                  </CInputGroup>

                  {(role === 'School' || role === 'College' || role === 'Office') && (
                    <CInputGroup className="mb-3">
                      <CInputGroupText>{role} ID</CInputGroupText>
                      <CFormInput
                        placeholder={`Enter ${role} ID`}
                        value={roleId}
                        onChange={(e) => setRoleId(e.target.value)}
                      />
                    </CInputGroup>
                  )}

                  <CInputGroup className="mb-4">
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

                  <div className="d-grid">
                    <CButton color="primary" type="submit">
                      Login
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

export default Login
