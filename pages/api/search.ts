import axios from 'axios'
import type { NextApiHandler } from 'next'

const apiHandler: NextApiHandler = async (request, response) => {
  const { query } = request.query

  try {
    const { data } = await axios.get(
      'https://contextualwebsearch-websearch-v1.p.rapidapi.com/api/Search/ImageSearchAPI',
      {
        params: {
          q: query,
          pageNumber: '1',
          pageSize: '10',
          autoCorrect: 'true',
        },
        headers: {
          'X-RapidAPI-Key': process.env.RAPID_API_KEY,
          // Might need to change this
          'X-RapidAPI-Host': 'contextualwebsearch-websearch-v1.p.rapidapi.com',
        },
      }
    )
    return response.json(data)
  } catch (error) {
    console.error(error)
  }
}

export default apiHandler
