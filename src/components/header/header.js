import React from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { removeUser } from '../../store/slices/userSlice'
import { removeEdit } from '../../store/slices/editArticleSlice'
import ServiceLocalStorage from '../../services/localStorage-service'

import classes from './header.module.scss'

const localStorageService = new ServiceLocalStorage()

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
    // <img src="https://static.productionready.io/images/smiley-cyrus.jpg" className={classes.photo} alt="user img" />
  )

  const homeLink = (
    <Link to="/" className={classes['header-title']}>
      Realworld Blog
    </Link>
  )

  const buttonsUser = !localStorageService.getToken('tokenKey') ? (
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
      <Link to="new-article">
        <button type="button" className={classes['create-article']} onClick={() => dispatch(removeEdit())}>
          Create article
        </button>
      </Link>
      <Link to="profile" className={classes.username}>
        {username}
      </Link>
      {avatar}
      <button
        type="button"
        className={classes.logout}
        onClick={() => {
          localStorageService.removeToken('tokenKey')
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
