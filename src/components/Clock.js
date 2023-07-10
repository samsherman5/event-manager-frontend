import { useEffect, useState } from "react";

const Clock = () => {
    const [time, setTime] = useState();


    useEffect(() => {
        function timeManager(){
            let date = new Date();
            let hh = date.getHours();
            let mm = date.getMinutes();
            let ss = date.getSeconds();
            let session = "AM";
            
            if(hh > 12){
                hh = hh - 12;
                session = "PM";
            }
        
            hh = (hh < 10) ? "0" + hh : hh;
            mm = (mm < 10) ? "0" + mm : mm;
            ss = (ss < 10) ? "0" + ss : ss;
            
            setTime(hh + ":" + mm + ":" + ss + " " + session);
        }

        
        timeManager();
        const interval = setInterval(timeManager, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="container mt-5 justify-content-center">
            <h1 className="display-3 text-warning weight-650 text-center">{time}</h1>
        </div>
    );
};

export default Clock;