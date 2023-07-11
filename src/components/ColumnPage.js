import Column from './Column';
import { useState, useEffect } from 'react';

const ColumnPage = (props) => {
    const [columns, setColumns] = useState([]);
    

    function addColumn() {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                title: 'Event Name',
                organizer: ["Organizer"],
                time: "6:30PM",
                day: props.day
            }),
            credentials: "include"
        };
        fetch(`${props.address}/events`, requestOptions)
            .then((res) => {
                if (res.status === 401) {
                    props.setAuth(true);
                    return;
                }
                return res.json(); // Continue to the next step when status is not 401
            })
            .then((data) => {
                props.setUpdate(!props.update);
            })
            .catch((error) => {
                console.log(error);
                props.setIsOffline(true);
            });
    };

    useEffect(() => {
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', 'day': props.day },
            credentials: 'include'
        };
        fetch(`${props.address}/events`, requestOptions)
            .then((res) => {
                if (res.status === 401) {
                    props.setAuth(true);
                    return;
                }
                return res.json(); // Continue to the next step when status is not 401
            })
          .then((data) => {
            setColumns(data.events);
          })
          .catch((error) => {
            console.log(error);
            props.setIsOffline(true);
          });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.day, props.update]);

    return (
        <div>
            <div className="d-flex flex-column flex-md-row p-4 pb-1 gap-4 pt-md-5 align-items-center justify-content-center">
            <div className="list-group">
                {columns.map((column, index) => {
                    return (
                        <Column setAuth={props.setAuth} key={index} setIsOffline={props.setIsOffline} address={props.address} unsavedChanges={props.unsavedChanges} setUnsavedChanges={props.setUnsavedChanges} setSaveUpdate={props.setSaveUpdate} saveUpdate={props.saveUpdate} setUpdate={props.setUpdate} update={props.update} _id={column._id} title={column.title} organizer={column.organizer} day={props.day} time={column.time}></Column>
                    );
                })}
            </div>
        </div>

        <div id="add-column-container" className="mt-0 pt-0 d-flex flex-column flex-md-row p-4 pb-1 gap-4 align-items-center justify-content-center">
            <button onClick={addColumn} className="btn btn-hover w-100 weight-500" id="add-column" type="submit">+ Add another event</button>
        </div>
      </div>
    );
};

export default ColumnPage;