import { getNowPlaying } from '@/lib/tmdb';
import { MovieCard } from '@/components/MovieCard';

export default async function EstrenosPage() {
  const movies = await getNowPlaying();

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-gray-900 dark:text-white">
        Últimos Estrenos
      </h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </main>
  );
} 