import React from 'react';
import { useEffect, useState } from 'react';

const FormatJSON = ({address}) => {
  const [data, setData] = useState(null);
  useEffect(() => {
      const requestOptions = {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
          credentials: "include"
      };
      fetch(`${address}/export_json`, requestOptions)
          .then((lRes) => {
            return lRes.json();
          })
          .then((res) => {
              setData(res.events);
              console.log(res.events);
          })
          .catch((error) => {
              console.log(error);
          });
  }, [address]);

  if (data) {
    return (
      <React.Fragment>
        &#91;<br />
        {data.map((item, index) => (
          <React.Fragment key={index}>
            <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>&#123;<br />
            <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
            "title": "{item.title}",<br />
            <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
            "organizer": {JSON.stringify(item.organizer)},<br />
            <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
            "time": "{item.time}",<br />
            <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
            "day": "{item.day}",<br />
            <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>&#125;{index !== data.length - 1 && ','}<br />
          </React.Fragment>
        ))}
        &#93;
      </React.Fragment>
    );
  } else {
    return (<span>Loading...</span>);
  }
};

export default FormatJSON;