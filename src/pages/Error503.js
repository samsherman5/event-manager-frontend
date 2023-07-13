import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Error503 = ({address}) => {
  const navigate = useNavigate();
  
  useEffect(() => {
    document.body.style.backgroundColor = '#f0f0f0';
    document.body.style.backgroundImage = "";
  })

  useEffect(() => {
    fetch (`${address}/`, {
      method: 'GET',
      credentials: 'include',
      withCredentials: true
    }).then(res => {
        if (res.status && res.status === 401) {
            navigate('/login');
        } else if (res.status && res.status === 404) {
            navigate('/');
        }
    }).catch(err => {
        return;
    });
   }, [address, navigate]);

  return (
    <div className="d-flex flex-column text-center justify-content-center align-items-center" style={{ height: "100vh" }}>
      <h1 className="display-5">Sorry, our service is temporarily down.</h1>
      <h6 className="mb-2 text-black">We're working to get things back up as soon as possible. Please check back later.</h6>
      <small className="mb-3 text-black">Status Code 503</small>
    </div>
  );
};

export default Error503;