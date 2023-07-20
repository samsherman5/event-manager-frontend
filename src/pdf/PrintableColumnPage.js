import { useEffect, useState } from "react";
import PrintableColumn from "./PrintableColumn";

const PrintableColumnPage = ({ day, address, view }) => {
  const [columns, setColumns] = useState([]);

  useEffect(() => {
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
      .then((res) => res.json())
      .then((data) => {
        setColumns(data.events);
        console.log(data);
      });
  }, [address, day]);

  return (
    <div>
      {!view && (
        <div>
          <h3 className="text-left printable-dorange">{day}</h3>
          <hr className="" />
        </div>
      )}
      <div className="d-flex flex-column flex-md-row pb-1 gap-4 align-items-center justify-content-center">
        <div className="list-group">
          {columns.map((column, index) => {
            return (
              <PrintableColumn
                key={index}
                _id={column._id}
                title={column.title}
                organizer={column.organizer}
                day={day}
                time={column.time}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PrintableColumnPage;
