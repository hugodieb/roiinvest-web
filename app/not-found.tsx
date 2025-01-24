// app/not-found.tsx

import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-800">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <p className="text-2xl mb-6">Oops! Página não encontrada.</p>
      <Link href="/">
        <span className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          Voltar para a página inicial
        </span>
      </Link>
    </div>
  );
}
