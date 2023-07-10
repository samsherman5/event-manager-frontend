import { useEffect } from 'react';
import { $ }  from 'react-jquery-plugin';

const UnsavedChanges = (props) => {
  useEffect(() => {
    const handleBeforeUnload = (event) => {
      if (props.unsavedChanges) {
        event.preventDefault();
        event.returnValue = '';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [props.unsavedChanges]);
  
  useEffect(() => {
    if(props.navUnsavedChanges === true) {
      $('#unsavedChanges').modal('show');
    } else {
      $('#unsavedChanges').modal('hide');
    }
  }, [props.navUnsavedChanges]);

  function hideModal() {
    props.setNavUnsavedChanges(!props.navUnsavedChanges);
    $('#unsavedChanges').modal('hide');
  }
  return (
    <div className="modal fade" id="unsavedChanges" tabIndex="-1" role="dialog" aria-labelledby="unsavedChanges" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLongTitle">Unsaved Changes</h5>
          </div>
          <div className="modal-body">
            Please save your changes before leaving this page.
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={hideModal}>Continue</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UnsavedChanges;