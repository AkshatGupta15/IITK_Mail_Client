import React from 'react';
import MailCard from '../mail_components/mail_card';
import { useState, useEffect } from 'react';

function Starred() {
  const url = "../../../Mails.json";
  const [data, setData] = useState([]);

  const fetchInfo = async () => {
    const res = await fetch(url);
    const d = await res.json();
    setData(d);
  }

  useEffect(() => {
    fetchInfo();
  }, []);

  return (
    <>
      <div>
        <p>Starred</p>
        {/* Conditionally render MailCard only when data is available */}
        {/* {data.length > 0 && <MailCard Data={data[0]} />} */}
        {data.map((mail, index) => (
          <MailCard key={index} Data={mail} />
        ))}
      </div>
    </>
  );
}

export default Starred;
