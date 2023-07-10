import RenderPrint from '../pdf/RenderPrint';
// import { useEffect, useState } from 'react';

const Navbar = (props) => {
    
    async function monday() {
        if (props.unsavedChanges) {
            props.setNavUnsavedChanges(true);
        } else {
            await toggle_update();
            await props.setDay("Monday");
        }
    }

    async function tuesday() {
        if (props.unsavedChanges) {
            props.setNavUnsavedChanges(true);
        } else {
            await toggle_update();
            await props.setDay("Tuesday");
        }
    }

    async function wednesday() {
        if (props.unsavedChanges) {
            props.setNavUnsavedChanges(true);
        } else {
            await toggle_update();
            await props.setDay("Wednesday");
        }
    }

    async function thursday() {
        if (props.unsavedChanges) {
            props.setNavUnsavedChanges(true);
        } else {
            await toggle_update();
            await props.setDay("Thursday");
        }
    }

    async function friday() {
        if (props.unsavedChanges) {
            props.setNavUnsavedChanges(true);
        } else {
            await toggle_update();
            await props.setDay("Friday");
        }
    }

    async function sunday() {
        if (props.unsavedChanges) {
            props.setNavUnsavedChanges(true);
        } else {
            await toggle_update();
            await props.setDay("Sunday");
        }
    }

    function clear_events () {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: "include"
        };
        fetch(`${props.address}/clear_events`, requestOptions)
            .then((res) => {
                if (res.status === 401) {
                    props.setAuth(true);
                    return;
                }
                props.setUpdate(!props.update);
            })
            .catch((error) => {
                console.log(error.message);
                props.setIsOffline(true);
            });
    }

    async function toggle_update() {
        props.setUpdate(!props.update);
    }

    async function update_save() {
        props.setUnsavedChanges(false);
        props.setSaveUpdate(true);
    }

    return (
            <div className="container-fluid mt-2">
                <div className="row">
                    <div className="col-sm-4 d-flex justify-content-start">
                        <RenderPrint address={props.address} update={props.update} setUpdate={props.setUpdate}/>
                    </div>
                    <div className="col-sm-4 d-flex justify-content-center">
                        <button onClick={sunday} type="button" className={`mx-1 nav-text btn btn-primary btn-lg clickable-ratio ${props.day === 'Sunday' ? 'active' : ''}`}>S</button>
                        <button onClick={monday} type="button" className={`mx-1 nav-text btn btn-primary btn-lg clickable-ratio ${props.day === 'Monday' ? 'active' : ''}`}>M</button>
                        <button onClick={tuesday} type="button" className={`mx-1 nav-text btn btn-primary btn-lg clickable-ratio ${props.day === 'Tuesday' ? 'active' : ''}`}>T</button>
                        <button onClick={wednesday} type="button" className={`mx-1 nav-text btn btn-primary btn-lg clickable-ratio ${props.day === 'Wednesday' ? 'active' : ''}`}>W</button>
                        <button onClick={thursday} type="button" className={`mx-1 nav-text btn btn-primary btn-lg clickable-ratio ${props.day === 'Thursday' ? 'active' : ''}`}>T</button>
                        <button onClick={friday} type="button" className={`mx-1 nav-text btn btn-primary btn-lg clickable-ratio ${props.day === 'Friday' ? 'active' : ''}`}>F</button>
                    </div>
                    <div className="col-sm-4 d-flex justify-content-end">
                    <button onClick={update_save} type="button" className='mx-1 nav-text btn btn-primary btn-lg action-ratio'>Save</button>
                        <button onClick={clear_events} type="button" className='mx-1 nav-text btn btn-primary btn-lg action-ratio'>Clear</button>
                    </div>
                </div>
            </div>
    );
};

export default Navbar;