import React, { useEffect } from 'react'
import classes from './Body.module.sass'
import StarOutlineIcon from '@mui/icons-material/StarOutline'
import StarIcon from '@mui/icons-material/Star'
import { Typography } from '@mui/material'
import ShieldIcon from '@mui/icons-material/Shield'
import Grid from '@mui/material/Grid'
import { useGetPasswordsMutation } from '../../../features/password/passwordApiSlice'
import { useDispatch, useSelector } from 'react-redux'
import { selectCurrentUserId } from '../../../features/auth/authSlice'
import { selectCurrentPasswords, setPasswords } from '../../../features/password/passwordSlice'
import { i18n } from '../../../features/i18n/i18n'
import { differenceInDays } from 'date-fns'
import MoreVertIcon from '@mui/icons-material/MoreVert'

const RenderColumnsTitles = () => {
  return (
    <Grid
      container
      justifyContent='flex-start'
      alignItems='center'
      sx={{ background: 'rgba(232, 244, 255, 0.6)', borderBottom: '1px solid #b7b7b7' }}
    >
      <Grid item xs={1} className={classes.bodyDataItemNumber}>
        <Typography>{i18n('table_title_number')}</Typography>
      </Grid>
      <Grid item xs={1} className={classes.bodyDataItemFavorite}>
        <Typography>{i18n('table_title_favorite')}</Typography>
      </Grid>
      <Grid item xs={3} className={classes.bodyDataItemWebsite}>
        <Typography>{i18n('table_title_website')}</Typography>
      </Grid>
      <Grid item xs={3} className={classes.bodyDataItePassword}>
        <Typography>{i18n('table_title_password')}</Typography>
      </Grid>
      <Grid item xs={2} className={classes.bodyDataItemCreatedAt}>
        <Typography>{i18n('table_title_date_of_creation')}</Typography>
      </Grid>
      <Grid item xs={1} className={classes.bodyDataItemWeak}>
        <Typography>{i18n('table_title_strength')}</Typography>
      </Grid>
      <Grid item xs={1} className={classes.bodyDataItemSettings}>
        <Typography>{i18n('table_title_settings')}</Typography>
      </Grid>
    </Grid>
  )
}

const RenderItem = ({ item, index }) => {
  const style = index % 2 !== 0 ? { background: 'rgba(232, 244, 255, 0.6)' } : {}
  const createdAt =
    differenceInDays(new Date(item?.createdAt), new Date()) >= 0
      ? differenceInDays(new Date(item?.createdAt), new Date())
      : differenceInDays(new Date(item?.createdAt), new Date()) * -1

  return (
    <Grid container justifyContent='flex-start' alignItems='center' sx={style}>
      <Grid item xs={1} className={classes.bodyDataItemNumber}>
        <Typography>{index + 1}</Typography>
      </Grid>
      <Grid item xs={1} className={classes.bodyDataItemFavorite}>
        {item?.favorite ? <StarIcon /> : <StarOutlineIcon />}
      </Grid>
      <Grid item xs={3} className={classes.bodyDataItemWebsite}>
        <Typography>{item?.websiteUrl}</Typography>
      </Grid>
      <Grid item xs={3} className={classes.bodyDataItePassword}>
        <Typography>{item?.value}</Typography>
        {/*<VisibilityOffIcon />*/}
      </Grid>
      <Grid item xs={2} className={classes.bodyDataItemCreatedAt}>
        <Typography>{createdAt} days ago</Typography>
      </Grid>
      <Grid item xs={1} className={classes.bodyDataItemWeak}>
        {item?.weak ? <ShieldIcon style={{ color: 'red' }} /> : <ShieldIcon style={{ color: 'green' }} />}
      </Grid>
      <Grid item xs={1} className={classes.bodyDataItemSettings}>
        <MoreVertIcon />
      </Grid>
    </Grid>
  )
}

export const Body = () => {
  const [getPassword] = useGetPasswordsMutation()
  const userId = useSelector(selectCurrentUserId)
  const passwords = useSelector(selectCurrentPasswords)

  const dispatch = useDispatch()

  useEffect(() => {
    const callGetPasswords = async () => {
      return getPassword(userId)
    }
    callGetPasswords().then((response) => {
      if (response.error) {
        console.error(response.error)
      } else {
        dispatch(setPasswords({ passwords: response.data }))
      }
    })
  }, [])

  return (
    <Grid className={classes.bodyDataArea}>
      <Grid className={classes.bodyDataTable}>
        <RenderColumnsTitles />
        {passwords.map((password, index) => {
          return <RenderItem key={index} index={index} item={password} />
        })}
      </Grid>
    </Grid>
  )
}
