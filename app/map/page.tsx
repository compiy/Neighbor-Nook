import MapClientWrapper from "../../components/MapClientWrapper";

export const metadata = {
  title: "Directory Map",
  description: "Locations of all Directories",
};

export default function MapPage() {
  return (
    <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold mb-4">Directory Map</h1>
      <p className="text-zinc-600 mb-6">Locations Of All Directories</p>
      <MapClientWrapper />
    </main>
  );
}
