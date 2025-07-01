import { RegisterForm } from '@/components/RegisterForm';

export const metadata = {
  title: 'Registro - Cinelini',
  description: 'Regístrate en Cinelini para acceder a todas las funcionalidades.',
};

export default function RegisterPage() {
  return (
    <main className="container mx-auto px-4 py-12">
      <div className="flex justify-center">
        <RegisterForm />
      </div>
    </main>
  );
} 