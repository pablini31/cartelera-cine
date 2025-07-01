'use client';

import Link from 'next/link';
import { useTheme } from '@/contexts/ThemeContext';
import { useAuth } from '@/contexts/AuthContext';
import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

export function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-md border-b border-gray-200 dark:border-gray-800">
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
            <span className="font-bold text-xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Cinelini
            </span>
          </Link>

          {/* Links de Navegación - Versión Desktop */}
          <div className="hidden md:flex items-center space-x-1">
            <NavLink href="/" active={pathname === '/'}>Inicio</NavLink>
            <NavLink href="/estrenos" active={pathname === '/estrenos'}>Estrenos</NavLink>
            <NavLink href="/generos" active={pathname === '/generos'}>Géneros</NavLink>
            <NavLink href="/buscar" active={pathname === '/buscar'}>Buscar</NavLink>
          </div>

          {/* Autenticación y Toggle Theme */}
          <div className="flex items-center space-x-3">
            {user ? (
              <div className="flex items-center space-x-3">
                <span className="hidden sm:inline text-sm font-medium text-gray-700 dark:text-gray-300">
                  Hola, {user.username}
                </span>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={logout}
                  className="px-3 py-1 text-sm bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
                >
                  Salir
                </motion.button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link href="/login">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-4 py-1.5 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                  >
                    Entrar
                  </motion.button>
                </Link>
                <Link href="/registro" className="hidden sm:block">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-4 py-1.5 text-sm bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
                  >
                    Registro
                  </motion.button>
                </Link>
              </div>
            )}
            
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleTheme}
              className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? '☀️' : '🌙'}
            </motion.button>
            
            {/* Menú móvil */}
            <div className="md:hidden">
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
        
        {/* Menú móvil desplegable */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden py-3 border-t border-gray-200 dark:border-gray-800"
          >
            <div className="flex flex-col space-y-2">
              <MobileNavLink href="/" active={pathname === '/'} onClick={() => setIsMenuOpen(false)}>Inicio</MobileNavLink>
              <MobileNavLink href="/estrenos" active={pathname === '/estrenos'} onClick={() => setIsMenuOpen(false)}>Estrenos</MobileNavLink>
              <MobileNavLink href="/generos" active={pathname === '/generos'} onClick={() => setIsMenuOpen(false)}>Géneros</MobileNavLink>
              <MobileNavLink href="/buscar" active={pathname === '/buscar'} onClick={() => setIsMenuOpen(false)}>Buscar</MobileNavLink>
            </div>
          </motion.div>
        )}
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
          ? 'text-blue-600 dark:text-blue-400' 
          : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'
      }`}
    >
      {children}
      {active && (
        <motion.div
          layoutId="navbar-active"
          className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 dark:bg-blue-400"
          transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
        />
      )}
    </Link>
  );
}

function MobileNavLink({ href, children, active, onClick }: { href: string; children: React.ReactNode; active: boolean; onClick: () => void }) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`px-4 py-2 text-sm font-medium ${
        active 
          ? 'text-blue-600 dark:text-blue-400 bg-gray-100 dark:bg-gray-800' 
          : 'text-gray-700 dark:text-gray-300'
      } rounded-lg`}
    >
      {children}
    </Link>
  );
} 