'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Mail, Lock, User, Globe, Check } from 'lucide-react';

const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type RegisterFormValues = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const { register, handleSubmit, formState: { errors }, watch } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const password = watch('password') || '';

  // Calculate password strength
  const calculateStrength = (pass: string) => {
    let score = 0;
    if (pass.length > 7) score += 1;
    if (pass.match(/[A-Z]/)) score += 1;
    if (pass.match(/[0-9]/)) score += 1;
    if (pass.match(/[^A-Za-z0-9]/)) score += 1;
    return score;
  };

  const strength = calculateStrength(password);
  
  const getStrengthColor = (score: number) => {
    if (score === 0) return 'bg-gray-200';
    if (score === 1) return 'bg-red-400';
    if (score === 2) return 'bg-yellow-400';
    if (score === 3) return 'bg-blue-400';
    return 'bg-green-500';
  };

  const getStrengthLabel = (score: number) => {
    if (score === 0) return '';
    if (score === 1) return 'Weak';
    if (score === 2) return 'Fair';
    if (score === 3) return 'Good';
    return 'Strong';
  };

  const onSubmit = (data: RegisterFormValues) => {
    setIsSubmitting(true);
    console.log('Register form submitted:', data);
    setTimeout(() => {
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-[var(--color-neutral-bg)]">
      {/* Left side: Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8 lg:p-16 bg-white shadow-xl z-10 overflow-y-auto">
        <div className="w-full max-w-md py-8">
          <div className="mb-8">
            <h1 className="text-4xl font-heading font-bold text-[var(--color-text-main)] mb-2">Create Account</h1>
            <p className="text-gray-500">Join Vromon AI and start planning your perfect trip.</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input 
                  type="text"
                  {...register('name')}
                  className={`w-full pl-10 pr-4 py-3 bg-gray-50 border ${errors.name ? 'border-red-500' : 'border-gray-200'} rounded-[var(--radius-button)] focus:ring-2 focus:ring-[var(--color-primary)] outline-none transition-colors`}
                  placeholder="John Doe"
                />
              </div>
              {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input 
                  type="email"
                  {...register('email')}
                  className={`w-full pl-10 pr-4 py-3 bg-gray-50 border ${errors.email ? 'border-red-500' : 'border-gray-200'} rounded-[var(--radius-button)] focus:ring-2 focus:ring-[var(--color-primary)] outline-none transition-colors`}
                  placeholder="you@example.com"
                />
              </div>
              {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input 
                  type="password"
                  {...register('password')}
                  className={`w-full pl-10 pr-4 py-3 bg-gray-50 border ${errors.password ? 'border-red-500' : 'border-gray-200'} rounded-[var(--radius-button)] focus:ring-2 focus:ring-[var(--color-primary)] outline-none transition-colors`}
                  placeholder="••••••••"
                />
              </div>
              {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>}
              
              {/* Strength Meter */}
              {password.length > 0 && (
                <div className="mt-2">
                  <div className="flex gap-1 mb-1">
                    {[1, 2, 3, 4].map(level => (
                      <div 
                        key={level} 
                        className={`h-1.5 flex-1 rounded-full ${level <= strength ? getStrengthColor(strength) : 'bg-gray-200'} transition-colors duration-300`}
                      />
                    ))}
                  </div>
                  <div className="text-xs text-right font-medium text-gray-500">
                    {getStrengthLabel(strength)}
                  </div>
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input 
                  type="password"
                  {...register('confirmPassword')}
                  className={`w-full pl-10 pr-4 py-3 bg-gray-50 border ${errors.confirmPassword ? 'border-red-500' : 'border-gray-200'} rounded-[var(--radius-button)] focus:ring-2 focus:ring-[var(--color-primary)] outline-none transition-colors`}
                  placeholder="••••••••"
                />
              </div>
              {errors.confirmPassword && <p className="mt-1 text-sm text-red-500">{errors.confirmPassword.message}</p>}
            </div>

            <button 
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[var(--color-primary)] text-white font-bold py-3 px-4 rounded-[var(--radius-button)] hover:opacity-90 transition-opacity flex items-center justify-center gap-2 disabled:opacity-70 mt-4"
            >
              {isSubmitting ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>

          <div className="mt-6 flex items-center justify-center gap-4">
            <div className="h-px bg-gray-200 flex-1"></div>
            <span className="text-sm text-gray-400">or register with</span>
            <div className="h-px bg-gray-200 flex-1"></div>
          </div>

          <div className="mt-6">
            <button 
              onClick={() => console.log('Google register clicked')}
              className="w-full bg-white border border-gray-200 text-gray-700 font-medium py-3 px-4 rounded-[var(--radius-button)] hover:bg-gray-50 transition-colors flex items-center justify-center gap-3 shadow-sm"
            >
              <Globe className="w-5 h-5 text-blue-500" />
              Google
            </button>
          </div>

          <p className="mt-8 text-center text-gray-600">
            Already have an account?{' '}
            <Link href="/login" className="font-bold text-[var(--color-primary)] hover:underline">
              Sign In
            </Link>
          </p>
        </div>
      </div>

      {/* Right side: Image */}
      <div className="hidden md:block w-1/2 relative bg-gray-900">
        <img 
          src="https://images.unsplash.com/photo-1596895111956-bf570531846c?auto=format&fit=crop&w=1200&q=80" 
          alt="Sajek Valley"
          className="absolute inset-0 w-full h-full object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent"></div>
        <div className="absolute bottom-12 left-12 right-12 text-white">
          <h2 className="text-3xl font-heading font-bold mb-4">Your Journey Begins Here</h2>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="bg-[var(--color-accent)] rounded-full p-1"><Check className="w-4 h-4" /></div>
              <p className="text-gray-200">Save and manage your favorite destinations</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="bg-[var(--color-accent)] rounded-full p-1"><Check className="w-4 h-4" /></div>
              <p className="text-gray-200">Chat with our AI for personalized itineraries</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="bg-[var(--color-accent)] rounded-full p-1"><Check className="w-4 h-4" /></div>
              <p className="text-gray-200">Leave reviews and share your experiences</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
