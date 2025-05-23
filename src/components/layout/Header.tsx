import React from 'react';
import { NavigationLink } from '../../types';
import { Brain } from 'lucide-react';

type HeaderProps = {
  links: NavigationLink[];
  onNavigate: (href: string) => void;
};

const Header: React.FC<HeaderProps> = ({ links, onNavigate }) => {
  return (
    <header className="bg-white border-b border-gray-200">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center">
          <a 
            href="/" 
            className="flex items-center" 
            onClick={(e) => { e.preventDefault(); onNavigate('/'); }}
          >
            <div className="text-blue-800 font-bold text-2xl flex items-center gap-2">
              <div className="bg-blue-800 text-white p-2 rounded-lg">
                <Brain size={24} />
              </div>
              <span className="hidden sm:inline">BK360</span>
            </div>
          </a>

          <nav className="flex-1 flex items-center justify-center">
            {links.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => { e.preventDefault(); onNavigate(link.href); }}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-150 
                  ${link.active 
                    ? 'bg-blue-50 text-blue-800' 
                    : 'text-gray-600 hover:bg-gray-50'
                  }`}
              >
                {link.name}
              </a>
            ))}
          </nav>
          
          <div className="w-[116px]"></div>
        </div>
      </div>
    </header>
  );
};

export default Header;