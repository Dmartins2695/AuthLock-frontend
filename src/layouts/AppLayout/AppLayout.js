import { Outlet } from 'react-router-dom'
import classes from './AppLayout.module.sass'
import { Header } from './components/Header'
import React from 'react'

const AppLayout = () => {
  return (
    <div>
      <div className={classes.body}>
        <div className={classes.container}>
          <Header />
          <div className={classes.bodyArea}>
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  )
}

export default AppLayout