import { Suspense, lazy, FC } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from 'react-query'
import Loading from 'components/Loading'
import Layout from 'components/Layout'

const queryClient = new QueryClient()

const Home = lazy(() => import('pages/Home'))

const App: FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Router basename="/video-games-data">
        <Layout>
          <Suspense fallback={<Loading />}>
            <Routes>
              <Route path="/" element={<Home />} />
            </Routes>
          </Suspense>
        </Layout>
      </Router>
    </QueryClientProvider>
  )
}

export default App
