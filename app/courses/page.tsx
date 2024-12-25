import { Header } from '../../components/Header'

export default function Courses() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-gray-100">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4 text-gray-800">Courses</h1>
          <p className="text-xl text-gray-600">Coming Soon</p>
        </div>
      </main>
    </div>
  )
}

