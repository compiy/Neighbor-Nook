"use client";

import { Download } from "lucide-react";

export default function ReferencesPage() {
  const downloadCopyrightChecklist = () => {
    // Download the actual PDF file
    const link = document.createElement('a');
    link.href = '/Copyright%20Checklist.pdf';
    link.download = 'Copyright Checklist.pdf';
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const downloadWorkLogs = () => {
    // Download both work log PDFs
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
      }, index * 500); // Small delay between downloads
    });
  };

  const downloadWorksCited = () => {
    // Download the Works Cited PDF
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
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-black mb-6">
              References Page
            </h1>
            <p className="text-lg text-zinc-600 max-w-2xl mx-auto">
              Attribution and licensing information for resources, fonts, and third-party content used in NeighborNook.
            </p>
          </div>

          {/* Font License Section */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-black mb-6 pb-3 border-b border-zinc-200">
              Font License
            </h2>
            <div className="bg-white rounded-lg p-6 border border-zinc-200">
              <h3 className="text-lg font-semibold mb-4">Vilani Font</h3>
              <div className="space-y-4 text-zinc-600">
                <p>
                  <strong>Designer:</strong> Joe Prince
                </p>
                <p>
                  <strong>License:</strong> SIL Open Font License (OFL) 1.1
                </p>
                <p>
                  <strong>Source:</strong> <a href="https://www.myfonts.com/collections/vilane-font-din-studio/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">MyFonts - Vilani</a>
                </p>
                <div className="mt-6 p-4 bg-zinc-50 rounded-lg">
                  <p className="text-sm font-medium mb-2">License Summary:</p>
                  <p className="text-sm leading-relaxed">
                    This Font Software is licensed under the SIL Open Font License, Version 1.1. This license is available with a FAQ at: <a href="https://scripts.sil.org/OFL" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">https://scripts.sil.org/OFL</a>
                  </p>
                  <p className="text-sm mt-3">
                    The OFL allows the licensed fonts to be used, studied, modified and redistributed freely as long as they are not sold by themselves. The fonts, including any derivative works, can be bundled, embedded, redistributed and/or sold with any software provided that any reserved names are not used by derivative works.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Resources Citations Section */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-black mb-6 pb-3 border-b border-zinc-200">
              Resource Citations
            </h2>
            <div className="space-y-6">
              
              {/* Community Food Bank */}
              <div className="bg-white rounded-lg p-6 border border-zinc-200">
                <h3 className="text-lg font-semibold mb-3">Community Food Bank</h3>
                <div className="space-y-2 text-zinc-600">
                  <p><strong>Organization:</strong> East Fort Bend Human Needs Ministry</p>
                  <p><strong>Website:</strong> <a href="https://www.feedingamerica.org" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">https://www.feedingamerica.org</a></p>
                  <p><strong>Address:</strong> 435 Stafford Run Rd, Stafford, TX 77477</p>
                  <p className="text-sm italic mt-3">Emergency food assistance services for families in need.</p>
                </div>
              </div>

              {/* Senior Care Network */}
              <div className="bg-white rounded-lg p-6 border border-zinc-200">
                <h3 className="text-lg font-semibold mb-3">Senior Care Network</h3>
                <div className="space-y-2 text-zinc-600">
                  <p><strong>Organization:</strong> Senior Support Services</p>
                  <p><strong>Website:</strong> <a href="https://www.mealsonwheelsamerica.org" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">https://www.mealsonwheelsamerica.org</a></p>
                  <p><strong>Address:</strong> 19901 SW Freeway, Suite 104</p>
                  <p className="text-sm italic mt-3">Comprehensive support services for seniors including transportation and meal delivery.</p>
                </div>
              </div>

              {/* Youth Development Center */}
              <div className="bg-white rounded-lg p-6 border border-zinc-200">
                <h3 className="text-lg font-semibold mb-3">Youth Development Center</h3>
                <div className="space-y-2 text-zinc-600">
                  <p><strong>Organization:</strong> Boys & Girls Clubs of America</p>
                  <p><strong>Website:</strong> <a href="https://www.bgca.org" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">https://www.bgca.org</a></p>
                  <p><strong>Address:</strong> Center for Teens, 15263 Southwest Fwy, Sugar Land, TX 77478</p>
                  <p className="text-sm italic mt-3">After-school programs, tutoring, sports leagues, and summer camps for youth.</p>
                </div>
              </div>

              {/* Additional Resources */}
              <div className="bg-white rounded-lg p-6 border border-zinc-200">
                <h3 className="text-lg font-semibold mb-3">Additional Community Resources</h3>
                <div className="space-y-4 text-zinc-600">
                  <div className="border-l-4 border-zinc-300 pl-4">
                    <p><strong>Feeding America:</strong> <a href="https://www.feedingamerica.org" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">https://www.feedingamerica.org</a></p>
                    <p className="text-sm">Nationwide network of food banks fighting hunger.</p>
                  </div>
                  <div className="border-l-4 border-zinc-300 pl-4">
                    <p><strong>Meals on Wheels America:</strong> <a href="https://www.mealsonwheelsamerica.org" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">https://www.mealsonwheelsamerica.org</a></p>
                    <p className="text-sm">Senior nutrition and social connection services.</p>
                  </div>
                  <div className="border-l-4 border-zinc-300 pl-4">
                    <p><strong>Boys & Girls Clubs of America:</strong> <a href="https://www.bgca.org" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">https://www.bgca.org</a></p>
                    <p className="text-sm">Youth development programs across the United States.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Third-Party Libraries */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-black mb-6 pb-3 border-b border-zinc-200">
              Third-Party Libraries & Resources
            </h2>
            <div className="bg-white rounded-lg p-6 border border-zinc-200">
              <div className="space-y-4 text-zinc-600">
                <div className="border-l-4 border-zinc-300 pl-4">
                  <p><strong>Lucide React Icons:</strong> <a href="https://lucide.dev" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">https://lucide.dev</a></p>
                  <p className="text-sm">Beautiful & consistent icon toolkit used throughout the application.</p>
                </div>
                <div className="border-l-4 border-zinc-300 pl-4">
                  <p><strong>Next.js:</strong> <a href="https://nextjs.org" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">https://nextjs.org</a></p>
                  <p className="text-sm">React framework for production-grade applications.</p>
                </div>
                <div className="border-l-4 border-zinc-300 pl-4">
                  <p><strong>Tailwind CSS:</strong> <a href="https://tailwindcss.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">https://tailwindcss.com</a></p>
                  <p className="text-sm">Utility-first CSS framework for rapid UI development.</p>
                </div>
                <div className="border-l-4 border-zinc-300 pl-4">
                  <p><strong>Supabase:</strong> <a href="https://supabase.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">https://supabase.com</a></p>
                  <p className="text-sm">Open source Firebase alternative for database and authentication.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Download Section */}
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

          {/* Last Updated */}
          <div className="text-center text-zinc-500 text-sm mt-16">
            <p>Last updated: {new Date().toLocaleDateString()}</p>
            <p className="mt-2">For questions about citations or licensing, please contact the NeighborNook team.</p>
          </div>
        </div>
      </section>
    </main>
  );
}
