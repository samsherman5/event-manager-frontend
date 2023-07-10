import PrintableColumn from './PrintableColumn';
import { useState, useEffect } from 'react';

const PrintableColumnPage = (props) => {
    const [columns, setColumns] = useState([]);

    useEffect(() => {
      const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', 'day': props.day },
        credentials: "include"
      };

      fetch(`${props.address}/events`, requestOptions)
        .then((res) => res.json())
        .then((data) => {
          setColumns(data.events);
          console.log(data);
        });
    }, [props.address, props.day]);

    return (
      <div>
        <h3 className="text-left printable-dorange">{props.day}</h3>
        <hr className=""/>
          <div className="d-flex flex-column flex-md-row pb-1 gap-4 align-items-center justify-content-center">
            <div className="list-group">
              {columns.map((column, index) => {
                  return (
                    <PrintableColumn key={index} _id={column._id} title={column.title} organizer={column.organizer} day={props.day} time={column.time}/>
                  );
              })}
            </div>
        </div>
      </div>
    );
};

export default PrintableColumnPage;