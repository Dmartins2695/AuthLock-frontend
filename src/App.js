import React from 'react'
import { Navigate, Outlet, Route, Routes } from 'react-router-dom'
import Login from './pages/login/Login'
import AppLayout from './layouts/AppLayout/AppLayout'
import { Body } from './layouts/AppLayout/components/Body'
import AuthLayout from './layouts/AuthLayout/AuthLayout'
import ErrorLayout from './layouts/ErrorLayout/ErrorLayout'

const NotFound = () => {
  return <h1>NOT FOUND</h1>
}


const Unauthorized = () => {
  return <div>
    <Outlet />
  </div>
}

function App() {
  return (
    <Routes>
      <Route path='/' element={<Navigate replace to='/dashboard' />} /> {/*Se auth dashboard se não login*/}
      <Route path='/auth' element={<AuthLayout />}>
        <Route exact path='login' element={<Login />} />
        <Route exact path='register' element={<Login />} />
      </Route>
      <Route path='/dashboard' element={<AppLayout />}>
        <Route exact path='' element={<Body />} />
        <Route exact path='favorites' element={<Body />} />
      </Route>
      <Route path='/error' element={<ErrorLayout />}>
        <Route path='unauthorized' element={<Unauthorized />} />
      </Route>
      *<Route path='/*' element={<NotFound />} />
    </Routes>
  )
}


export default App
