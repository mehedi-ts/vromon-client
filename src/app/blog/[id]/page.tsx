import Link from 'next/link';
import { getBlogByIdServer } from '@/lib/api/blogs.server';
import { ArrowLeft, Calendar, User } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { Metadata } from 'next';

export const revalidate = 0;

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const res = await getBlogByIdServer(id).catch(() => null);
  const blog = res?.data;
  
  if (!blog) {
    return {
      title: 'Blog Not Found | Vromon AI',
    };
  }
  
  const excerpt = blog.description ? blog.description.substring(0, 160) + '...' : '';
  
  return {
    title: `${blog.title} | Vromon AI`,
    description: excerpt,
    openGraph: {
      title: blog.title,
      description: excerpt,
      type: 'article',
      publishedTime: blog.createdAt,
      authors: [blog.authorEmail.split('@')[0]],
    }
  };
}

export default async function SingleBlogPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const res = await getBlogByIdServer(id).catch(() => null);
  
  if (!res || !res.success || !res.data) {
    return (
      <div className="min-h-screen bg-[var(--color-neutral-bg)] py-12 px-4 flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold text-gray-700 mb-4">Blog Post Not Found</h1>
        <p className="text-gray-500 mb-8">The blog post you're looking for doesn't exist or has been removed.</p>
        <Link href="/blog" className="text-[var(--color-primary)] font-medium hover:underline flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" /> Back to Blogs
        </Link>
      </div>
    );
  }

  const blog = res.data;

  return (
    <div className="bg-[var(--color-neutral-bg)] min-h-screen py-12">
      <div className="container mx-auto px-4 md:px-8 max-w-4xl">
        <Link href="/blog" className="inline-flex items-center gap-2 text-gray-500 hover:text-[var(--color-primary)] transition-colors mb-8">
          <ArrowLeft className="w-4 h-4" /> Back to Blogs
        </Link>
        
        <article className="bg-white rounded-[var(--radius-card)] shadow-sm border border-gray-100 p-8 md:p-12">
          <header className="mb-10 pb-10 border-b border-gray-100">
            <h1 className="text-3xl md:text-5xl font-heading font-bold text-[var(--color-text-main)] mb-6 leading-tight">
              {blog.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <User className="w-5 h-5" />
                <span className="font-medium text-gray-700">{blog.authorEmail.split('@')[0]}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                <span>{new Date(blog.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}</span>
              </div>
            </div>
          </header>

          <div className="prose prose-lg max-w-none text-gray-700 prose-headings:font-heading prose-headings:text-[var(--color-text-main)] prose-a:text-[var(--color-primary)]">
            <ReactMarkdown>
              {blog.description || ''}
            </ReactMarkdown>
          </div>
        </article>
      </div>
    </div>
  );
}
