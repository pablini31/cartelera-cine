'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { type Movie } from '@/lib/tmdb';
import { getImageUrl } from '@/lib/tmdb';

interface MovieCardProps {
  movie: Movie;
}

export function MovieCard({ movie }: MovieCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <Link
        href={`/pelicula/${movie.id}`}
        className="block bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
      >
        <div className="relative aspect-[2/3]">
          {/* Póster */}
          <img
            src={getImageUrl(movie.poster_path)}
            alt={movie.title}
            className="w-full h-full object-cover"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = '/placeholder-movie.svg';
            }}
          />
          
          {/* Rating */}
          <div className="absolute top-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-sm font-semibold">
            ⭐ {movie.vote_average.toFixed(1)}
          </div>

          {/* Overlay con info */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
            <div className="text-white">
              <h3 className="font-semibold text-lg mb-1 line-clamp-2">
                {movie.title}
              </h3>
              <p className="text-sm text-gray-300 mb-2">
                {new Date(movie.release_date).getFullYear()}
              </p>
              <p className="text-sm line-clamp-3 text-gray-200">
                {movie.overview}
              </p>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
} 