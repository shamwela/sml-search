import 'styles/globals.css'
import type { AppType } from 'next/dist/shared/lib/utils'
import { trpc } from 'utilities/trpc'

const App: AppType = ({ Component, pageProps }) => {
  return <Component {...pageProps} />
}

export default trpc.withTRPC(App)
