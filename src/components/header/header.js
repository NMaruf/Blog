import React from 'react'
import { Link, Outlet } from 'react-router-dom'

import classes from './header.module.scss'

function Header() {
  return (
    <>
      <div className={classes['header-container']}>
        <Link to="/" className={classes['header-title']}>
          Realworld Blog
        </Link>
        <div className={classes.buttons}>
          <a href="#1" className={classes['sign-in']}>
            Sign In
          </a>
          <button type="button" className={classes['sign-up']}>
            Sign Up
          </button>
        </div>
      </div>
      <Outlet />
    </>
  )
}

export default Header
