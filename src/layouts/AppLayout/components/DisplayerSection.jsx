import React from 'react'
import classes from '../AppLayout.module.sass'
import { Typography } from '@mui/material'
import { i18n } from '../../../features/i18n/i18n'

export const DisplayersSection = () => {
  return (
    <div className={classes.headerColumnDisPlayerWrapper}>
      <div className={classes.headerRowInnerWrapper}>
        <div className={classes.headerColumnInnerWrapper}>
          <div className={classes.headerRoundDisPlayer}>
            <Typography>0</Typography>
          </div>
          <div>
            <Typography className={classes.disPlayersText}>{i18n('total')}</Typography>
          </div>
        </div>
        <div className={classes.headerColumnInnerWrapper}>
          <div className={classes.headerRoundDisPlayer}>
            <Typography>0</Typography>
          </div>
          <div>
            <Typography className={classes.disPlayersText}>{i18n('outdated')}</Typography>
          </div>
        </div>
        <div className={classes.headerColumnInnerWrapper}>
          <div className={classes.headerRoundDisPlayer}>
            <Typography>0</Typography>
          </div>
          <div>
            <Typography className={classes.disPlayersText}>{i18n('duplicated')}</Typography>
          </div>
        </div>
        <div className={classes.headerColumnInnerWrapper}>
          <div className={classes.headerRoundDisPlayer}>
            <Typography>0</Typography>
          </div>
          <div>
            <Typography className={classes.disPlayersText}>{i18n('weak')}</Typography>
          </div>
        </div>
      </div>
    </div>
  )
}