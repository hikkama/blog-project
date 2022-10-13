import React, { FC } from 'react'
import { Route, Routes } from 'react-router-dom'

import ArticleListPage from '../../pages/ArticleListPage'
import SingleArticlePage from '../../pages/SingleArticlePage'
import NotFound from '../../pages/NotFound'
import SignInPage from '../../pages/SignInPage'
import Layout from '../Layout'
import SignUpPage from '../../pages/SignUpPage'
import ProfilePage from '../../pages/ProfilePage'

// https://www.figma.com/file/XXBjJXew3xpfbOZUnO9QVB/Blog?node-id=9582%3A0
// https://api.realworld.io/api-docs/

const App: FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<ArticleListPage />} />
        <Route path="/articles" element={<ArticleListPage />} />
        <Route path="/articles/:slug" element={<SingleArticlePage />} />
        <Route path="/sign-in" element={<SignInPage />} />
        <Route path="/sign-up" element={<SignUpPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}

export default App
