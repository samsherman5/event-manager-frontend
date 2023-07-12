import Login from './pages/Login';
import Main from './pages/Main';
import Error503 from './pages/Error503';
import Error404 from './pages/Error404';
import { Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

function App() {
  var address;
  if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    address = 'http://localhost:8080';
  } else {
    address = 'https://event-manager-backend-d7uu.onrender.com';
  }

  return (
    <Routes>
      <Route index element={<Main address={address} />}/>
      <Route path="login" element={<Login address={address} />} />
      <Route path="503" element={<Error503 address={address} />} />
      <Route path="*" element={<Error404 />} />
    </Routes>
  );
  
}

export default App;
