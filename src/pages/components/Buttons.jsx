import React from 'react'
import classes from '../../layouts/AppLayout/AppLayout.module.sass'
import AddIcon from '@mui/icons-material/Add'
import { Typography } from '@mui/material'

export const Buttons = () => {
  return (
    <div className={classes.bodyAreaButtonsRowWrapper}>
      <div className={classes.bodyAreaButtonsColumnWrapper}>
        <div className={classes.addPasswordButton}>
          <AddIcon />
          <Typography>Add Password</Typography>
        </div>
      </div>
    </div>
  )
}