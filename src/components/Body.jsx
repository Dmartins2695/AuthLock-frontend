import React from 'react'
import classes from '../layouts/AppLayout/AppLayout.module.sass'
import StarOutlineIcon from '@mui/icons-material/StarOutline'
import { Typography } from '@mui/material'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import ShieldIcon from '@mui/icons-material/Shield'
import StarIcon from '@mui/icons-material/Star'
import VisibilityIcon from '@mui/icons-material/Visibility'
import { useNavigate } from 'react-router-dom'
import { useLogoutMutation, useRefreshMutation } from '../features/auth/authApiSlice'
import { useDispatch } from 'react-redux'
import { logOut } from '../features/auth/authSlice'
import { useGetPasswordsMutation } from '../features/password/passwordApiSlice'

export const Body = () => {
  // ? EXAMPLE OF HOW TO USER HTTP REQUESTS
  const [refresh] = useRefreshMutation()
  const [logout] = useLogoutMutation()
  const [getPasswords] = useGetPasswordsMutation()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const getPasswordsFunc = async () => {
    await getPasswords().then((response) => {
      if (response.error) {
        console.error(response.error)
      } else {
        console.log(response)
      }
    })
  }

  const signOut = async () => {
    await logout().then((response) => {
      if (response.error) {
        console.error(response.error)
      } else {
        dispatch(logOut())
        localStorage.removeItem('persist')
        navigate('/auth/login')
      }
    })
  }

  const handleRefresh = async () => {
    await refresh().then((response) => {
      console.log(response)
    })
  }

  return (
    <div className={classes.bodyDataArea}>
      <button onClick={getPasswordsFunc}>
        get passwords
      </button>
      <button onClick={handleRefresh}>
        refresh
      </button>
      <button onClick={signOut}>
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