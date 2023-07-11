/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { createRoot } from 'react-dom/client';
import Login from "../subcomponents/Login";
import Offline from "../subcomponents/Offline";

const OfflineMode = ({address, setAuth, setIsOffline, auth, isOffline}) => {
    const container = document.getElementById('root');
    const root = createRoot(container);

    useEffect(() => {
        if(auth) {
            root.render(<Login address={address} setIsOffline={setIsOffline} setAuth={setAuth}/>);
            document.body.style.backgroundColor = '#f0f0f0';
        }
        else if(isOffline){
            root.render(<Offline/>);
        }
    }, [isOffline, auth]);
};

export default OfflineMode;