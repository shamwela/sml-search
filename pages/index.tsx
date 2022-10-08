import ResultArea from 'components/ResultArea'
import { FormEvent, useState } from 'react'
import { trpc } from 'utilities/trpc'
import Head from 'components/Head'

const Home = () => {
  const [query, setQuery] = useState('')
  const { error, isFetching, refetch, data } = trpc.search.useQuery(query, {
    // Don't automatically query
    enabled: false,
  })
  const results = data

  const submitHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    // Refetch only on submit
    refetch()
  }

  return (
    <>
      <Head title='SML Search' description='Search anything online' />
      <main>
        <h1>SML Search</h1>
        <div className='mx-auto w-full md:max-w-md flex flex-col gap-y-4'>
          <form onSubmit={submitHandler} className='flex'>
            <input
              name='query'
              aria-label='Your search query'
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              className='w-full'
              type='search'
              autoComplete='off'
              required
            />
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
        </div>
      </main>
    </>
  )
}

export default Home
