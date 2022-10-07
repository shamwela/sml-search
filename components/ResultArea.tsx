import type { AppRouter } from 'pages/api/trpc/[trpc]'
import type { inferProcedureOutput } from '@trpc/server'
import ErrorComponent from './Error'

type Results = inferProcedureOutput<AppRouter['search']>

const ResultArea = ({
  error,
  isFetching,
  results,
  query,
}: {
  error: unknown
  isFetching: boolean
  results: Results
  query: string
}) => {
  if (error instanceof Error) {
    if (error.message.includes('429')) {
      return (
        <ErrorComponent message='Could not fetch. Google Custom Search API provides only 100 search queries per day for free. Please try again tomorrow or next week. 😆' />
      )
    } else {
      return <ErrorComponent message={error.message} />
    }
  }
  if (isFetching) {
    return <p>Fetching results...</p>
  }
  if (!results) {
    return null
  }
  if (results.length === 0) {
    return <p>No results found for &quot;{query}&quot;.</p>
  }
  return (
    <div className='flex flex-col gap-y-4'>
      {results.map(({ title, link }) => (
        <a href={link} key={link}>
          {title}
        </a>
      ))}
    </div>
  )
}

export default ResultArea
