import SectionHeading from "./SectionHeading";

export default function ProcessSteps() {
  const steps = [
    {
      step: "01",
      title: "Consultation",
      subtitle: "Site & Requirement Analysis",
      description:
        "We assess your plot conditions, discuss spatial needs, conduct soil feasibility review, and define project budget and timelines.",
      icon: (
        <svg
          className="w-6 h-6"
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
      title: "Design & Planning",
      subtitle: "Architectural & Structural Layouts",
      description:
        "Detailed CAD drawings, seismic IS compliant structural analysis, foundation detailing, municipal permit clearance, and itemized bill of quantities.",
      icon: (
        <svg
          className="w-6 h-6"
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
      title: "Construction",
      subtitle: "Supervised Execution",
      description:
        "Groundbreaking, foundation piling, RCC slab casting, masonry, and service installation with daily supervisor quality logs and testing.",
      icon: (
        <svg
          className="w-6 h-6"
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
      title: "Handover",
      subtitle: "Quality Audit & Commissioning",
      description:
        "Joint walkthrough audit, MEP testing, snag clearance, as-built documentation, structural stability certificate, and final key handover.",
      icon: (
        <svg
          className="w-6 h-6"
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
    <section className="py-16 sm:py-24 bg-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Our Process"
          title="A Structured Path To Structural Excellence"
          description="Every project follows a proven, transparent four-stage methodology to ensure cost predictability, zero safety compromises, and on-time completion."
          align="center"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {steps.map((step, idx) => (
            <div
              key={step.step}
              className="relative flex flex-col items-start p-6 rounded-xl bg-brand-paper border border-brand-line shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              {/* Step indicator header */}
              <div className="flex items-center justify-between w-full mb-6">
                <span className="w-12 h-12 rounded-lg bg-brand-primary/15 text-brand-ink flex items-center justify-center font-bold text-lg">
                  {step.icon}
                </span>
                <span className="text-3xl font-black text-slate-300 font-mono">
                  {step.step}
                </span>
              </div>

              {/* Step Content */}
              <h3 className="text-xl font-bold uppercase tracking-tight text-slate-900">
                {step.title}
              </h3>
              <p className="text-xs font-semibold uppercase tracking-wider text-brand-primary mt-1">
                {step.subtitle}
              </p>
              <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                {step.description}
              </p>

              {idx < steps.length - 1 && (
                <div
                  className="hidden lg:block absolute -right-4 top-1/2 -translate-y-1/2 z-10 text-brand-line"
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
