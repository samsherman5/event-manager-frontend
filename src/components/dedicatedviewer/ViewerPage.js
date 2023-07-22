/* eslint-disable react-hooks/exhaustive-deps */
import ColumnView from "./ColumnView";
import WeatherView from "./WeatherView";
import { useEffect, useState } from "react";
import config from "../../config/viewer_config.json";

const ViewerPage = ({ day, setDay, address }) => {
  const [currentComponent, setCurrentComponent] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [pages, setPages] = useState([
    { component: <WeatherView address={address} />, time: config.weatherTime },
  ]);

  useEffect(() => {
    if (pages.length > 0) {
      setCurrentComponent(pages[currentIndex].component);
      const timer = setTimeout(() => {
        setCurrentIndex((currentIndex + 1) % pages.length);
      }, pages[currentIndex].time);
      return () => clearTimeout(timer);
    }
  }, [pages, currentIndex]);

  useEffect(() => {
    //create code that given the list of events will create ColumnView components and put them in the pages array
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        day: day,
        "vercel-deployment-url": process.env.REACT_APP_DEPLOYMENT_URL,
      },
      credentials: "include",
    };

    fetch(`${address}/viewer_events`, requestOptions).then((res) => {
      if (res.status === 401) {
        return Promise.reject(); // Reject the promise to skip to the catch block
      } else {
        return res.json().then((data) => {
          if (data) {
            const groupedEvents = data.events.reduce((acc, curr, index) => {
              if (index % config.eventsPerPage === 0) acc.push([]);
              acc[acc.length - 1].push(curr);
              return acc;
            }, []);

            const newpages = [
              ...pages,
              ...groupedEvents.map((group, index) => {
                return {
                  component: <ColumnView key={index} events={group} />,
                  time: config.eventsTime,
                };
              }),
            ];
            setPages(newpages);
          }
        });
      }
    });
  }, [day]);

  return (
    <div className="container-fluid viewer-page-container">
      <div className="row">{currentComponent}</div>
    </div>
  );
};

export default ViewerPage;
