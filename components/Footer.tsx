import Image from "next/image";

export default function Footer() {
  return (
    <footer className="border-t border-zinc-200 py-8 px-4 sm:px-6 lg:px-8 bg-white text-zinc-700">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-6 md:gap-0">
          <div className="flex items-center gap-3">
            <Image src="/icons/logo.svg" alt="Neighbor Nook logo" width={28} height={28} className="w-7 h-7" unoptimized />
            <div>
              <div className="text-sm text-zinc-700 galak-pro">© 2025 Neighbor Nook, Inc.</div>
              <div className="text-xs text-zinc-500">Built for the community</div>
            </div>
          </div>

          <div className="flex gap-6 text-sm">
            <a href="/directory" className="text-zinc-600 hover:text-black transition-colors">Directory</a>
            <a href="/featured" className="text-zinc-600 hover:text-black transition-colors">Featured</a>
            <a href="/about" className="text-zinc-600 hover:text-black transition-colors">About</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

