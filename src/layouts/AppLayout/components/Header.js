import React from 'react'
import classes from '../../../pages/home/Home.module.sass'
import { DisplayersSection } from './DisplayerSection'
import Logo from '../../../assets/images/img.png'

export const Header = () => {
  return (
    <div className={classes.headerArea}>
      <div className={classes.headerRowWrapper}>
        <div className={classes.headerColumnLogoWrapper}>
          <div className={classes.headerRowInnerWrapper}>
            <img className={classes.headerLogo} src={Logo} alt='logo' />
          </div>
        </div>
        <DisplayersSection />
      </div>
    </div>
  )
}