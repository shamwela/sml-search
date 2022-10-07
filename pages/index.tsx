import { FormEvent, useState } from 'react'
import { trpc } from 'utilities/trpc'

const Home = () => {
  const [query, setQuery] = useState('')
  const { error, isFetching, refetch, data } = trpc.search.useQuery(query, {
    refetchOnWindowFocus: false,
    enabled: false, // Disable this query from automatically running
  })
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
          {error instanceof Error ? (
            <p>Error: {error.message}</p>
          ) : isFetching ? (
            <p>Loading...</p>
          ) : data?.value.length === 0 ? (
            <p>No results found for {query}.</p>
          ) : (
            data?.value.map(({ id, title, url }) => (
              <div key={id}>
                <a href={url} target='_blank' rel='noreferrer'>
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
