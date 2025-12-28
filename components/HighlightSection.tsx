import { Star, ArrowRight, Building2, Users, Calendar } from "lucide-react";
import { Resource } from "./ResourceDirectory";

interface HighlightSectionProps {
  featuredResources: Resource[];
}

export default function HighlightSection({
  featuredResources,
}: HighlightSectionProps) {
  const icons = [Building2, Users, Calendar];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white via-purple-50/30 to-cyan-50/30 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,_var(--tw-gradient-stops))] from-purple-200/20 via-transparent to-transparent"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-black/5 backdrop-blur-sm rounded-full">
            <Star className="w-5 h-5 text-purple-600" />
            <span className="text-sm font-semibold text-black uppercase tracking-wide">
              Featured Resources
            </span>
          </div>
          <h2 className="text-5xl md:text-6xl font-bold text-black mb-6">
            Spotlight on Community Impact
          </h2>
          <p className="text-xl text-zinc-600 max-w-2xl mx-auto leading-relaxed">
            Discover some of the most impactful resources making a difference in
            our community.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredResources.map((resource, index) => {
            const Icon = icons[index % icons.length];
            return (
              <div
                key={resource.id}
                className="group bg-white border border-zinc-200 rounded-2xl p-8 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-100/50 to-cyan-100/50 rounded-full -mr-16 -mt-16 blur-2xl"></div>
                
                <div className="relative z-10">
                  <div className="flex items-start gap-4 mb-6">
                    <div className="w-14 h-14 bg-gradient-to-br from-purple-600 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg">
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    <div className="flex-1">
                      <span className="text-xs font-semibold text-purple-600 uppercase tracking-wide">
                        {resource.category}
                      </span>
                      <h3 className="text-2xl font-bold text-black mt-1 group-hover:text-purple-600 transition-colors">
                        {resource.name}
                      </h3>
                    </div>
                  </div>
                  <p className="text-zinc-600 mb-6 leading-relaxed">{resource.description}</p>
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center text-sm text-zinc-600">
                      <span className="font-semibold mr-2 text-black">Location:</span>
                      {resource.location}
                    </div>
                    {resource.phone && (
                      <div className="flex items-center text-sm text-zinc-600">
                        <span className="font-semibold mr-2 text-black">Phone:</span>
                        {resource.phone}
                      </div>
                    )}
                  </div>
                  {resource.website && (
                    <a
                      href={resource.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-black font-semibold hover:text-purple-600 transition-colors group/link"
                    >
                      Learn More
                      <ArrowRight className="w-4 h-4 ml-2 group-hover/link:translate-x-1 transition-transform" />
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

