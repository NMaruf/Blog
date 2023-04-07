import React, { useEffect } from 'react'
import ReactMarkdown from 'react-markdown'
import { useNavigate, useParams } from 'react-router-dom'
import { HeartOutlined } from '@ant-design/icons'
import { Alert, Button, Space, Spin, message, Popconfirm } from 'antd'
import { format } from 'date-fns'
import { useDispatch, useSelector } from 'react-redux'

import { articlesEdit } from '../../constans'
import { setEdit } from '../../store/slices/editArticleSlice'
import { fetchArticleDetails } from '../../store/slices/articleDetailsSlice'
import BlogService from '../../services/service'
import ServiceLocalStorage from '../../services/localStorage-service'

import classes from './article-details.module.scss'

const service = new BlogService()
const localStorageService = new ServiceLocalStorage()

function ArticleDetails() {
  const article = useSelector((state) => state.articleDetails.articleDetails)
  const user = useSelector((state) => state.user)
  const { status, error } = useSelector((state) => state.articleDetails)
  const { slug } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(fetchArticleDetails(slug))
  }, [])

  const { title, description, updatedAt, createdAt, tagList, favorited, favoritesCount, body, author } = article
  const { username, image } = author || {}

  const statusMessage =
    // eslint-disable-next-line no-nested-ternary
    status === 'loading' ? (
      <Spin className={classes.spinner} />
    ) : status === 'rejected' ? (
      <Alert className={classes.alert} message="Error" description={error} type="error" showIcon />
    ) : null

  const confirm = () => {
    service
      .deleteArticle(slug)
      .then(() => message.success('Article deleted !'))
      .catch(() => message.error('Error on deleting !'))
  }
  const cancel = () => {
    message.error('Article has not been deleted !')
  }

  const favorite = () => {
    service
      .favoriteArticle(slug)
      .then(() => dispatch(fetchArticleDetails(slug)))
      .then(() => message.success('Like !'))
      .catch(() => message.error('Error on favoriting !'))
  }

  const unFavorite = () => {
    service
      .unFavoriteArticle(slug)
      .then(() => dispatch(fetchArticleDetails(slug)))
      .then(() => message.success('Like removed !'))
      .catch(() => message.error('Error on removing a like !'))
  }

  let uniqKey = 100
  const tagBtn = tagList?.map((tag) => {
    uniqKey += 1
    return (
      <Button className={classes.btn} key={uniqKey}>
        {tag}
      </Button>
    )
  })

  const editButtons = (
    <div className={classes.btns}>
      <Popconfirm
        title="Delete the task"
        description="Are you sure to delete this task?"
        onConfirm={confirm}
        onCancel={cancel}
        okText="Yes"
        cancelText="No"
      >
        <button type="button" className={classes.delete}>
          Delete
        </button>
      </Popconfirm>
      <button
        type="button"
        className={classes.edit}
        onClick={() => {
          dispatch(setEdit())
          navigate(articlesEdit)
        }}
      >
        Edit
      </button>
    </div>
  )

  return (
    <section className={classes.article}>
      {statusMessage}
      <div className={classes['article-header']}>
        <h5 className={classes.title}>{title}</h5>
        <div className={classes.like}>
          {localStorageService.getToken('tokenKey') ? (
            <HeartOutlined
              className={classes[`${favorited ? 'active' : ''}`]}
              onClick={() => (favorited === false ? favorite() : unFavorite())}
            />
          ) : (
            <HeartOutlined />
          )}
          <p className={classes['like-number']}>{favoritesCount}</p>
        </div>
      </div>
      <Space className={classes.tags} wrap>
        {tagBtn}
      </Space>
      {user.username === username ? editButtons : null}
      <p className={classes.text}>{description}</p>
      <ReactMarkdown className={classes.body}>{body}</ReactMarkdown>
      <div className={classes.user}>
        <div className={classes['user-description']}>
          <h6 className={classes.username}>{username}</h6>
          <p className={classes.date}>
            {(updatedAt || createdAt) && format(new Date(updatedAt || createdAt), 'MMMM d, yyyy')}
          </p>
        </div>
        <img
          src={
            image === 'https://static.productionready.io/images/smiley-cyrus.jpg' ? '..//images/Rectangle 1.svg' : image
          }
          className={classes.photo}
          alt="user img"
        />
      </div>
    </section>
  )
}

export default ArticleDetails
