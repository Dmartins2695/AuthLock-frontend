import classes from './Home.module.sass'
import { Header } from '../../layouts/AppLayout/components/Header'
import { Body } from '../../components/Body'
import { Buttons } from '../../components/Buttons'
import React from 'react'

export const Home = (props) => {
  return (
    <div className={classes.body}>
      <div className={classes.container}>
        <Header />
        <div className={classes.bodyArea}>
          <Buttons />
          <Body />
        </div>
      </div>
    </div>
  )
}
