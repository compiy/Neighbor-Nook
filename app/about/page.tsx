import Image from "next/image";
import Link from "next/link";
import { Compass, Sparkles, Shield, Users2, Eye, Handshake, Zap } from "lucide-react";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Header moved to shared component */}

      {/* About Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-black mb-6">
              About NeighborNook
            </h1>
            <p className="text-xl text-zinc-600 leading-relaxed">
              Connecting communities with the resources they need to thrive.
            </p>
          </div>

          {/* Mission Section */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <Compass className="w-8 h-8 text-indigo-600" />
              <h2 className="text-3xl font-bold text-black">Our Mission</h2>
            </div>
            <p className="text-lg text-zinc-600 leading-relaxed mb-4">
              NeighborNook was created to bridge the gap between community members and the valuable resources available in their neighborhoods. We believe that everyone deserves access to support services, programs, and opportunities that can help them and their families thrive.
            </p>
            <p className="text-lg text-zinc-600 leading-relaxed">
              Our platform serves as a comprehensive hub where residents can discover local nonprofits, support services, community events, and programs that strengthen our community bonds and improve quality of life.
            </p>
          </div>

          {/* What We Do Section */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <Sparkles className="w-8 h-8 text-emerald-600" />
              <h2 className="text-3xl font-bold text-black">What We Do</h2>
            </div>
            <div className="space-y-4">
              <div className="bg-zinc-50 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-black mb-2">Resource Directory</h3>
                <p className="text-zinc-600 leading-relaxed">
                  We maintain an up-to-date directory of community resources, making it easy for residents to find exactly what they need—whether it's food assistance, healthcare, housing support, or educational programs.
                </p>
              </div>
              <div className="bg-zinc-50 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-black mb-2">Featured Highlights</h3>
                <p className="text-zinc-600 leading-relaxed">
                  We spotlight organizations and programs that are making a significant impact in our community, helping residents discover the most valuable resources available.
                </p>
              </div>
              <div className="bg-zinc-50 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-black mb-2">Community-Driven</h3>
                <p className="text-zinc-600 leading-relaxed">
                  NeighborNook is built by the community, for the community. Residents can submit new resources, ensuring our directory grows and stays current with the needs of our neighborhood.
                </p>
              </div>
            </div>
          </div>

          {/* Values Section */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <Shield className="w-8 h-8 text-amber-500" />
              <h2 className="text-3xl font-bold text-black">Our Values</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Zap className="w-5 h-5 text-amber-400" />
                  <h3 className="text-xl font-semibold text-black">Accessibility</h3>
                </div>
                <p className="text-zinc-600 leading-relaxed">
                  We believe information about community resources should be easily accessible to everyone, regardless of background or circumstances.
                </p>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Users2 className="w-5 h-5 text-emerald-400" />
                  <h3 className="text-xl font-semibold text-black">Community First</h3>
                </div>
                <p className="text-zinc-600 leading-relaxed">
                  Our platform is designed with the community's needs at the center, ensuring we serve residents effectively and compassionately.
                </p>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Eye className="w-5 h-5 text-violet-400" />
                  <h3 className="text-xl font-semibold text-black">Transparency</h3>
                </div>
                <p className="text-zinc-600 leading-relaxed">
                  We provide clear, accurate information about resources so community members can make informed decisions about the services they use.
                </p>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Handshake className="w-5 h-5 text-pink-500" />
                  <h3 className="text-xl font-semibold text-black">Collaboration</h3>
                </div>
                <p className="text-zinc-600 leading-relaxed">
                  We work together with local organizations and residents to build a stronger, more connected community.
                </p>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="bg-zinc-50 rounded-xl p-8 text-center">
            <Users2 className="w-12 h-12 text-black mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-black mb-4">Join Us in Building a Stronger Community</h2>
            <p className="text-zinc-600 mb-6 leading-relaxed">
              Whether you're looking for resources or want to help others find them, NeighborNook is here to support you. Explore our directory, submit a resource, or reach out to learn more about how we can work together.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/directory"
                className="px-6 py-3 bg-black text-white rounded-lg font-medium hover:bg-zinc-800 transition-colors"
              >
                Explore Directory
              </Link>
              <Link
                href="/featured"
                className="px-6 py-3 border border-zinc-300 text-black rounded-lg font-medium hover:bg-zinc-50 transition-colors"
              >
                View Featured Resources
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

