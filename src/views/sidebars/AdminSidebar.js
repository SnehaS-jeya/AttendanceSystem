import React from 'react'
import { CNavItem } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import {
  cilSpeedometer,
  cilInstitution,
  cilGroup,
  cilSettings,
} from '@coreui/icons'

const AdminSidebar = () => {
  const navItems = [
    {
      component: CNavItem,
      name: 'Admin Dashboard',
      to: '/admin/dashboard',
      icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
    },
    {
      component: CNavItem,
      name: 'Schools',
      to: '/admin/schools',
      icon: <CIcon icon={cilInstitution} customClassName="nav-icon" />,
    },
    {
      component: CNavItem,
      name: 'Manage Users',
      to: '/admin/users',
      icon: <CIcon icon={cilGroup} customClassName="nav-icon" />,
    },
    {
      component: CNavItem,
      name: 'Settings',
      to: '/admin/settings',
      icon: <CIcon icon={cilSettings} customClassName="nav-icon" />,
    },
  ]

  return <>{navItems.map((item, index) => React.createElement(item.component, { key: index, ...item }))}</>
}

export default AdminSidebar
