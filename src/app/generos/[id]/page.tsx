import { MovieCard } from '@/components/MovieCard';
import { type Movie } from '@/lib/tmdb';

const genres = {
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
  const movies = await getMoviesByGenre(params.id);
  const genreName = genres[params.id as keyof typeof genres] || 'Género Desconocido';

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-gray-900 dark:text-white">
        Películas de {genreName}
      </h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>

      {movies.length === 0 && (
        <p className="text-center text-gray-600 dark:text-gray-400">
          No se encontraron películas para este género.
        </p>
      )}
    </main>
  );
} 