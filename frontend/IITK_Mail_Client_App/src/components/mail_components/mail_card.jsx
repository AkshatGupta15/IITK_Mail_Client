import React from 'react'
import { Link } from 'react-router-dom'

const MailCard = () => {
  return (
    <>
    <Link to="/Mail1" style={{textDecoration: "none", color: "inherit"}}>
      <div className='mail-container'>
          <div className='mail-icons'>
              select
              star
          </div>
          <div className='mail-text'>
              subject
              body
          </div>
      </div>
    </Link>
    </>

  )
}

export default MailCard
