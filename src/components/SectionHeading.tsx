interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  theme?: "light" | "dark";
}

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  theme = "light",
}: SectionHeadingProps) {
  const isCenter = align === "center";
  const isDark = theme === "dark";

  return (
    <div
      className={`max-w-3xl mb-12 sm:mb-16 ${
        isCenter ? "mx-auto text-center" : "text-left"
      }`}
    >
      {eyebrow && (
        <div
          className={`inline-flex items-center gap-2 text-xs sm:text-sm font-extrabold uppercase tracking-widest text-amber-500 mb-3 ${
            isCenter ? "justify-center" : ""
          }`}
        >
          <span className="w-6 h-1 bg-amber-500 rounded-full inline-block" />
          <span>{eyebrow}</span>
          {isCenter && <span className="w-6 h-1 bg-amber-500 rounded-full inline-block" />}
        </div>
      )}
      <h2
        className={`text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight uppercase leading-tight ${
          isDark ? "text-white" : "text-slate-900"
        }`}
      >
        {title}
      </h2>
      {description && (
        <p
          className={`mt-4 text-base sm:text-lg leading-relaxed ${
            isDark ? "text-slate-300" : "text-slate-600"
          }`}
        >
          {description}
        </p>
      )}
    </div>
  );
}
