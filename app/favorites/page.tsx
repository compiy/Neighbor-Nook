"use client";

import { useEffect, useState } from "react";
import allResources from "@/lib/resourcesData";
import Link from "next/link";

type Lists = Record<string, string[]>;

function FavoritesView() {
  const [lists, setLists] = useState<Lists>({});

  useEffect(() => {
    try {
      const raw = localStorage.getItem('nn_favorites');
      if (raw) setLists(JSON.parse(raw));
    } catch (e) {}
  }, []);

  const remove = (listName: string, id: string) => {
    setLists((prev) => {
      const next = { ...prev };
      next[listName] = (next[listName] || []).filter(x => x !== id);
      if (next[listName].length === 0) delete next[listName];
      localStorage.setItem('nn_favorites', JSON.stringify(next));
      return next;
    });
  };

  const resolve = (id: string) => allResources.find(r => r.id === id) || null;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold mb-6">My Favorites</h1>
      {Object.keys(lists).length === 0 && (
        <p className="text-zinc-600">No favorites yet — click the star on a resource to save it.</p>
      )}

      <div className="space-y-6 mt-6">
        {Object.entries(lists).map(([listName, ids]) => (
          <div key={listName} className="border rounded-lg p-4 bg-white">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-semibold">{listName}</h2>
              <span className="text-sm text-zinc-500">{ids.length}</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {ids.map(id => {
                const r = resolve(id);
                if (!r) return null;
                return (
                  <div key={id} className="p-3 border rounded">
                    <div className="flex items-center justify-between mb-2">
                      <div className="font-medium">{r.name}</div>
                      <button onClick={() => remove(listName, id)} className="text-sm text-red-600">Remove</button>
                    </div>
                    <div className="text-sm text-zinc-600 mb-2">{r.address}</div>
                    <div className="flex gap-2">
                      <Link href="/directory" className="text-sm px-3 py-1 border rounded">View Directory</Link>
                      {r.website && (
                        <a href={r.website} target="_blank" rel="noreferrer" className="text-sm px-3 py-1 bg-black text-white rounded">Website</a>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function FavoritesPage() {
  return (
    <main className="min-h-screen bg-zinc-50">
      <FavoritesView />
    </main>
  );
}
