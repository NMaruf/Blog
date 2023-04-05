import React from 'react'
import { Link } from 'react-router-dom'
import { Button, Space, Typography, message } from 'antd'
import { HeartOutlined } from '@ant-design/icons'
import { format } from 'date-fns'
import { useDispatch } from 'react-redux'

import BlogService from '../../services/service'
import { likeArticle } from '../../store/slices/articleSlice'
import ServiceLocalStorage from '../../services/localStorage-service'

import classes from './article.module.scss'

const service = new BlogService()
const localStorageService = new ServiceLocalStorage()

const { Paragraph } = Typography

function Article({ title, description, updatedAt, createdAt, tagList, author, favoritesCount, slug, favorited }) {
  const { username, image } = author
  const dispatch = useDispatch()

  const getUTCDate = (dateString = Date.now()) => {
    const date = new Date(dateString)

    return new Date(
      date.getUTCFullYear(),
      date.getUTCMonth(),
      date.getUTCDate(),
      date.getUTCHours(),
      date.getUTCMinutes(),
      date.getUTCSeconds()
    )
  }

  const favorite = () => {
    service
      .favoriteArticle(slug)
      .then(() => message.success('Article favorited !'))
      .catch(() => message.error('Error on favoriting !'))
    dispatch(likeArticle())
  }

  const unFavorite = () => {
    service
      .unFavoriteArticle(slug)
      .then(() => message.success('Article unFavorited !'))
      .catch(() => message.error('Error on unFavoriting !'))
    dispatch(likeArticle())
  }

  let uniqKey = 100
  const tagBtn = tagList.map((tag) => {
    uniqKey += 1
    return (
      <Button className={classes.btn} key={uniqKey}>
        {tag}
      </Button>
    )
  })

  return (
    <li className={classes.article}>
      <div className={classes['article-header']}>
        <Link to={`/articles/${slug}`} className={classes.title}>
          {title}
        </Link>
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
      <Paragraph
        className={classes.text}
        ellipsis={{
          expandable: true,
          rows: 2,
          symbol: 'Показать всё',
        }}
      >
        {description}
      </Paragraph>
      <div className={classes.user}>
        <div className={classes['user-description']}>
          <h6 className={classes.username}>{username}</h6>
          <p className={classes.date}>{format(getUTCDate(updatedAt || createdAt), 'MMMM d, yyyy')}</p>
        </div>
        <img src={image} className={classes.photo} alt="user img" />
      </div>
    </li>
  )
}

export default Article
