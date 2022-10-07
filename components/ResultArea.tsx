import type { AppRouter } from 'pages/api/trpc/[trpc]'
import type { inferProcedureOutput } from '@trpc/server'
import axios from 'axios'

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
  if (axios.isAxiosError(error)) {
    console.error(error)
    return <p>Error: {error.message}</p>
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
