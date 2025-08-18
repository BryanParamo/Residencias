import Link from 'next/link'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-gray-50">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Proyecto Softwareland</h1>
        <p className="text-lg text-gray-600 mb-8">
          Bienvenido al sistema de gestión de residentes.
        </p>
        <Link 
          href="/residentes" 
          className="bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Ir a la lista de Residentes
        </Link>
      </div>
    </main>
  )
}