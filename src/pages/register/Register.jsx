import CssBaseline from '@mui/material/CssBaseline'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'
import Avatar from '@mui/material/Avatar'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import Typography from '@mui/material/Typography'
import { Alert } from '@mui/material'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useRegisterMutation } from '../../features/auth/authApiSlice'
import { Copyright } from '../components/Copyrights'
import { i18n } from '../../features/i18n/i18n'

const Register = () => {
  // * variables
  let navigate = useNavigate()
  const [register, { isLoading }] = useRegisterMutation()
  const from = '/auth/login'

  // * functions
  const handleSubmit = async (event) => {
    event.preventDefault()

    try {
      await register({ email: userName, password, firstName, lastName })
      setUserName('')
      setFirstName('')
      setLastName('')
      setPasswordConfirm('')
      navigate(from, { replace: true })
    } catch (e) {
      setSystemMessage('Register Failed')
    }

  }

  // * hooks
  const [userName, setUserName] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')
  const [systemMessage, setSystemMessage] = useState('')

  // * useEffects
  useEffect(() => {
    setSystemMessage('')
  }, [userName, password, lastName, firstName])

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
            {i18n('register')}
          </Typography>
          <Box component='form' onSubmit={handleSubmit} sx={{ mt: 1 }}>
            {systemMessage !== '' && <Alert severity='error'>{systemMessage}</Alert>}
            <TextField
              margin='normal'
              required
              fullWidth
              id='fistName'
              label='First Name'
              name='fistName'
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              autoComplete='firstName'
              autoFocus
            />
            <TextField
              margin='normal'
              required
              fullWidth
              id='lastName'
              label='Last Name'
              name='lastName'
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              autoComplete='LastName'
              autoFocus
            />
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
            <TextField
              margin='normal'
              required
              fullWidth
              name='passwordConfirm'
              label='Confirm Password'
              type='password'
              id='passwordConfirm'
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
              autoComplete='passwordConfirm'
            />
            <Button type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }}>
              {i18n('register')}
            </Button>
          </Box>
        </Box>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-end', height: '10rem' }}>
          <Copyright />
        </div>
      </Grid>
    </Grid>
  )
}

export default Register