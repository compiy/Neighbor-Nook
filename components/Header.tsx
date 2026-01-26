"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Header() {
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
        <span className="hidden md:inline-block text-2xl md:text-3xl font-semibold text-black">neighbornook</span>
      </Link>
      <nav className="flex items-center gap-6 md:gap-8 absolute left-1/2 transform -translate-x-1/2">
        <Link href="/directory" className="text-base md:text-lg text-black font-medium hover:opacity-70 transition-opacity">
          Directory
        </Link>
        <Link href="/map" className="text-base md:text-lg text-black font-medium hover:opacity-70 transition-opacity">
          Map
        </Link>
        <Link href="/featured" className="text-base md:text-lg text-black font-medium hover:opacity-70 transition-opacity">
          Featured
        </Link>
        <Link href="/favorites" className="text-base md:text-lg text-black font-medium hover:opacity-70 transition-opacity">
          Favorites
        </Link>
        <Link href="/about" className="text-base md:text-lg text-black font-medium hover:opacity-70 transition-opacity">
          About
        </Link>
      </nav>
    </header>
  );
}
