import React, { useEffect, useRef, useState } from 'react';
import userLogo from "../../assets/userLogo.svg";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import "./dropdown.css";

const Dropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef();

  useEffect(() => {
    const handler = (e) => {
      if (!menuRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, []);

  return (
    <>
      <div className='user-dropdown' ref={menuRef}>
        <div className='user-dropdown-icon' onClick={() => setIsOpen(!isOpen)}>
          <img src={userLogo} className='user-img-logo' alt="user logo" />
        </div>
      </div>
      <div className={`dropdown-menu-content ${isOpen ? 'open-class' : 'closed-class'}`}>
        <ul className='dropdown-menu-ul'>
          <li> <AccountCircleIcon/> Profile</li>
          <li><LogoutIcon/>Logout</li>
        </ul>
      </div>
    </>
  );
};

export default Dropdown;
