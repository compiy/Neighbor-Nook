"use client";

import { useState } from "react";
import { Send, CheckCircle } from "lucide-react";
import { supabase } from "../lib/supabaseClient";

export default function ResourceForm() {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    description: "",
    location: "",
    phone: "",
    website: "",
    contactEmail: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    (async () => {
      // insert into Supabase `resources` table
      const payload = {
        name: formData.name,
        category: formData.category,
        description: formData.description,
        location: formData.location,
        phone: formData.phone || null,
        website: formData.website || null,
        contact_email: formData.contactEmail,
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
        setTimeout(() => {
          setSubmitted(false);
          setFormData({
            name: '',
            category: '',
            description: '',
            location: '',
            phone: '',
            website: '',
            contactEmail: '',
          });
        }, 3000);
      } catch (err) {
        console.error('Failed to submit resource via API:', err);
        alert('Failed to submit resource. Check console for details.');
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
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-50/40 via-transparent to-cyan-50/40"></div>
      
      <div className="max-w-2xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-5xl md:text-6xl font-bold text-black mb-6">
            Suggest a Resource
          </h2>
          <p className="text-xl text-zinc-600 leading-relaxed">
            Know of a community resource that should be added? Help us grow our
            directory by submitting it below.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white border border-zinc-200 rounded-2xl p-8 md:p-10 space-y-6 shadow-xl hover:shadow-2xl transition-shadow"
        >
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-black mb-2"
            >
              Resource Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent text-black bg-white hover:border-zinc-300 transition-colors"
              placeholder="Enter resource name"
            />
          </div>

          <div>
            <label
              htmlFor="category"
              className="block text-sm font-medium text-black mb-2"
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
              <option value="Non-Profit">Non-Profit</option>
              <option value="Support Services">Support Services</option>
              <option value="Community Events">Community Events</option>
              <option value="Programs">Programs</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-black mb-2"
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
              placeholder="Describe the resource and how it helps the community"
            />
          </div>

          <div>
            <label
              htmlFor="location"
              className="block text-sm font-medium text-black mb-2"
            >
              Location *
            </label>
            <input
              type="text"
              id="location"
              name="location"
              required
              value={formData.location}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent text-black bg-white hover:border-zinc-300 transition-colors"
              placeholder="Enter address or location"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-black mb-2"
              >
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent text-black bg-white hover:border-zinc-300 transition-colors"
                placeholder="(555) 123-4567"
              />
            </div>

            <div>
              <label
                htmlFor="website"
                className="block text-sm font-medium text-black mb-2"
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
                placeholder="https://example.com"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="contactEmail"
              className="block text-sm font-medium text-black mb-2"
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
        </form>
      </div>
    </section>
  );
}

