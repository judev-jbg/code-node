'use client';

import { useState, FormEvent } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { authClient } from '@/lib/auth-client';

export default function SignInPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);
    const { error: err } = await authClient.signIn.email({
      email,
      password,
      callbackURL: '/',
    });
    setLoading(false);
    if (err) {
      setError(err.message ?? 'Credenciales incorrectas.');
      return;
    }
    router.push('/');
  }

  return (
    <main className="auth-page">
      <div className="auth-card">
        <h1 className="auth-title">Iniciar sesión</h1>
        <p className="auth-sub">Accede para ver el portafolio.</p>

        {error && <p className="auth-error">{error}</p>}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="field">
            <label htmlFor="email" className="field__label">Email</label>
            <input id="email" className="field__input" type="email" placeholder="tu@email.com"
              value={email} onChange={e => setEmail(e.target.value)} required />
          </div>
          <div className="field">
            <label htmlFor="password" className="field__label">Contraseña</label>
            <input id="password" className="field__input" type="password" placeholder="Tu contraseña"
              value={password} onChange={e => setPassword(e.target.value)} required />
          </div>
          <button type="submit" className="auth-btn" disabled={loading}>
            {loading ? 'Accediendo...' : 'Entrar'}
          </button>
        </form>

        <p className="auth-link">¿No tienes cuenta? <Link href="/sign-up">Regístrate</Link></p>
      </div>

      <style>{`
        .auth-page {
          min-height: 80vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem 1.5rem;
        }
        .auth-card {
          background: var(--bg-card);
          border: 1px solid #e7e5e4;
          border-radius: var(--radius);
          padding: 2.5rem;
          width: 100%;
          max-width: 420px;
          box-shadow: var(--shadow);
        }
        .auth-title {
          font-size: 1.75rem;
          font-weight: 800;
          letter-spacing: -0.04em;
          margin-bottom: 0.4rem;
        }
        .auth-sub { font-size: 0.9rem; color: var(--text-muted); margin-bottom: 1.75rem; }
        .auth-error {
          background: #fee2e2;
          border: 1px solid #fca5a5;
          color: #b91c1c;
          border-radius: 6px;
          padding: 0.6rem 0.9rem;
          font-size: 0.875rem;
          margin-bottom: 1.25rem;
        }
        .auth-form { display: flex; flex-direction: column; gap: 1rem; }
        .field__label {
          display: block;
          font-size: 0.82rem;
          font-weight: 600;
          margin-bottom: 0.3rem;
          color: var(--text-muted);
          font-family: 'Geist Mono', monospace;
        }
        .field__input {
          width: 100%;
          padding: 0.6rem 0.85rem;
          border: 1px solid #e7e5e4;
          border-radius: 6px;
          font-size: 0.95rem;
          font-family: inherit;
          background: var(--bg);
          color: var(--text);
          outline: none;
          transition: border-color 0.15s;
        }
        .field__input:focus { border-color: var(--accent); }
        .auth-btn {
          background: var(--accent);
          color: var(--text);
          border: none;
          padding: 0.7rem;
          border-radius: 8px;
          font-size: 0.95rem;
          font-weight: 600;
          cursor: pointer;
          margin-top: 0.25rem;
          transition: opacity 0.15s;
        }
        .auth-btn:hover { opacity: 0.85; }
        .auth-btn:disabled { opacity: 0.5; cursor: not-allowed; }
        .auth-link { margin-top: 1.5rem; font-size: 0.875rem; color: var(--text-muted); text-align: center; }
        .auth-link a { color: var(--text); font-weight: 600; border-bottom: 2px solid var(--accent); }
      `}</style>
    </main>
  );
}
