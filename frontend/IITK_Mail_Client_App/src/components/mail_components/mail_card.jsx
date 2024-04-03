// import React from 'react'

// const MailCard = () => {
//   return (
//     <>
//     <div className='mail-container'>
//         <div className='mail-icons'>
//             select
//             star
//         </div>
//         <div className='mail-text'>
//             subject
//             body
//         </div>
//     </div>
//     </>

//   )
// }

// export default MailCard
import React from "react";

const MailCard = ({ title, children }) => {
  const [isHovered, setIsHovered] = React.useState(false);

  const handleClick = () => {
    // Handle click event here
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div
      className="card"
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="card-title">
        <h3>{title}</h3>
      </div>
      <div className="card-content">
        {children}
      </div>
    </div>
  );
};

export default MailCard;