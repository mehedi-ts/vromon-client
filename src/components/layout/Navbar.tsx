'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X, Compass } from 'lucide-react';
import { cn } from '@/lib/utils';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  // Mock Auth State. Flip this to true to see logged-in links.
  const isLoggedIn = false; 

  const loggedOutLinks = [
    { name: 'Explore', href: '/explore' },
    { name: 'About', href: '/about' },
  ];

  const loggedInLinks = [
    { name: 'Explore', href: '/explore' },
    { name: 'Chat Assistant', href: '/chat' },
    { name: 'Add Package', href: '/items/add' },
    { name: 'Manage Packages', href: '/items/manage' },
    { name: 'Dashboard/Profile', href: '/profile' },
  ];

  const links = isLoggedIn ? loggedInLinks : loggedOutLinks;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[var(--color-neutral-bg)] bg-[var(--color-neutral-bg)]/80 backdrop-blur-md">
      <div className="container mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 text-[var(--color-primary)] hover:opacity-90 transition-opacity">
          <Compass className="w-8 h-8" />
          <span className="font-heading font-bold text-xl tracking-tight">Vromon AI</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <Link 
              key={link.name} 
              href={link.href}
              className="text-[var(--color-text-main)] hover:text-[var(--color-primary)] font-medium transition-colors"
            >
              {link.name}
            </Link>
          ))}
          
          {!isLoggedIn && (
            <div className="flex items-center gap-4 ml-4">
              <Link 
                href="/login"
                className="text-[var(--color-text-main)] hover:text-[var(--color-primary)] font-medium transition-colors"
              >
                Login
              </Link>
              <Link 
                href="/register"
                className="bg-[var(--color-accent)] hover:opacity-90 text-white px-4 py-2 rounded-[var(--radius-button)] font-medium transition-all shadow-sm hover:shadow-md"
              >
                Register
              </Link>
            </div>
          )}
        </nav>

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden p-2 text-[var(--color-text-main)]"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden absolute top-16 left-0 w-full bg-[var(--color-neutral-bg)] border-b border-gray-200 shadow-lg py-4 flex flex-col px-4 gap-4">
          {links.map((link) => (
            <Link 
              key={link.name} 
              href={link.href}
              className="text-[var(--color-text-main)] hover:text-[var(--color-primary)] font-medium py-2 border-b border-gray-100 last:border-0"
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          {!isLoggedIn && (
            <div className="flex flex-col gap-3 mt-2">
              <Link 
                href="/login"
                className="w-full text-center border border-[var(--color-primary)] text-[var(--color-primary)] px-4 py-2 rounded-[var(--radius-button)] font-medium transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Login
              </Link>
              <Link 
                href="/register"
                className="w-full text-center bg-[var(--color-accent)] text-white px-4 py-2 rounded-[var(--radius-button)] font-medium transition-all shadow-sm"
                onClick={() => setIsOpen(false)}
              >
                Register
              </Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
}
