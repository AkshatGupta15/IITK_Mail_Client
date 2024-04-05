import { useState } from 'react'
import './App.css'
import NewLogin from './pages/New_Login'
import "bootstrap/dist/css/bootstrap.min.css"
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './components/Home/Home'
import Inbox from './components/inbox/inbox'
import Compose from './components/compose/compose'
import Signup from './pages/signup'
import Starred from './components/starred/starred'
import Mail_Viewer from './components/mail_viewer/mail_viewer'
import Mail_screen_layout from './components/mail_screen_layout/mail_screen_layout'
import Draft from './components/draft/draft'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<NewLogin/>}  />
        <Route path="/signup" element={<Signup/>}  />
        <Route path="/" element={<Home/>}  >
          {/* <Route path="/" el */}
          {/* <Route path="/inbox" element={<Inbox/>} > */}
          <Route path="/inbox" element={<Mail_screen_layout/>} >

            <Route path='/inbox/:id' element={<Mail_Viewer/>} />
          </Route>
          <Route path="/starred" element={<Starred/>} >
            <Route path='/starred/:id' element={<Mail_Viewer/>} />
          </Route>
          <Route path="/drafts" element={<Draft/>} />
          <Route path="/compose" element={<Compose/>} />
        </Route>
       
      </Routes>
    </BrowserRouter>
  )
}

export default App
