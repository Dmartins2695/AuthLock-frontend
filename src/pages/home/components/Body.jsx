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

const RenderColumnsTitles = () => {
  return (
    <Grid className={classes.bodyDataItem} sx={{ background: 'rgba(232, 244, 255, 0.6)', borderBottom: '1px solid #b7b7b7' }}>
      <Grid className={classes.bodyDataItemFavorite}>
        <Typography>{i18n('table_title_favorite')}</Typography>
      </Grid>
      <Grid className={classes.bodyDataItemWebsite}>
        <Typography>{i18n('table_title_website')}</Typography>
      </Grid>
      <Grid className={classes.bodyDataItePassword}>
        <Typography>{i18n('table_title_password')}</Typography>
      </Grid>
      <Grid className={classes.bodyDataItemCreatedAt}>
        <Typography>{i18n('table_title_date_of_creation')}</Typography>
      </Grid>
      <Grid className={classes.bodyDataItemWeak}>
        <Typography>{i18n('table_title_strength')}</Typography>
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
    <Grid className={classes.bodyDataItem} sx={style}>
      <Grid className={classes.bodyDataItemFavorite}>{item?.favorite ? <StarIcon /> : <StarOutlineIcon />}</Grid>
      <Grid className={classes.bodyDataItemWebsite}>
        <Typography>{item?.websiteUrl}</Typography>
      </Grid>
      <Grid className={classes.bodyDataItePassword}>
        <Typography>{item?.value}</Typography>
        {/*<VisibilityOffIcon />*/}
      </Grid>
      <Grid className={classes.bodyDataItemCreatedAt}>
        <Typography>{createdAt} days ago</Typography>
      </Grid>
      <Grid className={classes.bodyDataItemWeak}>
        {item?.weak ? <ShieldIcon style={{ color: 'red' }} /> : <ShieldIcon style={{ color: 'green' }} />}
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
