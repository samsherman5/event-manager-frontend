/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from "react";
import Organizers from "./subcolumn/Organizers";
import Time from "./subcolumn/Time";
import Title from "./subcolumn/Title";
import Tagline from "./subcolumn/Tagline";

const Column = ({
  organizer,
  unsavedChanges,
  saveUpdate,
  setSaveUpdate,
  setUnsavedChanges,
  time,
  _id,
  setUpdate,
  update,
  setIsOffline,
  setAuth,
  address,
  day,
  title,
  tagline,
}) => {
  // States & Refs
  const [organizers, setOrganizers] = useState(organizer); // For exiting input
  const titleRef = useRef(null);
  const timeRef = useRef(null);
  const taglineRef = useRef(null);

  // ----------------------------------------

  function deleteColumn() {
    const requestOptions = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "vercel-deployment-url": process.env.REACT_APP_DEPLOYMENT_URL,
      },
      body: JSON.stringify({
        _id: _id,
      }),
      credentials: "include",
    };
    fetch(`${address}/remove_event`, requestOptions)
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

  function saveColumn() {
    const requestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "vercel-deployment-url": process.env.REACT_APP_DEPLOYMENT_URL,
      },
      body: JSON.stringify({
        _id: _id,
        title: titleRef.current.textContent,
        organizer: organizers,
        time: timeRef.current.textContent,
        tagline: taglineRef.current.textContent,
        day: day,
      }),
      credentials: "include",
    };
    fetch(`${address}/edit_event`, requestOptions)
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

    if (unsavedChanges) {
      setUnsavedChanges(false);
    }

    return;
  }

  // saves when a save is triggered
  useEffect(() => {
    if (saveUpdate === true) {
      saveColumn();
      setSaveUpdate(false);
    }
  }, [saveUpdate]);

  return (
    <div
      id={_id}
      className="list-group-item d-flex gap-2 p-2 st-backgroundblue"
      aria-current="true"
    >
      <div className="d-flex gap-2 w-100 justify-content-between">
        <div className="flex-grow-1">
          <div className="d-flex flex-fill align-items-center">
            <Time
              unsavedChanges={unsavedChanges}
              setUnsavedChanges={setUnsavedChanges}
              _id={_id}
              timeRef={timeRef}
              time={time}
              day={day}
            />
            <Title
              unsavedChanges={unsavedChanges}
              setUnsavedChanges={setUnsavedChanges}
              title={title}
              titleRef={titleRef}
            />
            <Tagline
              unsavedChanges={unsavedChanges}
              setUnsavedChanges={setUnsavedChanges}
              tagline={tagline}
              taglineRef={taglineRef}
            />
          </div>
        </div>
        <div className="flex-grow-0 d-flex align-items-center">
          <div className="d-flex">
            <Organizers
              unsavedChanges={unsavedChanges}
              setUnsavedChanges={setUnsavedChanges}
              organizers={organizers}
              setOrganizers={setOrganizers}
            />
            <div className="d-flex column-settings h-25 m-1 align-items-center justify-content-center ml-auto">
              <button
                onClick={deleteColumn}
                className="weight-500 column-settings-inner text-wrap"
              >
                X
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Column;
