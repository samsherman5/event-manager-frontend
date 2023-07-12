import Clock from '../components/Clock';
import Weather from '../components/Weather';
import { useState } from 'react';
import ColumnPage from '../components/ColumnPage';
import Loader from '../components/Loader';
import Navbar from '../components/Navbar';
import UnsavedChanges from '../components/UnsavedChanges';

function Main({address}) {
  console.log("Ran");
  document.body.style.backgroundColor = '#2d5dcf';
  const [update, setUpdate] = useState(false); // triggers a refresh of events
  const [saveUpdate, setSaveUpdate] = useState(false); // triggers a save of events
  const [day, setDay] = useState("None"); // sets the current day
  const [unsavedChanges, setUnsavedChanges] = useState(false); // unsaved changes
  const [navUnsavedChanges, setNavUnsavedChanges] = useState(false); // unsaved changes triggering modal

  // Loader
  const [isOffline, setIsOffline] = useState(false);
  const [auth, setAuth] = useState(false);
  
  if(day === 'None'){
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

  return (
    <div className="App">
      <UnsavedChanges unsavedChanges={unsavedChanges} navUnsavedChanges={navUnsavedChanges} setNavUnsavedChanges={setNavUnsavedChanges}/>
      <Loader auth={auth} isOffline={isOffline}/>
      <Navbar setAuth={setAuth} setIsOffline={setIsOffline} unsavedChanges={unsavedChanges} setUnsavedChanges={setUnsavedChanges} navUnsavedChanges={navUnsavedChanges} setNavUnsavedChanges={setNavUnsavedChanges} setSaveUpdate={setSaveUpdate} saveUpdate={saveUpdate} setUpdate={setUpdate} update={update} day={day} address={address} setDay={setDay}/>
      <Clock/>
      <div className="container">
        <div className="row">
          <div className="col">
            {/* Weather */}
            <Weather setAuth={setAuth} address={address}/>
          </div>
          <div className="col-8">
            <ColumnPage setAuth={setAuth} setIsOffline={setIsOffline} address={address} unsavedChanges={unsavedChanges} setUnsavedChanges={setUnsavedChanges} update={update} setSaveUpdate={setSaveUpdate} saveUpdate={saveUpdate} setUpdate={setUpdate} day={day}/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Main;
