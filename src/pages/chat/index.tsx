import useAuth from '@/hooks/useAuth'
import { Meta } from '@/layouts/Meta'
import { Main } from '@/templates/Main'

import MainPage from '../../components/chat/mainpage'

function Library() {
  const isAuthenticated = useAuth(true)
  return (
    <Main
      meta={
        <Meta
          title="Ylvonis"
          description="Next js Boilerplate is the perfect starter code for your project. Build your React application with the Next.js framework."
        />
      }
      title="Chat"
    >
      {isAuthenticated && <MainPage />}
    </Main>
  )
}

export default Library
