"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const navLinks = [
    { href: "/directory", label: "Directory" },
    { href: "/map", label: "Map" },
    { href: "/featured", label: "Featured" },
    { href: "/favorites", label: "Favorites" },
    { href: "/about", label: "About" },
    { href: "/references", label: "References" },
  ];

  return (
    <header className="relative flex items-center justify-between px-6 py-4 md:px-8 md:py-6">
      <Link href="/" className="flex items-center gap-3">
        <Image
          src="/icons/logo.svg"
          alt="NeighborNook logo"
          width={32}
          height={32}
          className="w-8 h-8"
          unoptimized
        />
        <span className="logo-text hidden xl:inline-block text-2xl md:text-3xl font-semibold text-black">neighbornook</span>
      </Link>
      
      {/* Desktop Navigation - Hidden on mobile */}
      <nav className="hidden md:flex items-center gap-6 md:gap-8 absolute left-1/2 transform -translate-x-1/2">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="text-base md:text-lg text-black font-medium hover:opacity-70 transition-opacity"
          >
            {link.label}
          </Link>
        ))}
      </nav>

      {/* Mobile Menu Button - Only visible on mobile */}
      <button
        onClick={toggleMobileMenu}
        className="md:hidden p-2 rounded-lg hover:bg-zinc-100 transition-colors"
        aria-label="Toggle menu"
      >
        {isMobileMenuOpen ? (
          <X className="w-6 h-6 text-black" />
        ) : (
          <Menu className="w-6 h-6 text-black" />
        )}
      </button>

      {/* Mobile Dropdown Menu */}
      {isMobileMenuOpen && (
        <div className="absolute top-full right-6 mt-2 w-48 bg-white rounded-lg shadow-lg border border-zinc-200 z-50 md:hidden">
          <nav className="py-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-4 py-3 text-base text-black font-medium hover:bg-zinc-50 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
