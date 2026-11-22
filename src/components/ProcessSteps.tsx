import SectionHeading from "./SectionHeading";

export default function ProcessSteps() {
  const steps = [
    {
      step: "01",
      title: "Consultation & Soil Test",
      subtitle: "Site Survey & Requirements",
      description:
        "Comprehensive site inspection across Dindigul, black cotton soil bearing capacity analysis, architectural requirements mapping, and transparent budget estimation.",
      icon: (
        <svg
          className="w-6 h-6 text-amber-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
          />
        </svg>
      ),
    },
    {
      step: "02",
      title: "Design & Approvals",
      subtitle: "2D/3D & Structural Drawings",
      description:
        "Seismic Zone III compliant structural design, municipal DTCP / LPA building plan approvals, Fe550D steel bar bending schedule, and itemized bill of quantities.",
      icon: (
        <svg
          className="w-6 h-6 text-amber-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
      ),
    },
    {
      step: "03",
      title: "Supervised Execution",
      subtitle: "Material Testing & RCC Casting",
      description:
        "Turnkey execution using certified 53-grade cement, machine cube slump testing, supervised RCC slab casting, red brick masonry, and plumbing/electrical conduits.",
      icon: (
        <svg
          className="w-6 h-6 text-amber-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
          />
        </svg>
      ),
    },
    {
      step: "04",
      title: "Quality Audit & Handover",
      subtitle: "Certification & Key Handover",
      description:
        "Comprehensive snag list clearance, electrical/plumbing testing, structural stability engineer certificate, and ceremonial handover on or before agreed deadline.",
      icon: (
        <svg
          className="w-6 h-6 text-amber-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
    },
  ];

  return (
    <section className="py-20 sm:py-28 bg-white border-y border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Our Engineering Workflow"
          title="A Disciplined Path To Turnkey Completion"
          description="Every residential villa, commercial building, and structural project in Tamil Nadu follows our 4-stage quality protocol ensuring zero cost overruns and 100% safety."
          align="center"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {steps.map((step, idx) => (
            <div
              key={step.step}
              className="relative flex flex-col items-start p-7 rounded-2xl bg-slate-50 border border-slate-200 shadow-sm hover:shadow-xl hover:border-amber-500/50 transition-all duration-300 group"
            >
              {/* Step indicator header */}
              <div className="flex items-center justify-between w-full mb-6">
                <span className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center font-bold text-lg group-hover:scale-110 transition-transform">
                  {step.icon}
                </span>
                <span className="text-3xl font-black text-slate-300 font-mono group-hover:text-amber-500 transition-colors">
                  {step.step}
                </span>
              </div>

              {/* Step Content */}
              <h3 className="text-xl font-bold uppercase tracking-tight text-slate-900 group-hover:text-amber-600 transition-colors">
                {step.title}
              </h3>
              <p className="text-xs font-bold uppercase tracking-wider text-amber-600 mt-1">
                {step.subtitle}
              </p>
              <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                {step.description}
              </p>

              {idx < steps.length - 1 && (
                <div
                  className="hidden lg:block absolute -right-4 top-1/2 -translate-y-1/2 z-10 text-slate-300"
                  aria-hidden="true"
                >
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
