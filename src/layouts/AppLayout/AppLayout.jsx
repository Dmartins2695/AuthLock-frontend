import { Outlet } from 'react-router-dom'
import classes from './AppLayout.module.sass'
import { Header } from './components/Header'
import React from 'react'
import Grid from '@mui/material/Grid'

const AppLayout = () => {
  return (
    <Grid sx={{ backgroundImage: 'url(https://source.unsplash.com/random/1920x1080/?nature)' }}>
      <Grid className={classes.body}>
        <Grid className={classes.container}>
          <Header />
          <Grid className={classes.bodyArea}>
            <Outlet />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default AppLayout