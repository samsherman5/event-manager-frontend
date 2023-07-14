/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import Column from './Column';

const ColumnPage = ({day, setDay, setAuth, unsavedChanges, setUnsavedChanges, setSaveUpdate, saveUpdate, update, setUpdate, setIsOffline, address, viewMode}) => {
    const [columns, setColumns] = useState([]);
    
    // add column
    function addColumn() {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                title: 'Event Name',
                organizer: ["Organizer"],
                time: "6:30PM",
                day: day
            }),
            credentials: "include"
        };
        fetch(`${address}/events`, requestOptions)
            .then((res) => {
                if (res.status === 401) {
                    setAuth(true);
                    return;
                }
                return res.json(); // Continue to the next step when status is not 401
            })
            .then((data) => {
                setUpdate(!update);
            })
            .catch((error) => {
                console.log(error);
                setIsOffline(true);
            });
    };

    function updateColumns() {
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', 'day': day },
            credentials: 'include'
        };

        fetch(`${address}/events`, requestOptions)
            .then((res) => {
                if (res.status === 401) {
                    setAuth(true);
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
                setIsOffline(true);
            });
    }

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

    // update events
    useEffect(() => {
        if(!viewMode) {
            updateColumns();
        }
    }, [day, update]);

    if (viewMode) {
        setInterval(viewerUpdate, 30000);
    }

    return (
        <div>
            <div className="d-flex flex-column flex-md-row gap-4 align-items-center justify-content-center">
            <div className="list-group">
                {columns.map((column, index) => {
                    return (
                        <Column setAuth={setAuth} key={index} setIsOffline={setIsOffline} address={address} unsavedChanges={unsavedChanges} setUnsavedChanges={setUnsavedChanges} setSaveUpdate={setSaveUpdate} saveUpdate={saveUpdate} setUpdate={setUpdate} update={update} _id={column._id} title={column.title} organizer={column.organizer} day={day} time={column.time}></Column>
                    );
                })}
            </div>
        </div>

        <div id="add-column-container" className="mt-0 pt-0 d-flex flex-column flex-md-row pt-1 pb-1 gap-4 align-items-center justify-content-center">
            <button onClick={addColumn} className="btn btn-hover w-100 weight-500" id="add-column" type="submit">+ Add another event</button>
        </div>
      </div>
    );
};

export default ColumnPage;