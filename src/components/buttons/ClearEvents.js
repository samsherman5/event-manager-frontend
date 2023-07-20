import { $ } from "react-jquery-plugin";

const ClearEvents = ({ setUpdate, update, setAuth, address, setIsOffline }) => {
  function hideModal() {
    $("#confirmClear").modal("hide");
  }

  function showModal() {
    $("#confirmClear").modal("show");
  }

  function clear_events() {
    const requestOptions = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "x-vercel-deployment-url": process.env.REACT_APP_DEPLOYMENT_URL,
      },
      credentials: "include",
    };
    fetch(`${address}/clear_events`, requestOptions)
      .then((res) => {
        if (res.status === 401) {
          setAuth(true);
          return;
        }
        setUpdate(!update);
        hideModal();
      })
      .catch((error) => {
        hideModal();
        console.log(error);
        setIsOffline(true);
      });
  }

  return (
    <>
      <button
        onClick={showModal}
        type="button"
        className="mx-1 btn-primary nav-text btn btn-bluish btn-lg action-ratio"
      >
        Clear
      </button>

      <div
        className="modal fade"
        id="confirmClear"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="unsavedChanges"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLongTitle">
                Clear All Events
              </h5>
            </div>
            <div className="modal-body">Are you sure you want to do this?</div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-danger"
                onClick={clear_events}
              >
                Clear All Events
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={hideModal}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ClearEvents;
