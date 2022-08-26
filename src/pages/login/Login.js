import React, { useContext, useEffect, useState } from 'react'
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
import { makeRequestLogin } from '../../utils/httpRequest/httpRequest'
import AuthContext from '../../context/AuthProvider'
import { Alert } from '@mui/material'
import '../../utils/constants'
import { POST } from '../../utils/constants'

function Copyright(props) {
  return (
    <Typography variant='body2' color='text.secondary' align='center' {...props}>
      {'Copyright © '}
      <Link color='inherit' href='https://WasW.netlify/'>
        WasW
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  )
}

export default function Login() {
  // * variables
  const { setAuth } = useContext(AuthContext)
  let navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from?.pathname || '/dashboard'
  // * functions
  const handleResponse = (response) => {
    const accessToken = response?.data?.token
    if (accessToken) {
      setAuth({ userName: user, password, accessToken })
      navigate(from, { replace: true })
    } else {
      setErrorMessage('Missing Access Token')
    }
  }
  const handleError = (error) => {
    if (!error?.response) {
      setErrorMessage('No Server Response')
    } else if (error.response?.status === 401) {
      setErrorMessage('Unauthorized Request. Fill form with valid credentials')
    } else {
      setErrorMessage('Login Failed')
    }
  }
  const handleSubmit = (event) => {
    const eventData = new FormData(event.currentTarget)
    setUser(eventData.get('email'))
    setPassword(eventData.get('password'))
    const data = {
      userName: user,
      password: password
    }

    makeRequestLogin({
      method: POST,
      data: data,
      url: '/auth/login',
      callbackResponse: handleResponse,
      callbackError: handleError
    })
  }
  // * hooks
  const [user, setUser] = useState < String | null > ('')
  const [password, setPassword] = useState < String | null > ('')
  const [errorMessage, setErrorMessage] = useState('')
  // * useEffects
  useEffect(() => {
    setErrorMessage('')
  }, [user, password])

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
            Sign in
          </Typography>
          <Box component='form' noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
            {errorMessage !== '' && <Alert severity='error'>{errorMessage}</Alert>}
            <TextField
              margin='normal'
              required
              fullWidth
              id='email'
              label='Email Address'
              name='email'
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
              autoComplete='current-password'
            />
            {/* <FormControlLabel
              control={<Checkbox value='remember' color='primary' onClick={() => setRememberMe(!rememberMe)} />}
              label='Remember me'
            />*/}
            <Button type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }}>
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href='#' variant='body2'>
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href='#' variant='body2'>
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
