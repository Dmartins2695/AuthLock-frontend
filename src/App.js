import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Login from './pages/login/Login'
import AppLayout from './layouts/AppLayout/AppLayout'
import { Body } from './components/Body'
import AuthLayout from './layouts/AuthLayout/AuthLayout'
import ErrorLayout from './layouts/ErrorLayout/ErrorLayout'
import RequireAuth from './features/auth/RequiredAuth'
import PersistLogin from './components/PersistLogin'

const NotFound = () => {
  return <h1>NOT FOUND</h1>
}


const Unauthorized = () => {
  return <h2>UNAUTHORIZED</h2>
}

function App() {
  return (
    <Routes>
      <Route path='/' element={<Navigate replace to='/dashboard' />} />
      {/* * Public Routes*/}
      <Route path='/auth' element={<AuthLayout />}>
        <Route exact path='login' element={<Login />} />
        <Route exact path='register' element={<Login />} />
        <Route exact path='recover-password' element={<Login />} />
      </Route>
      {/* * Protected Routes*/}
      <Route element={<PersistLogin />}>
        <Route element={<RequireAuth allowedRoles={['password:read']} />}>
          <Route path='/dashboard' element={<AppLayout />}>
            <Route exact path='' element={<Body />} />
            <Route exact path='favorites' element={<Body />} />
          </Route>
        </Route>
      </Route>
      {/* * Error Routes*/}
      <Route path='/error' element={<ErrorLayout />}>
        <Route path='unauthorized' element={<Unauthorized />} />
      </Route>
      <Route path='/*' element={<Navigate replace to='/dashboard' />} />
    </Routes>
  )
}


export default App
