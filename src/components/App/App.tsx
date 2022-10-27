import { FC } from 'react'
import { Route, Routes } from 'react-router-dom'

import Articles from '../../pages/Articles'
import SingleArticle from '../../pages/SingleArticle'
import NotFound from '../../pages/NotFound'
import SignIn from '../../pages/SignIn'
import Layout from '../Layout'
import SignUp from '../../pages/SignUp'
import EditProfile from '../../pages/EditProfile'
import NewArticle from '../../pages/NewArticle'
import EditArticle from '../../pages/EditArticle'

const App: FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<Articles />} />
        <Route path="/articles" element={<Articles />} />
        <Route path="/articles/:slug" element={<SingleArticle />} />
        <Route path="/articles/:slug/edit" element={<EditArticle />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/profile" element={<EditProfile />} />
        <Route path="/new-article" element={<NewArticle />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}

export default App
