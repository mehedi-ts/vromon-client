'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Menu, X, Compass, User as UserIcon, LogOut, ChevronDown, PlusCircle, Package } from 'lucide-react';
import { cn } from '@/lib/utils';
import { getCurrentUser, authClient } from '@/lib/auth-client';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const pathname = usePathname();
  
  const { user, isPending } = getCurrentUser();
  const isLoggedIn = !!user;

  // Close dropdown on outside click and Escape key
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    }
    
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setDropdownOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
    setDropdownOpen(false);
  }, [pathname]);

  const handleLogout = async () => {
    await authClient.signOut();
    router.push('/login');
    setIsOpen(false);
  };

  const loggedOutLinks = [
    { name: 'Home', href: '/' },
    { name: 'Explore', href: '/explore' },
    { name: 'Blog', href: '/blog' },
    { name: 'About', href: '/about' },
    // { name: 'FAQ', href: '/faq' },
    { name: 'Contact', href: '/contact' },
  ];

  const loggedInLinks = [
    { name: 'Explore', href: '/explore' },
    { name: 'Blog', href: '/blog' },
    { name: 'Chat Assistant', href: '/chat' },
    { name: 'About', href: '/about' },
    { name: 'FAQ', href: '/faq' },
    { name: 'Contact', href: '/contact' },
  ];

  const links = isLoggedIn ? loggedInLinks : loggedOutLinks;

  const getAvatarInitials = (name?: string | null) => {
    if (!name) return 'U';
    return name.charAt(0).toUpperCase();
  };

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
          {links.map((link) => {
            const isActive = pathname === link.href || pathname.startsWith(`${link.href}/`);
            return (
              <Link 
                key={link.name} 
                href={link.href}
                className={cn(
                  "font-medium transition-colors hover:text-[var(--color-primary)] relative py-2",
                  isActive ? "text-[var(--color-primary)]" : "text-[var(--color-text-main)]"
                )}
              >
                {link.name}
                {isActive && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[var(--color-primary)] rounded-t-md" />
                )}
              </Link>
            );
          })}
          
          {isPending ? (
            <div className="w-8 h-8 rounded-full bg-gray-200 animate-pulse ml-4"></div>
          ) : isLoggedIn && user ? (
            <div className="relative ml-4" ref={dropdownRef}>
              <button 
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2 hover:bg-gray-100 p-1.5 rounded-full transition-colors"
              >
                {user.image ? (
                  <img src={user.image} alt={user.name || 'User'} className="w-8 h-8 rounded-full object-cover border border-gray-200" />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-[var(--color-primary)] text-white flex items-center justify-center font-bold text-sm">
                    {getAvatarInitials(user.name)}
                  </div>
                )}
                <ChevronDown className="w-4 h-4 text-gray-500" />
              </button>
              
              {/* Dropdown Menu */}
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-100 py-2 overflow-hidden flex flex-col z-50">
                  <div className="px-4 py-3 border-b border-gray-100">
                    <p className="text-sm font-semibold text-gray-800 truncate">{user.name}</p>
                    <p className="text-xs text-gray-500 truncate">{user.email}</p>
                  </div>
                  <Link href="/profile" className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                    <UserIcon className="w-4 h-4" />
                    Profile
                  </Link>
                  <Link href="/items/add" className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                    <PlusCircle className="w-4 h-4" />
                    Add Package
                  </Link>
                  <Link href="/items/manage" className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                    <Package className="w-4 h-4" />
                    Manage Packages
                  </Link>
                  <button 
                    onClick={handleLogout}
                    className="flex items-center gap-2 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors w-full text-left"
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
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
          className="md:hidden p-2 text-[var(--color-text-main)] hover:bg-gray-100 rounded-md transition-colors"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Nav Overlay */}
      {isOpen && (
        <div className="md:hidden absolute top-16 left-0 w-full bg-white border-b border-gray-200 shadow-xl flex flex-col animate-in slide-in-from-top-2">
          {isLoggedIn && user && (
            <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-3 bg-gray-50">
              {user.image ? (
                <img src={user.image} alt={user.name || 'User'} className="w-10 h-10 rounded-full object-cover border border-gray-200" />
              ) : (
                <div className="w-10 h-10 rounded-full bg-[var(--color-primary)] text-white flex items-center justify-center font-bold text-lg">
                  {getAvatarInitials(user.name)}
                </div>
              )}
              <div>
                <p className="font-semibold text-gray-800">{user.name}</p>
                <p className="text-sm text-gray-500">{user.email}</p>
              </div>
            </div>
          )}

          <div className="flex flex-col py-2">
            {links.map((link) => {
              const isActive = pathname === link.href || pathname.startsWith(`${link.href}/`);
              return (
                <Link 
                  key={link.name} 
                  href={link.href}
                  className={cn(
                    "px-6 py-3 font-medium transition-colors",
                    isActive ? "text-[var(--color-primary)] bg-blue-50/50" : "text-[var(--color-text-main)] hover:bg-gray-50"
                  )}
                >
                  {link.name}
                </Link>
              );
            })}
            {isLoggedIn && (
              <>
                <Link href="/profile" className="px-6 py-3 font-medium text-[var(--color-text-main)] hover:bg-gray-50 transition-colors">
                  Profile
                </Link>
                <Link href="/items/add" className="px-6 py-3 font-medium text-[var(--color-text-main)] hover:bg-gray-50 transition-colors">
                  Add Package
                </Link>
                <Link href="/items/manage" className="px-6 py-3 font-medium text-[var(--color-text-main)] hover:bg-gray-50 transition-colors">
                  Manage Packages
                </Link>
              </>
            )}
          </div>
          
          <div className="px-6 py-4 border-t border-gray-100 bg-gray-50">
            {isPending ? (
              <div className="w-full h-10 bg-gray-200 animate-pulse rounded-[var(--radius-button)]"></div>
            ) : isLoggedIn ? (
              <button 
                onClick={handleLogout}
                className="w-full flex items-center justify-center gap-2 border border-red-200 text-red-600 hover:bg-red-100 px-4 py-2.5 rounded-[var(--radius-button)] font-medium transition-colors"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            ) : (
              <div className="flex flex-col gap-3">
                <Link 
                  href="/login"
                  className="w-full text-center border border-[var(--color-primary)] text-[var(--color-primary)] px-4 py-2.5 rounded-[var(--radius-button)] font-medium transition-colors hover:bg-blue-50"
                >
                  Login
                </Link>
                <Link 
                  href="/register"
                  className="w-full text-center bg-[var(--color-accent)] text-white px-4 py-2.5 rounded-[var(--radius-button)] font-medium transition-all shadow-sm hover:opacity-90"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
