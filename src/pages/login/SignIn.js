import React, { useState } from 'react'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import Link from '@mui/material/Link'
import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import Typography from '@mui/material/Typography'
import { emailValidator, passwordValidator } from '../../utils/validators'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function Copyright(props) {
  return (
    <Typography variant='body2' color='text.secondary' align='center' {...props}>
      {'Copyright © '}
      <Link color='inherit' href='https://passw.netlify/'>
        passW
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  )
}

export default function SignInSide(props) {
  let navigate = useNavigate()
  const handleSubmit = (event) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    /*const valid = validations(data.get('password'), data.get('email'))
    if (!valid) {
        return
    }*/
    console.log({
      email: data.get('email'),
      password: data.get('password'),
      'remember-me': rememberMe
    })
    axios({
      method: 'post',
      url: 'http://localhost:8080/login',
      body: {
        email: data.get('email'),
        password: data.get('password'),
        'remember-me': rememberMe
      },
      config: {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
    })
      .then((response) => {
        if (response.status === 200) {
          props?.setLoggedIn(true)
          //   navigate('/dashboard')
        }
      })
      .catch((error) => {
        var errResp = error.response
        if (errResp.status === 401) {
          console.log(error)
        }
        props?.setLoggedIn(false)
      })
  }

  const validations = (password, email) => {
    const validationPassword = passwordValidator(password)
    const validationEmail = emailValidator(email)
    let valid = true
    if (validationPassword.error) {
      setPasswordError(validationPassword)
      valid = false
    } else {
      setPasswordError({ error: false })
    }
    if (validationEmail.error) {
      setEmailError(validationEmail)
      valid = false
    } else {
      setEmailError({ error: false })
    }
    return valid
  }

  const [rememberMe, setRememberMe] = useState(false)
  const [emailError, setEmailError] = useState({ error: false })
  const [passwordError, setPasswordError] = useState({ error: false })

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
            <TextField
              margin='normal'
              required
              fullWidth
              id='email'
              label='Email Address'
              name='email'
              autoComplete='email'
              autoFocus
              error={emailError.error}
              helperText={emailError?.errorMessage}
            />
            <TextField
              margin='normal'
              required
              fullWidth
              name='password'
              label='Password'
              type='password'
              id='password'
              error={passwordError.error}
              helperText={passwordError?.errorMessage}
              autoComplete='current-password'
            />
            <FormControlLabel
              control={<Checkbox value='remember' color='primary' onClick={() => setRememberMe(!rememberMe)} />}
              label='Remember me'
            />
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