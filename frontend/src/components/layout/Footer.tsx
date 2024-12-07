import React from 'react';

export const Footer = () => {
  return (
    <footer className="bg-gray-100 p-4 text-center">
      <p className="text-gray-600">
        © {new Date().getFullYear()} Math Tutor. All rights reserved.
      </p>
    </footer>
  );
};