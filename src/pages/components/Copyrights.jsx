import Typography from '@mui/material/Typography'
import Link from '@mui/material/Link'
import React from 'react'

export const Copyright = (props) => {
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