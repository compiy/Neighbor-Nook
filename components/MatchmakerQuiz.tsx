"use client";

import { useState } from "react";
import allResources from "@/lib/resourcesData";

export default function MatchmakerQuiz() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const q = [
    {
      id: "need",
      text: "What do you need help with?",
      options: [
        { id: "food", label: "Food assistance" },
        { id: "housing", label: "Housing support" },
        { id: "health", label: "Healthcare" },
        { id: "jobs", label: "Job training / readiness" },
        { id: "senior", label: "Senior services" },
        { id: "youth", label: "Youth programs" },
      ],
    },
    {
      id: "who",
      text: "Who is this for?",
      options: [
        { id: "self", label: "Me / an adult" },
        { id: "family", label: "Family" },
        { id: "senior", label: "A senior" },
        { id: "youth", label: "A child / teen" },
      ],
    },
    {
      id: "urgency",
      text: "How urgent is the need?",
      options: [
        { id: "urgent", label: "Immediate" },
        { id: "soon", label: "Within a few days" },
        { id: "planning", label: "Planning / ongoing" },
      ],
    },
  ];

  const choose = (qid: string, oid: string) => {
    setAnswers((s) => ({ ...s, [qid]: oid }));
  };

  const next = () => setStep((s) => Math.min(s + 1, q.length));
  const back = () => setStep((s) => Math.max(s - 1, 0));

  const pickResource = () => {
    const need = answers["need"];
    const who = answers["who"];

    if (!need) return null;

    if (need === "food") return allResources.find((r) => r.name.toLowerCase().includes("food") || r.category === "Support Services");
    if (need === "housing") return allResources.find((r) => r.category === "Housing" || r.name.toLowerCase().includes("housing"));
    if (need === "health") return allResources.find((r) => r.category === "Healthcare" || r.name.toLowerCase().includes("clinic"));
    if (need === "jobs") return allResources.find((r) => r.category === "Employment" || r.name.toLowerCase().includes("job"));
    if (need === "senior" || who === "senior") return allResources.find((r) => r.name.toLowerCase().includes("senior"));
    if (need === "youth" || who === "youth") return allResources.find((r) => r.name.toLowerCase().includes("youth") || r.name.toLowerCase().includes("teen") || r.category === "Programs");

    return allResources[0] || null;
  };

  const result = pickResource();

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-xl p-6 border border-zinc-200 shadow-sm">
      <h2 className="text-2xl font-bold mb-4">Resource Matchmaker</h2>

      {step < q.length ? (
        <div>
          <p className="mb-4 font-medium">{q[step].text}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
            {q[step].options.map((opt) => (
              <button
                key={opt.id}
                onClick={() => choose(q[step].id, opt.id)}
                className={`text-left p-3 rounded-lg border ${answers[q[step].id] === opt.id ? "border-black bg-black text-white" : "border-zinc-200 bg-white text-black"}`}
              >
                {opt.label}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <button onClick={back} disabled={step===0} className="px-4 py-2 border rounded text-sm">Back</button>
            <button onClick={next} disabled={!answers[q[step].id]} className="px-4 py-2 bg-black text-white rounded text-sm">Next</button>
          </div>
        </div>
      ) : (
        <div>
          <p className="mb-4">Based on your answers, we recommend:</p>
          {result ? (
            <div className="p-4 border rounded-lg">
              <h3 className="text-xl font-semibold">{result.name}</h3>
              <p className="text-sm text-zinc-600 mb-2">{result.description}</p>
              <div className="text-sm text-zinc-700 space-y-1">
                <div>{result.address}</div>
                <div>{result.phone}</div>
                {result.website && (
                  <a href={result.website} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">Visit website</a>
                )}
              </div>
            </div>
          ) : (
            <p>No suitable resource found.</p>
          )}

          <div className="mt-6 flex gap-3">
            <button onClick={() => setStep(0)} className="px-4 py-2 border rounded">Try again</button>
            <a href="/directory" className="px-4 py-2 bg-black text-white rounded">Browse all resources</a>
          </div>
        </div>
      )}
    </div>
  );
}
