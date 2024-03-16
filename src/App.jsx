import { useMovies } from './hooks/useMovies'
import { Movies } from './components/Movies'
import { useSearch } from './hooks/useSearch'
import { useState } from 'react'

function App () {
  const [sortType, setSortType] = useState('none')
  const { search, updateSearch, error } = useSearch()
  const { movies, getMovies } = useMovies({ search, sortType })

  const handleSubmit = (event) => {
    event.preventDefault()
    getMovies()
  }

  const handleChange = (event) => {
    const newQuery = event.target.value
    if (newQuery.startsWith(' ')) return
    updateSearch(newQuery)
  }

  return (
    <div className='min-h-screen bg-gray-100'>
      <header className='bg-white shadow'>
        <div className='max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8'>
          <h1 className='text-3xl font-bold text-gray-900'>Movie search</h1>
          <form className='mt-4 flex items-center' onSubmit={handleSubmit}>
            <input
              className='shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-1/2 sm:text-sm border-gray-300 rounded-md px-2 py-2'
              onChange={handleChange}
              value={search}
              type='text'
              placeholder='Avengers, Titanic, Transformers ...'
            />
            <button
              type='submit'
              className='ml-3 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
            >
              Search
            </button>
            <select
              className='ml-3 py-2 px-4 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm '
              value={sortType}
              onChange={(e) => setSortType(e.target.value)}
            >
              <option value='none'>Sort by</option>
              <option value='title'>Title</option>
              <option value='age'>Year</option>
            </select>
          </form>
          {error && <p className='mt-2 text-sm text-red-600'>{error}</p>}
        </div>
      </header>

      <main className='max-w-7xl mx-auto py-6 sm:px-6 lg:px-8'>
        <Movies movies={movies} />
      </main>
    </div>
  )
}

export default App
