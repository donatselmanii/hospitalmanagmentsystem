import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBBtn,
} from 'mdb-react-ui-kit';
import '../../../../css/Appointment/UserReport.css';

function UserMedicalReport() {
  const { appointmentId } = useParams();
  const [medicalReport, setMedicalReport] = useState('');
  const [DoctorId, setDoctorId] = useState('');
  const [Idnum, setIdnum] = useState('');
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState('');

  async function saveMedicalReport() {
    try {
      if (userRole === 'doctor') {
        const checkResponse = await axios.get(
          `http://localhost:8081/appointments/user-report-exists/${appointmentId}`
        );

        if (checkResponse.data.MedicalReportExists) {
          const response = await axios.put(
            `http://localhost:8081/appointments/user-report/${appointmentId}`,
            {
              medicalReport,
            },
            {
              withCredentials: true,
            }
          );

          if (response.data.Status === 'Success') {
            console.log('Medical report updated successfully.');
          } else {
            console.log('Failed to update medical report.');
          }
        } else {
          const response = await axios.post(
            `http://localhost:8081/appointments/user-report/${appointmentId}`,
            {
              medicalReport,
              DoctorId,
              Idnum,
            },
            {
              withCredentials: true,
            }
          );

          if (response.data.Status === 'Success') {
            console.log('Medical report saved successfully.');
          } else {
            console.log('Failed to save medical report.');
          }
        }
      } else {
        console.log('Users are not allowed to save medical reports.');
      }
    } catch (error) {
      console.error(error);
    }
  }
  
  async function fetchData() {
    try {
      const response = await axios.get(
        `http://localhost:8081/appointments/user-report/${appointmentId}`
      );
      const { doctorid, idnum, MedicalReport } = response.data;

      console.log('API Response:', response);
      const medicalReportData = response.data.MedicalReport; 
      setDoctorId(doctorid);
      setIdnum(idnum);
      setMedicalReport(MedicalReport);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();

    axios.get('http://localhost:8081/login/rolecheck', { withCredentials: true })
      .then((response) => {
        const { role } = response.data;
        setUserRole(role);
      })
      .catch((error) => {
        console.error('Error fetching user role:', error);
      });
  }, []);


async function fetchReport() {
  try {
    const response = await axios.get(
      `http://localhost:8081/appointments/user-report-fetch/${appointmentId}`
    );
    const { MedicalReport } = response.data;

    console.log('API Response:', response);
    const medicalReportData = response.data.MedicalReport;
    setMedicalReport(MedicalReport);
    setLoading(false);
  } catch (error) {
    console.error('Error fetching medical report:', error);
  }
}

useEffect(() => {
  fetchReport();
}, []);

return (
  <MDBContainer>
    <h2 className="UserReport-heading">Medical Report</h2>
    <p className="UserReport-appointmentId">Appointment ID: {appointmentId}</p>
    <MDBRow>
      <MDBCol size="12">
        <textarea
          className="UserReport-reportText"
          value={medicalReport}
          onChange={(e) => setMedicalReport(e.target.value)}
          rows="5"
          readOnly={userRole !== 'doctor'}
        ></textarea>
      </MDBCol>
    </MDBRow>
    <MDBRow>
    {userRole === 'doctor' && (
      <MDBCol size="12">
        <MDBBtn onClick={saveMedicalReport} disabled={userRole !== 'doctor'}>
          Save Report
        </MDBBtn>
      </MDBCol>
          )}
    </MDBRow>
    {userRole === 'doctor' && (
      <MDBRow>
        <MDBCol size="12">
          <Link to={`/Report/${appointmentId}`}>Medicine</Link>
        </MDBCol>
      </MDBRow>
    )}
  </MDBContainer>
);

}

export default UserMedicalReport;
