/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState} from 'react';
import AutoComplete from './AutoComplete';


const Column = ({organizer, unsavedChanges, saveUpdate, setSaveUpdate, setUnsavedChanges, time, _id, setUpdate, update, setIsOffline, setAuth, address, day, title}) => {
    // States & Refs
    const [organizers, setOrganizers] = useState(organizer); // For exiting input
    const titleRef = useRef(null);
    const timeRef = useRef(null);

    // ----------------------------------------

    function deleteColumn() {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                _id: _id
            }),
            credentials: "include"
        };
        fetch(`${address}/remove_event`, requestOptions)
            .then((res) => {
                if (res.status === 401) {
                    setAuth(true);
                    return;
                }
                setUpdate(!update);
            })
            .catch((error) => {
                console.log(error);
                setIsOffline(true);
            });
    }

    function saveColumn() {

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                _id: _id,
                title: titleRef.current.textContent,
                organizer: organizers,
                time: timeRef.current.textContent,
                day: day
            }),
            credentials: "include"
        };
        fetch(`${address}/edit_event`, requestOptions)
            .then((res) => {
                if (res.status === 401) {
                    setAuth(true);
                    return;
                }
                setUpdate(!update);
            })
            .catch((error) => {
                console.log(error);
                setIsOffline(true);
            });

        if (unsavedChanges){
            setUnsavedChanges(false);
        }

        return;
    }

    // Hit Enter to Stop Typing
    function handleKeyDown(event) {
        if (!unsavedChanges){
            setUnsavedChanges(true);
        }
        if (event.key === "Enter") {
            event.preventDefault();
            event.target.blur(); 
        }
    }

    function addOrganizer(){
        if (!unsavedChanges){
            setUnsavedChanges(true);
        }
        setOrganizers([
            ...organizers, "Organizer"
        ]);
    }

    function removeOrganizer(){
        if (!unsavedChanges){
            setUnsavedChanges(true);
        }
        setOrganizers(organizers.slice(0, -1));
    }

    const changeTime = (event, time) => {
        if (!unsavedChanges){
            setUnsavedChanges(true);
        }
        document.getElementById(`time-tag-${_id}`).innerHTML = time;
	};

    useEffect(() => {
        if (saveUpdate === true) {
            saveColumn();
            setSaveUpdate(false);
        }
    }, [saveUpdate]);

    useEffect(() => {
        setOrganizers(organizer);
    }, [organizer])
      

    return (
        
        <div id={_id} className="list-group-item d-flex gap-3 py-3 st-backgroundblue" aria-current="true">
            <div className="d-flex gap-2 w-100 justify-content-between">
                <div>
                    <h6 
                        spellCheck={false}
                        ref={titleRef}
                        onKeyDown={handleKeyDown} 
                        contentEditable={true} 
                        suppressContentEditableWarning={true} 
                        className="editable-content title mb-0"
                    >
                        {title}
                    </h6>
                    <div className="container p-0">
                        <div className="row m-0">
                            {organizers.map((item, index) => {
                                return (
                                    <AutoComplete key={index} unsavedChanges={unsavedChanges} setUnsavedChanges={setUnsavedChanges} organizer={organizers} setOrganizer={setOrganizers} item={organizers[index]} index={index}/>
                                );
                            })}
                            <div className='col p-0 me-1'>
                                <div className="d-inline-block">
                                    <div className="add-nametag justify-content-center align-items-center mt-2 mb-0 p-1">
                                        <button onClick={addOrganizer} className="weight-500 add-nametag-inner">+</button>
                                        <button onClick={removeOrganizer} className="weight-500 add-nametag-inner">-</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="d-flex flex-column align-items-end">
                <div className="dropdown">
                    <button ref={timeRef} id={`time-tag-${_id}`} className="btn btn-bluish text-white text-nowrap time small-tag" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                        {time}
                    </button>
                    <ul className="dropdown-menu">
                        <li key="1"><span className="dropdown-item no-select" onClick={(event) => changeTime(event, "6:30PM")}>6:30PM</span></li>
                        <li key="2"><span className="dropdown-item no-select" onClick={(event) => changeTime(event, "6:45PM")}>6:45PM</span></li>
                        <li key="3"><span className="dropdown-item no-select" onClick={(event) => changeTime(event, "7:00PM")}>7:00PM</span></li>
                        <li key="4"><span className="dropdown-item no-select" onClick={(event) => changeTime(event, "7:30PM")}>7:30PM</span></li>
                        <li key="5"><span className="dropdown-item no-select" onClick={(event) => changeTime(event, "8:00PM")}>8:00PM</span></li>
                    </ul>
                </div>
                <div className="d-flex mt-1 column-settings align-items-center justify-content-center">
                     <button onClick={saveColumn} className='weight-500 column-settings-inner text-wrap'>Save</button>
                        <button onClick={deleteColumn} className='weight-500 column-settings-inner text-wrap'>Delete</button>
                </div>
            </div>
        </div>
    );
};

export default Column;