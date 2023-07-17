/* eslint-disable react-hooks/exhaustive-deps */
import OtherView from './OtherView';
import ColumnView from './ColumnView';
import WeatherView from './WeatherView';
import { useEffect, useState } from 'react';

const ViewerPage = ({day, setDay, address}) => {
    const [showWeatherView, setShowWeatherView] = useState(false);

    useEffect(() => {
        const timer = setInterval(() => {
            setShowWeatherView(false);
          }, 6600);
          
          setTimeout(() => {
            clearInterval(timer);
            setInterval(() => {
              setShowWeatherView((prevShowWeatherView) => !prevShowWeatherView);
            }, 13400);
          }, 13400);
      
        // Clean up the interval when the component unmounts or the dependency changes
        return () => clearInterval(timer);
      }, []);

    return (
        <div className="container-fluid viewer-page-container">
            <div className="row">
                <div className={`col collapse ${showWeatherView ? 'show' : ''}`}>
                    <ColumnView day={day} setDay={setDay} address={address} />
                </div>
                <div className={`col collapse ${showWeatherView ? '' : 'show'}`}>
                    <WeatherView address={address} />
                    <OtherView/>
                </div>
            </div>
        </div>
    );
};

export default ViewerPage;