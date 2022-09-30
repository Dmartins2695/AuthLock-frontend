import Typography from '@mui/material/Typography'
import Link from '@mui/material/Link'
import React from 'react'
import { i18n } from '../../features/i18n/i18n'

export const Copyright = (props) => {
  return (
    <Typography variant='body2' color='text.secondary' align='center' {...props}>
      {'Copyright © '}
      <Link color='inherit' href='https://authlock.netlify/'>
        {i18n('app_name')}
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  )
}