import { useEffect, useState } from "react";

const Time = ({unsavedChanges, setUnsavedChanges, _id, timeRef, time, day}) => {
    const [times, setTimes] = useState(null);

    // changes the time when its changed
    const changeTime = (event, time) => {
        if (!unsavedChanges){
            setUnsavedChanges(true);
        }
        document.getElementById(`time-tag-${_id}`).innerHTML = time;
	};

    const fetchData = async (file) => {
        try {
            const response = await fetch(file);
            const data = await response.json();
            setTimes(data);
        } catch (error) {
            console.error(error);
        }
    };
    
    useEffect(() => {
        fetchData('./config/times.json');
    }, []);

    return (
        <div className="dropdown">
            <button ref={timeRef} id={`time-tag-${_id}`} className="btn btn-white text-nowrap time" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                {time}
            </button>
            <ul className="dropdown-menu">
                {times ? (

                    <>
                        {times[day] ? (
                            <>
                                {times[day].map((item, index) => {
                                    return (
                                        <li key={index}><span className="dropdown-item no-select" onClick={(event) => changeTime(event, item)}>{item}</span></li>
                                    );
                                })}
                            </>
                        ) : (
                            <>
                                {times['Default'].map((item, index) => {
                                    return (
                                        <li key={index}><span className="dropdown-item no-select" onClick={(event) => changeTime(event, item)}>{item}</span></li>
                                    );
                                })}
                            </>
                        )}
                    </>
                ):(
                    <></>
                )}
            </ul>
        </div>
    );
}

export default Time;