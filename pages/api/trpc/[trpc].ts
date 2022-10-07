import { initTRPC, TRPCError } from '@trpc/server'
import * as trpcNext from '@trpc/server/adapters/next'
import { z } from 'zod'
import axios from 'axios'

export const t = initTRPC.create()

export const appRouter = t.router({
  search: t.procedure.input(z.string()).query(async ({ input }) => {
    const key = process.env.API_KEY
    const cx = process.env.CONTEXT_KEY
    try {
      const { data } = await axios.get(
        'https://www.googleapis.com/customsearch/v1',
        {
          params: {
            q: input,
            key,
            cx,
          },
        }
      )
      if (!data.items) {
        return []
      }
      type Result = {
        title: string
        link: string
      }
      // Trim data to reduce size
      const results: Result[] = data.items.map(({ title, link }: any) => ({
        title,
        link,
      }))

      return results
    } catch (error) {
      if (error instanceof Error) {
        throw error
      }
      console.error(error)
    }
  }),
})

// Export type definition of API
export type AppRouter = typeof appRouter

// Export API handler
export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext: () => ({}),
})
