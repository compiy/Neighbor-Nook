import Image from "next/image";
import Link from "next/link";
import { ShoppingBag, HeartHandshake, GraduationCap, Phone, Mail, Globe, MapPin, Clock, Star } from "lucide-react";

export default function FeaturedPage() {
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
          <span className="hidden md:inline-block text-2xl md:text-3xl font-semibold text-black" style={{ fontFamily: "'Galak Pro', sans-serif" }}>neighbornook</span>
        </Link>
        <nav className="flex items-center gap-6 md:gap-8 absolute left-1/2 transform -translate-x-1/2">
          <Link href="/directory" className="text-base md:text-lg text-black font-medium hover:opacity-70 transition-opacity galak-pro">
            Directory
          </Link>
          <Link href="/featured" className="text-base md:text-lg text-black font-medium hover:opacity-70 transition-opacity galak-pro">
            Featured
          </Link>
          <Link href="/about" className="text-base md:text-lg text-black font-medium hover:opacity-70 transition-opacity galak-pro">
            About
          </Link>
        </nav>
      </header>

      {/* Featured Resources Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-zinc-50">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 mb-4">
              <Star className="w-6 h-6 text-red-400" />
              <p className="text-sm uppercase tracking-wider text-zinc-500 galak-pro">
                HIGHLIGHTED RESOURCES
              </p>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-black mb-6 galak-pro">
              Featured Community Resources
            </h2>
            <p className="text-lg text-zinc-600 max-w-2xl mx-auto">
              Discover the most impactful resources making a difference in our community. These featured organizations provide essential services and support.
            </p>
          </div>

          {/* Featured Resource Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Featured Resource 1 */}
            <div className="bg-white rounded-xl p-6 border border-zinc-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <ShoppingBag className="w-10 h-10 text-black" />
                <div className="flex gap-2">
                  <span className="px-3 py-1 bg-red-200 text-red-800 text-xs font-semibold rounded-full">Featured</span>
                  <span className="px-3 py-1 bg-zinc-100 text-zinc-700 text-xs font-medium rounded-full">Support Services</span>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-zinc-800 mb-3">Community Food Bank</h3>
              <p className="text-zinc-600 mb-6 leading-relaxed">
                Providing emergency food assistance to families in need. No questions asked, just support when you need it most.
              </p>
              <div className="space-y-3 text-sm text-zinc-600">
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  <span>(555) 123-4567</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  <span>help@communityfoodbank.org</span>
                </div>
                <a href="#" className="flex items-center gap-2 text-blue-600 hover:underline font-medium">
                  <Globe className="w-4 h-4" />
                  <span>Visit Website</span>
                </a>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span>123 Main Street, Community City, ST 12345</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>Mon-Fri: 9am-5pm, Sat: 10am-2pm</span>
                </div>
              </div>
            </div>

            {/* Featured Resource 2 */}
            <div className="bg-white rounded-xl p-6 border border-zinc-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <HeartHandshake className="w-10 h-10 text-black" />
                <div className="flex gap-2">
                  <span className="px-3 py-1 bg-red-200 text-red-800 text-xs font-semibold rounded-full">Featured</span>
                  <span className="px-3 py-1 bg-zinc-100 text-zinc-700 text-xs font-medium rounded-full">Support Services</span>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-zinc-800 mb-3">Senior Care Network</h3>
              <p className="text-zinc-600 mb-6 leading-relaxed">
                Comprehensive support services for seniors including transportation, meal delivery, and companionship programs.
              </p>
              <div className="space-y-3 text-sm text-zinc-600">
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  <span>(555) 234-5678</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  <span>contact@seniorcarenetwork.org</span>
                </div>
                <a href="#" className="flex items-center gap-2 text-blue-600 hover:underline font-medium">
                  <Globe className="w-4 h-4" />
                  <span>Visit Website</span>
                </a>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span>456 Oak Avenue, Community City, ST 12345</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>Mon-Fri: 8am-6pm</span>
                </div>
              </div>
            </div>

            {/* Featured Resource 3 */}
            <div className="bg-white rounded-xl p-6 border border-zinc-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <GraduationCap className="w-10 h-10 text-black" />
                <div className="flex gap-2">
                  <span className="px-3 py-1 bg-red-200 text-red-800 text-xs font-semibold rounded-full">Featured</span>
                  <span className="px-3 py-1 bg-zinc-100 text-zinc-700 text-xs font-medium rounded-full">Programs</span>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-zinc-800 mb-3">Youth Development Center</h3>
              <p className="text-zinc-600 mb-6 leading-relaxed">
                After-school programs, tutoring, sports leagues, and summer camps for children and teenagers in our community.
              </p>
              <div className="space-y-3 text-sm text-zinc-600">
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  <span>(555) 345-6789</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  <span>programs@youthcenter.org</span>
                </div>
                <a href="#" className="flex items-center gap-2 text-blue-600 hover:underline font-medium">
                  <Globe className="w-4 h-4" />
                  <span>Visit Website</span>
                </a>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span>789 Pine Street, Community City, ST 12345</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>Mon-Fri: 3pm-8pm, Sat: 9am-5pm</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

