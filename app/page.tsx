import { ThemeSwitcher } from "@/components/theme-switcher";

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-16">
        {/* Header Banner */}
        <div className="text-center mb-16">
          <div className="inline-block mb-6 p-4 bg-white dark:bg-gray-800 rounded-full shadow-lg">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <span className="text-2xl font-bold text-white">TGD</span>
            </div>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-gray-800 dark:text-white mb-6">
            TheGratefulDev
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto mb-8"></div>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 md:p-12 mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-6 text-center">
              Personal Projects Showcase
            </h2>
            <div className="prose dark:prose-invert max-w-none">
              <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed mb-6 text-center">
                Welcome to my corner of the internet! This is where I intend toshowcase my personal development projects,
                and experiment with implementing new projects and tools.
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-6 text-center">
                There isn&apos;t much to show off at all just yet, but this landing page. There&apos;ll be more comming soon as I get building.
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed text-center">
                Feel free to keep tabs on me and reach out to ask any questions.
                2026 is the year of building. Yalla!
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="text-center pt-12 border-t border-gray-200 dark:border-gray-700">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-gray-500 dark:text-gray-400 text-sm">
            <span>TheGratefulDev.xyz</span>
            <span className="hidden sm:inline">•</span>
            <ThemeSwitcher />
          </div>
        </footer>
      </div>
    </main>
  );
}
