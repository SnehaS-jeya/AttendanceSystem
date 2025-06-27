import React, { useState } from 'react';
import {
  CCard,
  CCardHeader,
  CCardBody,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CFormCheck,
  CFormInput,
  CRow,
  CCol,
  CButton
} from '@coreui/react';

const TeacherAttendance = () => {
  const initialData = [
    { id: 'T001', name: 'Ravi Kumar', present: true, checkIn: '', checkOut: '', reason: '' },
    { id: 'T002', name: 'Anita Sharma', present: true, checkIn: '', checkOut: '', reason: '' },
    { id: 'T003', name: 'Suresh Menon', present: true, checkIn: '', checkOut: '', reason: '' },
    { id: 'T004', name: 'Lakshmi Priya', present: true, checkIn: '', checkOut: '', reason: '' },
    { id: 'T005', name: 'Vignesh S.', present: true, checkIn: '', checkOut: '', reason: '' },
    { id: 'T006', name: 'Shalini R.', present: true, checkIn: '', checkOut: '', reason: '' },
    { id: 'T007', name: 'Naveen Raj', present: true, checkIn: '', checkOut: '', reason: '' },
    { id: 'T008', name: 'Kavitha Rani', present: true, checkIn: '', checkOut: '', reason: '' },
    { id: 'T009', name: 'Mohammed Faiz', present: true, checkIn: '', checkOut: '', reason: '' },
    { id: 'T010', name: 'Deepika N.', present: true, checkIn: '', checkOut: '', reason: '' },
  ];

  const [attendanceData, setAttendanceData] = useState(initialData);
  const [date, setDate] = useState('');

  const handleChange = (index, field, value) => {
    const updated = [...attendanceData];
    updated[index][field] = value;

    // Clear check-in/out if marked absent
    if (field === 'present' && !value) {
      updated[index].checkIn = '';
      updated[index].checkOut = '';
    }
    setAttendanceData(updated);
  };

  const handleSubmit = () => {
    console.log('Attendance submitted:', {
      date,
      records: attendanceData,
    });

    // You can POST this data to backend using axios or fetch
  };

  return (
    <CCard className="mb-4">
      <CCardHeader>
        <h5>Teacher Attendance</h5>
        <CRow className="mt-3 g-2 align-items-center">
          <CCol md={4}>
            <label htmlFor="date">Select Date</label>
            <CFormInput
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </CCol>
        </CRow>
      </CCardHeader>

      <CCardBody>
        <CTable hover responsive bordered>
          <CTableHead color="primary">
            <CTableRow>
              <CTableHeaderCell>Teacher ID</CTableHeaderCell>
              <CTableHeaderCell>Name</CTableHeaderCell>
              <CTableHeaderCell>Present</CTableHeaderCell>
              <CTableHeaderCell>Check-In</CTableHeaderCell>
              <CTableHeaderCell>Check-Out</CTableHeaderCell>
              <CTableHeaderCell>Reason (If Absent)</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {attendanceData.map((teacher, index) => (
              <CTableRow key={teacher.id}>
                <CTableDataCell>{teacher.id}</CTableDataCell>
                <CTableDataCell>{teacher.name}</CTableDataCell>
                <CTableDataCell>
                  <CFormCheck
                    checked={teacher.present}
                    onChange={(e) =>
                      handleChange(index, 'present', e.target.checked)
                    }
                  />
                </CTableDataCell>
                <CTableDataCell>
                  <CFormInput
                    type="text"
                    placeholder="00:00 AM"
                    value={teacher.checkIn}
                    onChange={(e) =>
                      handleChange(index, 'checkIn', e.target.value)
                    }
                    disabled={!teacher.present}
                  />
                </CTableDataCell>
                <CTableDataCell>
                  <CFormInput
                    type="text"
                    placeholder="00:00 PM"
                    value={teacher.checkOut}
                    onChange={(e) =>
                      handleChange(index, 'checkOut', e.target.value)
                    }
                    disabled={!teacher.present}
                  />
                </CTableDataCell>
                <CTableDataCell>
                  {!teacher.present && (
                    <CFormInput
                      type="text"
                      placeholder="Reason"
                      value={teacher.reason}
                      onChange={(e) =>
                        handleChange(index, 'reason', e.target.value)
                      }
                    />
                  )}
                </CTableDataCell>
              </CTableRow>
            ))}
          </CTableBody>
        </CTable>

        <div className="text-end mt-3">
          <CButton color="primary" onClick={handleSubmit}>
            Submit Attendance
          </CButton>
        </div>
      </CCardBody>
    </CCard>
  );
};

export default TeacherAttendance;
