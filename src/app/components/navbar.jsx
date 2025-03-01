"use client";

import { useState } from 'react';
import { UserIcon, BellIcon, QuestionMarkCircleIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import Badge from '@mui/material/Badge';

const Navbar = () => {
  const [showHelp, setShowHelp] = useState(false);

  const toggleHelp = () => {
    setShowHelp(!showHelp);
  };

  return (
    <div className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 shadow-xl z-50 backdrop-blur-sm bg-opacity-90">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center h-16 px-4">
          {/* Logo Area */}
          <div className="flex-shrink-0">
            <Link href="/" legacyBehavior>
              <a className="text-gray-900 text-xl font-bold bg-blue-100 px-4 py-2 rounded-2xl hover:bg-blue-200 transition-colors">
                LOGO
              </a>
            </Link>
          </div>

          {/* Right Navigation Icons */}
          <div className="flex items-center space-x-1">
            <Link href="/profile" legacyBehavior>
              <a className="p-3 rounded-xl hover:bg-gray-100 transition-all duration-300 group">
                <UserIcon className="h-6 w-6 text-gray-700 group-hover:text-blue-600 group-hover:scale-110 transition-transform" />
              </a>
            </Link>
            
            <Link href="/notifications" legacyBehavior>
              <a className="p-3 rounded-xl hover:bg-gray-100 transition-all duration-300 group">
                <Badge badgeContent={3} color="error">
                  <BellIcon className="h-6 w-6 text-gray-700 group-hover:text-blue-600 group-hover:scale-110 transition-transform" />
                </Badge>
              </a>
            </Link>
            
            {/* Help Button */}
            <div className="relative">
              <button
                onClick={toggleHelp}
                className="p-3 ml-2 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 transition-all duration-300 shadow-sm hover:shadow-lg flex items-center gap-1"
              >
                <QuestionMarkCircleIcon className="h-6 w-6 text-white" />
                <span className="text-white text-sm font-medium hidden sm:inline-block">Help</span>
              </button>
              
              {/* Help popup */}
              {showHelp && (
                <div className="absolute right-0 top-14 bg-white rounded-2xl shadow-2xl p-4 w-48 border border-gray-200 transition-all duration-300">
                  <h3 className="text-sm font-semibold text-gray-900">Need help?</h3>
                  <p className="mt-2 text-xs text-gray-500">
                    24/7 support available
                  </p>
                  <button
                    className="mt-3 w-full py-2 px-3 border border-gray-300 rounded-xl text-xs font-medium text-gray-900 hover:bg-gray-50 transition-colors"
                  >
                    Contact Support
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;