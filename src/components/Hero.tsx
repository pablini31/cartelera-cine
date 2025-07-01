'use client';

import { motion } from 'framer-motion';
import { type Movie } from '@/lib/tmdb';
import { getImageUrl } from '@/lib/tmdb';
import Link from 'next/link';

interface HeroProps {
  movie: Movie;
}

export function Hero({ movie }: HeroProps) {
  return (
    <div className="relative h-[70vh] min-h-[600px] w-full overflow-hidden">
      {/* Imagen de fondo */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${getImageUrl(movie.backdrop_path, 'backdrop')})`,
        }}
      >
        {/* Overlay con degradado */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
      </div>

      {/* Contenido */}
      <div className="relative h-full container mx-auto px-4 flex items-end pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            {movie.title}
          </h1>
          <p className="text-lg text-gray-200 mb-6 line-clamp-3">
            {movie.overview}
          </p>
          <div className="flex items-center gap-4">
            <Link
              href={`/pelicula/${movie.id}`}
              className="inline-flex items-center px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors"
            >
              Ver ahora
            </Link>
            <div className="flex items-center bg-black/50 px-3 py-1 rounded-full text-white">
              <span className="mr-2">⭐</span>
              {movie.vote_average.toFixed(1)}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
} 