import React, { useEffect } from 'react'
import classes from './Body.module.sass'
import StarOutlineIcon from '@mui/icons-material/StarOutline'
import { Typography } from '@mui/material'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import ShieldIcon from '@mui/icons-material/Shield'
import StarIcon from '@mui/icons-material/Star'
import VisibilityIcon from '@mui/icons-material/Visibility'
import Grid from '@mui/material/Grid'
import { useGetPasswordsMutation } from '../../../features/password/passwordApiSlice'
import { useDispatch, useSelector } from 'react-redux'
import { selectCurrentUserId } from '../../../features/auth/authSlice'
import { selectCurrentPasswords, setPasswords } from '../../../features/password/passwordSlice'

const RenderItem = () => {
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
    <Grid className={classes.bodyDataItem} sx={{ background: 'rgba(232, 244, 255, 0.6)' }}>
      <Grid className={classes.bodyDataItemFavorite}>
        <StarOutlineIcon />
      </Grid>
      <Grid className={classes.bodyDataItemWebsite}>
        <Typography>www.facebook.com</Typography>
      </Grid>
      <Grid className={classes.bodyDataItePassword}>
        <Typography>**********</Typography>
        <VisibilityOffIcon />
      </Grid>
      <Grid className={classes.bodyDataItemCreatedAt}>
        <Typography>1 day ago</Typography>
      </Grid>
      <Grid className={classes.bodyDataItemWeak}>
        <ShieldIcon style={{ color: 'red' }} />
      </Grid>
    </Grid>
  )
}

export const Body = () => {
  return (
    <Grid className={classes.bodyDataArea}>
      <Grid className={classes.bodyDataTable}>
        <RenderItem />
        <Grid className={classes.bodyDataItem}>
          <Grid className={classes.bodyDataItemFavorite}>
            <StarIcon />
          </Grid>
          <Grid className={classes.bodyDataItemWebsite}>
            <Typography>www.facebook.com</Typography>
          </Grid>
          <Grid className={classes.bodyDataItePassword}>
            <Typography>**********</Typography>
            <VisibilityIcon />
          </Grid>
          <Grid className={classes.bodyDataItemCreatedAt}>
            <Typography>1 day ago</Typography>
          </Grid>
          <Grid className={classes.bodyDataItemWeak}>
            <ShieldIcon style={{ color: 'red' }} />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}
