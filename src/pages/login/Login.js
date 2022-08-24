import React from 'react'
import classes from './Login.module.sass'
import SignInSide from './SignIn'

export const Login = (props) => {

  return (
    <div className={classes.body}>
      <SignInSide setLoggedIn={props?.setLoggedIn} />
    </div>
  )
}