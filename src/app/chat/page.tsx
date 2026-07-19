'use client';
import { useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useChat } from '@/components/chat/ChatContext';

function ChatPageInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { openChat } = useChat();

  useEffect(() => {
    const packageId = searchParams.get('packageId');
    openChat(packageId || undefined);
    
    // Redirect to home so the chat panel just overlays the home page
    router.replace('/');
  }, [openChat, router, searchParams]);

  return (
    <div className="min-h-screen bg-[var(--color-neutral-bg)] flex items-center justify-center">
      <div className="animate-pulse text-gray-400">Opening Chat Assistant...</div>
    </div>
  );
}

export default function ChatPage() {
  return <Suspense fallback={<div>Loading...</div>}><ChatPageInner /></Suspense>;
}