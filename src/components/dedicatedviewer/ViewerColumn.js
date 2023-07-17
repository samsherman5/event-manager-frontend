import { useCallback, useEffect, useState } from "react";

const ViewerColumn = ({organizers, time, _id, title}) => {
    const [isActivated, setIsActivated] = useState("");
    const active = useCallback(() =>{
        const now = new Date();
        const [hours, minutes, period] = time.split(/:|\s/);
        const timeDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), period === 'PM' ? parseInt(hours) + 12 : parseInt(hours), parseInt(minutes));
        const fifteenMinutesLater = new Date(timeDate.getTime() + 15 * 60000);
        if(now <= fifteenMinutesLater && now >= timeDate) {
            return "column-activated";
        }
        return "";
        
    }, [time]);

    useEffect(() => {
        setIsActivated(active());
        const timer = setInterval(() => {
            setIsActivated(active());
        }, 60000);
        return () => clearInterval(timer);
    },[time, active])

    return (
        
        <div id={_id} className={`${isActivated} list-group-item d-flex gap-2 p-2 st-backgroundblue`} aria-current="true">
            <div className="d-flex gap-2 w-100 justify-content-between">
                <div className="flex-grow-1">
                    <div className="d-flex flex-fill align-items-center">
                    <button id={`time-tag-${_id}`} className="btn btn-white text-nowrap time" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                        {time}
                    </button>
                        <div className='me-3 d-flex align-items-center'>
                            <span 
                                className="d-inline editable-content title m-0 p-0"
                            >
                                {title}
                            </span>
                        </div>
                    </div>
                </div>
                <div className="flex-grow-0 d-flex align-items-center">
                    <div className="d-flex">
                    {organizers.map((item) => {
                        return (
                            <div className="col-auto p-0 mt-0 me-1">
                                <div className="d-inline-flex align-items-center justify-content-center py-1 px-2 w-auto text-nowrap mt-0 organizer-nametag">
                                    <p
                                        spellCheck={false}
                                        className="align-items-center d-flexautofill-p autofill-main m-0 p-0"
                                    >
                                        {item}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ViewerColumn;