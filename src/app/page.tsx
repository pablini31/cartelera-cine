import { getNowPlaying } from '@/lib/tmdb';
import { MovieCard } from '@/components/MovieCard';
import { Hero } from '@/components/Hero';

export default async function Home() {
  const movies = await getNowPlaying();
  const featuredMovie = movies[0]; // Primera película como destacada

  return (
    <main>
      {/* Hero Section */}
      {featuredMovie && <Hero movie={featuredMovie} />}

      {/* Cartelera Section */}
      <section className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
          En Cartelera
        </h2>

        {movies.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400 text-lg">
              No se pudieron cargar las películas. Verifica tu API key de TMDb.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
            {movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
