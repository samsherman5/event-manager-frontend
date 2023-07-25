/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";

const Weather = ({ address }) => {
  const [weather, setWeather] = useState([]);

  const [isLoading, setIsLoading] = useState(true);
  const [isOffline, setIsOffline] = useState(false);

  useEffect(() => {
    fetch(`${address}/weather`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "vercel-deployment-url": process.env.REACT_APP_DEPLOYMENT_URL,
      },
      credentials: "include",
    })
      .then((res) => {
        if (res.status === 401) {
          setIsOffline(true);
          setIsLoading(false);
          return;
        }
        return res.json();
      })
      .then((data) => {
        setWeather(data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err.message);
        setIsLoading(false);
        setIsOffline(true);
      });
  }, [address]);

  return (
    <div className="container mt-5 pt-5">
      {isOffline ? (
        <div className="row mb-2">
          <p className="text-white">
            Unable to access the weather. Please check your internet connection.
          </p>
        </div>
      ) : isLoading ? (
        <div className="row mb-2">
          <p className="text-white">Loading...</p>
        </div>
      ) : (
        <>
          <div className="row mb-2">
            <div className="col">
              <div className="card border-0 shadow">
                <img
                  src={weather.today.image}
                  alt={weather.today.desc}
                  className="mt-5 card-img-top small-image mx-auto"
                />
                <div className="card-body">

                  <h1 className="card-title">{weather.today.low}°/{weather.today.high}°</h1>
                  <h5 className="card-text">{weather.today.desc}</h5>
                  <div className="m-5">
                    <h2 className="card-title">{weather.today.day}</h2>
                  </div>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="card border-0 shadow">
                <img
                  src={weather.tomorrow.image}
                  alt={weather.tomorrow.desc}
                  className="card-img-top mt-2 small-image mx-auto"
                />
                <div className="card-body">
                  
                  <h1 className="card-title">{weather.tomorrow.low}°/{weather.tomorrow.high}°</h1>
                  <h5 className="card-text">{weather.tomorrow.desc}</h5>
                  <div className="m-5">
                    <h2 className="card-title">{weather.tomorrow.day}</h2>
                  </div>
                  
                </div>
              </div>
            </div>
            <div className="col">
              <div className="card border-0 shadow">
                <img
                  src={weather.overmorrow.image}
                  alt={weather.overmorrow.desc}
                  className="card-img-top mt-2 small-image mx-auto"
                />
                <div className="card-body">
                  <h1 className="card-title">{weather.overmorrow.low}°/{weather.tomorrow.high}°</h1>
                  <h5 className="card-text">{weather.overmorrow.desc}</h5>
                  <div className="m-5">
                    <h2 className="card-title">{weather.overmorrow.day}</h2>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Weather;
