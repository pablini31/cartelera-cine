'use client';

import Link from 'next/link';
import { useTheme } from '@/contexts/ThemeContext';
import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';

export function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 z-50 bg-gradient-to-r from-purple-900/90 via-indigo-900/90 to-blue-900/90 backdrop-blur-md border-b border-white/10">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo y Nombre */}
          <Link 
            href="/" 
            className="flex items-center space-x-2 group"
          >
            <motion.span 
              className="text-2xl transform group-hover:scale-110 transition-transform"
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
            >
              🎬
            </motion.span>
            <span className="font-bold text-xl bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
              Cartelera
            </span>
          </Link>

          {/* Links de Navegación */}
          <div className="hidden md:flex items-center space-x-1">
            <NavLink href="/" active={pathname === '/'}>Inicio</NavLink>
            <NavLink href="/estrenos" active={pathname === '/estrenos'}>Estrenos</NavLink>
            <NavLink href="/generos" active={pathname === '/generos'}>Géneros</NavLink>
            <NavLink href="/buscar" active={pathname === '/buscar'}>Buscar</NavLink>
          </div>

          {/* Toggle Theme */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={toggleTheme}
            className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? '☀️' : '🌙'}
          </motion.button>
        </div>
      </div>
    </nav>
  );
}

function NavLink({ href, children, active }: { href: string; children: React.ReactNode; active: boolean }) {
  return (
    <Link
      href={href}
      className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
        active 
          ? 'text-white' 
          : 'text-gray-300 hover:text-white'
      }`}
    >
      {children}
      {active && (
        <motion.div
          layoutId="navbar-active"
          className="absolute inset-0 bg-white/10 rounded-lg -z-10"
          transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
        />
      )}
    </Link>
  );
} 