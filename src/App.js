import Login from './pages/Login';
import Main from './pages/Main';
import Error503 from './pages/Error503';
import Error404 from './pages/Error404';
import PDF from './pages/PDF';
import JSON from './pages/JSON';
import Image from './pages/Image';
import BrowserUnsupported from './pages/BrowserUnsupported';
import { Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { useState } from 'react';

function App() {
  const [day, setDay] = useState("None");
  const { detect } = require('detect-browser');
  const browser = detect();

  var address;
  if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    address = 'http://localhost:8080';
  } else {
    address = 'https://event-manager-backend-d7uu.onrender.com';
  }

  if(day === 'None'){
    let date = new Date();
    const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    date = date.getDay();
    date = weekday[date];
    if (date !== "Saturday") {
      setDay(date);
    } else {
      setDay('Monday');
    }
  } 

  return (
    <Routes>
      <Route index element={<Main browser={browser} day={day} setDay={setDay} address={address} />}/>
      <Route path="unsupported" element={<BrowserUnsupported browser={browser}/>} />
      <Route path="login" element={<Login address={address} />} />
      <Route path="pdf" element={<PDF address={address} />} />
      <Route path="json" element={<JSON address={address} />} />
      <Route path="image" element={<Image day={day} address={address} />} />
      <Route path="503" element={<Error503 address={address} />} />
      <Route path="*" element={<Error404 />} />
    </Routes>
  );
  
}

export default App;
