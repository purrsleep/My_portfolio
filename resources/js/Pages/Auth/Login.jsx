import { useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import FormField, { inputClass } from '../../Components/FormField';
import ThemeToggle from '../../Components/ThemeToggle';

function EyeIcon({ off }) {
  return (
    <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden="true">
      {off ? (
        <>
          <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
          <line x1="1" y1="1" x2="23" y2="23" />
        </>
      ) : (
        <>
          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
          <circle cx="12" cy="12" r="3" />
        </>
      )}
    </svg>
  );
}

export default function Login() {
  const { data, setData, post, processing, errors } = useForm({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    post('/login');
  };

  return (
    <>
      <Head title="Admin login" />
      <div className="min-h-screen grid place-items-center px-5">
        <div className="w-full max-w-sm">
          <div className="flex items-center justify-between mb-8">
            <Link href="/" className="font-display font-extrabold text-xl tracking-tight">LALAINE EUGENIO</Link>
            <ThemeToggle />
          </div>
          <h1 className="font-display font-bold text-3xl mb-6">Admin login</h1>

          <form onSubmit={submit} noValidate className="space-y-5">
            <FormField id="email" label="Email" error={errors.email}>
              <input id="email" type="email" autoComplete="email" value={data.email}
                onChange={(e) => setData('email', e.target.value)} className={inputClass(errors.email)} />
            </FormField>

            <FormField id="password" label="Password" error={errors.password}>
              <div className="relative">
                <input id="password" type={showPassword ? 'text' : 'password'} autoComplete="current-password" value={data.password}
                  onChange={(e) => setData('password', e.target.value)}
                  className={`${inputClass(errors.password)} pr-12`} />
                <button type="button" onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  aria-pressed={showPassword}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-gray-500 hover:text-gray-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-cobalt rounded">
                  <EyeIcon off={!showPassword} />
                </button>
              </div>
            </FormField>

            <button type="submit" disabled={processing}
              className="w-full rounded-full bg-cobalt text-white dark:bg-sky dark:text-night px-6 py-3 font-medium hover:opacity-90 disabled:opacity-50">
              {processing ? 'Signing in…' : 'Sign in'}
            </button>
          </form>

          <p className="mt-6 text-sm"><Link href="/" className="underline underline-offset-4">Back to portfolio</Link></p>
        </div>
      </div>
    </>
  );
}