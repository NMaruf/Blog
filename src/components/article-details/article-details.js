import React, { useEffect, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import { useParams } from 'react-router-dom'
import { HeartOutlined } from '@ant-design/icons'
import { Alert, Button, Space, Spin } from 'antd'
import { format, parseISO } from 'date-fns'

import BlogService from '../../services/service'

import classes from './article-details.module.scss'

const service = new BlogService()

function ArticleDetails() {
  const [article, setArticle] = useState()
  const [error, setError] = useState(null)
  const [load, setLoad] = useState(true)
  const { slug } = useParams()

  useEffect(() => {
    service
      .getArticleDetails(`${slug}`)
      .then((data) => {
        setLoad(false)
        setArticle(data)
      })
      .catch((err) => {
        setLoad(false)
        setError(err.message)
      })
  }, [slug])

  if (article !== undefined) {
    const { title, description, createdAt, tagList, author, favoritesCount, body } = article
    const { username, image } = author

    let uniqKey = 100
    const tagBtn = tagList?.map((tag) => {
      uniqKey += 1
      return (
        <Button className={classes.btn} key={uniqKey}>
          {tag}
        </Button>
      )
    })

    return (
      <section className={classes.article}>
        <div className={classes['article-header']}>
          <h5 className={classes.title}>{title}</h5>
          <div className={classes.like}>
            <HeartOutlined />
            <p className={classes['like-number']}>{favoritesCount}</p>
          </div>
        </div>
        <Space className={classes.buttons} wrap>
          {tagBtn}
        </Space>
        <p className={classes.text}>{description}</p>
        <ReactMarkdown>{body}</ReactMarkdown>
        {/* <p>{body}</p> */}
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
  if (load === true && error === null) {
    return <Spin className={classes.spinner} />
  }
  if (error !== null) {
    return <Alert className={classes.alert} message="Error" description={error} type="error" showIcon />
  }
}

export default ArticleDetails
