import Theme from '../components/subcomponents/Theme';
// import Weather from '../components/Weather';
import { useState } from 'react';
import ColumnPage from '../components/ColumnPage';
import Loader from '../components/Loader';
import Footer from '../components/Footer';
import Clock from '../components/subcomponents/Clock';

function Main({address, day, setDay, browser}) {
  const [update, setUpdate] = useState(false); // triggers a refresh of events
  const [saveUpdate, setSaveUpdate] = useState(false); // triggers a save of events
  const [unsavedChanges, setUnsavedChanges] = useState(false); // unsaved changes

  // Loader
  const [isOffline, setIsOffline] = useState(false);
  const [auth, setAuth] = useState(false);
  document.body.style.backgroundColor = '#1F3B7C';

  return (
    <div className="App d-flex flex-column min-vh-100">
      <div className="mt-3">
        <Clock size={'h1'}/>
      </div>
      <Loader day={day} browser={browser} auth={auth} isOffline={isOffline}/>
      <Theme day={day}/>
      <div className="container flex-grow-1">
        <div className="row">
          <div className="col">
            <ColumnPage viewMode={true} setAuth={setAuth} setIsOffline={setIsOffline} address={address} unsavedChanges={unsavedChanges} setUnsavedChanges={setUnsavedChanges} update={update} setSaveUpdate={setSaveUpdate} saveUpdate={saveUpdate} setUpdate={setUpdate} day={day}/>
          </div>
        </div>
      </div>
      <Footer viewMode={true}/>
    </div>
  );
}

export default Main;
