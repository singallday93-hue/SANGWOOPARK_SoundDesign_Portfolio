import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Lock, ArrowRight } from 'lucide-react';
import { Button } from './ui/Button';

interface AdminLoginProps {
  onLogin: () => void;
}

export function AdminLogin({ onLogin }: AdminLoginProps) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === '1111') {
      onLogin();
    } else {
      setError('Invalid password');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f5efe6] p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md bg-[#faf6ee] border border-[#e2d7c0] p-8 rounded-3xl shadow-2xl"
      >
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-sky-500/10 rounded-full flex items-center justify-center border border-sky-500/20">
            <Lock className="w-8 h-8 text-sky-500" />
          </div>
        </div>
        
        <h2 className="text-2xl font-bold text-center text-zinc-900 mb-2 uppercase tracking-tight font-futura">Admin Access</h2>
        <p className="text-zinc-600 text-center text-sm mb-8">Enter management password to continue</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-[#f2e9db] border border-[#d8cdbe] rounded-xl px-4 py-3 text-zinc-900 focus:outline-none focus:border-sky-500 transition-colors"
            />
          </div>
          
          {error && <p className="text-red-500 text-xs text-center">{error}</p>}

          <Button type="submit" className="w-full bg-sky-500 text-white hover:bg-sky-600">
            Login to Dashboard
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </form>
      </motion.div>
    </div>
  );
}
