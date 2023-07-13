import Theme from '../components/subcomponents/Theme';
// import Weather from '../components/Weather';
import { useState } from 'react';
import ColumnPage from '../components/ColumnPage';
import Loader from '../components/Loader';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import UnsavedChanges from '../components/UnsavedChanges';

function Main({address, day, setDay, browser}) {
  const [update, setUpdate] = useState(false); // triggers a refresh of events
  const [saveUpdate, setSaveUpdate] = useState(false); // triggers a save of events
  const [unsavedChanges, setUnsavedChanges] = useState(false); // unsaved changes
  const [navUnsavedChanges, setNavUnsavedChanges] = useState(false); // unsaved changes triggering modal

  // Loader
  const [isOffline, setIsOffline] = useState(false);
  const [auth, setAuth] = useState(false);
  document.body.style.backgroundColor = '#1F3B7C';

  return (
    <div className="App d-flex flex-column min-vh-100">
      <UnsavedChanges unsavedChanges={unsavedChanges} navUnsavedChanges={navUnsavedChanges} setNavUnsavedChanges={setNavUnsavedChanges}/>
      <Loader day={day} browser={browser} auth={auth} isOffline={isOffline}/>
      <Navbar setAuth={setAuth} setIsOffline={setIsOffline} unsavedChanges={unsavedChanges} setUnsavedChanges={setUnsavedChanges} navUnsavedChanges={navUnsavedChanges} setNavUnsavedChanges={setNavUnsavedChanges} setSaveUpdate={setSaveUpdate} saveUpdate={saveUpdate} setUpdate={setUpdate} update={update} day={day} address={address} setDay={setDay}/>
      <Theme day={day}/>
      <div className="container flex-grow-1">
        <div className="row">
          {/* <div className="col">
            <Weather setAuth={setAuth} address={address}/>
          </div> */}
          <div className="col -8">
            <ColumnPage setAuth={setAuth} setIsOffline={setIsOffline} address={address} unsavedChanges={unsavedChanges} setUnsavedChanges={setUnsavedChanges} update={update} setSaveUpdate={setSaveUpdate} saveUpdate={saveUpdate} setUpdate={setUpdate} day={day}/>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
}

export default Main;
