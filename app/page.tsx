import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="border-b border-surface-border bg-white">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-brand-600 flex items-center justify-center">
              <span className="text-white font-bold text-sm">PM</span>
            </div>
            <span className="font-semibold text-gray-900">Policy Manager</span>
          </div>
          <Link href="/dashboard" className="btn-primary">
            Sign In
          </Link>
        </div>
      </header>

      {/* Hero */}
      <main className="flex-1 flex items-center">
        <div className="max-w-5xl mx-auto px-4 py-16 md:py-24">
          <div className="max-w-2xl">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 mb-4">
              The operating system for clinic policy, guidance, and internal
              communication.
            </h1>
            <p className="text-lg text-gray-500 mb-8 leading-relaxed">
              Create, organize, issue, and track policy across one clinic or
              many — with clear acknowledgment, better consistency, and one
              place your team can trust for the current answer.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 mb-12">
              <Link href="/dashboard" className="btn-primary text-base px-6 py-3">
                Get Started
              </Link>
              <button className="btn-secondary text-base px-6 py-3">
                Learn More
              </button>
            </div>

            {/* Communication types */}
            <div className="grid sm:grid-cols-3 gap-4">
              <div className="card">
                <span className="badge-policy mb-3">Administrative Policy</span>
                <p className="text-sm text-gray-600 mt-2">
                  Black-and-white direction. Mandatory standards and rules
                  issued top-down with no variance.
                </p>
              </div>
              <div className="card">
                <span className="badge-sog mb-3">Standard Operating Guideline</span>
                <p className="text-sm text-gray-600 mt-2">
                  Principle-based operational guidance that helps team members
                  make the right decision.
                </p>
              </div>
              <div className="card">
                <span className="badge-info mb-3">Communication Info</span>
                <p className="text-sm text-gray-600 mt-2">
                  FYI or temporary information. Reference material, awareness
                  items, and expiring notices.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-surface-border bg-white py-6">
        <div className="max-w-5xl mx-auto px-4 text-sm text-gray-400">
          Policy Manager — Built for veterinary clinic operations
        </div>
      </footer>
    </div>
  );
}
