import { FC } from 'react'

import Header from '../Header'
import ArticleList from '../ArticleList'
import PaginationBlock from '../PaginationBlock'
import { useFetchAllArticlesQuery } from '../../services/BlogService'

import styles from './App.module.scss'
//https://www.figma.com/file/XXBjJXew3xpfbOZUnO9QVB/Blog?node-id=9582%3A0
const App: FC = () => {
  const { isLoading, error, data } = useFetchAllArticlesQuery(0)

  return (
    <>
      <Header />
      <div className={styles.container}>
        {isLoading && <div>Loading...</div>}
        {error && <div>Error</div>}
        {data && (
          <>
            <ArticleList articles={data.articles} />
            <PaginationBlock />
          </>
        )}
      </div>
    </>
  )
}

export default App
