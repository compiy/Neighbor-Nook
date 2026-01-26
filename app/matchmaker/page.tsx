import MatchmakerQuiz from "@/components/MatchmakerQuiz";

export const metadata = {
  title: "Resource Matchmaker",
  description: "Short quiz recommends best programs/services",
};

export default function MatchmakerPage() {
  return (
    <main className="min-h-screen bg-white py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold mb-4">Resource Matchmaker</h1>
        <p className="text-zinc-600 mb-8">Answer a few quick questions and we'll recommend the best local program or service.</p>
        <MatchmakerQuiz />
      </div>
    </main>
  );
}
