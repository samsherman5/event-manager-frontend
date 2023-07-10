import { useEffect } from "react";
import Offline from "../subcomponents/Offline";
import Login from "../subcomponents/Login";
import { createRoot } from 'react-dom/client';

const OfflineMode = (props) => {
    const container = document.getElementById('root');
    const root = createRoot(container);

    function offline() {
        root.render(<Offline/>);
    }
    
    function auth() {
        root.render(<Login address={props.address} setIsOffline={props.setIsOffline} setAuth={props.setAuth} setUpdate={props.setUpdate}/>);
    }

    useEffect(() => {
        if(props.auth) {
            auth();
        }
        else if(props.isOffline){
            offline();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.isOffline, props.auth]);
};

export default OfflineMode;