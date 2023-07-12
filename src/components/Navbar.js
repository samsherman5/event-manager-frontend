import { ImageRender, PDFRender } from '../pdf/Render';

const Navbar = ({setAuth, setIsOffline, unsavedChanges, setUnsavedChanges, setNavUnsavedChanges, setSaveUpdate, setUpdate, update, day, address, setDay}) => {
    
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

    function clear_events () {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: "include"
        };
        fetch(`${address}/clear_events`, requestOptions)
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
                        <PDFRender address={address}/>
                        <ImageRender day={day} address={address}/>
                    </div>
                    <div className="col-sm-4 d-flex justify-content-center">
                        <button onClick={sunday} type="button" className={`mx-1 nav-text btn btn-primary btn-lg clickable-ratio ${day === 'Sunday' ? 'active' : ''}`}>S</button>
                        <button onClick={monday} type="button" className={`mx-1 nav-text btn btn-primary btn-lg clickable-ratio ${day === 'Monday' ? 'active' : ''}`}>M</button>
                        <button onClick={tuesday} type="button" className={`mx-1 nav-text btn btn-primary btn-lg clickable-ratio ${day === 'Tuesday' ? 'active' : ''}`}>T</button>
                        <button onClick={wednesday} type="button" className={`mx-1 nav-text btn btn-primary btn-lg clickable-ratio ${day === 'Wednesday' ? 'active' : ''}`}>W</button>
                        <button onClick={thursday} type="button" className={`mx-1 nav-text btn btn-primary btn-lg clickable-ratio ${day === 'Thursday' ? 'active' : ''}`}>T</button>
                        <button onClick={friday} type="button" className={`mx-1 nav-text btn btn-primary btn-lg clickable-ratio ${day === 'Friday' ? 'active' : ''}`}>F</button>
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