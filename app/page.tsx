import Image from "next/image";
import Link from "next/link";
import {
  Search,
  Filter,
  Bookmark,
  Network,
  Star,
  LayoutGrid,
  Plus,
} from "lucide-react";
import StatsSection from "@/components/StatsSection";
import AnimatedBlobs from "@/components/AnimatedBlobs";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      {/* Header */}
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
          <span
            className="hidden md:inline-block text-2xl md:text-3xl font-semibold text-black"
            style={{ fontFamily: "'Galak Pro', sans-serif" }}
          >
            neighbornook
          </span>
        </Link>
        <nav className="flex items-center gap-6 md:gap-8 absolute left-1/2 transform -translate-x-1/2">
          <Link
            href="/directory"
            className="text-base md:text-lg text-black font-medium hover:opacity-70 transition-opacity galak-pro"
          >
            Directory
          </Link>
          <Link
            href="/featured"
            className="text-base md:text-lg text-black font-medium hover:opacity-70 transition-opacity galak-pro"
          >
            Featured
          </Link>
          <Link
            href="/about"
            className="text-base md:text-lg text-black font-medium hover:opacity-70 transition-opacity galak-pro"
          >
            About
          </Link>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="flex items-center justify-center min-h-[calc(100vh-160px)] px-4 relative overflow-hidden">
        <AnimatedBlobs />
        <div className="relative z-10 text-center max-w-4xl">
          <h1 className="text-black leading-tight mb-6 galak-pro">
            <div className="text-3xl md:text-4xl mb-2 galak-pro">Turn your</div>
            <div className="flex items-center justify-center gap-6 md:gap-8 mb-2">
              <Image
                src="/icons/person.svg"
                alt="Person icon"
                width={34}
                height={52}
                className="w-8 h-12 md:w-10 md:h-16"
              />
              <span className="text-5xl md:text-6xl font-bold galak-pro">Community</span>
            </div>
            <div>
              <span className="text-3xl md:text-4xl bg-pink-200 px-3 py-1 inline-block rounded-sm galak-pro">
                into connection
              </span>
            </div>
          </h1>

          <p className="text-base md:text-lg text-black mb-8 max-w-2xl mx-auto leading-relaxed">
            Neighbor Nook helps you and others support local nonprofits,
            services, programs, and events that strengthen our neighborhood.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/directory"
              className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-zinc-800 transition-colors"
            >
              <Search className="w-4 h-4" />
              Browse Resources
            </Link>
            <Link
              href="/submit"
              className="flex items-center gap-2 bg-pink-300 text-black px-4 py-2 rounded-lg text-sm font-semibold"
            >
              <Plus className="w-4 h-4" />
              Add Resource
            </Link>
          </div>
        </div>
      </section>

      {/* Stats / Get Involved Section */}
      <StatsSection />

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-zinc-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Feature 1 */}
            <div className="bg-white rounded-xl p-6 border border-zinc-200">
              <div className="mb-4">
                <Filter className="w-8 h-8 text-indigo-500" />
              </div>
              <h3 className="text-xl font-bold text-black mb-3">
                Effortlessly search and filter resources
              </h3>
              <p className="text-zinc-600 leading-relaxed">
                Find exactly what you need with powerful search and category
                filters. Browse by non-profits, support services, events, and
                programs in seconds.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white rounded-xl p-6 border border-zinc-200">
              <div className="mb-4">
                <Bookmark className="w-8 h-8 text-amber-500" />
              </div>
              <h3 className="text-xl font-bold text-black mb-3">
                Save and organize favorites
              </h3>
              <p className="text-zinc-600 leading-relaxed">
                Bookmark your most useful community resources for quick access
                later. Build your personal collection of trusted local services
                and programs.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white rounded-xl p-6 border border-zinc-200">
              <div className="mb-4">
                <Star className="w-8 h-8 text-pink-500" />
              </div>
              <h3 className="text-xl font-bold text-black mb-3">
                Discover featured resources
              </h3>
              <p className="text-zinc-600 leading-relaxed">
                Explore handpicked community resources making the biggest
                impact. Get inspired by the programs and services strengthening
                our neighborhood.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-white rounded-xl p-6 border border-zinc-200">
              <div className="mb-4">
                <Network className="w-8 h-8 text-emerald-500" />
              </div>
              <h3 className="text-xl font-bold text-black mb-3">
                Connect with your community
              </h3>
              <p className="text-zinc-600 leading-relaxed">
                Access a comprehensive directory of local resources. From
                nonprofits to support services, find everything your community
                has to offer in one place.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="bg-white rounded-xl p-6 border border-zinc-200">
              <div className="mb-4">
                <Search className="w-8 h-8 text-cyan-500" />
              </div>
              <h3 className="text-xl font-bold text-black mb-3">
                Quick and easy navigation
              </h3>
              <p className="text-zinc-600 leading-relaxed">
                Browse resources, view featured highlights, and submit new
                entries with intuitive navigation. Everything you need is just a
                click away.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="bg-white rounded-xl p-6 border border-zinc-200">
              <div className="mb-4">
                <LayoutGrid className="w-8 h-8 text-violet-500" />
              </div>
              <h3 className="text-xl font-bold text-black mb-3">
                Organized by category
              </h3>
              <p className="text-zinc-600 leading-relaxed">
                Resources are neatly organized into categories: Non-Profits,
                Support Services, Community Events, and Programs. Find what you
                need faster.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
