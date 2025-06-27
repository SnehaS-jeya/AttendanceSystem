import React, { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import {
  CRow,
  CCol,
  CDropdown,
  CDropdownMenu,
  CDropdownItem,
  CDropdownToggle,
  CWidgetStatsA,
} from '@coreui/react'
import { getStyle } from '@coreui/utils'
import { CChartBar, CChartLine } from '@coreui/react-chartjs'
import CIcon from '@coreui/icons-react'
import { cilOptions } from '@coreui/icons'

const WidgetDropdownMenu = () => (
  <CDropdown alignment="end" style={{ position: 'absolute', top: '10px', right: '10px' }}>
    <CDropdownToggle color="transparent" caret={false}>
      <CIcon icon={cilOptions} />
    </CDropdownToggle>
    <CDropdownMenu>
      <CDropdownItem href="#">View</CDropdownItem>
      <CDropdownItem href="#">Edit</CDropdownItem>
      <CDropdownItem href="#">Delete</CDropdownItem>
    </CDropdownMenu>
  </CDropdown>
)

const chartStyle = { height: '70px' }

const WidgetsDropdown = ({ className, userType }) => {
  const widgetChartRef1 = useRef(null)
  const widgetChartRef2 = useRef(null)

  useEffect(() => {
    document.documentElement.addEventListener('ColorSchemeChange', () => {
      if (widgetChartRef1.current) {
        setTimeout(() => {
          widgetChartRef1.current.data.datasets[0].pointBackgroundColor = getStyle('--cui-primary')
          widgetChartRef1.current.update()
        })
      }

      if (widgetChartRef2.current) {
        setTimeout(() => {
          widgetChartRef2.current.data.datasets[0].pointBackgroundColor = getStyle('--cui-info')
          widgetChartRef2.current.update()
        })
      }
    })
  }, [])

  const data =
    userType === 'admin'
      ? [
          { title: 'TOTAL SCHOOLS', value: 12, color: 'primary', chart: <CChartLine ref={widgetChartRef1} style={chartStyle} /> },
          { title: 'TOTAL COLLEGES', value: 3, color: 'info', chart: <CChartLine ref={widgetChartRef2} style={chartStyle} /> },
          { title: 'TOTAL OFFICES', value: 34, color: 'danger', chart: <CChartBar style={chartStyle} /> },
          { title: 'ADMINS', value: 21, color: 'warning', chart: <CChartBar style={chartStyle} /> },
        ]
      : [
          { title: 'TEACHERS', value: 425, color: 'primary', chart: <CChartLine ref={widgetChartRef1} style={chartStyle} /> },
          { title: 'STUDENTS', value: 32, color: 'success', chart: <CChartLine ref={widgetChartRef2} style={chartStyle} /> },
          { title: 'CLASSES', value: 90, color: 'warning', chart: <CChartBar style={chartStyle} /> },
          { title: 'STAFFS', value: 9, color: 'danger', chart: <CChartBar style={chartStyle} /> },
        ]

  return (
    <CRow className={className} xs={{ gutter: 4 }}>
      {data.map((item, index) => (
        <CCol sm={6} xl={3} key={index}>
          <div style={{ position: 'relative' }}>
            <CWidgetStatsA
              color={item.color}
              value={<span className="fs-6 fw-semibold">{item.title}</span>}
              title={<span style={{ fontSize: '2rem', fontWeight: 'bold' }}>{item.value}</span>}
              chart={item.chart}
            />
            <WidgetDropdownMenu />
          </div>
        </CCol>
      ))}
    </CRow>
  )
}

WidgetsDropdown.propTypes = {
  className: PropTypes.string,
  userType: PropTypes.string, // "admin" or "school"
}

export default WidgetsDropdown
