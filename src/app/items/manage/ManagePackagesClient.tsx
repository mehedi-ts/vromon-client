'use client';

import { useState, useTransition } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Trash2, ExternalLink, Plus, MapPin } from 'lucide-react';
import { deletePackage } from '@/lib/action/packages';
import { Package } from '@/lib/schemas';

export default function ManagePackagesClient({ initialPackages }: { initialPackages: Package[] }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [deleteId, setDeleteId] = useState<string | null>(null);
  
  const packages = initialPackages || [];

  const handleDelete = async () => {
    if (!deleteId) return;
    
    startTransition(async () => {
      const res = await deletePackage(deleteId);
      if (res.success) {
        setDeleteId(null);
        router.refresh();
      } else {
        alert(res.message || 'Failed to delete package');
        setDeleteId(null);
      }
    });
  };

  return (
    <div className="bg-[var(--color-neutral-bg)] min-h-screen py-12">
      <div className="container mx-auto px-4 md:px-8">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-heading font-bold text-[var(--color-text-main)] mb-1">Manage Packages</h1>
            <p className="text-gray-500">View and manage the travel packages you've created.</p>
          </div>
          <div className="flex items-center gap-4">
            <Link 
              href="/items/add"
              className="bg-[var(--color-primary)] text-white px-6 py-2.5 rounded-[var(--radius-button)] font-medium hover:opacity-90 transition-opacity flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              Add New
            </Link>
          </div>
        </div>

        {packages.length === 0 ? (
          <div className="bg-white p-12 rounded-[var(--radius-card)] shadow-sm border border-gray-100 flex flex-col items-center justify-center text-center">
            <div className="w-24 h-24 bg-blue-50 rounded-full flex items-center justify-center mb-6">
              <MapPin className="w-10 h-10 text-[var(--color-primary)]" />
            </div>
            <h3 className="text-2xl font-bold text-[var(--color-text-main)] mb-2">No Packages Yet</h3>
            <p className="text-gray-500 max-w-md mb-8">You haven't created any travel packages. Create your first package to start sharing destinations!</p>
            <Link 
              href="/items/add"
              className="bg-[var(--color-primary)] text-white px-8 py-3 rounded-[var(--radius-button)] font-bold hover:opacity-90 transition-opacity"
            >
              Create Package
            </Link>
          </div>
        ) : (
          <div className="bg-white rounded-[var(--radius-card)] shadow-sm border border-gray-100 overflow-hidden">
            {/* Desktop Table View */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-100 text-sm uppercase tracking-wide text-gray-500">
                    <th className="py-4 px-6 font-medium">Package Details</th>
                    <th className="py-4 px-6 font-medium text-center">Price</th>
                    <th className="py-4 px-6 font-medium text-center">Category</th>
                    <th className="py-4 px-6 font-medium text-center">Rating</th>
                    <th className="py-4 px-6 font-medium text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {packages.map((pkg) => (
                    <tr key={pkg._id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-4">
                          <img src={pkg.images[0]} alt={pkg.title} className="w-16 h-12 rounded object-cover" />
                          <div>
                            <div className="font-bold text-[var(--color-text-main)]">{pkg.title}</div>
                            <div className="text-sm text-gray-500">{pkg.location} • {pkg.durationDays} Days</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-center font-medium">৳{pkg.price.toLocaleString()}</td>
                      <td className="py-4 px-6 text-center">
                        <span className="bg-blue-50 text-[var(--color-primary)] px-3 py-1 rounded-full text-xs font-medium">
                          {pkg.category}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-center">
                        {pkg.rating > 0 ? pkg.rating.toFixed(1) : '—'}
                      </td>
                      <td className="py-4 px-6 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Link 
                            href={`/packages/${pkg._id}`}
                            className="p-2 text-gray-400 hover:text-[var(--color-primary)] hover:bg-blue-50 rounded transition-colors"
                            title="View Package"
                          >
                            <ExternalLink className="w-5 h-5" />
                          </Link>
                          <button 
                            onClick={() => setDeleteId(pkg._id!)}
                            className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded transition-colors"
                            title="Delete Package"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Card View */}
            <div className="md:hidden divide-y divide-gray-100">
              {packages.map((pkg) => (
                <div key={pkg._id} className="p-4 flex gap-4">
                  <img src={pkg.images[0]} alt={pkg.title} className="w-20 h-20 rounded object-cover shrink-0" />
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <h4 className="font-bold text-[var(--color-text-main)] text-sm line-clamp-2 leading-tight mb-1">{pkg.title}</h4>
                      <div className="text-xs text-gray-500">{pkg.location}</div>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <span className="font-bold text-[var(--color-primary)] text-sm">৳{pkg.price.toLocaleString()}</span>
                      <div className="flex items-center gap-1">
                        <Link 
                          href={`/packages/${pkg._id}`}
                          className="p-1.5 text-gray-400 hover:text-[var(--color-primary)] bg-gray-50 rounded"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </Link>
                        <button 
                          onClick={() => setDeleteId(pkg._id!)}
                          className="p-1.5 text-gray-400 hover:text-red-500 bg-gray-50 rounded"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {deleteId && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-[var(--radius-card)] p-6 md:p-8 max-w-md w-full shadow-xl">
            <h3 className="text-xl font-bold text-[var(--color-text-main)] mb-2">Delete Package?</h3>
            <p className="text-gray-500 mb-6">
              Are you sure you want to delete this package? This action cannot be undone and will permanently remove the package and all its reviews.
            </p>
            <div className="flex items-center justify-end gap-3">
              <button 
                onClick={() => setDeleteId(null)}
                className="px-5 py-2 text-gray-600 font-medium hover:bg-gray-100 rounded-[var(--radius-button)] transition-colors"
                disabled={isPending}
              >
                Cancel
              </button>
              <button 
                onClick={handleDelete}
                className="px-5 py-2 bg-red-500 text-white font-bold rounded-[var(--radius-button)] hover:bg-red-600 transition-colors disabled:opacity-50 flex items-center gap-2"
                disabled={isPending}
              >
                {isPending ? 'Deleting...' : 'Delete Package'}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
