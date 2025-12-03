import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { NAV_ITEMS } from '../constants';
import { Moon, Sun, Github, Menu, X } from 'lucide-react';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isDark, setIsDark] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    // Check local storage or system preference
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    } else {
      setIsDark(false);
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    if (newTheme) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  return (
    <div className="min-h-screen flex flex-col max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 border-x border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 shadow-xl shadow-stone-200/50 dark:shadow-none">
      {/* Navbar */}
      <header className="py-6 flex items-center justify-between sticky top-0 z-50 bg-white/80 dark:bg-stone-900/80 backdrop-blur-md">
        <div className="flex items-center gap-3">
             <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center text-white font-serif font-bold text-lg">
                Z
             </div>
             <span className="font-serif font-bold text-xl tracking-tight hidden sm:block">Zeyu Edward Qi</span>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6">
          {NAV_ITEMS.map((item) => (
            item.isExternal ? (
              <a 
                key={item.path}
                href={item.path}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium hover:text-accent transition-colors flex items-center gap-1"
              >
                {item.label}
                {item.label === 'GitHub' && <Github size={14} />}
              </a>
            ) : (
              <NavLink 
                key={item.path}
                to={item.path}
                className={({ isActive }) => 
                  `text-sm font-medium transition-colors border-b-2 ${isActive ? 'border-accent text-accent' : 'border-transparent hover:text-accent'}`
                }
              >
                {item.label}
              </NavLink>
            )
          ))}
          <button 
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
            aria-label="Toggle Theme"
          >
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </nav>

        {/* Mobile Nav Toggle */}
        <div className="flex items-center gap-4 md:hidden">
            <button 
                onClick={toggleTheme}
                className="p-2 rounded-full hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
            >
                {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
        </div>
      </header>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden py-4 border-b border-stone-200 dark:border-stone-800">
             <nav className="flex flex-col gap-4">
                {NAV_ITEMS.map((item) => (
                    item.isExternal ? (
                    <a 
                        key={item.path}
                        href={item.path}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-lg font-medium hover:text-accent"
                        onClick={() => setIsMobileMenuOpen(false)}
                    >
                        {item.label}
                    </a>
                    ) : (
                    <NavLink 
                        key={item.path}
                        to={item.path}
                        className={({ isActive }) => 
                        `text-lg font-medium ${isActive ? 'text-accent font-bold' : ''}`
                        }
                        onClick={() => setIsMobileMenuOpen(false)}
                    >
                        {item.label}
                    </NavLink>
                    )
                ))}
            </nav>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-grow py-8 md:py-12">
        {children}
      </main>

      {/* Footer */}
      <footer className="py-8 border-t border-stone-200 dark:border-stone-800 text-center text-sm text-stone-500">
        <p>Built with ❤️ by Zeyu | <a href="https://github.com/zeyuedwardqi" target="_blank" rel="noreferrer" className="hover:text-accent underline">GitHub</a> | © {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
};

export default Layout;