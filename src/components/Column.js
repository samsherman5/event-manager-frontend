/* eslint-disable no-script-url */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useRef, useState} from 'react';
import AutoComplete from './AutoComplete';


const Column = (props) => {
    // States & Refs
    const [organizer, setOrganizer] = useState(props.organizer); // For exiting input
    const title = useRef(null);
    const timeRef = useRef(null);

    // ----------------------------------------

    function deleteColumn() {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                _id: props._id
            }),
            credentials: "include"
        };
        fetch(`${props.address}/remove_event`, requestOptions)
            .then((res) => {
                if (res.status === 401) {
                    props.setAuth(true);
                    return;
                }
                props.setUpdate(!props.update);
            })
            .catch((error) => {
                console.log(error);
                props.setIsOffline(true);
            });
    }

    function saveColumn() {

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                _id: props._id,
                title: title.current.textContent,
                organizer: organizer,
                time: timeRef.current.textContent,
                day: props.day
            }),
            credentials: "include"
        };
        fetch(`${props.address}/edit_event`, requestOptions)
            .then((res) => {
                if (res.status === 401) {
                    props.setAuth(true);
                    return;
                }
                props.setUpdate(!props.update);
            })
            .catch((error) => {
                console.log(error);
                props.setIsOffline(true);
            });

        if (props.unsavedChanges){
            props.setUnsavedChanges(false);
        }

        return;
    }

    // Hit Enter to Stop Typing
    function handleKeyDown(event) {
        if (!props.unsavedChanges){
            props.setUnsavedChanges(true);
        }
        if (event.key === "Enter") {
            event.preventDefault();
            event.target.blur(); 
        }
    }

    function addOrganizer(){
        if (!props.unsavedChanges){
            props.setUnsavedChanges(true);
        }
        setOrganizer([
            ...organizer, "Organizer"
        ]);
    }

    function removeOrganizer(){
        if (!props.unsavedChanges){
            props.setUnsavedChanges(true);
        }
        setOrganizer(organizer.slice(0, -1));
    }

    const changeTime = (event, time) => {
        if (!props.unsavedChanges){
            props.setUnsavedChanges(true);
        }
        document.getElementById(`time-tag-${props._id}`).innerHTML = time;
	};

    useEffect(() => {
        if (props.saveUpdate === true) {
            saveColumn();
            props.setSaveUpdate(false);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.saveUpdate]);
      

    return (
        
        // eslint-disable-next-line jsx-a11y/anchor-is-valid
        <div id={props._id} className="list-group-item d-flex gap-3 py-3 st-backgroundblue" aria-current="true">
            <div className="d-flex gap-2 w-100 justify-content-between">
                <div>
                    <h6 
                        spellCheck={false}
                        ref={title}
                        onKeyDown={handleKeyDown} 
                        contentEditable={true} 
                        suppressContentEditableWarning={true} 
                        className="editable-content title mb-0"
                    >
                        {props.title}
                    </h6>
                    <div className="container p-0">
                        <div className="row m-0">
                            {organizer.map((item, index) => {
                                return (
                                    <AutoComplete key={index} unsavedChanges={props.unsavedChanges} setUnsavedChanges={props.setUnsavedChanges} organizer={organizer} setOrganizer={setOrganizer} item={organizer[index]} index={index}/>
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
                    {/* <p onClick={addOrganizer} className="organizer-nametag me-2 mt-2 mb-0 p-1 btn-hover w-100 weight-500" id="add-column" type="submit">+</p> */}
                </div>
            </div>
            {/* <small class="text-nowrap bold st-blue">8:30PM</small> */}
            <div className="d-flex flex-column align-items-end">
                <div className="dropdown">
                    <button ref={timeRef} id={`time-tag-${props._id}`} className="btn btn-bluish text-white text-nowrap time small-tag" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                        {props.time}
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