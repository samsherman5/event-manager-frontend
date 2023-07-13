import ClearEvents from './buttons/ClearEvents';
import Clock from './subcomponents/Clock';

const Navbar = ({setAuth, setIsOffline, unsavedChanges, setUnsavedChanges, setNavUnsavedChanges, setSaveUpdate, setUpdate, update, day, address, setDay, viewMode}) => {
    
    async function monday() {
        if (unsavedChanges) {
            setNavUnsavedChanges(true);
        } else {
            await toggle_update();
            await setDay("Monday");
        }
    }

    async function tuesday() {
        if (unsavedChanges) {
            setNavUnsavedChanges(true);
        } else {
            await toggle_update();
            await setDay("Tuesday");
        }
    }

    async function wednesday() {
        if (unsavedChanges) {
            setNavUnsavedChanges(true);
        } else {
            await toggle_update();
            await setDay("Wednesday");
        }
    }

    async function thursday() {
        if (unsavedChanges) {
            setNavUnsavedChanges(true);
        } else {
            await toggle_update();
            await setDay("Thursday");
        }
    }

    async function friday() {
        if (unsavedChanges) {
            setNavUnsavedChanges(true);
        } else {
            await toggle_update();
            await setDay("Friday");
        }
    }

    async function sunday() {
        if (unsavedChanges) {
            setNavUnsavedChanges(true);
        } else {
            await toggle_update();
            await setDay("Sunday");
        }
    }

    async function toggle_update() {
        setUpdate(!update);
    }

    async function update_save() {
        setUnsavedChanges(false);
        setSaveUpdate(true);
    }

    return (
            <div className="container-fluid mt-2">
                <div className="row">
                    <div className="col-sm-4 d-flex justify-content-start">
                        <Clock/>
                    </div>
                    <div className="col-sm-4 d-flex justify-content-center">
                        <button onClick={sunday} type="button" className={`mx-1 nav-text btn btn-primary btn-bluish btn-lg clickable-ratio ${day === 'Sunday' ? 'active' : ''}`}>S</button>
                        <button onClick={monday} type="button" className={`mx-1 nav-text btn btn-primary btn-bluish btn-lg clickable-ratio ${day === 'Monday' ? 'active' : ''}`}>M</button>
                        <button onClick={tuesday} type="button" className={`mx-1 nav-text btn btn-bluish btn-primary btn-lg clickable-ratio ${day === 'Tuesday' ? 'active' : ''}`}>T</button>
                        <button onClick={wednesday} type="button" className={`mx-1 nav-text btn btn-bluish btn-lg btn-primary clickable-ratio ${day === 'Wednesday' ? 'active' : ''}`}>W</button>
                        <button onClick={thursday} type="button" className={`mx-1 nav-text btn btn-bluish btn-primary btn-lg clickable-ratio ${day === 'Thursday' ? 'active' : ''}`}>T</button>
                        <button onClick={friday} type="button" className={`mx-1 nav-text btn btn-bluish btn-primary btn-lg clickable-ratio ${day === 'Friday' ? 'active' : ''}`}>F</button>
                    </div>
                    <div className="col-sm-4 d-flex justify-content-end">
                    { !viewMode (
                        <>
                            <button onClick={update_save} type="button" className='mx-1 nav-text btn btn-primary btn-bluish btn-lg action-ratio'>Save</button>
                            <ClearEvents setUpdate={setUpdate} update={update} setAuth={setAuth} address={address} setIsOffline={setIsOffline}/>
                        </>
                    )}
                    </div>
                </div>
            </div>
    );
};

export default Navbar;