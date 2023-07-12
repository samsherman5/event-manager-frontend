import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Error503 = () => {
  const navigate = useNavigate();
  document.body.style.backgroundColor = '#f0f0f0';

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      event.preventDefault();
      event.returnValue = '';

      navigate('/');
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [navigate]);

  return (
    <div className="d-flex flex-column text-center justify-content-center align-items-center" style={{ height: "100vh" }}>
      <h1 className="display-5">Sorry, our service is temporarily down.</h1>
      <h6 className="mb-2 text-black">We're working to get things back up as soon as possible. Please check back later.</h6>
      <small className="mb-3 text-black">Status Code 503</small>
    </div>
  );
};

export default Error503;