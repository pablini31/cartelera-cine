# 🎬 Cartelera de Cine - Configuración

## Configuración de la API de TMDb

Para que la aplicación funcione correctamente, necesitas configurar tu API key de The Movie Database (TMDb).

### 1. Obtener la API Key

1. Ve a [https://www.themoviedb.org/](https://www.themoviedb.org/)
2. Crea una cuenta gratuita
3. Ve a tu perfil → Configuración → API
4. Solicita una API key (es gratis)

### 2. Configurar Variables de Entorno

Crea un archivo `.env.local` en la raíz del proyecto con el siguiente contenido:

```bash
NEXT_PUBLIC_TMDB_API_KEY=tu_api_key_aqui
```

**Importante:** Reemplaza `tu_api_key_aqui` con tu API key real de TMDb.

### 3. Ejecutar el Proyecto

```bash
# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
npm run dev
```

La aplicación estará disponible en [http://localhost:3000](http://localhost:3000)

## Estructura del Proyecto

```
src/
├── app/
│   ├── page.tsx                 # Página principal (cartelera)
│   ├── pelicula/[id]/
│   │   └── page.tsx            # Página de detalles de película
│   ├── layout.tsx              # Layout principal
│   └── globals.css             # Estilos globales
└── lib/
    └── tmdb.ts                 # Funciones de la API de TMDb
```

## Funcionalidades

- ✅ Lista de películas en cartelera
- ✅ Detalles de cada película
- ✅ Trailers embebidos de YouTube
- ✅ Diseño responsivo con Tailwind CSS
- ✅ Navegación entre páginas
- ✅ Manejo de errores y estados de carga

## API de TMDb Utilizada

- `GET /movie/now_playing` - Películas en cartelera
- `GET /movie/{id}` - Detalles de película con videos 