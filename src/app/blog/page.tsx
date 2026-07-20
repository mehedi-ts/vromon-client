import Link from 'next/link';
import { getBlogsServer } from '@/lib/api/blogs.server';
import { getCurrentUser } from '@/lib/auth-client';
import { PlusCircle, Calendar, User } from 'lucide-react';
import { getServerUser } from '@/lib/auth';

export const revalidate = 0; // Disable static rendering for now to ensure freshness

export default async function BlogListPage() {
  const user = await getServerUser();
  const res = await getBlogsServer().catch(() => null);
  
  const blogs = res?.data || [];

  return (
    <div className="bg-[var(--color-neutral-bg)] min-h-screen py-12">
      <div className="container mx-auto px-4 md:px-8">
        
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-12">
          <div>
            <h1 className="text-4xl font-heading font-bold text-[var(--color-text-main)] mb-2">Vromon AI Blog</h1>
            <p className="text-gray-600 max-w-2xl">Read the latest travel stories, tips, and AI-generated insights from our community.</p>
          </div>
          <div className="mt-6 md:mt-0">
            <Link 
              href={user ? "/blog/create" : "/login?redirect=/blog/create"}
              className="inline-flex items-center gap-2 bg-[var(--color-primary)] text-white px-6 py-3 rounded-[var(--radius-button)] font-medium hover:opacity-90 transition-opacity"
            >
              <PlusCircle className="w-5 h-5" />
              Create Post
            </Link>
          </div>
        </div>

        {blogs.length === 0 ? (
          <div className="bg-white p-12 text-center rounded-[var(--radius-card)] shadow-sm border border-gray-100">
            <p className="text-gray-500 mb-4">No blogs have been published yet.</p>
            <Link href={user ? "/blog/create" : "/login"} className="text-[var(--color-primary)] font-medium hover:underline">
              Be the first to write one!
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((blog) => (
              <div key={blog._id} className="bg-white rounded-[var(--radius-card)] shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow flex flex-col h-full">
                <div className="p-6 flex-1 flex flex-col">
                  <h2 className="text-xl font-heading font-bold text-[var(--color-text-main)] mb-3 line-clamp-2">
                    <Link href={`/blog/${blog._id}`} className="hover:text-[var(--color-primary)] transition-colors">
                      {blog.title}
                    </Link>
                  </h2>
                  <p className="text-gray-600 mb-4 flex-1 line-clamp-4">
                    {blog.excerpt}
                  </p>
                  <div className="mb-4">
                    <Link href={`/blog/${blog._id}`} className="text-[var(--color-primary)] font-medium text-sm hover:underline inline-flex items-center gap-1">
                      Read details &rarr;
                    </Link>
                  </div>
                  
                  <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center gap-1.5 truncate pr-2">
                      <User className="w-4 h-4 shrink-0" />
                      <span className="truncate">{blog.authorEmail.split('@')[0]}</span>
                    </div>
                    <div className="flex items-center gap-1.5 shrink-0">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
