import React from 'react'
import classes from '../AppLayout.module.sass'
import { DisplayersSection } from './DisplayerSection'
import Logo from '../../../assets/images/img.png'
import Button from '@mui/material/Button'
import { useLogoutMutation } from '../../../features/auth/authApiSlice'
import { useGetPasswordsMutation } from '../../../features/password/passwordApiSlice'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { logOut } from '../../../features/auth/authSlice'
import { i18n } from '../../../features/i18n/i18n'

export const Header = () => {
  const [logout] = useLogoutMutation()
  const [getPasswords] = useGetPasswordsMutation()
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

  return (
    <div className={classes.headerArea}>
      <div className={classes.headerRowWrapper}>
        <div className={classes.headerColumnLogoWrapper}>
          <div className={classes.headerRowInnerWrapper}>
            <img className={classes.headerLogo} src={Logo} alt='logo' />
            <div className={classes.logoutButton}>
              <Button variant='contained' onClick={signOut}>{i18n('logout')}</Button>
            </div>
          </div>
        </div>
        <DisplayersSection />
      </div>
    </div>
  )
}