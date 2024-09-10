import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="text-center py-4 text-sm text-gray-600 dark:text-gray-400">
      © {new Date().getFullYear()} MoodFlix. All rights reserved.
    </footer>
  );
};

export default Footer;