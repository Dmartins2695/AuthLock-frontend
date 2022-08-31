import React from 'react'
import classes from '../AppLayout.module.sass'
import StarOutlineIcon from '@mui/icons-material/StarOutline'
import { Typography } from '@mui/material'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import ShieldIcon from '@mui/icons-material/Shield'
import StarIcon from '@mui/icons-material/Star'
import VisibilityIcon from '@mui/icons-material/Visibility'

import useAuth from '../../../hooks/useAuth'
import useRefreshToken from '../../../hooks/useRefreshToken'
import useAxiosPrivate from '../../../hooks/useAxiosPrivate'
import { useLocation, useNavigate } from 'react-router-dom'
import useLogout from '../../../hooks/useLogout'

export const Body = () => {
  // ? EXAMPLE OF HOW TO USER HTTP REQUESTS
  const { auth } = useAuth()
  const refresh = useRefreshToken()
  const axios = useAxiosPrivate()
  const navigate = useNavigate()
  const location = useLocation()
  const logout = useLogout()

  const getPasswords = async () => {
    await axios.get(
      '/api/v1/user/stored-passwords/2'
    ).then(
      (response) => {
        console.log(response)
      }
    ).catch(
      (error) => {
        if (error.response.status === 403) {
          navigate('/auth/login', { state: { from: location }, replace: true })
        }
      }
    )

  }

  const signOut = async () => {
    localStorage.clear()
    await logout()
    navigate('/auth/login')
  }

  console.log(auth?.accessToken)

  return (
    <div className={classes.bodyDataArea}>
      <button onClick={getPasswords}>
        get passwords
      </button>
      <button onClick={() => refresh()}>
        refresh
      </button>
      <button onClick={() => signOut}>
        logout
      </button>
      <div className={classes.bodyDataTable}>
        <div className={classes.bodyDataItem} style={{ background: '#e7f4ff' }}>
          <div className={classes.bodyDataItemFavorite}>
            <StarOutlineIcon />
          </div>
          <div className={classes.bodyDataItemWebsite}>
            <Typography>www.facebook.com</Typography>
          </div>
          <div className={classes.bodyDataItePassword}>
            <Typography>**********</Typography>
            <VisibilityOffIcon />
          </div>
          <div className={classes.bodyDataItemCreatedAt}>
            <Typography>1 day ago</Typography>
          </div>
          <div className={classes.bodyDataItemWeak}>
            <ShieldIcon style={{ color: 'red' }} />
          </div>
        </div>
        <div className={classes.bodyDataItem}>
          <div className={classes.bodyDataItemFavorite}>
            <StarIcon />
          </div>
          <div className={classes.bodyDataItemWebsite}>
            <Typography>www.facebook.com</Typography>
          </div>
          <div className={classes.bodyDataItePassword}>
            <Typography>**********</Typography>
            <VisibilityIcon />
          </div>
          <div className={classes.bodyDataItemCreatedAt}>
            <Typography>1 day ago</Typography>
          </div>
          <div className={classes.bodyDataItemWeak}>
            <ShieldIcon style={{ color: 'red' }} />
          </div>
        </div>
      </div>
    </div>
  )
}