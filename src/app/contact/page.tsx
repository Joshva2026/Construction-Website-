import { Metadata } from "next";
import EnquiryForm from "@/components/EnquiryForm";
import SectionHeading from "@/components/SectionHeading";
import { siteConfig } from "@/data/site";

export const metadata: Metadata = {
  title: "Contact & Free Quote",
  description:
    "Request a free structural or construction quote. Connect with Er. Arjun Sharma via WhatsApp or email for turnkey projects, site supervision, and architectural planning.",
};

export default function ContactPage() {
  return (
    <div className="py-12 sm:py-20 bg-brand-paper min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Get In Touch"
          title="Discuss Your Construction Project"
          description="Submit your plot requirements, blueprints, or structural queries below. We validate your submission and generate an instant message for WhatsApp or direct email."
          align="left"
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Main Enquiry Form */}
          <div className="lg:col-span-7">
            <EnquiryForm />
          </div>

          {/* Contact Details & Company Info Aside */}
          <aside className="lg:col-span-5 space-y-8">
            <div className="bg-brand-ink text-white rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-md">
              <div className="border-b border-slate-800 pb-6 mb-6">
                <span className="text-xs font-bold uppercase tracking-widest text-brand-primary">
                  Direct Contact
                </span>
                <h3 className="mt-1 text-2xl font-bold uppercase tracking-tight text-white">
                  {siteConfig.engineerName}
                </h3>
                <p className="text-xs text-slate-400 mt-1">Lead Structural & Civil Engineer</p>
              </div>

              <ul className="space-y-4 text-sm text-slate-300">
                <li className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-brand-primary shrink-0 mt-0.5">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                  </div>
                  <div>
                    <span className="block text-xs uppercase font-bold text-slate-400">Phone</span>
                    <a
                      href={`tel:${siteConfig.phone.replace(/\s+/g, "")}`}
                      className="text-white hover:text-brand-primary font-medium transition-colors"
                    >
                      {siteConfig.phone}
                    </a>
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-brand-primary shrink-0 mt-0.5">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <div>
                    <span className="block text-xs uppercase font-bold text-slate-400">Email</span>
                    <a
                      href={`mailto:${siteConfig.email}`}
                      className="text-white hover:text-brand-primary font-medium transition-colors"
                    >
                      {siteConfig.email}
                    </a>
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-brand-primary shrink-0 mt-0.5">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <span className="block text-xs uppercase font-bold text-slate-400">Head Office</span>
                    <span className="text-white font-medium">{siteConfig.address}</span>
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-brand-primary shrink-0 mt-0.5">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <span className="block text-xs uppercase font-bold text-slate-400">Business Hours</span>
                    <span className="text-white font-medium">{siteConfig.hours}</span>
                  </div>
                </li>
              </ul>
            </div>

            {/* Embedded Google Maps */}
            <div className="bg-white rounded-2xl overflow-hidden border border-brand-line shadow-sm">
              <div className="p-4 border-b border-slate-100 flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
                  Office Location Map
                </span>
                <span className="text-xs text-slate-500">Civil Lines</span>
              </div>
              <div className="w-full aspect-[4/3] bg-slate-100">
                <iframe
                  title="Office Location Map"
                  src={siteConfig.mapEmbedUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full"
                />
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
