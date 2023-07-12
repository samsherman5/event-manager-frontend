/* eslint-disable react-hooks/exhaustive-deps */
import  { useNavigate } from 'react-router-dom';
import { useEffect } from "react";
const Loader = ({auth, isOffline}) => {
    const navigate = useNavigate();
    useEffect(() => {
        if(auth) {
            navigate('/login', { replace: false }); 
        }
        else if(isOffline){
            navigate('/503', { replace: false });
        }
    }, [isOffline, auth]);

    return <></>
};

export default Loader;