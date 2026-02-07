import Image from "next/image";
import Link from "next/link";
import { Compass, Sparkles, Shield, Users2, Eye, Handshake, Zap } from "lucide-react";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white">
      {}

      {}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-black mb-6">
              About NeighborNook
            </h1>
            <p className="text-xl text-zinc-600 leading-relaxed">
              Connecting communities with the resources they need to thrive.
            </p>
          </div>

          {}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <Compass className="w-8 h-8 text-indigo-600" />
              <h2 className="text-3xl font-bold text-black">Our Mission</h2>
            </div>
            <p className="text-lg text-zinc-600 leading-relaxed mb-4">
              Our platform is a diverse network whereby residents from their respective areas can find and discover nonprofits, support services, and programs that help strengthen the community.
            </p>
          </div>

          {}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <Sparkles className="w-8 h-8 text-emerald-600" />
              <h2 className="text-3xl font-bold text-black">What We Do</h2>
            </div>
            <div className="space-y-4">
              <div className="bg-zinc-50 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-black mb-2">Resource Directory</h3>
                <p className="text-zinc-600 leading-relaxed">
                  We have a very thorough community resource list, which we continue to update. It makes it extremely easy for individuals of the community to access what they need. The individuals can easily find food, health care, housing, and educational resources, whichever is needed.
                </p>
              </div>
              <div className="bg-zinc-50 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-black mb-2">Featured Highlights</h3>
                <p className="text-zinc-600 leading-relaxed">
                  We highlight organizations or programs that are making a difference in our community. This way, it's simple to see what matters the most to you.
                </p>
              </div>
              <div className="bg-zinc-50 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-black mb-2">Community-Driven</h3>
                <p className="text-zinc-600 leading-relaxed">
                  NeighborNook is built by the community, for the community. Residents are able to add new resources to our list, ensuring it continues to evolve with the needs of our community.
                </p>
              </div>
            </div>
          </div>

          {}
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
                  We believe that information about community resources should be universally accessible and available to all people regardless of background and/or circumstances.
                </p>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Users2 className="w-5 h-5 text-emerald-400" />
                  <h3 className="text-xl font-semibold text-black">Community First</h3>
                </div>
                <p className="text-zinc-600 leading-relaxed">
                  Our site is designed around the community's needs, and this is the reason we are able to serve the community well and with compassion.
                </p>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Eye className="w-5 h-5 text-violet-400" />
                  <h3 className="text-xl font-semibold text-black">Transparency</h3>
                </div>
                <p className="text-zinc-600 leading-relaxed">
                  We provide accurate and timely information so that members of society can make informed decisions based on resources they are using.
                </p>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Handshake className="w-5 h-5 text-pink-500" />
                  <h3 className="text-xl font-semibold text-black">Collaboration</h3>
                </div>
                <p className="text-zinc-600 leading-relaxed">
                  We remain committed to a stronger and better community through our partnerships with organizations in our community and its members.
                </p>
              </div>
            </div>
          </div>

          {}
          <div className="bg-zinc-50 rounded-xl p-8 text-center">
            <Users2 className="w-12 h-12 text-black mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-black mb-4">Join Us in Building a Stronger Community</h2>
            <p className="text-zinc-600 mb-6 leading-relaxed">
              Regardless of whether you are a person who needs a resource or a person who wants to help others find resources, NeighborNook is here to help.
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

