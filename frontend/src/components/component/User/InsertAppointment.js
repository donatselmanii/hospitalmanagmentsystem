import axios from 'axios';
import React, { useState, useEffect } from 'react';




function InsertAppointment() {
    const [DateTimeReg, setDateTimeReg] = useState('');
    const [CityCategoryReg, setCityCategoryReg] = useState('');
    const [CityCategories, setCityCategories] = useState([]);
    const [idnum, setIdnum] = useState('');

    useEffect(() => {
      axios.get('http://localhost:8081/login', { withCredentials: true }).then(res => {
        if (res.data.Status === 'Success') {
          setIdnum(res.data.idnum);
          console.log("Okay")
        } else {
          console.log("Not okay")
        }
      }).catch(err => console.log(err))
    }, []);
    

    const InsertAppointment = () => {

      axios.post('http://localhost:8081/appointments', {
        idnum,
        datetime: DateTimeReg,
        categoryname: CityCategoryReg,
      }).then((response) => {
        console.log(response);
      }).catch((error) => {
        console.error('Error:', error);
      });
    };
    
    

    useEffect(() => {
        async function fetchData() {
            const response = await axios.get('http://localhost:8081/citycategory');
            setCityCategories(response.data);
        }
        fetchData();
    }, []);

    return (
        <div className="card">
            <div className="group">
                <input
                    placeholder=""
                    type="datetime-local"
                    onChange={(e) => {
                        setDateTimeReg(e.target.value);
                    }}
                />
                <label>Date</label>
            </div>
            <div className="group">
                <select
                    value={CityCategoryReg}
                    onChange={(e) => setCityCategoryReg(e.target.value)}>
                    <option value="">Select a city category</option>
                    {CityCategories.map((citycategory) => (
                        <option key={citycategory.id} value={citycategory.categoryname}>
                            {citycategory.categoryname}
                        </option>
                    ))}
                </select>
            </div>

            <br />
            <br />
            <br />
            <br />
            <button onClick={InsertAppointment}>Select an appointment</button>
        </div>
    );
}

export default InsertAppointment;



