import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Pagination, Spin, Alert } from 'antd'

import Article from '../article'
import { fetchArticles } from '../../store/articleSlice'

import classes from './article-list.module.scss'

function ArticleList() {
  const [page, setPage] = useState(1)
  const articles = useSelector((state) => state.articles.articles)
  const { status, error } = useSelector((state) => state.articles)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchArticles(page))
  }, [page])
  /* eslint-disable */
  const message =
    status === 'loading' ? (
      <Spin className={classes.spinner} />
    ) : status === 'rejected' ? (
      <Alert className={classes.alert} message="Error" description={error} type="error" showIcon />
    ) : null
  /* eslint-ensable */

  const results = articles.map((article) => {
    const { createdAt, updatedAt, ...itemProps } = article
    const uniqId = createdAt + updatedAt
    return <Article key={uniqId} createdAt={createdAt} updatedAt={updatedAt} {...itemProps} />
  })

  const content =
    results.length !== 0 ? (
      <>
        {results}
        <Pagination
          className={classes.pagination}
          current={page}
          onChange={(page) => setPage(page)}
          showSizeChanger={false}
          total={500}
        />
      </>
    ) : null

  return (
    <ul className={classes['article-list']}>
      {message}
      {content}
    </ul>
  )
}

export default ArticleList