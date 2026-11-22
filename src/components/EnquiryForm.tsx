"use client";

import { useState } from "react";
import { siteConfig } from "@/data/site";
import { validateEnquiryForm, ValidationErrors, EnquiryFormData } from "@/lib/validation";
import { buildWhatsAppUrl, buildMailtoUrl } from "@/lib/enquiry";

export default function EnquiryForm() {
  const [formData, setFormData] = useState<EnquiryFormData>({
    name: "",
    phone: "",
    email: "",
    projectType: "Turnkey Residential Villa",
    preferredContact: "WhatsApp",
    message: "",
    honeypot: "",
  });

  const [errors, setErrors] = useState<ValidationErrors>({});
  const [submittedOption, setSubmittedOption] = useState<"whatsapp" | "email" | null>(null);

  const projectTypes = [
    "Turnkey Residential Villa",
    "Independent Duplex House",
    "Commercial Building Complex",
    "Pre-Engineered Building (PEB Warehouse)",
    "Structural Design & 2D/3D Planning",
    "Renovation & Elevation Retrofitting",
    "Site Supervision & Quality Audit",
  ];

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error on field edit
    if (errors[name as keyof ValidationErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = (actionType: "whatsapp" | "email") => {
    const result = validateEnquiryForm(formData);

    if (result.isSpam) {
      // Silently discard spam submission
      setSubmittedOption(actionType);
      return;
    }

    if (!result.isValid) {
      setErrors(result.errors);
      return;
    }

    setErrors({});

    if (actionType === "whatsapp") {
      const url = buildWhatsAppUrl(
        siteConfig.whatsappNumber,
        result.sanitizedData,
        siteConfig.name
      );
      window.open(url, "_blank", "noopener,noreferrer");
      setSubmittedOption("whatsapp");
    } else {
      const url = buildMailtoUrl(siteConfig.email, result.sanitizedData, siteConfig.name);
      window.location.href = url;
      setSubmittedOption("email");
    }
  };

  return (
    <div className="bg-white rounded-3xl border-2 border-slate-200 shadow-xl p-6 sm:p-8 lg:p-10">
      {submittedOption ? (
        <div
          role="status"
          aria-live="polite"
          className="p-8 text-center bg-emerald-50 rounded-2xl border border-emerald-200"
        >
          <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-xl font-black uppercase tracking-tight text-slate-900">
            Enquiry Prepared Successfully!
          </h3>
          <p className="mt-2 text-sm text-slate-600 max-w-md mx-auto">
            {submittedOption === "whatsapp"
              ? "Your enquiry has been formatted and opened directly in WhatsApp. Er. M. Joshva Priyan will respond promptly."
              : "Your email client has been opened with your pre-filled enquiry. Hit send to dispatch."}
          </p>
          <button
            type="button"
            onClick={() => {
              setSubmittedOption(null);
              setFormData({
                name: "",
                phone: "",
                email: "",
                projectType: "Turnkey Residential Villa",
                preferredContact: "WhatsApp",
                message: "",
                honeypot: "",
              });
            }}
            className="mt-6 inline-flex items-center px-6 py-3 rounded-xl text-xs font-extrabold uppercase tracking-wider bg-slate-900 text-white hover:bg-slate-800 transition-colors shadow"
          >
            Submit Another Project Requirement
          </button>
        </div>
      ) : (
        <form noValidate onSubmit={(e) => e.preventDefault()} className="space-y-6">
          {/* Honeypot field (hidden from human visitors to catch automated bots) */}
          <div className="hidden" aria-hidden="true">
            <label htmlFor="hp_field">Do not fill this</label>
            <input
              id="hp_field"
              type="text"
              name="honeypot"
              tabIndex={-1}
              autoComplete="off"
              value={formData.honeypot || ""}
              onChange={handleInputChange}
            />
          </div>

          {/* Full Name */}
          <div>
            <label
              htmlFor="name"
              className="block text-xs font-bold uppercase tracking-wider text-slate-800 mb-1.5"
            >
              Full Name <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              maxLength={100}
              placeholder="e.g. Ramesh K. (Dindigul)"
              value={formData.name}
              onChange={handleInputChange}
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? "name-error" : undefined}
              className={`w-full px-4 py-3.5 rounded-xl border text-sm text-slate-900 placeholder-slate-400 focus:outline-none transition-colors ${
                errors.name
                  ? "border-red-500 focus:ring-2 focus:ring-red-200"
                  : "border-slate-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20"
              }`}
            />
            {errors.name && (
              <p id="name-error" className="mt-1 text-xs text-red-600 font-medium">
                {errors.name}
              </p>
            )}
          </div>

          {/* Phone and Email */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label
                htmlFor="phone"
                className="block text-xs font-bold uppercase tracking-wider text-slate-800 mb-1.5"
              >
                Mobile / Phone <span className="text-red-600">*</span>
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                required
                maxLength={25}
                placeholder="+91 98765 43210"
                value={formData.phone}
                onChange={handleInputChange}
                aria-invalid={!!errors.phone}
                aria-describedby={errors.phone ? "phone-error" : undefined}
                className={`w-full px-4 py-3.5 rounded-xl border text-sm text-slate-900 placeholder-slate-400 focus:outline-none transition-colors ${
                  errors.phone
                    ? "border-red-500 focus:ring-2 focus:ring-red-200"
                    : "border-slate-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20"
                }`}
              />
              {errors.phone && (
                <p id="phone-error" className="mt-1 text-xs text-red-600 font-medium">
                  {errors.phone}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-xs font-bold uppercase tracking-wider text-slate-800 mb-1.5"
              >
                Email Address <span className="text-slate-400 text-xs normal-case">(optional)</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                maxLength={120}
                placeholder="ramesh@example.com"
                value={formData.email}
                onChange={handleInputChange}
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? "email-error" : undefined}
                className={`w-full px-4 py-3.5 rounded-xl border text-sm text-slate-900 placeholder-slate-400 focus:outline-none transition-colors ${
                  errors.email
                    ? "border-red-500 focus:ring-2 focus:ring-red-200"
                    : "border-slate-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20"
                }`}
              />
              {errors.email && (
                <p id="email-error" className="mt-1 text-xs text-red-600 font-medium">
                  {errors.email}
                </p>
              )}
            </div>
          </div>

          {/* Project Type & Preferred Contact Method */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label
                htmlFor="projectType"
                className="block text-xs font-bold uppercase tracking-wider text-slate-800 mb-1.5"
              >
                Project Type <span className="text-red-600">*</span>
              </label>
              <select
                id="projectType"
                name="projectType"
                value={formData.projectType}
                onChange={handleInputChange}
                aria-invalid={!!errors.projectType}
                aria-describedby={errors.projectType ? "type-error" : undefined}
                className="w-full px-4 py-3.5 rounded-xl border border-slate-300 text-sm text-slate-900 bg-white focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-colors"
              >
                {projectTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
              {errors.projectType && (
                <p id="type-error" className="mt-1 text-xs text-red-600 font-medium">
                  {errors.projectType}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="preferredContact"
                className="block text-xs font-bold uppercase tracking-wider text-slate-800 mb-1.5"
              >
                Preferred Contact Channel
              </label>
              <select
                id="preferredContact"
                name="preferredContact"
                value={formData.preferredContact}
                onChange={handleInputChange}
                className="w-full px-4 py-3.5 rounded-xl border border-slate-300 text-sm text-slate-900 bg-white focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-colors"
              >
                <option value="WhatsApp">WhatsApp Message</option>
                <option value="Phone">Direct Phone Call</option>
                <option value="Email">Email Communication</option>
              </select>
            </div>
          </div>

          {/* Message / Project Requirements */}
          <div>
            <label
              htmlFor="message"
              className="block text-xs font-bold uppercase tracking-wider text-slate-800 mb-1.5"
            >
              Site & Building Details <span className="text-red-600">*</span>
            </label>
            <textarea
              id="message"
              name="message"
              rows={4}
              required
              maxLength={2000}
              placeholder="Tell us about your plot location (e.g. Palani Road, Nagal Nagar), plot size, number of floors, budget, or whether you need 2D plan and 3D elevation drawings."
              value={formData.message}
              onChange={handleInputChange}
              aria-invalid={!!errors.message}
              aria-describedby={errors.message ? "message-error" : undefined}
              className={`w-full px-4 py-3.5 rounded-xl border text-sm text-slate-900 placeholder-slate-400 focus:outline-none transition-colors ${
                errors.message
                  ? "border-red-500 focus:ring-2 focus:ring-red-200"
                  : "border-slate-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20"
              }`}
            />
            {errors.message && (
              <p id="message-error" className="mt-1 text-xs text-red-600 font-medium">
                {errors.message}
              </p>
            )}
          </div>

          {/* Dual Submission Buttons */}
          <div className="pt-2 flex flex-col sm:flex-row gap-4">
            <button
              type="button"
              onClick={() => handleSubmit("whatsapp")}
              className="flex-1 inline-flex items-center justify-center px-6 py-4 rounded-xl text-sm font-extrabold bg-[#25D366] text-white hover:bg-[#20ba59] shadow-lg hover:shadow-xl hover:scale-[1.01] transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#25D366]"
            >
              <svg className="w-5 h-5 mr-2 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766 0-3.18-2.587-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.007c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86.174.086.275.072.376-.044.101-.116.433-.506.549-.68.116-.173.231-.144.39-.086s1.011.477 1.184.564.289.13.332.202c.043.073.043.419-.101.824z" />
              </svg>
              Send via WhatsApp
            </button>

            <button
              type="button"
              onClick={() => handleSubmit("email")}
              className="flex-1 inline-flex items-center justify-center px-6 py-4 rounded-xl text-sm font-extrabold bg-slate-900 text-white hover:bg-slate-800 border border-slate-700 shadow-md transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-slate-900"
            >
              <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              Send by Email
            </button>
          </div>
          <p className="text-[11px] text-center text-slate-500">
            Direct client-side encryption. No database storage or spam marketing lists.
          </p>
        </form>
      )}
    </div>
  );
}
