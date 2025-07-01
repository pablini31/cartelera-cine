import { getNowPlaying } from '@/lib/tmdb';
import { MovieGrid } from '@/components/MovieGrid';
import { Hero } from '@/components/Hero';

export default async function Home() {
  const movies = await getNowPlaying();
  
  // Seleccionar las 5 primeras películas para el carrusel
  const featuredMovies = movies.slice(0, 5);

  return (
    <main>
      {/* Hero Section con carrusel */}
      <Hero movies={featuredMovies} />

      {/* Cartelera Section */}
      <section className="container mx-auto px-4 py-12">
        <MovieGrid 
          movies={movies} 
          title="Películas destacadas"
          emptyMessage="No se pudieron cargar las películas. Verifica tu API key de TMDb."
        />
      </section>
    </main>
  );
}
