'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { Plus, X, UploadCloud, AlertCircle } from 'lucide-react';
import { createPackage } from '@/lib/action/packages';
import { PackageCard } from '@/components/packages/PackageCard';
import { Package } from '@/lib/schemas';
import { getCurrentUser } from '@/lib/auth-client';

const CATEGORIES = ['Hill', 'Beach', 'Adventure', 'Heritage', 'City'];

export default function AddPackagePage() {
  const router = useRouter();
  
  const { user, isPending } = getCurrentUser();
  console.log(user)

  // Form State
  const [formData, setFormData] = useState({
    title: '',
    shortDescription: '',
    fullDescription: '',
    price: '',
    durationDays: '',
    category: 'Hill',
    location: '',
  });

  const [images, setImages] = useState<string[]>(['']);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [isPendingMutation, startTransition] = useTransition();

  if (isPending) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center bg-[var(--color-neutral-bg)]">
        <div className="w-12 h-12 border-4 border-[var(--color-primary)] border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-gray-500 font-medium">Verifying session...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center bg-[var(--color-neutral-bg)]">
        <AlertCircle className="w-16 h-16 text-gray-400 mb-4" />
        <h2 className="text-2xl font-bold text-gray-700 mb-2">Access Denied</h2>
        <p className="text-gray-500 mb-6">You must be logged in to add a new package.</p>
        <button 
          onClick={() => router.push('/login')}
          className="bg-[var(--color-primary)] text-white px-8 py-3 rounded-[var(--radius-button)] font-medium hover:opacity-90 transition-opacity"
        >
          Go to Login
        </button>
      </div>
    );
  }

  const handleImageChange = (index: number, value: string) => {
    const newImages = [...images];
    newImages[index] = value;
    setImages(newImages);
  };

  const addImageField = () => setImages([...images, '']);
  const removeImageField = (index: number) => {
    if (images.length > 1) {
      setImages(images.filter((_, i) => i !== index));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    // Basic validation
    const validImages = images.filter(img => img.trim() !== '');
    if (validImages.length === 0) {
      setError('At least one image URL is required.');
      return;
    }

    const payload = {
      ...formData,
      price: Number(formData.price),
      durationDays: Number(formData.durationDays),
      images: validImages,
      rating: 0, // default
      itinerary: [], // simplify for now or add itinerary builder later
    };

    startTransition(async () => {
      const res = await createPackage(payload as any);
      if (res.success) {
        setSuccess('Package created successfully!');
        setTimeout(() => {
          router.push('/items/manage');
        }, 2000);
      } else {
        setError(res.message || 'Failed to create package. Please try again.');
      }
    });
  };

  // Preview Object
  const previewPkg: Package = {
    _id: 'preview',
    title: formData.title || 'Your Package Title',
    shortDescription: formData.shortDescription || 'A short description of the package...',
    fullDescription: formData.fullDescription,
    price: Number(formData.price) || 0,
    durationDays: Number(formData.durationDays) || 0,
    category: formData.category as any,
    location: formData.location || 'Location',
    images: images[0] ? [images[0]] : ['https://images.unsplash.com/photo-1596895111956-bf570531846c?auto=format&fit=crop&w=800&q=80'],
    rating: 5.0,
    itinerary: [],
    ownerId: user.id,
    createdAt: new Date().toISOString()
  };

  return (
    <div className="bg-[var(--color-neutral-bg)] min-h-screen py-12">
      <div className="container mx-auto px-4 md:px-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-heading font-bold text-[var(--color-text-main)]">Add New Package</h1>
            <p className="text-gray-500">Create a new travel destination package for users to explore.</p>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Form */}
          <div className="flex-1 bg-white p-8 rounded-[var(--radius-card)] shadow-sm border border-gray-100">
            {error && <div className="bg-red-50 text-red-600 p-4 rounded mb-6 border border-red-100">{error}</div>}
            {success && <div className="bg-green-50 text-green-600 p-4 rounded mb-6 border border-green-100">{success}</div>}

            <form onSubmit={handleSubmit} className="space-y-6">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Title *</label>
                  <input 
                    type="text" required
                    value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})}
                    className="w-full border border-gray-300 rounded-[var(--radius-button)] px-4 py-2.5 focus:ring-2 focus:ring-[var(--color-primary)] outline-none"
                    placeholder="e.g. Sajek Valley Cloud Camp"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Location *</label>
                  <input 
                    type="text" required
                    value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})}
                    className="w-full border border-gray-300 rounded-[var(--radius-button)] px-4 py-2.5 focus:ring-2 focus:ring-[var(--color-primary)] outline-none"
                    placeholder="e.g. Rangamati, Bangladesh"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Price (৳) *</label>
                  <input 
                    type="number" required min="0"
                    value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})}
                    className="w-full border border-gray-300 rounded-[var(--radius-button)] px-4 py-2.5 focus:ring-2 focus:ring-[var(--color-primary)] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Duration (Days) *</label>
                  <input 
                    type="number" required min="1"
                    value={formData.durationDays} onChange={e => setFormData({...formData, durationDays: e.target.value})}
                    className="w-full border border-gray-300 rounded-[var(--radius-button)] px-4 py-2.5 focus:ring-2 focus:ring-[var(--color-primary)] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category *</label>
                  <select 
                    value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})}
                    className="w-full border border-gray-300 rounded-[var(--radius-button)] px-4 py-2.5 focus:ring-2 focus:ring-[var(--color-primary)] outline-none bg-white"
                  >
                    {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Short Description *</label>
                <input 
                  type="text" required maxLength={100}
                  value={formData.shortDescription} onChange={e => setFormData({...formData, shortDescription: e.target.value})}
                  className="w-full border border-gray-300 rounded-[var(--radius-button)] px-4 py-2.5 focus:ring-2 focus:ring-[var(--color-primary)] outline-none"
                  placeholder="One sentence overview..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Description *</label>
                <textarea 
                  required rows={5}
                  value={formData.fullDescription} onChange={e => setFormData({...formData, fullDescription: e.target.value})}
                  className="w-full border border-gray-300 rounded-[var(--radius-button)] px-4 py-2.5 focus:ring-2 focus:ring-[var(--color-primary)] outline-none"
                  placeholder="Detailed description of the tour..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Image URLs *</label>
                {images.map((img, idx) => (
                  <div key={idx} className="flex gap-2 mb-3">
                    <input 
                      type="url" required={idx === 0}
                      value={img} onChange={(e) => handleImageChange(idx, e.target.value)}
                      className="flex-1 border border-gray-300 rounded-[var(--radius-button)] px-4 py-2 focus:ring-2 focus:ring-[var(--color-primary)] outline-none"
                      placeholder="https://..."
                    />
                    {images.length > 1 && (
                      <button type="button" onClick={() => removeImageField(idx)} className="p-2 text-red-500 hover:bg-red-50 rounded">
                        <X className="w-5 h-5" />
                      </button>
                    )}
                  </div>
                ))}
                <button type="button" onClick={addImageField} className="text-sm font-medium text-[var(--color-primary)] flex items-center gap-1 hover:underline">
                  <Plus className="w-4 h-4" /> Add another image
                </button>
              </div>

              <div className="pt-6 border-t border-gray-100">
                <button 
                  type="submit" 
                  disabled={isPendingMutation}
                  className="w-full md:w-auto bg-[var(--color-primary)] text-white px-8 py-3 rounded-[var(--radius-button)] font-bold hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  <UploadCloud className="w-5 h-5" />
                  {isPendingMutation ? 'Saving...' : 'Create Package'}
                </button>
              </div>

            </form>
          </div>

          {/* Live Preview */}
          <div className="w-full lg:w-96 shrink-0">
            <div className="sticky top-24">
              <h3 className="font-bold text-gray-500 mb-4 uppercase tracking-wide text-sm flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                Live Preview
              </h3>
              <div className="pointer-events-none">
                <PackageCard pkg={previewPkg} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
