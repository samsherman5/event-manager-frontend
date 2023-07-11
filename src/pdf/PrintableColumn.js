const PrintableColumn = ({time, _id, organizer, title}) => {
    return (
        <div id={_id} className="printable-no-border list-group-item d-flex st-backgroundblue align-items-start" aria-current="true">
            <div className="d-flex align-items-start">
                <small id={`time-tag-${_id}`} className="mb-0 me-3 printable-color text-nowrap printable-time printable-text small-tag" type="button">
                    {time}
                </small>
            <div>
                    <h6 className="mb-0 printable-orange printable-text printable-title text-nowrap">{title}</h6>
                    <p className="autofill-p printable-text printable-light printable-color autofill-main-printable text-no-wrap m-0 p-0">
                        Run by {organizer.map((item, index) => (
                        <span key={index}>
                            {index !== 0 && " and "}
                            {organizer[index]}
                        </span>
                        ))}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default PrintableColumn;
