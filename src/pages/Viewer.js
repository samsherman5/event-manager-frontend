import Theme from "../components/subcomponents/Theme";
import { useState } from "react";
import ViewerPage from "../components/dedicatedviewer/ViewerPage";
import Loader from "../components/Loader";
import Clock from "../components/subcomponents/Clock";

function Viewer({ address, day, setDay, browser }) {
  // Loader
  const [isOffline] = useState(false);
  const [auth] = useState(false);
  document.body.style.backgroundColor = "#1F3B7C";

  return (
    <div className="App d-flex flex-column" id="Viewer">
      <div className="mt-3">
        <Clock size={"display-5"} />
        <div className="mt-3">
          <Theme day={day} />
        </div>
      </div>
      <Loader day={day} browser={browser} auth={auth} isOffline={isOffline} />
      <div className="container flex-grow-1">
        <div className="row">
          <div className="col">
            <ViewerPage setDay={setDay} address={address} day={day} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Viewer;
