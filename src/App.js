import React, { useState } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { Home } from './pages/home/Home'
import { Login } from './pages/login/Login'
import { AuthProvider } from './context/AuthProvider'
import AppLayout from './layouts/AppLayout/AppLayout'

function App() {
  const [loggedIn, setLoggedIn] = useState(false)
  const [user, setUser] = useState({})

  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path='/' element={<Navigate replace to='/dashboard' />} />
          <Route exact path='/login' element={<Login setLoggedIn={setLoggedIn} />} />
          <Route path='/dashboard' element={<AppLayout />}>
            <Route exact path='/dashboard' element={<Home setUser={setUser} user={user} />} />
          </Route>
          <Route path='*' element={<NotFound />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}


export default App
