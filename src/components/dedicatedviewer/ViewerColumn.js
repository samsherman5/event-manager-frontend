const ViewerColumn = ({organizers, time, _id, title}) => {
    return (
        
        <div id={_id} className="list-group-item d-flex gap-2 p-2 st-backgroundblue" aria-current="true">
            <div className="d-flex gap-2 w-100 justify-content-between">
                <div className="flex-grow-1">
                    <div className="d-flex flex-fill align-items-center">
                    <button id={`time-tag-${_id}`} className="btn btn-white text-nowrap time" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                        {time}
                    </button>
                        <div className='me-3 d-flex align-items-center'>
                            <span 
                                className="d-inline editable-content title m-0 p-0"
                            >
                                {title}
                            </span>
                        </div>
                    </div>
                </div>
                <div className="flex-grow-0 d-flex align-items-center">
                    <div className="d-flex">
                    {organizers.map((item) => {
                        return (
                            <div className="col-auto p-0 mt-0 me-1">
                                <div className="d-inline-flex align-items-center justify-content-center py-1 px-2 w-auto text-nowrap mt-0 organizer-nametag">
                                    <p
                                        spellCheck={false}
                                        className="align-items-center d-flexautofill-p autofill-main m-0 p-0"
                                    >
                                        {item}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ViewerColumn;