import { FC } from 'react'

import { ArticleData } from '../../models/ArticleData'

import styles from './App.module.scss'

const App: FC = () => {
  const mochArticles: ArticleData[] = [
    {
      slug: 'anekdot-6dzxex',
      title: 'Анекдот😋😋😋😋😋😋',
      description: '(очень смешной)',
      body: 'Едет значит таксист вечером. Его останавливает сексапильная дама и просит довезти. Таксист соглашается. Доезжают до места она ему говорит:\n— Слушай, мужик, понимаешь, денег нет. Может натурой возьмешь?\n— Да ты что??!!! Ты у меня уже восьмая такая сегодня. Никаких сил на вас не хватит. Ладно, подожди, щас все оформим.\nВыходит из машины, ловит первого попавшегося прохожего и говорит:\n— Эй, приятель, хочешь девку за полтиник?\n— Давай конечно.\n— Вон там в машине сидит, скучает.\nМужик пошел, залез в машину, делает свое дело. И тут идет наряд милиции.\nОдин из ментов светит фонариком в машину и говорит:\n— Ты что это делаешь?\n— А ты не видишь, жену трахаю.\n— Ааааа. А я думал блядь.\n— Да я тоже так думал, пока ты фонариком не посветил…',
      createdAt: '2022-10-03T19:00:35.462Z',
      updatedAt: '2022-10-03T19:00:57.561Z',
      tagList: ['#joke'],
      favorited: false,
      favoritesCount: 1,
      author: {
        username: 'nataliy',
        image: 'https://bugaga.ru/uploads/posts/2012-10/1351550998_uteata-23.jpg',
        following: false,
      },
    },
    {
      slug: 'iamnotgleb-oblcvz',
      title: 'IamnotGleb',
      description: 'notagleb',
      body: 'not gleb... nonono',
      createdAt: '2022-10-03T17:45:47.650Z',
      updatedAt: '2022-10-03T17:45:47.650Z',
      tagList: ['gleb', 'no', 'nogleb'],
      favorited: false,
      favoritesCount: 0,
      author: {
        username: 'zzzxxx12xd',
        image: 'https://textopic.ru/imgbig/name_9970.jpg',
        following: false,
      },
    },
  ]

  return (
    <div className={styles.app}>
      <header className={styles.header}>
        <div>Realworld Blog</div>
        <div className="buttons">
          <a href="/">Sign In</a>
          <a href="/">Sign Up</a>
        </div>
      </header>
      <div className={styles.container}>
        <ul className={styles.articleList}>
          {mochArticles.map((article: ArticleData, index) => {
            const { title, createdAt, favoritesCount, tagList, body } = article
            const { username, image } = article.author
            return (
              <li className={styles.articleItem} key={`${createdAt}-${index}`}>
                <div className="body">
                  <h2 className="title">{title}</h2>
                  <span>heart{favoritesCount}</span>
                  <ul className="tagList">
                    {tagList.map((tag) => (
                      <li className="tagItem" key={tag}>
                        {tag}
                      </li>
                    ))}
                  </ul>
                  <p className="articleBody">{body}</p>
                </div>
                <div className="author">
                  <div>{username}</div>
                  <div>{createdAt}</div>
                  <img src={image} alt="author" />
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}

export default App
