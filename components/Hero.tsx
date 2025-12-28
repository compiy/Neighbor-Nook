import { ArrowDown, Heart } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500 via-pink-500 via-orange-400 to-cyan-400 opacity-90"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_var(--tw-gradient-stops))] from-purple-600/50 via-transparent to-transparent"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,_var(--tw-gradient-stops))] from-transparent via-transparent to-cyan-500/50"></div>
      
      <div className="relative z-10 max-w-6xl mx-auto w-full">
        <div className="max-w-3xl">
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-black/20 backdrop-blur-sm rounded-full mb-6 border border-white/20">
              <Heart className="w-4 h-4 text-white" />
              <span className="text-sm font-medium text-white">
                Community Resource Hub
              </span>
            </div>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Community resources to
            <br />
            <span className="bg-gradient-to-r from-white via-cyan-200 to-blue-300 bg-clip-text text-transparent">
              strengthen your neighborhood
            </span>
          </h1>
          <p className="text-xl text-white/90 mb-10 max-w-2xl leading-relaxed">
            Join thousands of residents who use NeighborNook to discover local
            resources, connect with support services, find community programs,
            and build a stronger, more connected neighborhood.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <a
              href="#resources"
              className="inline-flex items-center justify-center px-8 py-4 bg-black text-white rounded-full font-medium hover:bg-zinc-900 transition-all hover:scale-105 shadow-xl"
            >
              Explore Resources
              <ArrowDown className="w-4 h-4 ml-2" />
            </a>
            <a
              href="#submit"
              className="inline-flex items-center justify-center px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-full font-medium hover:bg-white/20 transition-all border border-white/20"
            >
              Submit a Resource
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

