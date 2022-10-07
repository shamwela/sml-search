import axios from 'axios'
import { FormEvent, useState } from 'react'
import { useQuery } from '@tanstack/react-query'

type SearchValue = {
  title: string
  webpageUrl: string
}

type WebSearchData = {
  value: SearchValue[]
}

const Home = () => {
  const [query, setQuery] = useState('')
  const { error, isLoading, isSuccess, data } = useQuery(
    ['results', query],
    async ({ queryKey }) => {
      const query = queryKey[1]
      const { data } = await axios.get('/api/search', {
        params: { query },
      })
      return data as WebSearchData
    }
  )

  return (
    <>
      {/* Add Head here later */}
      <main>
        <form
          onSubmit={(event) => {
            event.preventDefault()
            const { elements } = event.currentTarget
            const query = (
              elements.namedItem('query') as HTMLInputElement
            ).value
              .trim()
              .toLowerCase()
            setQuery(query)
          }}
        >
          <input type='search' name='query' id='query' />
          <button type='submit'>Search</button>
        </form>

        <div>
          {error instanceof Error ? (
            <p>Error: {error.message}</p>
          ) : isLoading ? (
            <p>Loading...</p>
          ) : (
            isSuccess &&
            data.value.map(({ title, webpageUrl }) => (
              <div key={webpageUrl}>
                <a href={webpageUrl} target='_blank' rel='noreferrer'>
                  {title}
                </a>
              </div>
            ))
          )}
        </div>
      </main>
    </>
  )
}

export default Home
