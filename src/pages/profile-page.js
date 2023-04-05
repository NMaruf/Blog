import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { setUser } from '../store/slices/userSlice'
import BlogService from '../services/service'

import classes from './index.module.scss'

const service = new BlogService()

function ProfilePage() {
  const { username: defaultUsername, email: defaultEmail, image: defaultImage } = useSelector((state) => state.user)
  const [profileError, setProfileError] = useState(null)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({ mode: 'onBlur' })

  const onSubmit = (data) => {
    const { email, username, password, image } = data
    service
      .updateCurrentUser(email, password, username, image)
      .then(({ user }) => {
        dispatch(
          setUser({
            username: user.username,
            email: user.email,
            token: user.token,
            image: user.image,
          })
        )
        navigate('/')
      })
      .catch(() => setProfileError('Edit profile error !'))
  }

  return (
    <div className={classes['form-container']}>
      <h1 className={classes.title}>Edit Profile</h1>
      <h4 style={{ color: 'red' }}>{profileError}</h4>
      <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="Username">
          Username
          <input
            id="Username"
            {...register('username', {
              required: 'Username is required',
              minLength: {
                value: 1,
                message: 'Your username must not be empty',
              },
            })}
            placeholder="Username"
            defaultValue={defaultUsername}
          />
        </label>
        <div className={classes.notification}>
          {errors?.username && <p className={classes.notification}>{errors?.username?.message || 'Error!'}</p>}
        </div>
        <label htmlFor="Email">
          Email address
          <input
            type="email"
            id="Email"
            {...register('email', {
              required: 'Email is required',
              minLength: {
                value: 1,
                message: 'Your email must not be empty',
              },
            })}
            placeholder="Email address"
            defaultValue={defaultEmail}
          />
        </label>
        <div className={classes.notification}>
          {errors?.email && <p className={classes.notification}>{errors?.email?.message || 'Error!'}</p>}
        </div>
        <label htmlFor="NewPassword">
          New Password
          <input
            type="password"
            id="NewPassword"
            {...register('newPassword', {
              required: 'Password is required',
              minLength: {
                value: 6,
                message: 'Your password needs to be at least 6 characters',
              },
              maxLength: {
                value: 40,
                message: 'Your password must be limited to a maximum of 40 characters',
              },
            })}
            placeholder="New Password"
          />
        </label>
        <div className={classes.notification}>
          {errors?.newPassword && <p className={classes.notification}>{errors?.newPassword?.message || 'Error!'}</p>}
        </div>
        <label htmlFor="Avatar">
          Avatar image (url)
          <input
            type="url"
            id="Avatar"
            {...register('image', { required: 'Avatar is required' })}
            placeholder="Avatar image"
            defaultValue={defaultImage}
          />
        </label>
        <div className={classes.notification}>
          {errors?.image && <p className={classes.notification}>{errors?.image?.message || 'Error!'}</p>}
        </div>
        <input type="submit" value="Save" />
      </form>
    </div>
  )
}

export default ProfilePage
