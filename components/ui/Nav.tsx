"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

const NAV_LINKS = [
  { href: "/about", label: "Infos" },
  { href: "/contact", label: "Archives" },
];

export default function Nav() {
  const pathname = usePathname();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const sidePadding = isMobile ? "32px" : "100px"; // Increased to 100px for generous spacing

  return (
    <header
      className="fixed top-0 left-0 w-full z-50 pointer-events-none"
      role="banner"
    >
      <nav
        className="relative w-full h-[80px] pointer-events-auto"
        aria-label="Main navigation"
      >
        {/* Left — Brand Name */}
        <div 
          style={{ 
            position: 'absolute', 
            left: sidePadding, 
            top: '50%', 
            transform: 'translateY(-50%)' 
          }}
        >
          <Link
            href="/"
            className="text-caption tracking-[0.10em] uppercase text-black hover:opacity-60 transition-opacity duration-300 whitespace-nowrap"
            style={{ fontSize: isMobile ? '11px' : '12px' }}
            aria-label="Lekha Rathnam — Home"
          >
            Lekha Rathnam
          </Link>
        </div>

        {/* Center — Social Links (Hidden on mobile) */}
        {!isMobile && (
          <div 
            style={{ 
              position: 'absolute', 
              left: '50%', 
              top: '50%', 
              transform: 'translate(-50%, -50%)' 
            }}
            className="flex items-center gap-6"
          >
            <a
              href="https://www.behance.net/lekharathnd8f9"
              target="_blank"
              rel="noopener noreferrer"
              className="text-caption tracking-[0.10em] uppercase text-black hover:opacity-60 transition-opacity duration-300 whitespace-nowrap"
            >
              Behance
            </a>
            <span className="text-[10px] opacity-30">/</span>
            <a
              href="https://www.instagram.com/lekharathnam/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-caption tracking-[0.10em] uppercase text-black hover:opacity-60 transition-opacity duration-300 whitespace-nowrap"
            >
              Instagram
            </a>
          </div>
        )}

        {/* Right — Navigation */}
        <div 
          style={{ 
            position: 'absolute', 
            right: sidePadding, 
            top: '50%', 
            transform: 'translateY(-50%)' 
          }}
        >
          <ul className="flex items-center gap-6" role="list">
            {NAV_LINKS.map((link, i) => (
              <li key={link.href} className="flex items-center gap-6">
                <Link
                  href={link.href}
                  className={`text-caption tracking-[0.10em] uppercase text-black hover:opacity-60 transition-opacity duration-300 ${
                    pathname.startsWith(link.href) ? "opacity-50" : ""
                  }`}
                  style={{ fontSize: isMobile ? '11px' : '12px' }}
                  aria-current={
                    pathname.startsWith(link.href) ? "page" : undefined
                  }
                >
                  {link.label}
                </Link>
                {i < NAV_LINKS.length - 1 && (
                  <span className="text-[10px] opacity-30">•</span>
                )}
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  );
}
