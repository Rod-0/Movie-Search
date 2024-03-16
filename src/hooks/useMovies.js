import { useRef, useState, useMemo } from 'react'
import { searchMovies } from '../services/movies'
export function useMovies ({ search, sortType }) {
  const [movies, setMovies] = useState([])
  const previousSearch = useRef(search)

  const getMovies = useMemo(() => {
    return async () => {
      if (search === previousSearch.current) return
      previousSearch.current = search
      const newMovies = await searchMovies({ search })
      setMovies(newMovies)
    }
  }, [search])

  const sortedMovies = useMemo(() => {
    if (sortType === 'none') return movies
    return movies.slice().sort((a, b) => {
      if (sortType === 'title') {
        return a.title.localeCompare(b.title)
      }
      if (sortType === 'age') {
        // Función de comparación personalizada para ordenar por año
        return compareYears(a.year, b.year)
      }
      return 0
    })
  }, [movies, sortType])
  return { movies: sortedMovies, getMovies }
}

// Función para comparar años
function compareYears (yearStringA, yearStringB) {
  const yearA = parseYear(yearStringA)
  const yearB = parseYear(yearStringB)

  return yearA - yearB
}

// Función para parsear el año
function parseYear (yearString) {
  const yearParts = yearString.split('-')
  return parseInt(yearParts[0], 10) // Tomamos el primer año si hay un rango
}
