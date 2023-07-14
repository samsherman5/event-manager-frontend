/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import ViewerColumn from './ViewerColumn';

const ViewerPage = ({day, setDay, address}) => {
    const [columns, setColumns] = useState([]);

    function viewerUpdate() {
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', 'day': day },
            credentials: 'include'
        };

        fetch(`${address}/viewer_events`, requestOptions)
            .then((res) => {
                if (res.status === 401) {
                    return Promise.reject(); // Reject the promise to skip to the catch block
                } else {
                    return res.json()
                        .then((data) => {
                            if (data) {
                                setColumns(data.events);
                            }
                        });
                }
            })
            .catch((error) => {
                console.log(error);
            });

        let date = new Date();
        const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
        date = date.getDay();
        date = weekday[date];
        if (date !== "Saturday") {
            setDay(date);
        } else {
            setDay('Monday');
        }
    }


    useEffect(() => {
        viewerUpdate();
        setInterval(viewerUpdate, 30000);
    });

    return (
        <div>
            <div className="d-flex flex-column flex-md-row gap-4 align-items-center justify-content-center">
            <div className="list-group">
                {columns.map((column, index) => {
                    return (
                        <ViewerColumn key={index} _id={column._id} title={column.title} organizers={column.organizer} time={column.time}/>
                    );
                })}
            </div>
        </div>
      </div>
    );
};

export default ViewerPage;