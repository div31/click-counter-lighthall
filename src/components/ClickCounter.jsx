import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ClickCounter() {
  const [count, setCount] = useState(0);
  const [clickData, setClickData] = useState({});

  useEffect(() => {
    const savedCount = localStorage.getItem('count');
    if (savedCount !== null) {
      setCount(parseInt(savedCount));
    }
    const savedClickData = localStorage.getItem('country Clicks');
    if (savedClickData !== null) {
      setClickData(JSON.parse(savedClickData));
    }
  }, []);


  const handleClick = async () => {
    setCount(count + 1);
    localStorage.setItem('count', count + 1);
    const response = await axios.get('https://ipapi.co/json');
    const { country } = response.data;
    setClickData(prevData => ({
      ...prevData,
      [country]: (prevData[country] || 0) + 1,
    }));
    localStorage.setItem('country Clicks', JSON.stringify({...clickData, [country]: (clickData[country] || 0) + 1}));
  };

  const renderClickData = () => {
    const rows = Object.entries(clickData).map(([country, clicks]) => (
      <tr key={country}>
        <td>{country}</td>
        <td>{clicks}</td>
      </tr>
    ));
    return (
      <table style={{marginRight: "auto", marginLeft: "auto"}}>
        <thead>
          <tr>
            <th>Country</th>
            <th>Clicks</th>
          </tr>
        </thead>
        <tbody>
          {rows}
        </tbody>
      </table>
    );
  };

  return (
    <div>
      <h1 style={{margin: "40px 0px"}}>Click Counter</h1>
      <p>Count: {count}</p>
      <button onClick={handleClick} style={{marginBottom: "40px"}}>Click me!</button>
      {renderClickData()}
    </div>
  );
}

export default ClickCounter;
