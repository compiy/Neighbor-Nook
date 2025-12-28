"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useMemo, useEffect } from "react";
import { supabase } from "../../lib/supabaseClient";
import { ShoppingBag, HeartHandshake, GraduationCap, Activity, TrendingUp, Building2, Phone, Mail, Globe, MapPin, Clock, Search, Filter, Plus, ThumbsDown } from "lucide-react";

interface Resource {
  id: string;
  name: string;
  category: string;
  description: string;
  phone: string;
  email: string;
  website?: string;
  address: string;
  hours: string;
  iconName: string;
  featured?: boolean;
  isSupabase?: boolean;
  downvotes?: number;
}

const iconMap: Record<string, typeof ShoppingBag> = {
  ShoppingBag,
  HeartHandshake,
  GraduationCap,
  Activity,
  TrendingUp,
  Building2,
};

const allResources: Resource[] = [
  {
    id: "1",
    name: "Community Food Bank",
    category: "Support Services",
    description: "Providing emergency food assistance to families in need. No questions asked, just support when you need it most.",
    phone: "(555) 123-4567",
    email: "help@communityfoodbank.org",
    website: "#",
    address: "123 Main Street, Community City, ST 12345",
    hours: "Mon-Fri: 9am-5pm, Sat: 10am-2pm",
    iconName: "ShoppingBag",
    featured: true,
  },
  {
    id: "2",
    name: "Senior Care Network",
    category: "Support Services",
    description: "Comprehensive support services for seniors including transportation, meal delivery, and companionship programs.",
    phone: "(555) 234-5678",
    email: "contact@seniorcarenetwork.org",
    website: "#",
    address: "456 Oak Avenue, Community City, ST 12345",
    hours: "Mon-Fri: 8am-6pm",
    iconName: "HeartHandshake",
    featured: true,
  },
  {
    id: "3",
    name: "Youth Development Center",
    category: "Programs",
    description: "After-school programs, tutoring, sports leagues, and summer camps for children and teenagers in our community.",
    phone: "(555) 345-6789",
    email: "programs@youthcenter.org",
    website: "#",
    address: "789 Pine Street, Community City, ST 12345",
    hours: "Mon-Fri: 3pm-8pm, Sat: 9am-5pm",
    iconName: "GraduationCap",
    featured: true,
  },
  {
    id: "4",
    name: "Community Health Clinic",
    category: "Healthcare",
    description: "Affordable healthcare services including primary care, dental, and mental health support for all community members.",
    phone: "(555) 456-7890",
    email: "appointments@communityclinic.org",
    address: "321 Elm Street, Community City, ST 12345",
    hours: "Mon-Fri: 7am-7pm, Sat: 8am-4pm",
    iconName: "Activity",
  },
  {
    id: "5",
    name: "Job Training Institute",
    category: "Employment",
    description: "Free job training programs, resume workshops, and career counseling to help community members find meaningful employment.",
    phone: "(555) 567-8901",
    email: "training@jobinstitute.org",
    website: "#",
    address: "654 Maple Drive, Community City, ST 12345",
    hours: "Mon-Thu: 9am-6pm, Fri: 9am-5pm",
    iconName: "TrendingUp",
  },
  {
    id: "6",
    name: "Housing Assistance Program",
    category: "Housing",
    description: "Emergency housing assistance, rental support, and housing navigation services for individuals and families.",
    phone: "(555) 678-9012",
    email: "housing@communityassist.org",
    address: "987 Cedar Lane, Community City, ST 12345",
    hours: "Mon-Fri: 8am-5pm",
    iconName: "Building2",
  },
];

const categories = ["All", "Support Services", "Programs", "Healthcare", "Employment", "Housing"];

export default function DirectoryPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [resources, setResources] = useState<Resource[]>(allResources);

  // Load submitted resources from localStorage on mount and when storage changes
  useEffect(() => {
    let mounted = true;

    const fetchResources = async () => {
      try {
        const resp = await fetch('/api/resources');
        const body = await resp.json();
        console.log('API /api/resources GET response:', resp.status, body);
        if (!resp.ok) throw new Error(body?.error || 'API fetch failed');

        const data = body.data || [];
        if (!mounted) return;
        const submitted = (data || []).map((r: any) => ({
          id: String(r.id),
          name: r.name || '',
          category: r.category || '',
          description: r.description || '',
          phone: r.phone || '',
          email: r.contact_email || '',
          website: r.website || '',
          address: r.location || '',
          hours: '',
          iconName: 'Building2',
          featured: false,
          isSupabase: true,
          downvotes: Number(r.downvotes) || 0,
        }));

        if (submitted.length > 0) setResources([...allResources, ...submitted]);
        else setResources(allResources);
      } catch (err) {
        console.error('Failed to load resources from API:', err);
        setResources(allResources);
      }
    };

    fetchResources();

    const onResourceAdded = () => {
      fetchResources();
    };

    window.addEventListener("resource-added", onResourceAdded as EventListener);

    return () => {
      mounted = false;
      window.removeEventListener("resource-added", onResourceAdded as EventListener);
    };
  }, []);

  const filteredResources = useMemo(() => {
    return resources.filter((resource) => {
      const matchesSearch =
        resource.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        resource.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        resource.address.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory =
        selectedCategory === "All" || resource.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory, resources]);

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

      {/* Resource Directory Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-zinc-50">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <p className="text-sm uppercase tracking-wider text-zinc-500 mb-4 galak-pro">
              BUILT BY THE COMMUNITY, FOR THE COMMUNITY
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-black mb-6 galak-pro">
              Explore our comprehensive directory of community resources and services
            </h2>
          </div>

          {/* Search and Filter Section */}
          <div className="mb-12 space-y-6">
            {/* Search Bar */}
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 text-zinc-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search resources..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-14 pr-5 py-4 border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent text-black placeholder-zinc-400 bg-white shadow-sm hover:shadow-md transition-shadow"
              />
            </div>

            {/* Filter Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Filter className="w-5 h-5 text-zinc-600" />
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    selectedCategory === category
                      ? "bg-black text-white shadow-md"
                      : "bg-white text-zinc-700 hover:bg-zinc-50 border border-zinc-200"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Add Resource Button */}
            <div className="flex justify-center">
              <Link
                href="/submit"
                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-100 text-black rounded-lg font-medium hover:bg-blue-200 transition-colors"
              >
                <Plus className="w-5 h-5" />
                <span className="galak-pro">Add New Resource</span>
              </Link>
            </div>

            {/* Results Count */}
            <div className="text-center text-zinc-600">
              {filteredResources.length} resource{filteredResources.length !== 1 ? "s" : ""} found
            </div>
          </div>

          {/* Resource Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredResources.map((resource) => {
              const IconComponent = iconMap[resource.iconName] || ShoppingBag;
              return (
                <div key={resource.id} className="bg-white rounded-xl p-6 border border-zinc-200">
                  <div className="flex items-start justify-between mb-4">
                    <IconComponent className="w-8 h-8 text-black" />
                    <div className="flex gap-2">
                      {resource.featured && (
                        <span className="px-2 py-1 bg-red-200 text-red-800 text-xs font-semibold rounded">Featured</span>
                      )}
                      <span className="px-2 py-1 bg-zinc-100 text-zinc-700 text-xs font-medium rounded">{resource.category}</span>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-zinc-800 mb-3">{resource.name}</h3>
                  <p className="text-zinc-600 mb-4 leading-relaxed">{resource.description}</p>
                  <div className="space-y-2 text-sm text-zinc-600">
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4" />
                      <span>{resource.phone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      <span>{resource.email}</span>
                    </div>
                    {resource.website && (
                      <a href={resource.website} className="flex items-center gap-2 text-blue-600 hover:underline">
                        <Globe className="w-4 h-4" />
                        <span>Visit Website</span>
                      </a>
                    )}
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      <span>{resource.address}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <span>{resource.hours}</span>
                    </div>
                    {resource.isSupabase && (
                      <div className="flex items-center gap-2 mt-3">
                        <button
                          onClick={async () => {
                            try {
                              const resp = await fetch('/api/resources', {
                                method: 'PATCH',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({ id: resource.id }),
                              });
                              const body = await resp.json();
                              if (!resp.ok) throw new Error(body?.error || 'Downvote failed');

                              if (body.deleted) {
                                setResources((prev) => prev.filter((p) => p.id !== resource.id));
                              } else if (body.data) {
                                const updated = body.data as any;
                                setResources((prev) => prev.map((p) => p.id === resource.id ? { ...p, downvotes: Number(updated.downvotes) || (p.downvotes || 0) } : p));
                              }
                            } catch (err) {
                              console.error('Downvote error', err);
                              alert('Failed to downvote.');
                            }
                          }}
                          className="inline-flex items-center gap-2 px-3 py-2 bg-zinc-100 hover:bg-zinc-200 rounded-full text-sm font-medium"
                        >
                          <ThumbsDown className="w-4 h-4" />
                          <span>{resource.downvotes ?? 0}</span>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {filteredResources.length === 0 && (
            <div className="text-center py-16">
              <p className="text-zinc-600 text-lg">
                No resources found. Try adjusting your search or filters.
              </p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

