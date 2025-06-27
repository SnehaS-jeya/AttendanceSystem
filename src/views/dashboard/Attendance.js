import React, { useState } from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CFormSelect,
  CFormInput,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CFormCheck,
  CButton,
  CCol,
  CRow,
} from '@coreui/react'

const initialStudents = [
  { id: 1, roll: '01', name: 'Aarav ' },
  { id: 2, roll: '02', name: 'Ananya' },
  { id: 3, roll: '03', name: 'Rohan ' },
  { id: 4, roll: '04', name: 'Priya ' },
  { id: 5, roll: '05', name: 'Ishaan ' },
  { id: 6, roll: '06', name: 'Kavya ' },
  { id: 7, roll: '07', name: 'Neha ' },
  { id: 8, roll: '08', name: 'Aditya' },
  { id: 9, roll: '09', name: 'Divya' },
  { id: 10, roll: '10', name: 'Siddharth' },
]

const StudentAttendance = () => {
  const [classSelected, setClassSelected] = useState('VI A')
  const [date, setDate] = useState('')
  const [attendanceData, setAttendanceData] = useState(
    initialStudents.map((student) => ({
      ...student,
      present: true,
      checkIn: '',
      checkOut: '',
      reason: '',
    })),
  )

  const handleAttendanceChange = (index, key, value) => {
    const newData = [...attendanceData]
    newData[index][key] = value
    setAttendanceData(newData)
  }

  const handleSubmit = () => {
    console.log('Attendance Submitted:', attendanceData)
    alert('Attendance Submitted Successfully!')
  }

  return (
    <CCard className="mb-4">
      <CCardHeader>
        <strong>Student Attendance</strong>
      </CCardHeader>
      <CCardBody>
        <CRow className="mb-3">
          <CCol md={4}>
            <CFormSelect
              label="Select Class"
              value={classSelected}
              onChange={(e) => setClassSelected(e.target.value)}
            >
              <option>VI A</option>
              <option>VI B</option>
              <option>VII A</option>
              <option>IX C</option>
              <option>X B</option>
              <option>XI C</option>
              <option>XII D</option>

            </CFormSelect>
          </CCol>
          <CCol md={4}>
            <CFormInput
              type="date"
              label="Select Date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </CCol>
        </CRow>

        <CTable bordered responsive>
          <CTableHead color="primary">
            <CTableRow>
              <CTableHeaderCell scope="col">Roll No</CTableHeaderCell>
              <CTableHeaderCell scope="col">Student Name</CTableHeaderCell>
              <CTableHeaderCell scope="col">Present</CTableHeaderCell>
              <CTableHeaderCell scope="col">Check-In</CTableHeaderCell>
              <CTableHeaderCell scope="col">Check-Out</CTableHeaderCell>
              <CTableHeaderCell scope="col">Reason (If Absent)</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {attendanceData.map((student, index) => (
              <CTableRow key={student.id}>
                <CTableDataCell>{student.roll}</CTableDataCell>
                <CTableDataCell>{student.name}</CTableDataCell>
                <CTableDataCell>
                  <CFormCheck
                    checked={student.present}
                    onChange={(e) =>
                      handleAttendanceChange(index, 'present', e.target.checked)
                    }
                  />
                </CTableDataCell>
                <CTableDataCell>
                  {student.present && (
                    <CFormInput
                      type="text"
                      placeholder="00:00 AM"
                      value={student.checkIn}
                      onChange={(e) =>
                        handleAttendanceChange(index, 'checkIn', e.target.value)
                      }
                    />
                  )}
                </CTableDataCell>
                <CTableDataCell>
                  {student.present && (
                    <CFormInput
                      type="type"
                      placeholder="00:00 PM"
                      value={student.checkOut}
                      onChange={(e) =>
                        handleAttendanceChange(index, 'checkOut', e.target.value)
                      }
                    />
                  )}
                </CTableDataCell>
                <CTableDataCell>
                  {!student.present && (
                    <CFormInput
                      placeholder="Reason"
                      value={student.reason}
                      onChange={(e) =>
                        handleAttendanceChange(index, 'reason', e.target.value)
                      }
                    />
                  )}
                </CTableDataCell>
              </CTableRow>
            ))}
          </CTableBody>
        </CTable>
        <div className="mt-3 d-flex justify-content-end">
          <CButton color="primary" onClick={handleSubmit}>
            Submit Attendance
          </CButton>
        </div>
      </CCardBody>
    </CCard>
  )
}

export default StudentAttendance
