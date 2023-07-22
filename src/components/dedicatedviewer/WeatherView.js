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
    <div className="container mt-5">
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
                  className="mt-2 card-img-top small-image"
                />
                <div className="card-body">
                  <h5 className="card-title">{weather.today.day}</h5>
                  <p className="card-text">{weather.today.high}° High</p>
                  <p className="card-text">{weather.today.low}° Low</p>
                  <p className="card-text">{weather.today.desc}</p>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="card border-0 shadow">
                <img
                  src={weather.tomorrow.image}
                  alt={weather.tomorrow.desc}
                  className="card-img-top mt-2 small-image"
                />
                <div className="card-body">
                  <h5 className="card-title">{weather.tomorrow.day}</h5>
                  <p className="card-text">{weather.tomorrow.high}° High</p>
                  <p className="card-text">{weather.tomorrow.low}° Low</p>
                  <p className="card-text">{weather.tomorrow.desc}</p>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="card border-0 shadow">
                <img
                  src={weather.overmorrow.image}
                  alt={weather.overmorrow.desc}
                  className="card-img-top mt-2 small-image"
                />
                <div className="card-body">
                  <h5 className="card-title">{weather.overmorrow.day}</h5>
                  <p className="card-text">{weather.overmorrow.high}° High</p>
                  <p className="card-text">{weather.overmorrow.low}° Low</p>
                  <p className="card-text">{weather.overmorrow.desc}</p>
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
