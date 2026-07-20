import { getMyPackages } from '@/lib/api/packages';
import ManagePackagesClient from './ManagePackagesClient';
import { AlertCircle } from 'lucide-react';
import { getServerUser } from '@/lib/auth';

export default async function ManagePackagesPage() {
  const user = await getServerUser();

  if (!user) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center bg-[var(--color-neutral-bg)]">
        <AlertCircle className="w-16 h-16 text-gray-400 mb-4" />
        <h2 className="text-2xl font-bold text-gray-700 mb-2">Access Denied</h2>
        <p className="text-gray-500 mb-6">You must be logged in to manage your packages.</p>
        <a 
          href="/login"
          className="bg-[var(--color-primary)] text-white px-8 py-3 rounded-[var(--radius-button)] font-medium hover:opacity-90 transition-opacity"
        >
          Go to Login
        </a>
      </div>
    );
  }

  const data = await getMyPackages();

  return <ManagePackagesClient initialPackages={data?.data || []} />;
}
