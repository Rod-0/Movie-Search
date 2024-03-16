import React from 'react'

function Movie ({ movie }) {
  return (
    <div className='p-4 hover:shadow-2xl border border-gray-300 rounded '>
      <div className='max-w-xs rounded-lg overflow-hidden '>
        <div className='px-6 py-4'>
          <div className='font-bold text-xl mb-2 text-center'>{movie.title}</div>
          <p className='text-gray-700 text-base text-center'>
            {movie.year}
          </p>
        </div>
        <img className='w-full' src={movie.poster} alt={movie.title} />
      </div>
    </div>
  )
}

export function Movies ({ movies }) {
  const hasMovies = movies?.length > 0

  if (!hasMovies) {
    return <p>No movies found</p>
  }

  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
      {movies.map((movie) => (
        <Movie key={movie.id} movie={movie} />
      ))}
    </div>
  )
}

export default Movies
