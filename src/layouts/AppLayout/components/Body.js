import React from 'react'
import classes from '../AppLayout.module.sass'
import StarOutlineIcon from '@mui/icons-material/StarOutline'
import { Typography } from '@mui/material'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import ShieldIcon from '@mui/icons-material/Shield'
import StarIcon from '@mui/icons-material/Star'
import VisibilityIcon from '@mui/icons-material/Visibility'

export const Body = () => {
  return (
    <div className={classes.bodyDataArea}>
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