// src/views/dashboard/AdminDashboard.jsx

import React from 'react'
import {
  CCard,
  CCardBody,
  CCol,
  CRow,
  CButton,
  CButtonGroup
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilCloudDownload } from '@coreui/icons'

import WidgetsDropdown from '../widgets/WidgetsDropdown'
import WidgetsBrand from '../widgets/WidgetsBrand'
import MainChart from '../dashboard/MainChart'

const AdminDashboard = () => {
  return (
    <>
      <WidgetsDropdown className="mb-4" userType="admin" />

      <CCard className="mb-4">
        <CCardBody>
          <CRow>
            <CCol sm={5}>
              <h4 className="card-title mb-0">Admin Overview</h4>
              <div className="small text-body-secondary">June 2024</div>
            </CCol>
            <CCol sm={7} className="d-none d-md-block">
              <CButton color="primary" className="float-end">
                <CIcon icon={cilCloudDownload} />
              </CButton>
              <CButtonGroup className="float-end me-3">
                {['Today', 'This Month', 'This Year'].map((value) => (
                  <CButton color="outline-secondary" key={value}>
                    {value}
                  </CButton>
                ))}
              </CButtonGroup>
            </CCol>
          </CRow>
          <MainChart userType="admin" />
        </CCardBody>
      </CCard>

      <WidgetsBrand className="mb-4" withCharts userType="admin" />
    </>
  )
}

export default AdminDashboard
