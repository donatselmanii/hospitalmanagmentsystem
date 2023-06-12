import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../../../../css/Appointment/UserReport.css';

function UserMedicalReport() {
  const { appointmentId } = useParams();
  const [medicalReport, setMedicalReport] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchMedicalReport();
  }, []);

  async function fetchMedicalReport() {
    try {
      const response = await axios.get(`http://localhost:8081/appointments/user-report/${appointmentId}`, {
        withCredentials: true,
      });
      if (response.data.Status === 'Success') {
        setMedicalReport(response.data.MedicalReport);
      } else {
        setMedicalReport(null);
        console.log('No medical report found.');
      }
    } catch (error) {
      setError(error);
    }
    setIsLoading(false);
  }

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div>
      {medicalReport ? (
        <>
          <h2 className="UserReport-heading">Medical Report</h2>
          <p className="UserReport-appointmentId">Appointment ID: {appointmentId}</p>
          <textarea className="UserReport-reportText" value={medicalReport} readOnly></textarea>
        </>
      ) : (
        <p className="UserReport-noReport">No medical report found for appointment ID: {appointmentId}</p>
      )}
    </div>
  );
  
}

export default UserMedicalReport;
