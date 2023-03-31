import React from 'react'
import { Link } from 'react-router-dom'
import { Button, Space, Typography } from 'antd'
import { HeartOutlined } from '@ant-design/icons'
import { format, parseISO } from 'date-fns'

import classes from './article.module.scss'

const { Paragraph } = Typography

function Article({ title, description, createdAt, tagList, author, favoritesCount, slug }) {
  const { username, image } = author

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
          <HeartOutlined />
          <p className={classes['like-number']}>{favoritesCount}</p>
        </div>
      </div>
      <Space className={classes.buttons} wrap>
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
          <p className={classes.date}>{format(parseISO(createdAt), 'MMMM d, yyyy')}</p>
        </div>
        <img src={image} className={classes.photo} alt="user img" />
      </div>
    </li>
  )
}

export default Article
