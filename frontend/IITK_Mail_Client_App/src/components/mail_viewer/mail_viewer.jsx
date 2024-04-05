import React from 'react'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import "./mail_viewer.css"
import parse from 'html-react-parser';
import { useState } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
const Data = {
    subject : "[students] [Music Club] Call for Secretary Nominations",
    from : "General Secretary, Media and Culture ",
    time: "2024-04-05 19:04",
    body : "<h3><strong><u>Hello everyone,Greetings from the Music Club, IITK!</u></strong></h3><h3><br></h3><h3>The&nbsp;<strong>Music Club</strong>&nbsp;comprises the music enthusiasts of the campus who share a passion for performing and creating music, as well as pushing the boundaries of their technique by experimenting with different dynamic aspects of music across a wide range of genres and domains.</h3><h3><br></h3><h3>In addition to performance, we explore music production and recording, original compositions and releases, songwriting, collaborations, and mixing.Throughout the year, the club hosts three major performance events -&nbsp;<em>Musical Extravaganza 1 &amp; 2 and Acoustic Night</em>&nbsp;- and competes in the major national competitions.</h3><p><br></p>"

}
const Mail_Viewer = () => {
    const { id } = useParams();
    const [mail, setMail] = useState(null);
    // console.log(id)

  useEffect(() => {
    const fetchMail = async () => {
      try {
        const response = await fetch(`../../../Mails.json`);
        const data = await response.json();
        const foundMail = data.find(mail => mail.id === parseInt(id));
        setMail(foundMail);
        console.log(mail)
      } catch (error) {
        console.error('Error fetching mail:', error);
      }
    };

    fetchMail();
  }, [id]);

  return (
    <div className='mail-viewer-wrapper'>
        {mail ? (
                <div className='mail-viewer-text-content'>
                    <h3 className="mail-viewer-heading">{mail.subject}</h3>
                    <div className='mail-viewer-from-section'>
                        <AccountCircleIcon sx={{fontSize: "36px", mr : "5px"}} />
                        <span >From:</span> <span style={{fontWeight: 700}}>{mail.sender}</span>
                        <span> on </span> <span style={{fontWeight: 700}}>{mail.time}</span>
                    </div>
                    <div className='mail-viewer-body-section'>
                        {parse(mail.body)}
                    </div>
                </div>
            ) : (
                <div className='mail-viewer-default-state'>
                </div>
            )}
            
    </div>
  )
}

export default Mail_Viewer