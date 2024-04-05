import React from 'react'
import Inbox from '../inbox/inbox'
import Mail_Viewer from '../mail_viewer/mail_viewer'
import "./mail_screen_layout.css"
const Mail_screen_layout = () => {
  return (
    <div className='mail-screen-container'>
        <div className='mail-screen-inbox'>
            <Inbox/>
            
        </div>
        <div className='mail-screen-mail-viewer'>
            <Mail_Viewer/>
        </div>
    </div>
  )

}

export default Mail_screen_layout