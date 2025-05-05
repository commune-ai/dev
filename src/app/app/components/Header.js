
import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-gray-800 shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <div className="text-blue-500 text-3xl font-bold">
              Deploy<span className="text-purple-500">Hub</span>
            </div>
          </div>
          <nav className="hidden md:flex space-x-8">
            <Link href="/" className="text-gray-300 hover:text-white transition duration-300">
              Dashboard
            </Link>
            <Link href="#" className="text-gray-300 hover:text-white transition duration-300">
              Projects
            </Link>
            <Link href="#" className="text-gray-300 hover:text-white transition duration-300">
              Analytics
            </Link>
            <Link href="#" className="text-gray-300 hover:text-white transition duration-300">
              Documentation
            </Link>
          </nav>
          <div className="flex items-center space-x-4">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition duration-300">
              New Deployment
            </button>
            <div className="w-10 h-10 rounded-full bg-gray-600 flex items-center justify-center">
              <span className="text-white font-semibold">JD</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
