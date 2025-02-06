import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Test() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        const headers = token ? { 'Authorization': `Bearer ${token}` } : {};

        const response = await fetch('http://127.0.0.1:8000/api/demo/', {
          headers: {
            ...headers,
            'Content-Type': 'application/json'
          }
        });

        if (response.ok) {
          const data = await response.json();
          setData(data);
        } else {
          // Handle unauthorized access
          if (response.status === 401) {
            navigate('/login');
          } else {
            console.error('Error fetching data:', response.statusText);
          }
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [navigate]);

  return (
    <div>
      <h1>Data from Django API</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}

export default Test;