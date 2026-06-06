import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { IconHome, IconGrid3x3, IconSquarePlus, IconLogout, IconUser } from '@tabler/icons-react';
import { useAuth } from '../hooks/useAuth';

export default function AdminSidebar() {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/admin/login');
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  const navItems = [
    { label: 'Home', path: '/admin/dashboard', icon: <IconHome size={24} /> },
    { label: 'Posts', path: '/admin/posts', icon: <IconGrid3x3 size={24} /> },
    { label: 'Create', path: '/admin/posts/new', icon: <IconSquarePlus size={24} /> },
  ];

  return (
    <>
      {/* DESKTOP SIDEBAR (md and up) */}
      <aside className="hidden md:flex fixed left-0 top-0 h-screen w-[244px] bg-[#121212] border-r border-neutral-800 flex-col justify-between p-6 z-40 select-none text-white">
        <div className="flex flex-col gap-8">
          {/* Logo */}
          <div className="text-xl font-black tracking-tighter pt-2">
            <span className="text-white">DIGITAL</span>
            <span style={{ color: '#CCFF00' }}>SURVEY</span>
            <span className="ml-1.5 text-[9px] bg-ds-blue text-white px-1.5 py-0.5 rounded font-black tracking-widest uppercase align-middle">
              Admin
            </span>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-col gap-2">
            {navItems.map((item) => (
              <NavLink
                key={item.label}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-4 py-3 px-4 rounded-lg text-white hover:bg-neutral-800 transition-all ${
                    isActive 
                      ? 'font-extrabold border-l-4 border-ds-yellow pl-3 bg-neutral-900' 
                      : 'font-medium border-l-4 border-transparent'
                  }`
                }
              >
                {item.icon}
                <span className="text-sm">{item.label}</span>
              </NavLink>
            ))}
            
            <button
              onClick={handleLogout}
              className="flex items-center gap-4 py-3 px-4 rounded-lg text-red-400 hover:bg-red-950/20 font-semibold border-l-4 border-transparent pl-4 transition-all w-full text-left"
            >
              <IconLogout size={24} />
              <span className="text-sm">Logout</span>
            </button>
          </nav>
        </div>

        {/* Profile Card */}
        <div className="flex items-center gap-3 border-t border-neutral-800 pt-4">
          <div className="w-10 h-10 rounded-full bg-ds-blue text-white flex items-center justify-center font-black text-sm uppercase shadow-sm">
            {user?.email?.charAt(0) || 'A'}
          </div>
          <div className="flex flex-col min-w-0">
            <span className="font-extrabold text-white text-xs truncate">
              {user?.email?.split('@')[0] || 'Admin User'}
            </span>
            <span className="text-[10px] font-black text-ds-blue uppercase tracking-widest">
              Admin
            </span>
          </div>
        </div>
      </aside>

      {/* MOBILE BOTTOM NAVBAR (below md) */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-[#121212] border-t border-neutral-800 flex justify-around items-center px-4 z-50 text-white shadow-lg">
        {navItems.map((item) => (
          <NavLink
            key={item.label}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center justify-center p-2 rounded-full transition-all ${
                isActive ? 'text-ds-yellow scale-110' : 'text-white/70 hover:text-white'
              }`
            }
          >
            {item.icon}
          </NavLink>
        ))}

        {/* Mobile Profile Icon acting as Signout Trigger */}
        <button
          onClick={() => {
            if (window.confirm("Do you want to log out?")) {
              handleLogout();
            }
          }}
          className="flex items-center justify-center p-2 text-red-400 hover:text-red-300"
          aria-label="Logout"
        >
          <IconUser size={24} />
        </button>
      </nav>
    </>
  );
}
