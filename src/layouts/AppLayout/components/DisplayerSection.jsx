import React, { useEffect } from 'react'
import classes from '../AppLayout.module.sass'
import { Typography } from '@mui/material'
import { i18n } from '../../../features/i18n/i18n'
import { useGetDuplicatedCountMutation, useGetOutdatedCountMutation, useGetWeakCountMutation } from '../../../features/analitics/analyticsApiSlice'
import { useDispatch, useSelector } from 'react-redux'
import { selectCurrentUserId } from '../../../features/auth/authSlice'
import { selectCurrentAnalytics, setAnalytics } from '../../../features/analitics/analyticsSlice'
import { selectCurrentPasswords } from '../../../features/password/passwordSlice'

export const DisplayersSection = () => {
  const userId = useSelector(selectCurrentUserId)
  const dispatch = useDispatch()
  const [getOutdatedCount] = useGetOutdatedCountMutation()
  const [getWeakCount] = useGetWeakCountMutation()
  const [getDuplicatedCount] = useGetDuplicatedCountMutation()
  const analytics = useSelector(selectCurrentAnalytics)
  const passwords = useSelector(selectCurrentPasswords)

  useEffect(() => {
    const callOutdated = async () => {
      return getOutdatedCount(userId)
    }
    const callWeak = async () => {
      return getWeakCount(userId)
    }
    const callDuplicated = async () => {
      return getDuplicatedCount(userId)
    }

    callWeak().then((response) => {
      if (response.error) {
        console.error(response.error)
      } else {
        dispatch(setAnalytics({ name: 'weak', count: response.data.count }))
      }
    })
    callDuplicated().then((response) => {
      if (response.error) {
        console.error(response.error)
      } else {
        dispatch(setAnalytics({ name: 'duplicated', count: response.data.count }))
      }
    })
    callOutdated().then((response) => {
      if (response.error) {
        console.error(response.error)
      } else {
        dispatch(setAnalytics({ name: 'outdated', count: response.data.count }))
      }
    })
  }, [passwords])

  return (
    <div className={classes.headerColumnDisPlayerWrapper}>
      <div className={classes.headerRowInnerWrapper}>
        <div className={classes.headerColumnInnerWrapper}>
          <div className={classes.headerRoundDisPlayer}>
            <Typography>{passwords.length}</Typography>
          </div>
          <div>
            <Typography className={classes.disPlayersText}>{i18n('total')}</Typography>
          </div>
        </div>
        <div className={classes.headerColumnInnerWrapper}>
          <div className={classes.headerRoundDisPlayer}>
            <Typography>{analytics?.outdated}</Typography>
          </div>
          <div>
            <Typography className={classes.disPlayersText}>{i18n('outdated')}</Typography>
          </div>
        </div>
        <div className={classes.headerColumnInnerWrapper}>
          <div className={classes.headerRoundDisPlayer}>
            <Typography>{analytics?.duplicated}</Typography>
          </div>
          <div>
            <Typography className={classes.disPlayersText}>{i18n('duplicated')}</Typography>
          </div>
        </div>
        <div className={classes.headerColumnInnerWrapper}>
          <div className={classes.headerRoundDisPlayer}>
            <Typography>{analytics?.weak}</Typography>
          </div>
          <div>
            <Typography className={classes.disPlayersText}>{i18n('weak')}</Typography>
          </div>
        </div>
      </div>
    </div>
  )
}
