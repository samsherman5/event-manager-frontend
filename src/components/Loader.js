/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import BgImage from './subcomponents/BgImage';
const Loader = ({auth, isOffline, browser, day}) => {
    const navigate = useNavigate();
    useEffect(() => {
        if(auth) {
            navigate('/login', { replace: false }); 
        }
        else if(isOffline){
            navigate('/503', { replace: false });
        }
    }, [isOffline, auth]);

    useEffect(() => {
        if (browser) {
          if (browser.name === "safari" ) {
            navigate('unsupported');
          }
        }
    }, [browser]);

    return (
        <>
            <BgImage day={day}/>
        </>
    );
};

export default Loader;