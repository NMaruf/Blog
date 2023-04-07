import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'

import BlogService from '../services/service'
import { removeEdit } from '../store/slices/editArticleSlice'

import classes from './index.module.scss'

const service = new BlogService()

function CreateArticlePage() {
  const [createArtError, setCreateArtError] = useState(null)
  const [label, setLabel] = useState('')
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { edit } = useSelector((state) => state.edit)
  const articleDetails = useSelector((state) => state.articleDetails.articleDetails)
  const { slug } = useParams()

  const {
    title: titleDefault,
    description: descriptionDefault,
    tagList: tagListDefault,
    body: bodyDefault,
  } = articleDetails

  // eslint-disable-next-line prefer-const
  let [tagList, setTagList] = useState(edit ? [...tagListDefault] : [])

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({ mode: 'onBlur' })

  const onSubmit = (data) => {
    data.tagList = tagList
    if (!edit) {
      service
        .createArticle(data)
        .then(({ article }) => {
          console.log('Result server CREATE ARTICLE: ', article)
          navigate('/')
        })
        .catch(() => setCreateArtError('Do not create article !'))
    } else {
      service
        .editArticle(data, slug)
        .then(({ article }) => {
          console.log('Result server EDIT ARTICLE: ', article)
          dispatch(removeEdit())
          navigate('/')
        })
        .catch(() => setCreateArtError('Do not edit article !'))
    }
  }

  const tagButtons = tagList.map((el, id) => (
    <div key={el} className={classes['tag-container']}>
      <input value={el} className={classes.tag} readOnly />
      <button
        type="button"
        className={classes.delete}
        onClick={() => {
          setTagList([...tagList.slice(0, id), ...tagList.slice(id + 1)])
        }}
      >
        Delete
      </button>
    </div>
  ))

  return (
    <div className={`${classes['form-container']} ${classes['create-article']}`}>
      <h1 className={classes.title}> {edit ? 'Edit article' : 'Create new article'}</h1>
      <h4 style={{ color: 'red' }}>{createArtError}</h4>
      <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="Title">
          Title
          <input
            id="Title"
            {...register('title', { required: 'Title is required' })}
            placeholder="Title"
            defaultValue={edit ? titleDefault : ''}
          />
        </label>
        <div className={classes.notification}>
          {errors?.title && <p className={classes.notification}>{errors?.title?.message || 'Error!'}</p>}
        </div>
        <label htmlFor="ShortDescription">
          Short description
          <input
            id="ShortDescription"
            {...register('description', { required: 'Short description is required' })}
            placeholder="Short description"
            defaultValue={edit ? descriptionDefault : ''}
          />
        </label>
        <div className={classes.notification}>
          {errors?.description && <p className={classes.notification}>{errors?.description?.message || 'Error!'}</p>}
        </div>
        <label htmlFor="Text">
          Text
          <textarea
            id="Text"
            className={classes.body}
            {...register('body', { required: 'Text is required' })}
            placeholder="Text"
            defaultValue={edit ? bodyDefault : ''}
          />
        </label>
        <div className={classes.notification}>
          {errors?.body && <p className={classes.notification}>{errors?.body?.message || 'Error!'}</p>}
        </div>
        <label htmlFor="Tag">
          Tags
          {tagButtons}
          <div className={classes['tag-container']}>
            <input
              className={classes.tag}
              id="Tag"
              placeholder="Tag"
              value={label}
              onChange={(e) => setLabel(e.target.value)}
            />
            <button type="button" className={classes.delete} onClick={() => setLabel('')}>
              Delete
            </button>
            <button
              type="button"
              className={classes.add}
              onClick={() => {
                const copy = Object.assign([], tagList)
                copy.push(label)
                setTagList(copy)
                setLabel('')
              }}
            >
              Add tag
            </button>
          </div>
        </label>
        <input type="submit" value="Send" className={classes.send} />
      </form>
    </div>
  )
}

export default CreateArticlePage
