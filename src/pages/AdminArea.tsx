import { useState } from 'react';
import { AdminLogin } from '../components/AdminLogin';
import { AdminPage } from './AdminPage';

export function AdminArea() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  if (!isLoggedIn) {
    return <AdminLogin onLogin={() => setIsLoggedIn(true)} />;
  }

  return <AdminPage />;
}
