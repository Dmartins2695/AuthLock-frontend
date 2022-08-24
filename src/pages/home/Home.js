import classes from './Home.module.sass'
import { Header } from '../../layouts/AppLayout/components/Header'
import { Body } from '../../layouts/AppLayout/components/Body'
import { Buttons } from '../../layouts/AppLayout/components/Buttons'
import React, { useEffect } from 'react'
import axios from 'axios'

export const Home = (props) => {
  useEffect(() => {
    console.log()
    axios({
      method: 'get',
      url: 'http://localhost:8080/api/v1/user/current',
      config: {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
    })
      .then((response) => {
        if (response.status === 200) {
          console.log(response)
        }
      })
      .catch((error) => {
        var errResp = error.response
        if (errResp.status === 401) {
          console.log(error)
        }
      })
  }, [])

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
