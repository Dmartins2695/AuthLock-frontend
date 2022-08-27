import React from 'react'
import classes from '../AppLayout.module.sass'
import StarOutlineIcon from '@mui/icons-material/StarOutline'
import { Typography } from '@mui/material'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import ShieldIcon from '@mui/icons-material/Shield'
import StarIcon from '@mui/icons-material/Star'
import VisibilityIcon from '@mui/icons-material/Visibility'
import { axiosBase } from '../../../api/axios'
import useAuth from '../../../hooks/useAuth'

export const Body = () => {
  const { auth } = useAuth()

  const getPasswords = async () => {
    const response = await axiosBase.get(
      '/api/v1/user/stored-passwords/2',
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${auth?.accessToken}`
        }
      })
    console.log(response)
  }

  return (
    <div className={classes.bodyDataArea}>
      <button onClick={getPasswords}>
        get passwords
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