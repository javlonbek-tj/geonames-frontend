import { useState } from 'react';
import { Link, NavLink } from 'react-router';
import { MenuOutlined } from '@ant-design/icons';
import { NAV_ITEMS } from '../lib/navItems';
import AuthButton from './AuthButton';
import logoSvg from '@/shared/assets/logo.svg';

const navClass = ({ isActive }: { isActive: boolean }) =>
  `px-3.5 py-1.5 rounded-lg text-[13.5px] font-medium transition-colors cursor-pointer whitespace-nowrap ${
    isActive
      ? 'bg-blue-50 text-blue-700'
      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
  }`;

const mobileNavClass = ({ isActive }: { isActive: boolean }) =>
  `text-left px-3.5 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
    isActive ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-100'
  }`;

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-3 shrink-0">
          <img src={logoSvg} alt="Geonames" className="h-5 block" />
        </Link>

        <nav className="hidden md:flex items-center gap-1 flex-1 ml-4">
          {NAV_ITEMS.map((item) => (
            <NavLink key={item.key} to={item.key} className={navClass}>
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <AuthButton />
          <button
            className="md:hidden w-9 h-9 rounded-lg border border-gray-200 flex items-center justify-center bg-white cursor-pointer"
            onClick={() => setMobileOpen((v) => !v)}
          >
            <MenuOutlined style={{ fontSize: 15 }} />
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white px-4 py-3 flex flex-col gap-1">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.key}
              to={item.key}
              className={mobileNavClass}
              onClick={() => setMobileOpen(false)}
            >
              {item.label}
            </NavLink>
          ))}
        </div>
      )}
    </header>
  );
}
