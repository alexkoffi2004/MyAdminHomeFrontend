import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Mail, Lock, FileText, AlertCircle } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../contexts/AuthContext';
import Button from '../../components/UI/Button';
import Input from '../../components/UI/Input';

interface LoginFormData {
  email: string;
  password: string;
}

const Login = () => {
  const [generalError, setGeneralError] = useState<string | null>(null);
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get the redirect path from location state or default to dashboard
  const from = (location.state as { from?: { pathname: string } })?.from?.pathname || '/';
  
  const { 
    register, 
    handleSubmit, 
    formState: { errors, isSubmitting } 
  } = useForm<LoginFormData>();

  const onSubmit = async (data: LoginFormData) => {
    try {
      setGeneralError(null);
      await login(data.email, data.password);
      
      // Redirect based on stored "from" or email pattern
      if (data.email === 'admin@ecivil.ci') {
        navigate('/admin/dashboard');
      } else if (data.email === 'agent@ecivil.ci') {
        navigate('/agent/dashboard');
      } else {
        navigate('/citizen/dashboard');
      }
    } catch (error) {
      setGeneralError('Identifiants incorrects. Veuillez réessayer.');
    }
  };

  // Demo account quick login helpers
  const loginAsCitizen = () => {
    login('user@example.com', 'password').then(() => {
      navigate('/citizen/dashboard');
    });
  };
  
  const loginAsAgent = () => {
    login('agent@ecivil.ci', 'password').then(() => {
      navigate('/agent/dashboard');
    });
  };
  
  const loginAsAdmin = () => {
    login('admin@ecivil.ci', 'password').then(() => {
      navigate('/admin/dashboard');
    });
  };

  return (
    <div className="flex min-h-screen flex-col bg-neutral-50 dark:bg-neutral-900">
      <div className="container-custom flex items-center justify-center py-12">
        <div className="w-full max-w-md">
          <div className="mb-8 text-center">
            <Link to="/" className="inline-flex items-center">
              <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary-500 text-white">
                <FileText size={20} />
              </div>
              <span className="ml-2 font-heading text-2xl font-bold text-primary-500">E-Civil</span>
            </Link>
            <h1 className="mt-6 font-heading text-2xl font-bold text-neutral-900 dark:text-white">Connexion à votre compte</h1>
            <p className="mt-2 text-neutral-600 dark:text-neutral-400">
              Entrez vos identifiants pour accéder à votre espace
            </p>
          </div>

          {generalError && (
            <div className="mb-6 rounded-md bg-error-50 p-3 dark:bg-error-900/20">
              <div className="flex">
                <div className="flex-shrink-0">
                  <AlertCircle className="h-5 w-5 text-error-500" />
                </div>
                <div className="ml-3">
                  <p className="text-sm text-error-700 dark:text-error-400">{generalError}</p>
                </div>
              </div>
            </div>
          )}

          <div className="overflow-hidden rounded-lg bg-white shadow-card dark:bg-neutral-800">
            <div className="p-6">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="space-y-4">
                  <Input
                    id="email"
                    type="email"
                    label="Adresse email"
                    placeholder="votre@email.com"
                    icon={<Mail size={18} />}
                    error={errors.email?.message}
                    {...register('email', {
                      required: 'L\'adresse email est requise',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Adresse email invalide'
                      }
                    })}
                  />
                  
                  <Input
                    id="password"
                    type="password"
                    label="Mot de passe"
                    placeholder="••••••••"
                    icon={<Lock size={18} />}
                    error={errors.password?.message}
                    {...register('password', {
                      required: 'Le mot de passe est requis',
                      minLength: {
                        value: 6,
                        message: 'Le mot de passe doit contenir au moins 6 caractères'
                      }
                    })}
                  />

                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <input
                        id="remember_me"
                        type="checkbox"
                        className="h-4 w-4 rounded border-neutral-300 text-primary-500 focus:ring-primary-500"
                      />
                      <label htmlFor="remember_me" className="ml-2 block text-sm text-neutral-600 dark:text-neutral-400">
                        Se souvenir de moi
                      </label>
                    </div>
                    <div className="text-sm">
                      <Link 
                        to="/forgot-password" 
                        className="font-medium text-primary-500 hover:text-primary-400"
                      >
                        Mot de passe oublié ?
                      </Link>
                    </div>
                  </div>

                  <Button 
                    type="submit" 
                    fullWidth 
                    isLoading={isSubmitting}
                  >
                    Connexion
                  </Button>
                </div>
              </form>

              <div className="mt-6">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-neutral-300 dark:border-neutral-700"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="bg-white px-2 text-neutral-500 dark:bg-neutral-800 dark:text-neutral-400">
                      Ou connexion rapide (démo)
                    </span>
                  </div>
                </div>

                <div className="mt-4 grid gap-3">
                  <button
                    type="button"
                    onClick={loginAsCitizen}
                    className="flex w-full items-center justify-center rounded-md border border-neutral-300 bg-white px-4 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-50 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-700"
                  >
                    Connexion en tant que Citoyen
                  </button>
                  <button
                    type="button"
                    onClick={loginAsAgent}
                    className="flex w-full items-center justify-center rounded-md border border-neutral-300 bg-white px-4 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-50 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-700"
                  >
                    Connexion en tant qu'Agent
                  </button>
                  <button
                    type="button"
                    onClick={loginAsAdmin}
                    className="flex w-full items-center justify-center rounded-md border border-neutral-300 bg-white px-4 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-50 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-700"
                  >
                    Connexion en tant qu'Admin
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 text-center">
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              Pas encore de compte ?{' '}
              <Link to="/register" className="font-medium text-primary-500 hover:text-primary-400">
                Créer un compte
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;