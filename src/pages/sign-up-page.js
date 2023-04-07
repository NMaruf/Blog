import React, { useState } from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'

import { setUser } from '../store/slices/userSlice'
import BlogService from '../services/service'
import ServiceLocalStorage from '../services/localStorage-service'
import { signIn } from '../constans'

import classes from './index.module.scss'

const localStorageService = new ServiceLocalStorage()
const service = new BlogService()

const formSchema = z
  .object({
    username: z
      .string()
      .min(3, { message: 'Your username needs to be at least 3 characters' })
      .max(20, 'Your username must be limited to a maximum of 20 characters'),
    email: z.string().email('Invalid email'),
    password: z
      .string()
      .min(6, 'Your password needs to be at least 6 characters')
      .max(40, 'Your password must be limited to a maximum of 40 characters'),
    confirmPassword: z
      .string()
      .min(6, 'Your password needs to be at least 6 characters')
      .max(40, 'Your password must be limited to a maximum of 40 characters'),
    terms: z.literal(true, { errorMap: () => ({ message: 'Your agree is required' }) }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Passwords must match',
  })

function SignUpPage() {
  const [registerError, setRegisterError] = useState(null)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({ mode: 'onBlur', resolver: zodResolver(formSchema) })

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
          <input id="Username" {...register('username')} placeholder="Username" />
        </label>
        <div className={classes.notification}>
          {errors?.username && <p className={classes.notification}>{errors?.username?.message || 'Error!'}</p>}
        </div>
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
        <label htmlFor="Repeat_Password">
          Repeat Password
          <input type="password" id="Repeat_Password" {...register('confirmPassword')} placeholder="Password" />
        </label>
        <div className={classes.notification}>
          {errors?.confirmPassword && (
            <p className={classes.notification}>{errors?.confirmPassword?.message || 'Error!'}</p>
          )}
        </div>
        <div className={classes.line} />
        <label htmlFor="Check" className={classes.checkbox}>
          <input type="checkbox" id="Check" {...register('terms')} />I agree to the processing of my personal
          information
        </label>
        <div className={classes.notification}>
          {errors?.terms && <p className={classes.notification}>{errors?.terms?.message || 'Error!'}</p>}
        </div>
        <input type="submit" value="Create" />
      </form>
      <p className={classes['footer-text']}>
        Already have an account?{' '}
        <Link to={`/${signIn}`} className={classes['footer-link']}>
          Sign In
        </Link>
        .
      </p>
    </div>
  )
}

export default SignUpPage
