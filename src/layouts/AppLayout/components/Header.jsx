import React from 'react'
import classes from '../AppLayout.module.sass'
import { DisplayersSection } from './DisplayerSection'
import Logo from '../../../assets/images/img.png'
import { useLogoutMutation } from '../../../features/auth/authApiSlice'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { logOut } from '../../../features/auth/authSlice'
import ArrowDropDownCircleOutlinedIcon from '@mui/icons-material/ArrowDropDownCircleOutlined'
import { IconButton, Popover } from '@mui/material'
import Grid from '@mui/material/Grid'
import LogoutIcon from '@mui/icons-material/Logout'
import Button from '@mui/material/Button'
import { i18n } from '../../../features/i18n/i18n'
import Typography from '@mui/material/Typography'

const LogoutMenu = ({ anchorEl, setAnchorEl }) => {
  const [logout] = useLogoutMutation()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const signOut = async () => {
    await logout().then((response) => {
      if (response.error) {
        console.error(response.error)
      } else {
        dispatch(logOut())
        localStorage.removeItem('persist')
        navigate('/auth/login')
      }
    })
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const open = Boolean(anchorEl)
  const id = open ? 'simple-popover' : undefined

  return (
    <Popover
      id={id}
      open={open}
      anchorEl={anchorEl}
      onClose={handleClose}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right'
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right'
      }}
    >
      <Grid container flexDirection='column' justifyContent='center' alignItems='flex-start'>
        <Grid item>
          <Button size='small' onClick={signOut} sx={{ textTransform: 'none', fontSize: 12, color: '#ec1d24' }}>
            <Grid container flexDirection='row' justifyContent='flex-start' alignItems='center'>
              <Grid item style={{ paddingTop: '0.5em' }}>
                <LogoutIcon sx={{ width: '0.8em', height: '0.8em' }} />
              </Grid>
              <Grid item style={{ paddingLeft: '0.5em' }}>
                <Typography>{i18n('pop_over_logout')}</Typography>
              </Grid>
            </Grid>
          </Button>
        </Grid>
      </Grid>
    </Popover>
  )
}

export const Header = () => {
  const [anchorEl, setAnchorEl] = React.useState(null)
  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget)
  }

  return (
    <div className={classes.headerArea}>
      <div className={classes.headerRowWrapper}>
        <div className={classes.headerColumnLogoWrapper}>
          <div className={classes.headerRowInnerWrapper}>
            <img className={classes.headerLogo} src={Logo} alt='logo' />
            <DisplayersSection />
          </div>
        </div>
        <div className={classes.menuButton}>
          <IconButton size='medium' onClick={handleOpen}>
            <ArrowDropDownCircleOutlinedIcon style={{ color: 'rgb(245, 247, 255)', width: 30, height: 30 }} />
          </IconButton>
          <LogoutMenu anchorEl={anchorEl} setAnchorEl={setAnchorEl} />
        </div>
      </div>
    </div>
  )
}
