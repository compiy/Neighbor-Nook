"use client";

import { Download } from "lucide-react";

export default function ReferencesPage() {
  const downloadCopyrightChecklist = () => {
    const link = document.createElement('a');
    link.href = '/Copyright%20Checklist.pdf';
    link.download = 'Copyright Checklist.pdf';
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const downloadWorkLogs = () => {
    const workLogs = [
      { path: '/Work%20log%201.pdf', name: 'Work log 1.pdf' },
      { path: '/Work%20log%202.pdf', name: 'Work log 2.pdf' }
    ];

    workLogs.forEach((log, index) => {
      setTimeout(() => {
        const link = document.createElement('a');
        link.href = log.path;
        link.download = log.name;
        link.target = '_blank';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }, index * 500);
    });
  };

  const downloadWorksCited = () => {
    const link = document.createElement('a');
    link.href = '/Works%20Cited.pdf';
    link.download = 'Works Cited.pdf';
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  return (
    <main className="min-h-screen bg-white">
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-zinc-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-black mb-6">
              References Page
            </h1>
            <p className="text-lg text-zinc-600 max-w-2xl mx-auto">
              Attribution and licensing information for resources, fonts, and third-party content used in NeighborNook.
            </p>
          </div>

          <div className="mb-16">
            <h2 className="text-2xl font-bold text-black mb-6 pb-3 border-b border-zinc-200">
              Project Documentation
            </h2>
            <div className="bg-white rounded-lg p-6 border border-zinc-200">
              <p className="text-zinc-600 mb-6">
                Download project documentation including copyright compliance checklists and work logs.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={downloadCopyrightChecklist}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-black text-white rounded-lg hover:bg-zinc-800 transition-colors"
                >
                  <Download className="w-4 h-4" />
                  Download Copyright Checklist
                </button>
                <button
                  onClick={downloadWorkLogs}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-zinc-100 text-black rounded-lg hover:bg-zinc-200 transition-colors"
                >
                  <Download className="w-4 h-4" />
                  Download Work Logs (Both)
                </button>
                <button
                  onClick={downloadWorksCited}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-zinc-100 text-black rounded-lg hover:bg-zinc-200 transition-colors"
                >
                  <Download className="w-4 h-4" />
                  Download Works Cited
                </button>
              </div>
            </div>
          </div>

          {}
          <div className="text-center text-zinc-500 text-sm mt-16">
            <p>Last updated: {new Date().toLocaleDateString()}</p>
            <p className="mt-2">For questions about citations or licensing, please contact the NeighborNook team.</p>
          </div>
        </div>
      </section>
    </main>
  );
}
