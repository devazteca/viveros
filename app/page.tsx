"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function Home() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const res = await fetch('login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (res.ok) {
      router.push('./index');
    } else {
      const data = await res.json();
      setError(data.error);
    }
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg justify-center justify-items-center justify-self-center shadow-md w-96 absolute">
        <a href="https://www.facebook.com/cetis161tala/">
          <Image
            aria-hidden
            src="/images/Logo.png"
            alt="Logo"
            width={180}
            height={180}
            className="dark rounded-sm mb-10 mx-16 justify-items-center justify-self-center justify-center"
          />
        </a>
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-500">Iniciar Sesión</h2>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700" htmlFor="email">
            Correo Electrónico
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="text-black mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700" htmlFor="password">
            Contraseña
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="text-black mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-500"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 rounded-lg text-white font-bold py-2 hover:bg-blue-600 transition duration-200"
        >
          Iniciar Sesión
        </button>
        <p className="mt-4 text-center text-sm text-gray-600">
          ¿No tienes una cuenta? <a href="./pages/register" className="text-blue-500 hover:underline">Regístrate</a>
        </p>
      </form>
    </div>
  );
}
