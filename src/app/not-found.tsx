import Link from 'next/link';
import { Compass, Home, Search } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center bg-[var(--color-neutral-bg)] px-4">
      <div className="text-center max-w-lg mx-auto flex flex-col items-center">
        <div className="relative mb-8">
          <div className="absolute inset-0 bg-blue-100 rounded-full blur-3xl opacity-50 animate-pulse"></div>
          <Compass className="w-32 h-32 text-[var(--color-primary)] mx-auto relative animate-spin-slow" style={{ animationDuration: '20s' }} />
          <div className="absolute -bottom-2 -right-2 bg-white p-3 rounded-full shadow-lg border border-gray-100">
            <Search className="w-8 h-8 text-red-400" />
          </div>
        </div>
        
        <h1 className="text-6xl font-heading font-extrabold text-[var(--color-text-main)] mb-4 tracking-tight">
          404
        </h1>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Off the beaten path, aren't we?
        </h2>
        <p className="text-gray-500 mb-8 text-lg">
          The page or destination you are looking for doesn't exist, has been moved, or is currently unavailable.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full justify-center">
          <Link 
            href="/"
            className="flex items-center justify-center gap-2 bg-[var(--color-primary)] text-white px-8 py-3.5 rounded-[var(--radius-button)] font-medium hover:opacity-90 transition-opacity w-full sm:w-auto shadow-md hover:shadow-lg"
          >
            <Home className="w-5 h-5" />
            Back to Home
          </Link>
          <Link 
            href="/explore"
            className="flex items-center justify-center gap-2 border border-gray-300 bg-white text-gray-700 px-8 py-3.5 rounded-[var(--radius-button)] font-medium hover:bg-gray-50 transition-colors w-full sm:w-auto"
          >
            Explore Packages
          </Link>
        </div>
      </div>
    </div>
  );
}
