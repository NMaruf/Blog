import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { setUser } from '../store/slices/userSlice'
import BlogService from '../services/service'
import ServiceLocalStorage from '../services/localStorage-service'

import classes from './index.module.scss'

const service = new BlogService()
const localStorageService = new ServiceLocalStorage()

const formSchema = z.object({
  email: z.string().email('Invalid email').min(1, 'Your email must not be empty'),
  password: z.string().min(1, 'Your password must not be empty'),
})

function SignInPage() {
  const [userError, setUserError] = useState(null)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({ mode: 'onBlur', resolver: zodResolver(formSchema) })

  const onSubmit = (data) => {
    const { email, password } = data
    service
      .loginUser(email, password)
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
      .catch(() => setUserError('Invalid user !'))
  }

  return (
    <div className={classes['form-container']}>
      <h1 className={classes.title}>Sign In</h1>
      <h4 style={{ color: 'red' }}>{userError}</h4>
      <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="Email">
          Email address
          <input type="email" id="Email" {...register('email')} placeholder="Email address" />
        </label>
        <div className={classes.notification}>
          {errors?.email && <p className={classes.notification}>{errors?.email?.message || 'Error!'}</p>}
        </div>
        <label htmlFor="Password">
          Password
          <input type="password" id="Password" {...register('password')} placeholder="Password" />
        </label>
        <div className={classes.notification}>
          {errors?.password && <p className={classes.notification}>{errors?.password?.message || 'Error!'}</p>}
        </div>
        <input type="submit" value="Login" />
      </form>
      <p className={classes['footer-text']}>
        Don’t have an account?{' '}
        <Link to="/sign-up" className={classes['footer-link']}>
          Sign Up
        </Link>
        .
      </p>
    </div>
  )
}

export default SignInPage
