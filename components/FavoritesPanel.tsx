"use client";

import React, { useState } from 'react';
import { X, Trash2 } from 'lucide-react';

import type { Resource } from './ResourceDirectory';

interface Props {
  open: boolean;
  onClose: () => void;
  lists: Record<string, string[]>;
  resources: Resource[];
  onRemove: (listName: string, id: string) => void;
  onCreateList: (name: string) => void;
  onMove: (from: string, to: string, id: string) => void;
}

export default function FavoritesPanel({ open, onClose, lists, resources, onRemove, onCreateList, onMove }: Props) {
  const [newListName, setNewListName] = useState('');

  if (!open) return null;

  const resolve = (id: string) => resources.find(r => r.id === id) || null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-end p-6 pointer-events-none">
      <div className="pointer-events-auto w-96 max-w-full bg-white shadow-2xl rounded-lg p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Favorites</h3>
          <button onClick={onClose} className="p-2 rounded-md hover:bg-zinc-100">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4 max-h-[60vh] overflow-auto">
          {Object.keys(lists).length === 0 && (
            <div className="text-sm text-zinc-600">No favorites yet. Save resources to access them here.</div>
          )}

          {Object.entries(lists).map(([listName, ids]) => (
            <div key={listName} className="border rounded-md p-3">
              <div className="flex items-center justify-between mb-2">
                <strong>{listName}</strong>
                <span className="text-sm text-zinc-500">{ids.length}</span>
              </div>
              <div className="space-y-2">
                {ids.map(id => {
                  const res = resolve(id);
                  if (!res) return null;
                  return (
                    <div key={id} className="flex items-center justify-between">
                      <div className="text-sm">
                        <div className="font-medium">{res.name}</div>
                        <div className="text-zinc-500 text-xs">{res.location}</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <select
                          value={listName}
                          onChange={(e) => onMove(listName, e.target.value, id)}
                          className="text-sm border rounded px-2 py-1"
                        >
                          {Object.keys(lists).map(l => (
                            <option key={l} value={l}>{l}</option>
                          ))}
                        </select>
                        <button onClick={() => onRemove(listName, id)} className="p-1 rounded hover:bg-zinc-100">
                          <Trash2 className="w-4 h-4 text-zinc-600" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4">
          <label className="text-sm font-medium">Create list</label>
          <div className="flex gap-2 mt-2">
            <input value={newListName} onChange={e => setNewListName(e.target.value)} placeholder="List name" className="flex-1 px-3 py-2 border rounded" />
            <button onClick={() => { if (newListName.trim()) { onCreateList(newListName.trim()); setNewListName(''); } }} className="px-3 py-2 bg-black text-white rounded">Add</button>
          </div>
        </div>
      </div>
    </div>
  );
}
