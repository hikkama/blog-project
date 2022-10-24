import React, { FC, useEffect, useState } from 'react'
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom'

import ArticleListPage from '../../pages/ArticleListPage'
import SingleArticlePage from '../../pages/SingleArticlePage'
import NotFound from '../../pages/NotFound'
import SignInPage from '../../pages/SignInPage'
import Layout from '../Layout'
import SignUpPage from '../../pages/SignUpPage'
import ProfilePage from '../../pages/ProfilePage'
import { useLazyGetCurrentUserQuery } from '../../services/BlogService'
import { useAppDispatch } from '../../hooks/redux'
import { addUser } from '../../store/reducers/blogSlice'
import NewArticlePage from '../../pages/NewArticlePage'

// https://www.figma.com/file/XXBjJXew3xpfbOZUnO9QVB/Blog?node-id=9582%3A0
// https://api.realworld.io/api-docs/

const App: FC = () => {
  const [getUser, { data, error, isError }] = useLazyGetCurrentUserQuery()
  const dispatch = useAppDispatch()

  const navigate = useNavigate()

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<ArticleListPage />} />
        <Route path="/articles" element={<ArticleListPage />} />
        <Route path="/articles/:slug" element={<SingleArticlePage />} />
        <Route path="/sign-in" element={<SignInPage />} />
        <Route path="/sign-up" element={<SignUpPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/new-article" element={<NewArticlePage />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}

export default App
