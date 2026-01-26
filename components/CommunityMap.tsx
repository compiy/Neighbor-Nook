"use client";

import 'leaflet/dist/leaflet.css';
import * as L from "leaflet";
import { LatLngExpression, Map as LeafletMap } from "leaflet";
import { useEffect, useRef, useState } from "react";
import allResources from "@/lib/resourcesData";

export default function CommunityMap() {
  const [mounted, setMounted] = useState(false);
  const containerId = "community-map-root";
  const [mapKey, setMapKey] = useState<string>(containerId);
  const mapRef = useRef<LeafletMap | null>(null);
  const [showMap, setShowMap] = useState(false);

  useEffect(() => {
    setMounted(true);
    // use a stable container id so leftover DOM can be found and removed
    setMapKey(containerId);
    try {
      const prev = document.getElementById(containerId);
      if (prev && prev.parentNode) prev.parentNode.removeChild(prev);
    } catch (e) {}

    const t = setTimeout(() => setShowMap(true), 50);

    const onResourceAdded = () => {
      // quick remount to refresh markers
      setShowMap(false);
      setTimeout(() => setShowMap(true), 100);
    };
    window.addEventListener('resource-added', onResourceAdded as EventListener);

    return () => {
      clearTimeout(t);
      setShowMap(false);
      if (mapRef.current) {
        try {
          mapRef.current.remove();
        } catch (e) {}
        mapRef.current = null;
      }
      try {
        const prev = document.getElementById(containerId);
        if (prev && prev.parentNode) prev.parentNode.removeChild(prev);
      } catch (e) {}
      window.removeEventListener('resource-added', onResourceAdded as EventListener);
    };
  }, []);

  // Center map around Sugar Land / Houston area
  const center: LatLngExpression = [29.6300, -95.5450];

  // combine built-in resources and submitted resources from API (geocode addresses)
  const resourcesFromBuiltIn = allResources.map((r) => ({
    id: r.id,
    name: r.name,
    address: r.address,
    lat: r.lat,
    lng: r.lng,
    source: "builtin",
  }));

  const [fetchedResources, setFetchedResources] = useState<Array<any>>([]);

  // geocoding cache (localStorage)
  // bump cache key to force fresh geocoding after address updates
  const geocodeCacheKey = "geocodeCache:v2";

  const loadGeocodeCache = () => {
    try {
      const raw = localStorage.getItem(geocodeCacheKey);
      return raw ? JSON.parse(raw) : {};
    } catch (e) {
      return {};
    }
  };

  const saveGeocodeCache = (cache: Record<string, [number, number]>) => {
    try {
      localStorage.setItem(geocodeCacheKey, JSON.stringify(cache));
    } catch (e) {}
  };

  const geocode = async (address: string) => {
    if (!address) return null;
    const cache = loadGeocodeCache();
    if (cache[address]) return cache[address];

    try {
      const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`;
      const resp = await fetch(url, { headers: { "Accept-Language": "en" } });
      const body = await resp.json();
      if (Array.isArray(body) && body.length > 0) {
        const lat = Number(body[0].lat);
        const lon = Number(body[0].lon);
        cache[address] = [lat, lon];
        saveGeocodeCache(cache);
        return cache[address];
      }
    } catch (e) {
      console.error("Geocode error", e);
    }
    return null;
  };

  useEffect(() => {
    if (!showMap) return;

    // ensure no leftover container
    const container = document.getElementById(containerId);
    if (!container) return;

    const initMap = async () => {
      if (mapRef.current) return;
      const map = L.map(containerId as string, { center, zoom: 13 });
      mapRef.current = map as LeafletMap;

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      const layers: L.Layer[] = [];

      // prepare icon styles
      const builtinIcon = L.divIcon({ className: "builtin-marker", html: '<div class="w-5 h-5 rounded-full bg-green-600 border-2 border-white"></div>', iconSize: [20, 20] });
      const submittedIcon = L.divIcon({ className: "submitted-marker", html: '<div class="w-5 h-5 rounded-full bg-blue-600 border-2 border-white"></div>', iconSize: [20, 20] });

      // build combined resources list
      const apiResp = await fetch('/api/resources');
      let apiData: any[] = [];
      try {
        const apiBody = await apiResp.json();
        apiData = apiBody.data || [];
      } catch (e) {
        apiData = [];
      }

      const submitted = (apiData || []).map((r: any) => ({
        id: String(r.id),
        name: r.name || r.title || 'Submitted Resource',
        address: r.location || r.location_text || r.address || '',
        lat: r.lat,
        lng: r.lng,
        source: 'submitted',
      }));

      const combined = [...resourcesFromBuiltIn, ...submitted];

      // geocode addresses that need it
      const coordsMap: Record<string, [number, number]> = loadGeocodeCache();

      await Promise.all(
        combined.map(async (res) => {
          // if lat/lng provided use that, otherwise geocode by address
          if (res.lat && res.lng) {
            coordsMap[res.address] = [res.lat, res.lng];
            return;
          }
          if (!res.address) return;
          if (coordsMap[res.address]) return;
          const g = await geocode(res.address);
          if (g) coordsMap[res.address] = g;
          // be gentle on Nominatim
          await new Promise((r) => setTimeout(r, 200));
        })
      );

      saveGeocodeCache(coordsMap);

      const markerCoords: [number, number][] = [];

      combined.forEach((res) => {
        const coord = coordsMap[res.address];
        if (!coord) return;
        const marker = L.marker(coord as [number, number], { icon: res.source === 'submitted' ? submittedIcon : builtinIcon }).addTo(map);
        marker.bindPopup(`<strong>${res.name}</strong><div>${res.address}</div>`);
        layers.push(marker);
        markerCoords.push(coord as [number, number]);
      });

      // fit map to markers if any
      if (markerCoords.length > 0) {
        const bounds = L.latLngBounds(markerCoords as any);
        map.fitBounds((bounds as any).pad(0.1), { padding: [40, 40] });
      }

      (mapRef as any).layers = layers;
      setFetchedResources(combined);
    };

    initMap();

    return () => {
      if (mapRef.current) {
        try {
          // remove added layers
          const layers: L.Layer[] = (mapRef as any).layers || [];
          layers.forEach((ly) => {
            try {
              mapRef.current?.removeLayer(ly);
            } catch (e) {}
          });
          mapRef.current.remove();
        } catch (e) {}
        mapRef.current = null;
      }
    };
  }, [showMap]);

  return (
    <div className="w-full h-[75vh] rounded-md overflow-hidden shadow-lg relative">
      {!mounted || !showMap ? (
        <div className="w-full h-full bg-zinc-100" />
      ) : (
        <div id={containerId} style={{ height: "100%", width: "100%" }} />
      )}
    </div>
  );
}
