import Link from 'next/link';
import { getMovieDetails, getImageUrl, getYouTubeTrailer } from '@/lib/tmdb';
import { notFound } from 'next/navigation';

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function MoviePage({ params }: PageProps) {
  const { id } = await params;
  
  if (!id) {
    notFound();
  }

  const movie = await getMovieDetails(id);

  if (!movie) {
    notFound();
  }

  const trailerKey = getYouTubeTrailer(movie.videos);

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="relative aspect-video mb-8 rounded-xl overflow-hidden">
          {trailerKey ? (
            <iframe
              src={`https://www.youtube.com/embed/${trailerKey}`}
              className="absolute inset-0 w-full h-full"
              allowFullScreen
            />
          ) : (
            <img
              src={getImageUrl(movie.backdrop_path)}
              alt={movie.title}
              className="absolute inset-0 w-full h-full object-cover"
            />
          )}
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          <div className="w-full md:w-1/3">
            <img
              src={getImageUrl(movie.poster_path)}
              alt={movie.title}
              className="w-full rounded-xl shadow-lg"
            />
          </div>

          <div className="w-full md:w-2/3">
            <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
              {movie.title}
            </h1>

            <div className="mb-6">
              <div className="flex items-center gap-4 text-gray-600 dark:text-gray-400 mb-4">
                <span>{movie.release_date ? new Date(movie.release_date).getFullYear() : 'Sin fecha'}</span>
                <span>•</span>
                <span>{movie.runtime || 0} min</span>
                <span>•</span>
                <span>{movie.vote_average ? movie.vote_average.toFixed(1) : '0'} ⭐</span>
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                {movie.genres.map((genre) => (
                  <Link
                    key={genre.id}
                    href={`/generos/${genre.id}`}
                    className="px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-full text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                  >
                    {genre.name}
                  </Link>
                ))}
              </div>
            </div>

            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-8">
              {movie.overview}
            </p>

            <Link
              href="/"
              className="inline-flex items-center px-4 py-2 bg-gray-800 dark:bg-gray-700 text-white rounded-lg hover:bg-gray-700 dark:hover:bg-gray-600 transition-colors"
            >
              ← Volver al inicio
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
} 