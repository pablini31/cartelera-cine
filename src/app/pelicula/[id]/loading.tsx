export default function Loading() {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section Skeleton */}
      <div className="relative h-96 bg-gray-300 animate-pulse">
        <div className="absolute inset-0 flex items-center">
          <div className="container mx-auto px-4">
            <div className="h-4 bg-gray-400 rounded w-32 mb-4"></div>
            <div className="h-12 bg-gray-400 rounded w-3/4 mb-4"></div>
            <div className="flex space-x-4">
              <div className="h-6 bg-gray-400 rounded w-16"></div>
              <div className="h-6 bg-gray-400 rounded w-16"></div>
              <div className="h-6 bg-gray-400 rounded w-20"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section Skeleton */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Poster Skeleton */}
          <div className="lg:col-span-1">
            <div className="w-full max-w-md mx-auto aspect-[2/3] bg-gray-300 rounded-lg animate-pulse"></div>
          </div>

          {/* Details Skeleton */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-lg p-6 mb-6 animate-pulse">
              <div className="h-8 bg-gray-300 rounded w-1/3 mb-4"></div>
              <div className="space-y-2 mb-6">
                <div className="h-4 bg-gray-300 rounded"></div>
                <div className="h-4 bg-gray-300 rounded"></div>
                <div className="h-4 bg-gray-300 rounded w-3/4"></div>
              </div>

              <div className="mb-6">
                <div className="h-6 bg-gray-300 rounded w-24 mb-2"></div>
                <div className="flex gap-2">
                  <div className="h-8 bg-gray-300 rounded w-20"></div>
                  <div className="h-8 bg-gray-300 rounded w-16"></div>
                  <div className="h-8 bg-gray-300 rounded w-24"></div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="bg-gray-50 p-4 rounded-lg">
                    <div className="h-8 bg-gray-300 rounded mb-2"></div>
                    <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                  </div>
                ))}
              </div>
            </div>

            {/* Trailer Skeleton */}
            <div className="bg-white rounded-lg shadow-lg p-6 animate-pulse">
              <div className="h-8 bg-gray-300 rounded w-24 mb-4"></div>
              <div className="aspect-video bg-gray-300 rounded-lg"></div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 