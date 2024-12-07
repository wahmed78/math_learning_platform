import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export const Sidebar = () => {
  const location = useLocation();
  const menuItems = [
    { path: '/dashboard', label: 'Dashboard', icon: 'dashboard' },
    { path: '/learning', label: 'Learning', icon: 'book' },
    { path: '/practice', label: 'Practice', icon: 'edit' },
    { path: '/progress', label: 'Progress', icon: 'chart' }
  ];

  return (
    <aside className="w-64 bg-white shadow-lg h-screen">
      <nav className="p-4">
        {menuItems.map(item => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center p-3 rounded mb-2 ${
              location.pathname === item.path ? 'bg-primary text-white' : ''
            }`}
          >
            <span className={`icon-${item.icon} mr-3`} />
            {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
};