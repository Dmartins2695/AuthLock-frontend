import React, { useState } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { Login } from './pages/login/Login'
import AppLayout from './layouts/AppLayout/AppLayout'
import { Body } from './layouts/AppLayout/components/Body'

const NotFound = () => {
  return <h1>Not Found</h1>
}

const AuthLayout = () => {
  return <h1>Auth</h1>
}

const Unauthorized = () => {
  return <h1>UnAuth</h1>
}

function App() {
  const [loggedIn, setLoggedIn] = useState(false)
  const [user, setUser] = useState({})

  return (
    <Routes>
      <Route path='/' element={<Navigate replace to='/dashboard' />} /> {/*Se auth dashboard se não login*/}
      <Route path='/auth' element={<AuthLayout />}>
        <Route exact path='login' element={<Login setLoggedIn={setLoggedIn} />} />
        <Route exact path='register' element={<Login setLoggedIn={setLoggedIn} />} />
      </Route>
      <Route path='/dashboard' element={<AppLayout />}>
        <Route exact path='' element={<Body />} />
        <Route exact path='favorites' element={<Body />} />
      </Route>
      <Route path='/error' element={<AppLayout />}>
        <Route path='unauthorized' element={<Unauthorized />} />
      </Route>
      {/*<Route path='/*' element={<NotFound />} />*/}
    </Routes>
  )
}


export default App
