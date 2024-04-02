import { useState } from 'react'
import './App.css'
import NewLogin from './pages/New_Login'
import "bootstrap/dist/css/bootstrap.min.css"
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout/Layout'
import Home from './components/Home/Home'
import Inbox from './components/inbox/inbox'
import Compose from './components/compose/compose'
import Signup from './pages/signup'


function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<NewLogin/>}  />
        <Route path="/signup" element={<Signup/>}  />
        <Route path="/" element={<Home/>}  >
          <Route path="/inbox" element={<Inbox/>}  />
          <Route path="/compose" element={<Compose/>}  />
        </Route>
       
      </Routes>
    </BrowserRouter>
  )
}

export default App
