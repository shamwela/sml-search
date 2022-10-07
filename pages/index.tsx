import ResultArea from 'components/ResultArea'
import { FormEvent, useState } from 'react'
import { trpc } from 'utilities/trpc'

const Home = () => {
  const [query, setQuery] = useState('')
  const { error, isFetching, refetch, data } = trpc.search.useQuery(query, {
    refetchOnWindowFocus: false,
    enabled: false, // Disable this query from automatically running
  })
  const results = data

  const submitHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const { elements } = event.currentTarget
    const query = (elements.namedItem('query') as HTMLInputElement).value
      .trim()
      .toLowerCase()
    setQuery(query)
    refetch()
  }

  return (
    <>
      {/* Add Head here later */}
      <main>
        <form onSubmit={submitHandler}>
          <input type='search' name='query' id='query' />
          <button type='submit'>Search</button>
        </form>

        <div>
          <ResultArea
            error={error}
            isFetching={isFetching}
            results={results}
            query={query}
          />
        </div>
      </main>
    </>
  )
}

export default Home
