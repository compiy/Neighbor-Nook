"use client";

import { useState } from "react";
import { Menu, X, Heart } from "lucide-react";

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-zinc-200/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <Heart className="w-6 h-6 text-black" />
            <span className="hidden md:inline-block text-xl md:text-2xl font-semibold text-black">
              NeighborNook
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <a
              href="#resources"
              className="text-zinc-700 hover:text-black transition-colors font-medium text-sm"
            >
              Resources
            </a>
            <a
              href="#highlights"
              className="text-zinc-700 hover:text-black transition-colors font-medium text-sm"
            >
              Highlights
            </a>
            <a
              href="#submit"
              className="text-zinc-700 hover:text-black transition-colors font-medium text-sm"
            >
              Submit
            </a>
            <a
              href="#submit"
              className="px-5 py-2 bg-black text-white rounded-full font-medium hover:bg-zinc-900 transition-all text-sm"
            >
              Add Resource
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-black"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 space-y-4 border-t border-zinc-200">
            <a
              href="#resources"
              className="block text-zinc-700 hover:text-black transition-colors font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              Resources
            </a>
            <a
              href="#highlights"
              className="block text-zinc-700 hover:text-black transition-colors font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              Highlights
            </a>
            <a
              href="#submit"
              className="block text-zinc-700 hover:text-black transition-colors font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              Submit
            </a>
            <a
              href="#submit"
              className="block px-4 py-2 bg-black text-white rounded-full font-medium hover:bg-zinc-900 transition-colors text-center"
              onClick={() => setMobileMenuOpen(false)}
            >
              Add Resource
            </a>
          </div>
        )}
      </div>
    </nav>
  );
}

