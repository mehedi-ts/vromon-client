'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Mail, Lock, ArrowRight, Globe, AlertCircle } from 'lucide-react';
import { authClient } from '@/lib/auth-client';

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(1, 'Password is required'),
});
const handelGoogle = async() => {
  const data = await authClient.signIn.social({
    provider: "google",
  });

  console.log("done babu")
}


type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const { register, handleSubmit, formState: { errors }, setValue } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });
  
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const onSubmit = async (data: LoginFormValues) => {
    setIsSubmitting(true);
    setErrorMsg('');
    try {
      const { error } = await authClient.signIn.email({
        email: data.email,
        password: data.password,
      });
      if (error) {
        setErrorMsg(error.message || 'Invalid credentials.');
      } else {
        router.push('/explore');
      }
    } catch (err) {
      setErrorMsg('A network error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDemoLogin = () => {
    setValue('email', 'demo@vromonai.com', { shouldValidate: true });
    setValue('password', 'SecretPass123!', { shouldValidate: true });
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-[var(--color-neutral-bg)]">
      {/* Left side: Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8 lg:p-24 bg-white shadow-xl z-10">
        <div className="w-full max-w-md">
          <div className="mb-8">
            <h1 className="text-4xl font-heading font-bold text-[var(--color-text-main)] mb-2">Welcome Back</h1>
            <p className="text-gray-500">Sign in to continue planning your next adventure.</p>
          </div>
          
          {errorMsg && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 rounded-[var(--radius-card)] flex items-center gap-3">
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              <p className="text-sm font-medium">{errorMsg}</p>
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
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
              <div className="mt-2 text-right">
                <a href="#" className="text-sm font-medium text-[var(--color-primary)] hover:underline">Forgot password?</a>
              </div>
            </div>

            <button 
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[var(--color-primary)] text-white font-bold py-3 px-4 rounded-[var(--radius-button)] hover:opacity-90 transition-opacity flex items-center justify-center gap-2 disabled:opacity-70 mt-2"
            >
              {isSubmitting ? 'Signing in...' : 'Sign In'} <ArrowRight className="w-5 h-5" />
            </button>
          </form>

          <div className="mt-6 flex items-center justify-center gap-4">
            <div className="h-px bg-gray-200 flex-1"></div>
            <span className="text-sm text-gray-400">or</span>
            <div className="h-px bg-gray-200 flex-1"></div>
          </div>

          <div className="mt-6 space-y-3">
            <button 
              type='button'
              onClick={handelGoogle}
              className="w-full bg-white border border-gray-200 text-gray-700 font-medium py-3 px-4 rounded-[var(--radius-button)] hover:bg-gray-50 transition-colors flex items-center justify-center gap-3 shadow-sm"
            >
              <Globe className="w-5 h-5 text-blue-500" />
              Continue with Google
            </button>
            
            <button 
              onClick={handleDemoLogin}
              className="w-full bg-[var(--color-accent)]/10 text-[var(--color-accent)] font-bold py-3 px-4 rounded-[var(--radius-button)] hover:bg-[var(--color-accent)]/20 transition-colors border border-[var(--color-accent)]/20"
            >
              Use Demo Credentials
            </button>
          </div>

          <p className="mt-8 text-center text-gray-600">
            Don't have an account?{' '}
            <Link href="/register" className="font-bold text-[var(--color-primary)] hover:underline">
              Create an account
            </Link>
          </p>
        </div>
      </div>

      {/* Right side: Image */}
      <div className="hidden md:block w-1/2 relative bg-gray-900">
        <img 
          src="https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1200&q=80" 
          alt="Taj Mahal"
          className="absolute inset-0 w-full h-full object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent"></div>
        <div className="absolute bottom-12 left-12 right-12 text-white">
          <h2 className="text-3xl font-heading font-bold mb-4">Discover Extraordinary Destinations</h2>
          <p className="text-gray-200 text-lg max-w-lg">Join Vromon AI to unlock personalized itineraries, smart recommendations, and seamless travel planning.</p>
        </div>
      </div>
    </div>
  );
}
