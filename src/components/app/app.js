import React from 'react'
import { Routes, Route } from 'react-router-dom'

import Header from '../header'
import ArticleList from '../article-list'
import ArticleDetails from '../article-details'
import NotFound from '../not-found'

import classes from './app.module.scss'

function App() {
  return (
    <div className={classes.container}>
      <Routes>
        <Route path="/" element={<Header />}>
          <Route index element={<ArticleList />} />
          <Route path="articles" element={<ArticleList />} />
          <Route path="articles/:slug" element={<ArticleDetails />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
