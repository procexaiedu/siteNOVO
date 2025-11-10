import React, { useState, useEffect } from 'react';
import { motion, useScroll } from 'framer-motion';
import { Moon, Sun, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Logo } from '@/components/common/Logo';
import { cn } from '@/components/ui/utils';

interface HeaderProps {
  isDarkMode?: boolean;
  toggleDarkMode?: () => void;
}

/**
 * Header Component
 *
 * Sticky header with navigation, logo, dark mode toggle, and CTA.
 * Following MotherDuck design system with ProceX AI branding.
 *
 * Features:
 * - Sticky positioning with background opacity on scroll
 * - Responsive mobile menu
 * - Dark mode toggle
 * - Primary CTA button
 * - Smooth scroll navigation
 *
 * @example
 * <Header isDarkMode={darkMode} toggleDarkMode={toggleDarkMode} />
 */
export const Header: React.FC<HeaderProps> = ({
  isDarkMode = false,
  toggleDarkMode
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();

  // Track scroll position
  useEffect(() => {
    const unsubscribe = scrollY.on('change', (latest) => {
      setIsScrolled(latest > 50);
    });
    return () => unsubscribe();
  }, [scrollY]);

  // Navigation items
  const navItems = [
    { label: 'Como Funciona', href: '#como-funciona' },
    { label: 'Casos', href: '#casos' },
    { label: 'Resultados', href: '#resultados' },
    { label: 'Recursos', href: '#recursos' },
  ];

  // Handle smooth scroll
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <motion.header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled
          ? 'bg-neutral-beige/95 backdrop-blur-sm shadow-[0_2px_8px_rgba(0,0,0,0.1)]'
          : 'bg-neutral-beige'
      )}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <nav className="mx-auto max-w-screen-xl px-6 md:px-8">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <motion.a
            href="#hero"
            className="flex items-center gap-3"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={(e) => handleNavClick(e, '#hero')}
          >
            <Logo size={40} />
            <span className="font-aeonik-mono text-xl font-bold uppercase tracking-wide text-primary-dark">
              ProceX AI
            </span>
          </motion.a>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-8 lg:flex">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className="font-inter text-sm font-light text-primary-dark transition-colors hover:text-accent-teal"
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* CTA & Dark Mode Toggle - Desktop */}
          <div className="hidden items-center gap-4 lg:flex">
            {toggleDarkMode && (
              <button
                onClick={toggleDarkMode}
                className="rounded-[2px] border-2 border-primary-dark p-2 transition-colors hover:bg-primary-dark hover:text-white"
                aria-label={isDarkMode ? 'Ativar modo claro' : 'Ativar modo escuro'}
              >
                {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>
            )}
            <Button variant="primary" size="default">
              DIAGNÓSTICO GRATUITO
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="rounded-[2px] border-2 border-primary-dark p-2 lg:hidden"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <motion.div
            className="border-t-2 border-primary-dark py-6 lg:hidden"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            <div className="flex flex-col gap-4">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className="font-inter text-base font-light text-primary-dark transition-colors hover:text-accent-teal"
                >
                  {item.label}
                </a>
              ))}
              <div className="mt-4 flex flex-col gap-4">
                {toggleDarkMode && (
                  <button
                    onClick={toggleDarkMode}
                    className="flex items-center justify-center gap-2 rounded-[2px] border-2 border-primary-dark p-3 transition-colors hover:bg-primary-dark hover:text-white"
                  >
                    {isDarkMode ? (
                      <>
                        <Sun size={20} />
                        <span className="font-aeonik-mono text-sm uppercase">
                          Modo Claro
                        </span>
                      </>
                    ) : (
                      <>
                        <Moon size={20} />
                        <span className="font-aeonik-mono text-sm uppercase">
                          Modo Escuro
                        </span>
                      </>
                    )}
                  </button>
                )}
                <Button variant="primary" size="default" className="w-full">
                  DIAGNÓSTICO GRATUITO
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </nav>
    </motion.header>
  );
};

export default Header;
