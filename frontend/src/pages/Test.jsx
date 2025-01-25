import React, { useEffect, useState } from 'react';

function Test() {
    const [data, setData] = useState([]);

    useEffect(() => {
      // Using fetch API to get data from Django API
      fetch('http://127.0.0.1:8000/api/demo/')
        .then(response => {
            console.log(response);
          // Ensure we got a successful response
          return response.json();  // Parse the JSON data from the response
        })
        .then(data => setData(data))  // Set the data into state
        .catch(error => console.error('Error fetching data:', error));  // Handle any errors
    }, []);

    return (
      <div>
        <h1>Data from Django API</h1>
        <h1>yead</h1>
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </div>
    );
}

export default Test;
