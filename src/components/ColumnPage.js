/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import Column from "./Column";

const ColumnPage = ({
  day,
  setAuth,
  unsavedChanges,
  setUnsavedChanges,
  setSaveUpdate,
  saveUpdate,
  update,
  setUpdate,
  setIsOffline,
  address,
}) => {
  const [columns, setColumns] = useState([]);

  // add column
  function addColumn() {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "vercel-deployment-url": process.env.REACT_APP_DEPLOYMENT_URL,
      },
      body: JSON.stringify({
        title: "Event Name",
        organizer: ["Organizer"],
        time: "6:30PM",
        tagline: "Tagline",
        location: "Location",
        day: day,
      }),
      credentials: "include",
    };
    fetch(`${address}/create_event`, requestOptions)
      .then((res) => {
        if (res.status === 401) {
          setAuth(true);
          return;
        }
        return res.json(); // Continue to the next step when status is not 401
      })
      .then((data) => {
        setUpdate(!update);
      })
      .catch((error) => {
        console.log(error);
        setIsOffline(true);
      });
  }

  function updateColumns() {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        day: day,
        "vercel-deployment-url": process.env.REACT_APP_DEPLOYMENT_URL,
      },
      credentials: "include",
    };

    fetch(`${address}/events`, requestOptions)
      .then((res) => {
        if (res.status === 401) {
          setAuth(true);
          return Promise.reject(); // Reject the promise to skip to the catch block
        } else {
          return res.json().then((data) => {
            if (data) {
              setColumns(data.events);
            }
          });
        }
      })
      .catch((error) => {
        console.log(error);
        setIsOffline(true);
      });
  }

  // update events
  useEffect(() => {
    updateColumns();
  }, [day, update]);

  return (
    <div>
      <div className="d-flex flex-column flex-md-row gap-4 align-items-center justify-content-center">
        <div className="list-group">
          {columns.map((column, index) => {
            return (
              <Column
                setAuth={setAuth}
                key={column._id}
                setIsOffline={setIsOffline}
                address={address}
                unsavedChanges={unsavedChanges}
                setUnsavedChanges={setUnsavedChanges}
                setSaveUpdate={setSaveUpdate}
                saveUpdate={saveUpdate}
                setUpdate={setUpdate}
                update={update}
                _id={column._id}
                title={column.title}
                organizer={column.organizer}
                day={day}
                tagline={column.tagline}
                time={column.time}
                location={column.location}
              ></Column>
            );
          })}
        </div>
      </div>

      <div
        id="add-column-container"
        className="mt-0 pt-0 d-flex flex-column flex-md-row pt-1 pb-1 gap-4 align-items-center justify-content-center"
      >
        <button
          onClick={addColumn}
          className="btn btn-hover w-100 weight-500"
          id="add-column"
          type="submit"
        >
          + Add another event
        </button>
      </div>
    </div>
  );
};

export default ColumnPage;
