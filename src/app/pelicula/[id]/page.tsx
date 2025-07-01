import Link from 'next/link';
import { getMovieDetails, getImageUrl, getYouTubeTrailer } from '@/lib/tmdb';
import { notFound } from 'next/navigation';

interface PageProps {
  params: {
    id: string;
  };
}

export default async function MoviePage({ params }: PageProps) {
  try {
    if (!params?.id) {
      notFound();
    }

    const movie = await getMovieDetails(params.id);

    if (!movie) {
      notFound();
    }

    const trailerKey = getYouTubeTrailer(movie.videos);

    return (
      <main className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <div 
          className="relative h-96 bg-cover bg-center"
          style={{
            backgroundImage: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url(${getImageUrl(movie.backdrop_path, 'backdrop')})`
          }}
        >
          <div className="absolute inset-0 flex items-center">
            <div className="container mx-auto px-4">
              <Link 
                href="/"
                className="inline-flex items-center text-white mb-4 hover:text-blue-300 transition-colors"
              >
                ← Volver a la cartelera
              </Link>
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
                {movie.title}
              </h1>
              <div className="flex items-center space-x-4 text-white">
                <span className="flex items-center">
                  ⭐ {movie.vote_average.toFixed(1)}
                </span>
                <span>{new Date(movie.release_date).getFullYear()}</span>
                <span>{movie.runtime} min</span>
              </div>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Poster */}
            <div className="lg:col-span-1">
              <img
                src={getImageUrl(movie.poster_path)}
                alt={movie.title}
                className="w-full max-w-md mx-auto rounded-lg shadow-lg"
              />
            </div>

            {/* Details */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Sinopsis</h2>
                <p className="text-gray-700 leading-relaxed mb-6">
                  {movie.overview}
                </p>

                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Géneros</h3>
                  <div className="flex flex-wrap gap-2">
                    {movie.genres.map((genre) => (
                      <span
                        key={genre.id}
                        className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
                      >
                        {genre.name}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="text-2xl font-bold text-gray-900">
                      {movie.vote_average.toFixed(1)}
                    </div>
                    <div className="text-sm text-gray-600">Calificación</div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="text-2xl font-bold text-gray-900">
                      {new Date(movie.release_date).getFullYear()}
                    </div>
                    <div className="text-sm text-gray-600">Año</div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="text-2xl font-bold text-gray-900">
                      {movie.runtime}
                    </div>
                    <div className="text-sm text-gray-600">Minutos</div>
                  </div>
                </div>
              </div>

              {/* Trailer */}
              {trailerKey && (
                <div className="bg-white rounded-lg shadow-lg p-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Trailer</h2>
                  <div className="aspect-video">
                    <iframe
                      src={`https://www.youtube.com/embed/${trailerKey}`}
                      title={`Trailer de ${movie.title}`}
                      className="w-full h-full rounded-lg"
                      allowFullScreen
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    );
  } catch (error) {
    console.error('Error fetching movie details:', error);
    notFound();
  }
} 