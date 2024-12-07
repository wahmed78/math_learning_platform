import React from 'react';
import { useAuth } from '../../hooks/useAuth';

export const Header = () => {
  const { user, logout } = useAuth();

  return (
    <header className="bg-primary p-4 flex justify-between items-center">
      <div className="logo">
        <h1 className="text-2xl font-bold text-white">Math Tutor</h1>
      </div>
      
      <div className="user-info flex items-center gap-4">
        <span className="text-white">{user?.username}</span>
        <button 
          onClick={logout}
          className="bg-white text-primary px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>
    </header>
  );
};