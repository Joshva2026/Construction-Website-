import { siteConfig } from "@/data/site";

export default function StatsBar() {
  const statsList = [
    siteConfig.stats.projectsCompleted,
    siteConfig.stats.yearsExperience,
    siteConfig.stats.satisfiedClients,
    siteConfig.stats.onTimeDelivery,
  ];

  return (
    <section
      aria-label="Key company statistics"
      className="bg-brand-primary text-brand-ink py-10 sm:py-12 border-y border-brand-primary-hover shadow-sm"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6 divide-y lg:divide-y-0 lg:divide-x divide-brand-ink/15">
          {statsList.map((stat, idx) => (
            <div
              key={stat.label}
              className={`text-center ${idx > 0 ? "pt-6 lg:pt-0 lg:pl-6" : ""}`}
            >
              <div className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-brand-ink uppercase font-sans">
                {stat.value}
              </div>
              <div className="mt-1 text-sm sm:text-base font-bold uppercase tracking-wider text-brand-ink/90">
                {stat.label}
              </div>
              {stat.description && (
                <p className="mt-1 text-xs text-brand-ink/75 max-w-[220px] mx-auto hidden sm:block">
                  {stat.description}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
