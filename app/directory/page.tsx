"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useMemo, useEffect, useRef } from "react";
import { supabase } from "../../lib/supabaseClient";
import { ShoppingBag, HeartHandshake, GraduationCap, Activity, TrendingUp, Building2, Phone, Mail, Globe, MapPin, Clock, Search, Filter, Plus, ThumbsDown, Star } from "lucide-react";

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

import allResources from "@/lib/resourcesData";

const categories = ["All", "Support Services", "Programs", "Healthcare", "Employment", "Housing"];

export default function DirectoryPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [resources, setResources] = useState<Resource[]>(allResources);
  const [favorites, setFavorites] = useState<string[]>([]);
  const isInitialMount = useRef(true);

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

  // Load favorites from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('nn_favorites');
      if (saved) {
        const parsed = JSON.parse(saved);
        // Get favorites from the "Saved" list specifically
        const savedFavorites = parsed.Saved || [];
        setFavorites(savedFavorites);
      }
      // Mark initial mount as complete after loading
      isInitialMount.current = false;
    } catch (e) {
      console.error('Failed to load favorites:', e);
      isInitialMount.current = false;
    }
  }, []);

  // Save favorites to localStorage only when they actually change (not on initial mount)
  useEffect(() => {
    // Skip saving on initial mount to avoid overwriting existing data
    if (isInitialMount.current) return;
    
    try {
      // Get existing favorites structure
      const existing = localStorage.getItem('nn_favorites');
      const existingFavs = existing ? JSON.parse(existing) : {};
      
      // Create updated structure preserving all existing lists
      const updatedFavs = { ...existingFavs };
      
      // Update the "Saved" list with current favorites
      updatedFavs.Saved = favorites;
      
      // Remove empty lists
      Object.keys(updatedFavs).forEach(key => {
        if (updatedFavs[key].length === 0) delete updatedFavs[key];
      });
      
      localStorage.setItem('nn_favorites', JSON.stringify(updatedFavs));
    } catch (e) {
      console.error('Failed to save favorites:', e);
    }
  }, [favorites]);

  const toggleFavorite = (resourceId: string) => {
    setFavorites(prev => {
      const exists = prev.includes(resourceId);
      if (exists) {
        return prev.filter(id => id !== resourceId);
      } else {
        return [...prev, resourceId];
      }
    });
  };

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
      {/* Header moved to shared component */}

      {/* Resource Directory Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-zinc-50">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <p className="text-sm uppercase tracking-wider text-zinc-500 mb-4">
              BUILT BY THE COMMUNITY, FOR THE COMMUNITY
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-black mb-6">
              Browse Community Resources
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
                <span>Add New Resource</span>
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
                  <div className="flex items-center justify-end mb-3">
                    <button
                      onClick={() => toggleFavorite(resource.id)}
                      className={`inline-flex items-center gap-2 p-2 rounded-full transition-colors ${
                        favorites.includes(resource.id)
                          ? 'bg-amber-100 text-amber-600'
                          : 'bg-zinc-50 hover:bg-zinc-100 text-zinc-400'
                      }`}
                      aria-pressed={favorites.includes(resource.id)}
                    >
                      <Star className="w-5 h-5" fill={favorites.includes(resource.id) ? 'currentColor' : 'none'} />
                    </button>
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
                      <a href={resource.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-blue-600 hover:underline">
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

