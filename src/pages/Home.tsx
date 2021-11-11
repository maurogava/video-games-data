import { FC, useMemo } from 'react'
import { useQuery } from 'react-query'
import Loading from 'components/Loading'
import Table from 'components/table/Table'

import styles from './Home.module.scss'

type Games = {
  title: string
  platform: string
  score: number
  genre: string
  editors_choice: string
}

const fetchGames = () =>
  fetch(
    'https://s3-ap-southeast-1.amazonaws.com/he-public-data/gamesarena274f2bf.json'
  ).then((res) => res.json())

const Home: FC = () => {
  const { isLoading, error, data } = useQuery<Games[], Error>(
    'gamesdata',
    fetchGames,
    { refetchOnWindowFocus: false }
  )

  console.log('Home')

  const columns = useMemo(
    () => [
      {
        title: 'Title',
        accesor: 'title',
        className: styles.title,
      },
      {
        title: 'Platform',
        accesor: 'platform',
        className: styles.platform,
      },
      {
        title: 'Score',
        accesor: 'score',
        className: styles.score,
        hasSort: true,
      },
      {
        title: 'Genre',
        accesor: 'genre',
        className: styles.genre,
      },
      {
        title: "Editor's choice",
        accesor: 'editors_choice',
        className: styles.choice,
      },
    ],
    []
  )

  if (isLoading) {
    return <Loading />
  }

  if (error || !data) {
    return <p>An error has occurred</p>
  }

  return <Table columns={columns} data={data} className={styles.table} />
}

export default Home
