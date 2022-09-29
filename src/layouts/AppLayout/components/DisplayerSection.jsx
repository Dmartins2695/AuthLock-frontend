import React from 'react'
import classes from '../AppLayout.module.sass'
import { Typography } from '@mui/material'

export const DisplayersSection = () => {
  return (
    <div className={classes.headerColumnDisPlayerWrapper}>
      <div className={classes.headerRowInnerWrapper}>
        <div className={classes.headerColumnInnerWrapper}>
          <div className={classes.headerRoundDisPlayer}>
            <Typography>0</Typography>
          </div>
          <div>
            <Typography className={classes.disPlayersText}>Total</Typography>
          </div>
        </div>
        <div className={classes.headerColumnInnerWrapper}>
          <div className={classes.headerRoundDisPlayer}>
            <Typography>0</Typography>
          </div>
          <div>
            <Typography className={classes.disPlayersText}>Outdated</Typography>
          </div>
        </div>
        <div className={classes.headerColumnInnerWrapper}>
          <div className={classes.headerRoundDisPlayer}>
            <Typography>0</Typography>
          </div>
          <div>
            <Typography className={classes.disPlayersText}>Duplicated</Typography>
          </div>
        </div>
        <div className={classes.headerColumnInnerWrapper}>
          <div className={classes.headerRoundDisPlayer}>
            <Typography>0</Typography>
          </div>
          <div>
            <Typography className={classes.disPlayersText}>Weak</Typography>
          </div>
        </div>
      </div>
    </div>
  )
}