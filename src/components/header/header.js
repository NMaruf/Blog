import React from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { removeUser } from '../../store/slices/userSlice'

import classes from './header.module.scss'

function Header() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { username, image } = useSelector((state) => state.user)

  const avatar = image ? (
    <Link to="profile">
      <img src={image} className={classes.photo} alt="user img" />
    </Link>
  ) : (
    <img src="..//images/Rectangle 1.svg" className={classes.photo} alt="user img" />
  )

  const homeLink = (
    <Link to="/" className={classes['header-title']}>
      Realworld Blog
    </Link>
  )

  const buttonsUser = !localStorage.getItem('tokenKey') ? (
    <div className={classes.buttons}>
      <Link to="sign-in" className={classes['sign-in']}>
        Sign In
      </Link>
      <Link to="sign-up" type="button" className={classes['sign-up']}>
        Sign Up
      </Link>
    </div>
  ) : (
    <div className={classes.buttons}>
      <button type="button" className={classes['create-article']}>
        Create article
      </button>
      <Link to="profile" className={classes.username}>
        {username}
      </Link>
      {avatar}
      <button
        type="button"
        className={classes.logout}
        onClick={() => {
          localStorage.removeItem('tokenKey')
          dispatch(removeUser())
          navigate('/')
        }}
      >
        Log Out
      </button>
    </div>
  )

  return (
    <>
      <div className={classes['header-container']}>
        {homeLink}
        {buttonsUser}
      </div>
      <Outlet />
    </>
  )
}

export default Header
