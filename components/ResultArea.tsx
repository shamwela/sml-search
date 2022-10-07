import type { AppRouter } from 'pages/api/trpc/[trpc]'
import { inferProcedureOutput, TRPCError } from '@trpc/server'

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
  if (error instanceof TRPCError) {
    return <p>Error: {error.message}</p>
  }
  if (isFetching) {
    return <p>Fetching results...</p>
  }
  if (!results) {
    return null
  }
  if (!results.items) {
    return <p>No results found for {query}.</p>
  }
  return (
    <div className='flex flex-col gap-y-4'>
      {results.items.map(({ title, link }) => (
        <a href={link} key={link} target='_blank' rel='noreferrer'>
          {title}
        </a>
      ))}
    </div>
  )
}

export default ResultArea
