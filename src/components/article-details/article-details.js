import React, { useEffect } from 'react'
import ReactMarkdown from 'react-markdown'
import { useNavigate, useParams } from 'react-router-dom'
import { HeartOutlined } from '@ant-design/icons'
import { Alert, Button, Space, Spin, message, Popconfirm } from 'antd'
import { format, parseISO } from 'date-fns'
import { useDispatch, useSelector } from 'react-redux'

import { setEdit } from '../../store/slices/editArticleSlice'
import { fetchArticleDetails } from '../../store/slices/articleDetailsSlice'
import BlogService from '../../services/service'

import classes from './article-details.module.scss'

const service = new BlogService()

function ArticleDetails() {
  const article = useSelector((state) => state.articleDetails.articleDetails)
  const user = useSelector((state) => state.user)
  const { status, error } = useSelector((state) => state.articleDetails)
  const { slug } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(fetchArticleDetails(slug))
  }, [slug])

  /* eslint-disable */
  const statusMessage =
    status === 'loading' ? (
      <Spin className={classes.spinner} />
    ) : status === 'rejected' ? (
      <Alert className={classes.alert} message="Error" description={error} type="error" showIcon />
    ) : null
  /* eslint-ensable */

  const { title, description, createdAt, tagList, favoritesCount, body, author } = article
  const { username, image } = author || {}
  const confirm = () => {
    service
      .deleteArticle(slug)
      .then(() => message.success('Article deleted !'))
      .catch(() => message.error('Error on deleting !'))
  }
  const cancel = () => {
    message.error('Article has not been deleted !')
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
          navigate('edit')
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
          <HeartOutlined />
          <p className={classes['like-number']}>{favoritesCount}</p>
        </div>
      </div>
      <Space className={classes.tags} wrap>
        {tagBtn}
      </Space>
      {user.username === username && user.image === image ? editButtons : null}
      <p className={classes.text}>{description}</p>
      <ReactMarkdown className={classes.body}>{body}</ReactMarkdown>
      <div className={classes.user}>
        <div className={classes['user-description']}>
          <h6 className={classes.username}>{username}</h6>
          <p className={classes.date}>{format(parseISO(createdAt), 'MMMM d, yyyy')}</p>
        </div>
        <img src={image} className={classes.photo} alt="user img" />
      </div>
    </section>
  )
}

export default ArticleDetails
