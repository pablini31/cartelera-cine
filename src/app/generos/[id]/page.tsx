import { MovieGrid } from '@/components/MovieGrid';
import { type Movie } from '@/lib/tmdb';

type GenreId = 28 | 12 | 16 | 35 | 80 | 99 | 18 | 10751 | 14 | 36 | 27 | 10402 | 9648 | 10749 | 878 | 10770 | 53 | 10752 | 37;

const genres: Record<GenreId, string> = {
  28: 'Acción',
  12: 'Aventura',
  16: 'Animación',
  35: 'Comedia',
  80: 'Crimen',
  99: 'Documental',
  18: 'Drama',
  10751: 'Familia',
  14: 'Fantasía',
  36: 'Historia',
  27: 'Terror',
  10402: 'Música',
  9648: 'Misterio',
  10749: 'Romance',
  878: 'Ciencia ficción',
  10770: 'Película de TV',
  53: 'Suspense',
  10752: 'Bélica',
  37: 'Western'
};

interface PageProps {
  params: {
    id: string;
  };
}

async function getMoviesByGenre(genreId: string): Promise<Movie[]> {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=es-ES&with_genres=${genreId}&sort_by=popularity.desc`
    );
    
    if (!response.ok) {
      throw new Error('Error al obtener películas por género');
    }
    
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error('Error:', error);
    return [];
  }
}

export default async function GenrePage({ params }: PageProps) {
  // Asegurar que params sea un objeto y tenga la propiedad id
  const id = params?.id || '';
  
  const movies = await getMoviesByGenre(id);
  const genreId = parseInt(id, 10);
  const genreName = genreId in genres ? genres[genreId as GenreId] : 'Género Desconocido';
  
  // Filtrar películas duplicadas basadas en el ID
  const uniqueMovies = movies.filter(
    (movie, index, self) => index === self.findIndex(m => m.id === movie.id)
  );

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-gray-900 dark:text-white">
        Películas de {genreName}
      </h1>
      
      <MovieGrid 
        movies={uniqueMovies} 
        emptyMessage={`No se encontraron películas para el género ${genreName}.`}
      />
    </main>
  );
} 