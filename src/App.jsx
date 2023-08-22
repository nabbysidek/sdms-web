import { useState } from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Layout from './components/layout/Layout'
import SignIn from './pages/sign in/SignIn'
import SignUp from './pages/sign up/SignUp'
import NoPage from './pages/NoPage'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Layout />} />
          <Route index element={<SignIn />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='*' element={<NoPage />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
