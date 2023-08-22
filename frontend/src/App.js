import React, { useState, useEffect } from 'react';

function App() {
  const [trainsData, setTrainsData] = useState([]);

  useEffect(() => {
    // Fetch train data from the server
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };
    
    fetch("http://localhost:3000/train", requestOptions)
    .then(response => response.json())
    .then(data => {
      // Assuming the fetched data is an array of train objects
      setTrainsData(data);
    })
    .catch(error => {
      console.error('Error fetching train data:', error);
    });
  }, []); // The empty dependency array ensures this effect runs only once

  return (
    <div className="App">
      <h1>Train Information</h1>
      <table>
      <thead>
          <tr>
            <th>Train Name</th>
            <th>Train Number</th>
            <th>Departure Time</th>
            <th>Seats Available (Sleeper)</th>
            <th>Price (Sleeper)</th>
            <th>Delayed By</th>
          </tr>
        </thead>
        <tbody>
          {trainsData.map((train, index) => (
            <tr key={index}>
              <td>{train.trainName}</td>
              <td>{train.trainNumber}</td>
              <td>{`${train.departureTime.Hours}:${train.departureTime.Minutes}`}</td>
              <td>{train.seatsAvailable.sleeper}</td>
              <td>{train.price.sleeper}</td>
              <td>{train.delayedBy}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
