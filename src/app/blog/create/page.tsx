'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createBlog } from '@/lib/api/blogs';
import { generateBlogContent } from '@/lib/api/ai';
import { Sparkles, Loader2, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function CreateBlogPage() {
  const router = useRouter();
  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [length, setLength] = useState<'short' | 'medium' | 'long'>('medium');
  
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleGenerate = async () => {
    if (!title.trim()) {
      setError('Please enter a title first to generate content.');
      return;
    }
    
    setError('');
    setIsGenerating(true);
    
    try {
      const res = await generateBlogContent(title, length);
      if (res.success && res.data) {
        setDescription(res.data);
      } else {
        setError(res.message || 'Failed to generate content. Please try again.');
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred during generation.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) {
      setError('Both title and description are required.');
      return;
    }

    setError('');
    setIsSubmitting(true);

    try {
      const res = await createBlog({ title, description });
      if (res.success) {
        router.push('/blog');
        router.refresh();
      } else {
        setError(res.message || 'Failed to publish blog.');
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred while publishing.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-[var(--color-neutral-bg)] min-h-screen py-12">
      <div className="container mx-auto px-4 md:px-8 max-w-4xl">
        <Link href="/blog" className="inline-flex items-center gap-2 text-gray-500 hover:text-[var(--color-primary)] transition-colors mb-8">
          <ArrowLeft className="w-4 h-4" /> Back to Blogs
        </Link>
        
        <div className="bg-white rounded-[var(--radius-card)] shadow-sm border border-gray-100 p-8 md:p-12">
          <h1 className="text-3xl font-heading font-bold text-[var(--color-text-main)] mb-8">Create New Blog Post</h1>
          
          {error && (
            <div className="bg-red-50 text-red-600 p-4 rounded mb-6 border border-red-100">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-8">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Blog Title</label>
              <input 
                type="text" 
                value={title} 
                onChange={e => setTitle(e.target.value)}
                className="w-full border border-gray-300 rounded-[var(--radius-button)] px-4 py-3 focus:ring-2 focus:ring-[var(--color-primary)] outline-none text-lg font-medium"
                placeholder="Enter a catchy title..."
                required
              />
            </div>

            <div className="bg-blue-50/50 p-6 rounded-xl border border-blue-100/50">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-4">
                <div>
                  <h3 className="font-medium text-blue-900 mb-1 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-blue-600" /> AI Content Generator
                  </h3>
                  <p className="text-sm text-blue-700/80">Generate a high-quality draft based on your title.</p>
                </div>
                
                <div className="flex items-center gap-3">
                  <select 
                    value={length}
                    onChange={(e) => setLength(e.target.value as any)}
                    className="border border-blue-200 bg-white text-sm rounded-md px-3 py-2 text-blue-900 outline-none focus:border-blue-400"
                    disabled={isGenerating}
                  >
                    <option value="short">Short (~200 words)</option>
                    <option value="medium">Medium (~400 words)</option>
                    <option value="long">Long (~800 words)</option>
                  </select>
                  
                  <button 
                    type="button"
                    onClick={handleGenerate}
                    disabled={isGenerating || !title.trim()}
                    className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors disabled:opacity-50"
                  >
                    {isGenerating ? (
                      <><Loader2 className="w-4 h-4 animate-spin" /> Generating...</>
                    ) : (
                      <>{description ? 'Regenerate' : 'Generate'} Draft</>
                    )}
                  </button>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Blog Content</label>
              <textarea 
                value={description} 
                onChange={e => setDescription(e.target.value)}
                className="w-full border border-gray-300 rounded-xl px-5 py-4 focus:ring-2 focus:ring-[var(--color-primary)] outline-none min-h-[400px] leading-relaxed resize-y font-mono text-sm"
                placeholder="Write your content here or use the AI generator above... (Markdown supported)"
                required
              />
            </div>

            <div className="flex justify-end pt-4">
              <button 
                type="submit"
                disabled={isSubmitting || !title || !description}
                className="bg-[var(--color-primary)] text-white px-8 py-3 rounded-[var(--radius-button)] font-medium hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center gap-2"
              >
                {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : null}
                Publish Blog Post
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
