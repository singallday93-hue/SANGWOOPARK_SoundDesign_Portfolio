import { useState, useEffect } from 'react';
import { onAuthStateChanged, signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth';
import { auth } from '../lib/firebase';
import { AdminLogin } from '../components/AdminLogin';
import { AdminPage } from './AdminPage';
import { Button } from '../components/ui/Button';
import { LogOut, User } from 'lucide-react';

export function AdminArea() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Local UI login state (the password one)
  const [user, setUser] = useState(auth.currentUser);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    return onAuthStateChanged(auth, (u) => {
      setUser(u);
      setAuthLoading(false);
    });
  }, []);

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    setIsLoggedIn(false);
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-sky-500"></div>
      </div>
    );
  }

  // First check the local password login
  if (!isLoggedIn) {
     return <AdminLogin onLogin={() => setIsLoggedIn(true)} />;
  }

  // Then check Google Auth for Firestore write permissions
  if (!user || user.email !== 'singallday93@gmail.com') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-950 p-6">
        <div className="w-full max-w-md bg-white border border-zinc-200 p-8 rounded-3xl shadow-2xl text-center">
          <div className="w-16 h-16 bg-sky-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <User className="w-8 h-8 text-sky-500" />
          </div>
          <h2 className="text-2xl font-bold text-zinc-900 mb-4 tracking-tight">Authenticity Check</h2>
          <p className="text-zinc-500 text-sm mb-8">To save changes permanently to the database, please verify your identity with Google.</p>
          <Button onClick={handleGoogleLogin} className="w-full bg-sky-500 text-white hover:bg-sky-600 mb-4">
            Sign in with Google
          </Button>
          <p className="text-[10px] text-zinc-400">Target account: singallday93@gmail.com</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      <div className="fixed top-24 right-6 z-50">
        <Button variant="outline" onClick={handleLogout} className="bg-white/10 text-white border-white/20 hover:bg-white/20 px-4 py-2">
          <LogOut className="w-4 h-4 mr-2" />
          Logout
        </Button>
      </div>
      <AdminPage />
    </div>
  );
}
