import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'

import { setUser } from '../store/slices/userSlice'
import BlogService from '../services/service'
import ServiceLocalStorage from '../services/localStorage-service'

import classes from './index.module.scss'

const localStorageService = new ServiceLocalStorage()
const service = new BlogService()

function SignUpPage() {
  const [registerError, setRegisterError] = useState(null)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {
    register,
    getValues,
    formState: { errors },
    handleSubmit,
  } = useForm({ mode: 'onBlur' })

  const onSubmit = (data) => {
    const { email, username, password } = data
    service
      .registerUser(email, username, password)
      .then(({ user }) => {
        dispatch(
          setUser({
            username: user.username,
            email: user.email,
            token: user.token,
            image: user.image,
          })
        )
        localStorageService.setToken('tokenKey', user.token)
        navigate('/')
      })
      .catch(() => setRegisterError('Register error !'))
  }

  return (
    <div className={classes['form-container']}>
      <h1 className={classes.title}>Create new account</h1>
      <h4 style={{ color: 'red' }}>{registerError}</h4>
      <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="Username">
          Username
          <input
            id="Username"
            {...register('username', {
              required: 'Username is required',
              minLength: {
                value: 3,
                message: 'Your username needs to be at least 3 characters',
              },
              maxLength: {
                value: 20,
                message: 'Your username must be limited to a maximum of 20 characters',
              },
            })}
            placeholder="Username"
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
            {...register('email', { required: 'Email is required' })}
            placeholder="Email address"
          />
        </label>
        <div className={classes.notification}>
          {errors?.email && <p className={classes.notification}>{errors?.email?.message || 'Error!'}</p>}
        </div>
        <label htmlFor="Password">
          Password
          <input
            type="password"
            id="Password"
            {...register('password', {
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
            placeholder="Password"
          />
        </label>
        <div className={classes.notification}>
          {errors?.password && <p className={classes.notification}>{errors?.password?.message || 'Error!'}</p>}
        </div>
        <label htmlFor="Repeat_Password">
          Repeat Password
          <input
            type="password"
            id="Repeat_Password"
            {...register('repeat_password', {
              required: 'Password is required',
              minLength: {
                value: 6,
                message: 'Your password needs to be at least 6 characters',
              },
              maxLength: {
                value: 40,
                message: 'Your password must be limited to a maximum of 40 characters',
              },
              validate: (value) => {
                const { password } = getValues()
                return password === value || 'Passwords must match'
              },
            })}
            placeholder="Password"
          />
        </label>
        <div className={classes.notification}>
          {errors?.repeat_password && (
            <p className={classes.notification}>{errors?.repeat_password?.message || 'Error!'}</p>
          )}
        </div>
        <div className={classes.line} />
        <label htmlFor="Check" className={classes.checkbox}>
          <input type="checkbox" id="Check" {...register('check', { required: 'Your agree is required' })} />I agree to
          the processing of my personal information
        </label>
        <div className={classes.notification}>
          {errors?.check && <p className={classes.notification}>{errors?.check?.message || 'Error!'}</p>}
        </div>
        <input type="submit" value="Create" />
      </form>
      <p className={classes['footer-text']}>
        Already have an account?{' '}
        <Link to="/sign-in" className={classes['footer-link']}>
          Sign In
        </Link>
        .
      </p>
    </div>
  )
}

export default SignUpPage
