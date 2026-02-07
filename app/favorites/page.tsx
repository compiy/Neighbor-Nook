"use client";

import { useEffect, useState } from "react";
import allResources from "@/lib/resourcesData";
import Link from "next/link";
import { Download, Info, Upload } from "lucide-react";

type Lists = Record<string, string[]>;

function FavoritesView() {
  const [lists, setLists] = useState<Lists>({});
  const [uploadStatus, setUploadStatus] = useState<string>("");

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

  const downloadFavorites = () => {
    let content = "NeighborNook - My Favorite Resources\n";
    content += "=====================================\n\n";
    
    Object.entries(lists).forEach(([listName, ids]) => {
      content += `${listName} (${ids.length} resources)\n`;
      content += "-".repeat(listName.length + 15) + "\n\n";
      
      ids.forEach(id => {
        const resource = resolve(id);
        if (resource) {
          content += `• ${resource.name}\n`;
          content += `  Category: ${resource.category}\n`;
          content += `  Description: ${resource.description}\n`;
          content += `  Address: ${resource.address}\n`;
          content += `  Phone: ${resource.phone}\n`;
          content += `  Email: ${resource.email}\n`;
          if (resource.website) {
            content += `  Website: ${resource.website}\n`;
          }
          content += `  Hours: ${resource.hours}\n`;
          content += "\n";
        }
      });
      content += "\n";
    });
    
    content += "=====================================\n";
    content += `Generated on ${new Date().toLocaleString()}\n`;
    content += "Note: These favorites are stored locally in your browser.\n";
    
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `neighbornook-favorites-${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const uploadFavorites = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploadStatus("Processing file...");
    
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        const parsedLists = parseFavoritesFile(content);
        
        if (Object.keys(parsedLists).length > 0) {
          setLists(parsedLists);
          localStorage.setItem('nn_favorites', JSON.stringify(parsedLists));
          setUploadStatus(`Successfully imported ${Object.keys(parsedLists).length} list(s)!`);
        } else {
          setUploadStatus("No valid favorites found in file.");
        }
      } catch (error) {
        console.error('Upload error:', error);
        setUploadStatus("Error reading file. Please ensure it's a valid NeighborNook favorites file.");
      }
      
      // Clear status after 3 seconds
      setTimeout(() => setUploadStatus(""), 3000);
    };
    
    reader.onerror = () => {
      setUploadStatus("Error reading file. Please try again.");
      setTimeout(() => setUploadStatus(""), 3000);
    };
    
    reader.readAsText(file);
    
    event.target.value = '';
  };

  const parseFavoritesFile = (content: string): Lists => {
    const lines = content.split('\n');
    const parsedLists: Lists = {};
    let currentList = '';
    let currentResource: any = null;
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      
      if (!line || line.startsWith('=') || line.startsWith('-')) continue;
      
      const listMatch = line.match(/^([^(]+)\s+\(\d+\s+resources\)$/);
      if (listMatch) {
        currentList = listMatch[1].trim();
        if (!parsedLists[currentList]) {
          parsedLists[currentList] = [];
        }
        continue;
      }
      
      if (line.startsWith('•')) {
        const resourceName = line.substring(1).trim();
        
        const resource = allResources.find(r => 
          r.name.toLowerCase() === resourceName.toLowerCase()
        );
        
        if (resource) {
          currentResource = resource;
          if (currentList && !parsedLists[currentList].includes(resource.id)) {
            parsedLists[currentList].push(resource.id);
          }
        }
      }
    }
    
    return parsedLists;
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">My Favorites</h1>
        <div className="flex gap-2">
          <label className="inline-flex items-center gap-2 px-4 py-2 bg-zinc-100 text-black rounded-lg hover:bg-zinc-200 transition-colors cursor-pointer">
            <Upload className="w-4 h-4" />
            Upload TXT
            <input
              type="file"
              accept=".txt"
              onChange={uploadFavorites}
              className="hidden"
            />
          </label>
          {Object.keys(lists).length > 0 && (
            <button
              onClick={downloadFavorites}
              className="inline-flex items-center gap-2 px-4 py-2 bg-black text-white rounded-lg hover:bg-zinc-800 transition-colors"
            >
              <Download className="w-4 h-4" />
              Download as TXT
            </button>
          )}
        </div>
      </div>
      
      {uploadStatus && (
        <div className={`mb-4 p-3 rounded-lg border ${
          uploadStatus.includes('Successfully') 
            ? 'bg-green-50 border-green-200 text-green-800' 
            : 'bg-red-50 border-red-200 text-red-800'
        }`}>
          <p className="text-sm font-medium">{uploadStatus}</p>
        </div>
      )}
      
      <div className="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
        <div className="flex items-start gap-3">
          <Info className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
          <div className="text-sm text-amber-800">
            <p className="font-medium mb-1">Local Storage Only</p>
            <p>Your favorites are stored locally in your browser. They will persist between sessions but may be lost if you clear your browser data or use a different device/browser. Use the download button above to backup your favorites.</p>
          </div>
        </div>
      </div>
      
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
