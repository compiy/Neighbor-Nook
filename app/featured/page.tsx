import Image from "next/image";
import Link from "next/link";
import { ShoppingBag, HeartHandshake, GraduationCap, Phone, Mail, Globe, MapPin, Clock, Star } from "lucide-react";

export default function FeaturedPage() {
  return (
    <main className="min-h-screen bg-white">
      {}

      {}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-zinc-50">
        <div className="max-w-7xl mx-auto">
          {}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 mb-4">
              <Star className="w-6 h-6 text-red-400" />
              <p className="text-sm uppercase tracking-wider text-zinc-500">
                HIGHLIGHTED RESOURCES
              </p>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-black mb-6">
              Featured Community Resources
            </h2>
            <p className="text-lg text-zinc-600 max-w-2xl mx-auto">
              Discover the most impactful resources making a difference in our community. These featured organizations provide essential services and support.
            </p>
          </div>

          {}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {}
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
                <a href="https://www.feedingamerica.org" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-blue-600 hover:underline font-medium">
                  <Globe className="w-4 h-4" />
                  <span>Visit Website</span>
                </a>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span>East Fort Bend Human Needs Ministry, 435 Stafford Run Rd, Stafford, TX 77477</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>Mon-Fri: 9am-5pm, Sat: 10am-2pm</span>
                </div>
              </div>
            </div>

            {}
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
                <a href="https://www.mealsonwheelsamerica.org" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-blue-600 hover:underline font-medium">
                  <Globe className="w-4 h-4" />
                  <span>Visit Website</span>
                </a>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span>19901 SW Freeway, Suite 104</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>Mon-Fri: 8am-6pm</span>
                </div>
              </div>
            </div>

            {}
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
                <a href="https://www.bgca.org" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-blue-600 hover:underline font-medium">
                  <Globe className="w-4 h-4" />
                  <span>Visit Website</span>
                </a>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span>Center for Teens, 15263 Southwest Fwy, Sugar Land, TX 77478</span>
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

