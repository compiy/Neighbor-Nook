"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Send, CheckCircle, ArrowLeft } from "lucide-react";
import { supabase } from "../../lib/supabaseClient";

export default function SubmitPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    organizationName: "",
    category: "",
    description: "",
    email: "",
    phone: "",
    website: "",
    address: "",
    hours: "",
    contactName: "",
    contactEmail: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    (async () => {
      const payload = {
        name: formData.organizationName,
        category: formData.category,
        description: formData.description,
        location: formData.address,
        phone: formData.phone || null,
        website: formData.website || null,
        contact_email: formData.contactEmail || formData.email || null,
      };

      try {
        const resp = await fetch('/api/resources', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        const body = await resp.json();
        console.log('API /api/resources POST response:', resp.status, body);

        if (!resp.ok) throw new Error(body?.error || 'API insert failed');

        try { window.dispatchEvent(new CustomEvent('resource-added', { detail: body.data })); } catch (_) {}

        setSubmitted(true);

        // save locally for compatibility
        const newResource = {
          id: Date.now().toString(),
          name: formData.organizationName,
          category: formData.category,
          description: formData.description,
          phone: formData.phone,
          email: formData.email,
          website: formData.website || undefined,
          address: formData.address,
          hours: formData.hours,
          iconName: 'ShoppingBag',
          featured: false,
        };
        const existingResources = typeof window !== 'undefined'
          ? JSON.parse(localStorage.getItem('submittedResources') || '[]')
          : [];
        const updatedResources = [...existingResources, newResource];
        if (typeof window !== 'undefined') localStorage.setItem('submittedResources', JSON.stringify(updatedResources));

        setTimeout(() => router.push('/directory'), 1200);
      } catch (err) {
        console.error('Failed to submit resource via API:', err);
        // fallback: save to localStorage
        const newResource = {
          id: Date.now().toString(),
          name: formData.organizationName,
          category: formData.category,
          description: formData.description,
          phone: formData.phone,
          email: formData.email,
          website: formData.website || undefined,
          address: formData.address,
          hours: formData.hours,
          iconName: 'ShoppingBag',
          featured: false,
        };
        const existingResources = typeof window !== 'undefined'
          ? JSON.parse(localStorage.getItem('submittedResources') || '[]')
          : [];
        const updatedResources = [...existingResources, newResource];
        if (typeof window !== 'undefined') localStorage.setItem('submittedResources', JSON.stringify(updatedResources));
        setSubmitted(true);
        setTimeout(() => router.push('/directory'), 1200);
      }
    })();
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

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

      {/* Submit Form Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-zinc-50">
        <div className="max-w-3xl mx-auto">
          {/* Back Button */}
          <Link
            href="/directory"
            className="inline-flex items-center gap-2 text-zinc-600 hover:text-black transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Directory</span>
          </Link>

          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-black mb-6 galak-pro">
              Add New Resource
            </h1>
            <p className="text-lg text-zinc-600 leading-relaxed">
              Help us grow our community directory by submitting a new resource. All submissions will be reviewed before being added to the directory.
            </p>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="bg-white border border-zinc-200 rounded-2xl p-8 md:p-10 space-y-6 shadow-lg"
          >
            {/* Organization Name */}
            <div>
              <label
                htmlFor="organizationName"
                className="block text-sm font-semibold text-black mb-2"
              >
                Organization Name *
              </label>
              <input
                type="text"
                id="organizationName"
                name="organizationName"
                required
                value={formData.organizationName}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent text-black bg-white hover:border-zinc-300 transition-colors"
                placeholder="Enter organization name"
              />
            </div>

            {/* Category */}
            <div>
              <label
                htmlFor="category"
                className="block text-sm font-semibold text-black mb-2"
              >
                Category *
              </label>
              <select
                id="category"
                name="category"
                required
                value={formData.category}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent text-black bg-white hover:border-zinc-300 transition-colors"
              >
                <option value="">Select a category</option>
                <option value="Support Services">Support Services</option>
                <option value="Programs">Programs</option>
                <option value="Healthcare">Healthcare</option>
                <option value="Employment">Employment</option>
                <option value="Housing">Housing</option>
                <option value="Non-Profit">Non-Profit</option>
                <option value="Community Events">Community Events</option>
              </select>
            </div>

            {/* Description */}
            <div>
              <label
                htmlFor="description"
                className="block text-sm font-semibold text-black mb-2"
              >
                Description *
              </label>
              <textarea
                id="description"
                name="description"
                required
                value={formData.description}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-3 border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent text-black resize-none bg-white hover:border-zinc-300 transition-colors"
                placeholder="Describe the organization and the services it provides"
              />
            </div>

            {/* Contact Information Section */}
            <div className="border-t border-zinc-200 pt-6">
              <h3 className="text-lg font-semibold text-black mb-4">Contact Information</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Phone */}
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-semibold text-black mb-2"
                  >
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent text-black bg-white hover:border-zinc-300 transition-colors"
                    placeholder="(555) 123-4567"
                  />
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-semibold text-black mb-2"
                  >
                    Organization Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent text-black bg-white hover:border-zinc-300 transition-colors"
                    placeholder="contact@organization.org"
                  />
                </div>
              </div>

              {/* Website */}
              <div className="mt-6">
                <label
                  htmlFor="website"
                  className="block text-sm font-semibold text-black mb-2"
                >
                  Website
                </label>
                <input
                  type="url"
                  id="website"
                  name="website"
                  value={formData.website}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent text-black bg-white hover:border-zinc-300 transition-colors"
                  placeholder="https://www.organization.org"
                />
              </div>
            </div>

            {/* Location Information Section */}
            <div className="border-t border-zinc-200 pt-6">
              <h3 className="text-lg font-semibold text-black mb-4">Location Information</h3>
              
              {/* Address */}
              <div className="mb-6">
                <label
                  htmlFor="address"
                  className="block text-sm font-semibold text-black mb-2"
                >
                  Address *
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  required
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent text-black bg-white hover:border-zinc-300 transition-colors"
                  placeholder="123 Main Street, City, State ZIP"
                />
              </div>

              {/* Hours */}
              <div>
                <label
                  htmlFor="hours"
                  className="block text-sm font-semibold text-black mb-2"
                >
                  Operating Hours *
                </label>
                <input
                  type="text"
                  id="hours"
                  name="hours"
                  required
                  value={formData.hours}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent text-black bg-white hover:border-zinc-300 transition-colors"
                  placeholder="Mon-Fri: 9am-5pm, Sat: 10am-2pm"
                />
              </div>
            </div>

            {/* Your Contact Information Section */}
            <div className="border-t border-zinc-200 pt-6">
              <h3 className="text-lg font-semibold text-black mb-4">Your Contact Information</h3>
              <p className="text-sm text-zinc-600 mb-4">
                We may need to contact you for additional information about this resource.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Contact Name */}
                <div>
                  <label
                    htmlFor="contactName"
                    className="block text-sm font-semibold text-black mb-2"
                  >
                    Your Name *
                  </label>
                  <input
                    type="text"
                    id="contactName"
                    name="contactName"
                    required
                    value={formData.contactName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent text-black bg-white hover:border-zinc-300 transition-colors"
                    placeholder="John Doe"
                  />
                </div>

                {/* Contact Email */}
                <div>
                  <label
                    htmlFor="contactEmail"
                    className="block text-sm font-semibold text-black mb-2"
                  >
                    Your Email *
                  </label>
                  <input
                    type="email"
                    id="contactEmail"
                    name="contactEmail"
                    required
                    value={formData.contactEmail}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent text-black bg-white hover:border-zinc-300 transition-colors"
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-6">
              <button
                type="submit"
                disabled={submitted}
                className="w-full bg-black text-white py-4 px-6 rounded-full font-semibold hover:bg-zinc-900 transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
              >
                {submitted ? (
                  <>
                    <CheckCircle className="w-5 h-5" />
                    Submitted Successfully!
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Submit Resource
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}

