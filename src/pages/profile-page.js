import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { setUser } from '../store/slices/userSlice'
import BlogService from '../services/service'

import classes from './index.module.scss'

const service = new BlogService()

const formSchema = z
  .object({
    username: z
      .string()
      .min(3, { message: 'Your username needs to be at least 3 characters' })
      .max(20, 'Your username must be limited to a maximum of 20 characters')
      .optional()
      .or(z.literal('')),
    email: z.string().email('Invalid email').optional().or(z.literal('')),
    newPassword: z
      .string()
      .min(6, 'Your password needs to be at least 6 characters')
      .max(40, 'Your password must be limited to a maximum of 40 characters')
      .optional()
      .or(z.literal('')),
    image: z.string().url('Invalid url !').optional().or(z.literal('')),
  })
  .superRefine((values, ctx) => {
    if (!values.username && !values.email && !values.newPassword && !values.image) {
      ctx.addIssue({
        message: 'At least one field is required.',
        code: z.ZodIssueCode.custom,
        path: ['username'],
      })
      ctx.addIssue({
        message: 'At least one field is required.',
        code: z.ZodIssueCode.custom,
        path: ['email'],
      })
      ctx.addIssue({
        message: 'At least one field is required.',
        code: z.ZodIssueCode.custom,
        path: ['newPassword'],
      })
      ctx.addIssue({
        message: 'At least one field is required.',
        code: z.ZodIssueCode.custom,
        path: ['image'],
      })
    }
  })

function ProfilePage() {
  const { username: defaultUsername, email: defaultEmail, image: defaultImage } = useSelector((state) => state.user)
  const [profileError, setProfileError] = useState(null)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({ mode: 'onBlur', resolver: zodResolver(formSchema) })

  const onSubmit = (data) => {
    const objData = {}
    // eslint-disable-next-line no-restricted-syntax
    for (const key in data) {
      if (data[key].length > 0) {
        objData[key] = data[key]
      }
    }
    service
      .updateCurrentUser(objData)
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
          <input id="Username" {...register('username')} placeholder="Username" defaultValue={defaultUsername} />
        </label>
        <div className={classes.notification}>
          {errors?.username && <p className={classes.notification}>{errors?.username?.message || 'Error!'}</p>}
        </div>
        <label htmlFor="Email">
          Email address
          <input
            type="email"
            id="Email"
            {...register('email')}
            placeholder="Email address"
            defaultValue={defaultEmail}
          />
        </label>
        <div className={classes.notification}>
          {errors?.email && <p className={classes.notification}>{errors?.email?.message || 'Error!'}</p>}
        </div>
        <label htmlFor="NewPassword">
          New Password
          <input type="password" id="NewPassword" {...register('newPassword')} placeholder="New Password" />
        </label>
        <div className={classes.notification}>
          {errors?.newPassword && <p className={classes.notification}>{errors?.newPassword?.message || 'Error!'}</p>}
        </div>
        <label htmlFor="Avatar">
          Avatar image (url)
          <input type="url" id="Avatar" {...register('image')} placeholder="Avatar image" defaultValue={defaultImage} />
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
