const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';
const BACKDROP_BASE_URL = 'https://image.tmdb.org/t/p/w1280';

export interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  release_date: string;
  vote_average: number;
  genre_ids: number[];
}

export interface MovieDetails extends Movie {
  genres: { id: number; name: string }[];
  runtime: number;
  videos: {
    results: {
      id: string;
      key: string;
      name: string;
      site: string;
      type: string;
    }[];
  };
}

export async function getNowPlaying(): Promise<Movie[]> {
  try {
    // Obtener películas de las primeras 3 páginas
    const pages = await Promise.all([1, 2, 3].map(async (page) => {
      const url = `${BASE_URL}/movie/now_playing?api_key=${API_KEY}&language=es-ES&page=${page}&region=ES`;
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`Error al obtener películas de la página ${page}`);
      }
      
      const data = await response.json();
      return data.results;
    }));

    // Combinar todas las películas
    return pages.flat();
  } catch (error) {
    console.error('Error en getNowPlaying:', error);
    return [];
  }
}

export async function getMovieDetails(id: string): Promise<MovieDetails | null> {
  try {
    // Obtener detalles y videos en paralelo
    const [detailsResponse, videosResponse] = await Promise.all([
      fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=es-ES`),
      fetch(`${BASE_URL}/movie/${id}/videos?api_key=${API_KEY}&language=es-ES`)
    ]);
    
    if (!detailsResponse.ok || !videosResponse.ok) {
      throw new Error('Error al obtener detalles o videos de la película');
    }
    
    const [details, videos] = await Promise.all([
      detailsResponse.json(),
      videosResponse.json()
    ]);

    // Si no hay videos en español, intentar obtener en inglés
    let finalVideos = videos;
    if (!videos.results.length) {
      const enVideosResponse = await fetch(
        `${BASE_URL}/movie/${id}/videos?api_key=${API_KEY}&language=en-US`
      );
      if (enVideosResponse.ok) {
        finalVideos = await enVideosResponse.json();
      }
    }

    return {
      ...details,
      videos: finalVideos
    };
  } catch (error) {
    console.error('Error en getMovieDetails:', error);
    return null;
  }
}

export function getImageUrl(path: string, size: 'poster' | 'backdrop' = 'poster'): string {
  if (!path) return '/placeholder-movie.svg';
  
  const baseUrl = size === 'backdrop' ? BACKDROP_BASE_URL : IMAGE_BASE_URL;
  return `${baseUrl}${path}`;
}

export function getYouTubeTrailer(videos: MovieDetails['videos']): string | null {
  if (!videos?.results) return null;
  
  // Buscar primero un tráiler oficial
  let trailer = videos.results.find(
    video => video.site === 'YouTube' && 
    video.type === 'Trailer' && 
    (video.name.toLowerCase().includes('oficial') || video.name.toLowerCase().includes('official'))
  );
  
  // Si no hay tráiler oficial, buscar cualquier tráiler
  if (!trailer) {
    trailer = videos.results.find(
      video => video.site === 'YouTube' && video.type === 'Trailer'
    );
  }
  
  // Si no hay tráiler, buscar cualquier video de YouTube
  if (!trailer) {
    trailer = videos.results.find(
      video => video.site === 'YouTube'
    );
  }
  
  return trailer ? trailer.key : null;
} 