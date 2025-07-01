import { LoginForm } from '@/components/LoginForm';

export const metadata = {
  title: 'Iniciar Sesión - Cinelini',
  description: 'Inicia sesión en Cinelini para acceder a todas las funcionalidades.',
};

export default function LoginPage() {
  return (
    <main className="container mx-auto px-4 py-12">
      <div className="flex justify-center">
        <LoginForm />
      </div>
    </main>
  );
} 