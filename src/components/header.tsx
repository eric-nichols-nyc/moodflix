import React from 'react';
import Link from 'next/link';
import { Film } from 'lucide-react';
import ThemeToggle from './theme-toggle';

const Header: React.FC = () => {
  return (
    <header className="h-[60px] flex justify-between items-center px-4 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
      <Link href="/" className="flex items-center">
        <Film className="w-6 h-6 mr-2 text-blue-500" />
        <span className="font-bold text-gray-800 dark:text-white">MoodFlix</span>
      </Link>
      <div className="flex items-center space-x-4">
        <ThemeToggle />
        <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors">
          Sign In
        </button>
      </div>
    </header>
  );
};

export default Header;