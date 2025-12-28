"use client";

import { useState, useMemo, useEffect } from "react";
import { Search, Filter, MapPin, Phone, Globe, Building2, ThumbsDown } from "lucide-react";

export interface Resource {
  id: string;
  name: string;
  category: string;
  description: string;
  location: string;
  phone?: string;
  website?: string;
  type: "non-profit" | "support-service" | "community-event" | "program";
  isSupabase?: boolean;
  downvotes?: number;
}

interface ResourceDirectoryProps {
  resources: Resource[];
}

const categories = [
  "All",
  "Non-Profit",
  "Support Services",
  "Community Events",
  "Programs",
];

export default function ResourceDirectory({ resources }: ResourceDirectoryProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [localResources, setLocalResources] = useState<Resource[]>(resources);

  useEffect(() => {
    setLocalResources(resources);
  }, [resources]);

  const filteredResources = useMemo(() => {
    return localResources.filter((resource) => {
      const matchesSearch =
        resource.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        resource.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        resource.location.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory =
        selectedCategory === "All" ||
        resource.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory, resources]);

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white relative overflow-hidden">
      {/* Subtle gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-purple-50/30 via-transparent to-cyan-50/30 pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold text-black mb-6">
            Community Resource Hub
          </h2>
          <p className="text-xl text-zinc-600 max-w-2xl mx-auto leading-relaxed">
            Discover and explore resources available in your community. Search
            and filter to find exactly what you need.
          </p>
        </div>

        {/* Search and Filter Bar */}
        <div className="mb-10 space-y-6">
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 text-zinc-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search resources..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-14 pr-5 py-4 border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent text-black placeholder-zinc-400 shadow-sm hover:shadow-md transition-shadow bg-white"
            />
          </div>

          <div className="flex flex-wrap gap-3 justify-center">
            <Filter className="w-5 h-5 text-zinc-600 mt-1.5" />
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
                  selectedCategory === category
                    ? "bg-black text-white shadow-lg scale-105"
                    : "bg-zinc-100 text-zinc-700 hover:bg-zinc-200 hover:shadow-md"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-8 text-zinc-600 font-medium">
          {filteredResources.length} resource
          {filteredResources.length !== 1 ? "s" : ""} found
        </div>

        {/* Resource Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredResources.map((resource) => (
            <div
              key={resource.id}
              className="group border border-zinc-200 rounded-2xl p-6 hover:shadow-2xl transition-all duration-300 bg-white hover:-translate-y-1"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="p-2 bg-gradient-to-br from-purple-100 to-cyan-100 rounded-lg">
                  <Building2 className="w-5 h-5 text-black" />
                </div>
                <span className="text-xs font-semibold px-3 py-1 bg-zinc-100 rounded-full text-zinc-700">
                  {resource.category}
                </span>
              </div>
              <h3 className="text-xl font-bold text-black mb-3 group-hover:text-purple-600 transition-colors">
                {resource.name}
              </h3>
              <p className="text-zinc-600 text-sm mb-5 line-clamp-2 leading-relaxed">
                {resource.description}
              </p>
              <div className="space-y-2.5">
                <div className="flex items-center text-sm text-zinc-600">
                  <MapPin className="w-4 h-4 mr-2 text-purple-500" />
                  {resource.location}
                </div>
                {resource.phone && (
                  <div className="flex items-center text-sm text-zinc-600">
                    <Phone className="w-4 h-4 mr-2 text-purple-500" />
                    {resource.phone}
                  </div>
                )}
                {resource.website && (
                  <a
                    href={resource.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-sm text-black hover:text-purple-600 transition-colors font-medium"
                  >
                    <Globe className="w-4 h-4 mr-2" />
                    Visit Website
                  </a>
                )}
                {resource.isSupabase && (
                  <div className="mt-4">
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
                            setLocalResources((prev) => prev.filter((r) => r.id !== resource.id));
                          } else if (body.data) {
                            const updated = body.data as any;
                            setLocalResources((prev) => prev.map((r) => r.id === resource.id ? { ...r, downvotes: Number(updated.downvotes) || (r.downvotes || 0) } : r));
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
          ))}
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
  );
}

