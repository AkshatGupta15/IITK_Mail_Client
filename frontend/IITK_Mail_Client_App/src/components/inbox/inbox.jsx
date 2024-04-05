import React from 'react';
import MailCard from '../mail_components/mail_card';
import { useState, useEffect } from 'react';
import ScrollTop from '../scroll/scrollTop';
import { Fab } from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import "./inbox.css"

function Inbox() {
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
        <div className='inbox-container'>
          {/* Conditionally render MailCard only when data is available */}
          {/* {data.length > 0 && <MailCard Data={data[0]} />} */}
          {data.map((mail, index) => (
            <MailCard key={index} Data={mail} />
          ))}
          <ScrollTop {...data}>
            <Fab size="small" aria-label="scroll back to top">
                <KeyboardArrowUpIcon />
            </Fab>
          </ScrollTop>
        </div>
    </>
  );
}

export default Inbox;
