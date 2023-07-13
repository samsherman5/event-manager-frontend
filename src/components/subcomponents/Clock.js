//TODO: day_theme dotw date time (Hour and min only no seconds)
import { useEffect, useState } from "react";

const Clock = ({size}) => {
    const [time, setTime] = useState();
    const [date, setDate] = useState();

    useEffect(() => {
        function timeManager(){
            let date = new Date();
            let hh = date.getHours();
            let mm = date.getMinutes();
            let month = (date.getMonth() + 1) % 12;
            let day = date.getDate();
            let session = "AM";
            
            if(hh > 12){
                hh = hh - 12;
                session = "PM";
            }
        
            hh = (hh < 10) ? "0" + hh : hh;
            mm = (mm < 10) ? "0" + mm : mm;
            month = (month < 10) ? "0" + month : month;
            day = (day < 10) ? "0" + day : day;

            setDate(month+"/"+day);
            setTime(hh + ":" + mm + " " + session);
        }

        
        timeManager();
        const interval = setInterval(timeManager, 5000);
        return () => clearInterval(interval);
    }, []);
    

    return (
        <h3 className={`text-white ${size} weight-650 text-center clock-theme`}><mark className="pt-2 pb-1">{date} {time}</mark></h3>
    );
};

export default Clock;