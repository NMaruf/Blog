import React, { useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import Header from '../header'
import NotFound from '../not-found'
import HomePage from '../../pages/home-page'
import ArticleDetailsPage from '../../pages/article-details-page'
import SignInPage from '../../pages/sign-in-page'
import SignUpPage from '../../pages/sign-up-page'
import ProfilePage from '../../pages/profile-page'
import { setUser } from '../../store/slices/userSlice'
import BlogService from '../../services/service'
import CreateArticlePage from '../../pages/create-article-page'
import RequireAuth from '../../hoc/require-auth'
import ServiceLocalStorage from '../../services/localStorage-service'
import { articles, articleSlug, signIn, signUp, profile, newArticle, articlesEdit } from '../../constans'

import classes from './app.module.scss'

const service = new BlogService()
const localStorageService = new ServiceLocalStorage()

function App() {
  const dispatch = useDispatch()
  const token = localStorageService.getToken('tokenKey')

  useEffect(() => {
    service
      .getCurrentUser()
      .then(({ user }) => {
        dispatch(
          setUser({
            username: user.username,
            email: user.email,
            token: user.token,
            image: user.image,
          })
        )
      })
      .catch(() => console.log('Get current user ERROR!'))
  }, [token])

  return (
    <div className={classes.container}>
      <Routes>
        <Route path="/" element={<Header />}>
          <Route index element={<HomePage />} />
          <Route path={articles} element={<Navigate to="/" replace />} />
          <Route path={articleSlug} element={<ArticleDetailsPage />} />
          <Route path={signIn} element={<SignInPage />} />
          <Route path={signUp} element={<SignUpPage />} />
          <Route
            path={profile}
            element={
              <RequireAuth>
                <ProfilePage />
              </RequireAuth>
            }
          />
          <Route
            path={newArticle}
            element={
              <RequireAuth>
                <CreateArticlePage />
              </RequireAuth>
            }
          />
          <Route
            path={articlesEdit}
            element={
              <RequireAuth>
                <CreateArticlePage />
              </RequireAuth>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
