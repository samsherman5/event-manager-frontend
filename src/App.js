import Login from './pages/Login';
import Main from './pages/Main';
import Error503 from './pages/Error503';
import Error404 from './pages/Error404';
import PDF from './pages/PDF';
import JSON from './pages/JSON';
import Image from './pages/Image';
import Viewer from './pages/Viewer';
import BrowserUnsupported from './pages/BrowserUnsupported';
import { Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { useState, useEffect } from 'react';

function App() {
  const [day, setDay] = useState("None");
  const { detect } = require('detect-browser');
  const browser = detect();

  const address = process.env.REACT_APP_BACKEND_ADDRESS;

  useEffect(() => {
    const now = new Date();
    const timeUntilMidnight = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1) - now;
    setTimeout(() => {
      const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
      const currentDay = weekday[now.getDay()];
      if (currentDay !== day) {
        setDay(currentDay);
      }
    }, timeUntilMidnight);
  }, [day]);

  if (day === 'None') {
    const now = new Date();
    const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    const currentDay = weekday[now.getDay()];
    if (currentDay !== "Saturday") {
      setDay(currentDay);
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
      <Route path="viewer" element={<Viewer browser={browser} day={day} setDay={setDay} address={address} />} />
      <Route path="image" element={<Image day={day} address={address} />} />
      <Route path="503" element={<Error503 address={address} />} />
      <Route path="*" element={<Error404 />} />
    </Routes>
  );
  
}

export default App;
