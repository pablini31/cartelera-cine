import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="text-6xl mb-4">🎬</div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Película no encontrada
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Lo sentimos, la película que buscas no existe o ha sido removida.
        </p>
        <Link
          href="/"
          className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
        >
          ← Volver a la cartelera
        </Link>
      </div>
    </div>
  );
} 