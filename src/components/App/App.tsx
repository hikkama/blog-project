import { FC } from 'react'
import { Route, Routes } from 'react-router-dom'

import ArticleListPage from '../../pages/ArticleListPage'
import SingleArticlePage from '../../pages/SingleArticlePage'
import NotFound from '../../pages/NotFound'
import SignInPage from '../../pages/SignInPage'
import Layout from '../Layout'
import SignUpPage from '../../pages/SignUpPage'
import ProfilePage from '../../pages/ProfilePage'
import NewArticlePage from '../../pages/NewArticlePage'
import EditArticlePage from '../../pages/EditArticlePage'

const App: FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<ArticleListPage />} />
        <Route path="/articles" element={<ArticleListPage />} />
        <Route path="/articles/:slug" element={<SingleArticlePage />} />
        <Route path="/articles/:slug/edit" element={<EditArticlePage />} />
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
