import Grid from '@mui/material/Grid'
import { useNavigate, useParams } from 'react-router-dom'
import { useConfirmTokenMutation } from '../../features/auth/authApiSlice'
import React, { useEffect } from 'react'
import Logo from '../../assets/images/img.png'
import Typography from '@mui/material/Typography'
import classes from './ConfirmRegistration.module.sass'
import Button from '@mui/material/Button'
import { i18n } from '../../features/i18n/i18n'

const ConfirmRegistration = () => {
  let navigate = useNavigate()
  const { token } = useParams()
  const [confirmToken] = useConfirmTokenMutation()
  useEffect(() => {
    const confirmTokenRequest = async () => {
      return await confirmToken(token)
    }
    confirmTokenRequest().then((response) => {
      if (response.error) {
        console.error(response.error)
      } else {
        console.log(response)
      }
    })
  }, [confirmToken, token])

  return (
    <div className={classes.page}>
      <div className={classes.container}>
        <Grid container flexDirection='column' justifyContent='flex-start' alignItems='center' className={classes.message}>
          <Grid item className={classes.header}>
            <Grid container justifyContent='center' alignItems='center'>
              <Grid className={classes.img}>
                <img className={classes.headerLogo} src={Logo} alt='logo' />
              </Grid>
              <Grid>
                <Typography variant={'h1'}>{i18n('confirm_email_title')}</Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item className={classes.body}>
            <Typography variant={'h5'}>{i18n('confirm_email_body')}</Typography>
          </Grid>
          <Grid item>
            <Button
              onClick={() => {
                navigate('/auth/login', { replace: true })
              }}
              variant={'contained'}
              size={'large'}
            >
              {i18n('confirm_email_button')}
            </Button>
          </Grid>
        </Grid>
      </div>
    </div>
  )
}

export default ConfirmRegistration
