"use client"

import { useState, useEffect } from 'react';
import axios from 'axios';

const EmployeeWorkingHours = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const requestBody = {
      viewMode: "11",
      companyAddressID: 0,
      employeeMasterID: 0,
      yearID: 2024,
      monthID: 7,
      teamRoleCode: 0,
      objCommon: {
        insertedUserID: "27",
        insertedIPAddress: "43.254.176.219",
        dateShort: "dd-MM-yyyy",
        dateLong: "dd-MM-yyyy HH:mm:ss"
      }
    };

    const headers = {
      'Content-Type': 'application/json',
      token: "10cf614a0fc7bdd88cf4a42b6897f2e684561f2d75aba3e8151d18becf97859603dcf416695ce06ae81c8d284775b6b5eb8a190b5b7be9c24a261710e",
      Apiusername: "90017",
      Companycode: "SPIRAL",
      Companyuserid: "27",
      Userloginid: "90017",
      Username: "90017"
    };

    try {
      const response = await axios.post(
        'https://api.spiral.mybiznext.in/HRMS/GetEmployeeWorkingHoursView',
        requestBody,
        { headers }
      );
      setData(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data: ", error);
      setError(error);
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!data) {
    return <div>No data available</div>;
  }

  return (
    <div>
      <h1>Employee Working Hours</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default EmployeeWorkingHours;
