/* eslint-disable jsx-a11y/anchor-is-valid */
import  { useNavigate } from 'react-router-dom';

const Error404 = () =>  {
    document.body.style.backgroundColor = '#f0f0f0';
    document.body.style.backgroundImage = "";
    const navigate = useNavigate();

    function goHome(){
        navigate('/');
    }

    return (
        <div className="d-flex flex-column text-center justify-content-center align-items-center" style={{ height: "100vh" }}>
            <h1 className="display-5">This page doesn't exist!</h1>
            <h6 className="mb-2 text-black">If you got lost, try going back <a href="" onClick={goHome}>home</a>.</h6>
            <small className="mb-3 text-black">Status Code 404</small>
        </div>
    );
};

export default Error404;