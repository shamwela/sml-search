import { initTRPC } from '@trpc/server'
import * as trpcNext from '@trpc/server/adapters/next'
import { z } from 'zod'
import axios from 'axios'

type SearchValue = {
  id: string
  title: string
  url: string
}

type WebSearchData = {
  value: SearchValue[]
}

export const t = initTRPC.create()

export const appRouter = t.router({
  search: t.procedure.input(z.string()).query(async ({ input }) => {
    try {
      const { data } = await axios.get(
        'https://contextualwebsearch-websearch-v1.p.rapidapi.com/api/Search/WebSearchAPI',
        {
          params: {
            q: input,
            pageNumber: '1',
            pageSize: '10',
            autoCorrect: 'true',
          },
          headers: {
            'X-RapidAPI-Key': process.env.RAPID_API_KEY,
            // Might need to change this
            'X-RapidAPI-Host':
              'contextualwebsearch-websearch-v1.p.rapidapi.com',
          },
        }
      )
      return data as WebSearchData
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
