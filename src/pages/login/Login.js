import React, { useEffect, useState } from 'react'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import Link from '@mui/material/Link'
import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import Typography from '@mui/material/Typography'
import { useLocation, useNavigate } from 'react-router-dom'
import { Alert, Checkbox, FormControlLabel } from '@mui/material'
import '../../utils/constants'
import { useDispatch } from 'react-redux'
import { useLoginMutation } from '../../features/auth/authApiSlice'
import { setCredentials, togglePersist } from '../../features/auth/authSlice'

function Copyright(props) {
  return (
    <Typography variant='body2' color='text.secondary' align='center' {...props}>
      {'Copyright © '}
      <Link color='inherit' href='https://authlock.netlify/'>
        AuthLock
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  )
}

export default function Login() {
  // * variables
  let navigate = useNavigate()
  const location = useLocation()
  const [login, { isLoading }] = useLoginMutation()
  const dispatch = useDispatch()
  const from = location.state?.from?.pathname || '/dashboard'
  // * functions
  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const userData = await login({ userName, password }).unwrap()
      dispatch(setCredentials({ ...userData, userName }))
      setUserName('')
      setPassword('')
      navigate(from, { replace: true })
    } catch (e) {
      setErrorMessage('Login Failed')
    }

  }
  const togglePersistLogin = () => {
    dispatch(togglePersist())
  }

  // * hooks
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  // * useEffects
  useEffect(() => {
    setErrorMessage('')
  }, [userName, password])

  // * Component
  return (
    <Grid container component='main' sx={{ height: '100vh' }}>
      <CssBaseline />
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: 'url(https://source.unsplash.com/random/1200x900/?nature)',
          backgroundRepeat: 'no-repeat',
          backgroundColor: (t) => (t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900]),
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <AccountCircleIcon />
          </Avatar>
          <Typography component='h1' variant='h5'>
            Login in
          </Typography>
          <Box component='form' onSubmit={handleSubmit} sx={{ mt: 1 }}>
            {errorMessage !== '' && <Alert severity='error'>{errorMessage}</Alert>}
            <TextField
              margin='normal'
              required
              fullWidth
              id='email'
              label='Email Address'
              name='email'
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              autoComplete='email'
              autoFocus
            />
            <TextField
              margin='normal'
              required
              fullWidth
              name='password'
              label='Password'
              type='password'
              id='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete='current-password'
            />
            <FormControlLabel
              control={<Checkbox id='persist' value='persist' color='primary' onChange={togglePersistLogin} />}
              label='Trust this device'
            />
            <Button type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }}>
              Login In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href={'/auth/recover-password'} variant='body2'>
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href={'/auth/register'} variant='body2'>
                  {'Don\'t have an account? Sign Up'}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-end', height: '10rem' }}>
          <Copyright />
        </div>
      </Grid>
    </Grid>
  )
}
