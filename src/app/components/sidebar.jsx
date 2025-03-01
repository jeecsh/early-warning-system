"use client";

import { useState } from 'react';
import DashboardIcon from '@mui/icons-material/Dashboard';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import TaskIcon from '@mui/icons-material/Task';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import SubscriptionsIcon from '@mui/icons-material/Subscriptions';
import SettingsIcon from '@mui/icons-material/Settings';
import StreamIcon from '@mui/icons-material/Stream';
import Link from 'next/link';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      className={`fixed left-1 top-24 h-120px bg-gray-800 text-white transition-all duration-300
        ${isOpen ? 'w-15 hover:w-48 bg-transparent' : 'w-14 ' } 
        rounded-tr-xl rounded-br-3xl overflow-hidden z-50`}
    >
      <div className="flex items-center justify-center p-4 h-16">
        <button 
          onClick={toggleSidebar} 
          className="hover:bg-gray-700 p-2 rounded-full transition-colors"
        >
          <StreamIcon className="text-white" />
        </button>
      </div>

      <div className="flex-1 mt-4"  >
        <ul className="space-y-4 my-8 px-2">
          {[
            
            { href: "/workplace", icon: <WorkOutlineIcon />, text: "Workplace" },
            { href: "/tasks", icon: <TaskIcon />, text: "Tasks" },
          
            { href: "/subscription", icon: <SubscriptionsIcon />, text: "Subscription" },
            { href: "/settings", icon: <SettingsIcon />, text: "Settings" },
          ].map((item, index) => (
            <li 
              key={index}
              className="group relative hover:bg-gray-700 rounded-lg transition-colors"
            >
              <Link href={item.href} legacyBehavior>
                <a className="flex items-center p-3 gap-4">
                  <span className="min-w-[24px] flex justify-center">
                    {item.icon}
                  </span>   
                  <span className={`
                    absolute left-14 px-3 py-2 rounded-lg
                    whitespace-nowrap transition-opacity duration-200
                    ${isOpen ? 'opacity-100' : 'opacity-0 group-hover:opacity-10'}
                    
                  `}>
                    {item.text}
                  </span>
                </a>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;