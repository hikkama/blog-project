import React, { FC } from 'react'
import { RouteObject, useRoutes } from 'react-router-dom'

import Header from '../Header'
import ArticleListPage from '../../pages/ArticleListPage'
import SingleArticlePage from '../../pages/SingleArticlePage'

import styles from './App.module.scss'

//https://www.figma.com/file/XXBjJXew3xpfbOZUnO9QVB/Blog?node-id=9582%3A0
//https://api.realworld.io/api-docs/

const App: FC = () => {
  const routes: RouteObject[] = [
    {
      path: '/',
      element: <ArticleListPage />,
      children: [{ path: '/articles', element: <ArticleListPage /> }],
    },
    { path: '/articles/:slug', element: <SingleArticlePage /> },
  ]

  return useRoutes(routes)
}

const AppWrapper = () => (
  <>
    <Header />
    <div className={styles.container}>
      <App />
    </div>
  </>
)

export default AppWrapper
