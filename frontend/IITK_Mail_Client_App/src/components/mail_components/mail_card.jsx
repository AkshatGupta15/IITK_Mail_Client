import React from 'react'
import { Link } from 'react-router-dom'
import { pink } from '@mui/material/colors';
import Checkbox from '@mui/material/Checkbox';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';
import "./mailCard.css"


const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
// const Data = {
//   email : "AK@gmail.com",
//   subject : "THis is subject",
//   body : "<p>This is <strong>Akshat</strong></p><p><br></p><h2>THis is HEading </h2><p><br></p><blockquote>This is Heading </blockquote>"
// }
function removeHtmlTags(html) {
  return html.replace(/<[^>]*>/g, ' ');
}

const MailCard = ({Data}) => {
  const handleCheckboxClick = (event) => {
    // Stop event propagation to prevent the link from being triggered
    event.stopPropagation();
  };

  return (
    <>
      <Link to={{ pathname: `/inbox/${Data.id}`}} style={{textDecoration: "none", color: "inherit"}}>
        <div className='mail-container'>
          <div className='mail-icons'>
            {/* Attach onClick handler to checkbox */}
            <Checkbox {...label} onClick={handleCheckboxClick} />
            <Checkbox 
            icon={<StarBorderIcon style={{ color: '#FFD700' }} />} // Unchecked icon
            checkedIcon={<StarIcon style={{ color: '#FFD700' }} />} // Checked icon
            {...label} onClick={handleCheckboxClick} />
          </div>
          <div className='mail-text lato-light-italic'>
            <span className='span-email '>{Data.sender}</span>
            <span className='span-subject'>{Data.subject}</span>
            <span className='span-body'>{removeHtmlTags(Data.body)}</span>
          </div>
        </div>
      </Link>
    </>
  )
}

export default MailCard
