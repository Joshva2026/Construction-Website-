export interface EnquiryFormData {
  name: string;
  phone: string;
  email?: string;
  projectType: string;
  preferredContact: "WhatsApp" | "Phone" | "Email";
  message: string;
  honeypot?: string; // Hidden spam prevention trap
}

export interface ValidationErrors {
  name?: string;
  phone?: string;
  email?: string;
  projectType?: string;
  preferredContact?: string;
  message?: string;
  honeypot?: string;
}

export interface ValidationResult {
  isValid: boolean;
  isSpam: boolean;
  errors: ValidationErrors;
  sanitizedData: EnquiryFormData;
}

/**
 * Strips HTML tags, trims surrounding whitespace, and enforces maximum character limits.
 */
export function sanitizeInput(value: string, maxLength: number): string {
  if (!value) return "";
  // Strip HTML tag patterns
  const stripped = value.replace(/<\/?[^>]+(>|$)/g, "");
  // Trim and enforce limit
  return stripped.trim().slice(0, maxLength);
}

/**
 * Pure validation for construction enquiry submission.
 */
export function validateEnquiryForm(raw: {
  name?: unknown;
  phone?: unknown;
  email?: unknown;
  projectType?: unknown;
  preferredContact?: unknown;
  message?: unknown;
  honeypot?: unknown;
}): ValidationResult {
  const errors: ValidationErrors = {};

  // Check honeypot first
  const honeypotVal = typeof raw.honeypot === "string" ? raw.honeypot.trim() : "";
  const isSpam = honeypotVal.length > 0;
  if (isSpam) {
    errors.honeypot = "Spam detected";
  }

  // Sanitize fields
  const name = sanitizeInput(typeof raw.name === "string" ? raw.name : "", 100);
  const phone = sanitizeInput(typeof raw.phone === "string" ? raw.phone : "", 25);
  const email = sanitizeInput(typeof raw.email === "string" ? raw.email : "", 120);
  const projectType = sanitizeInput(
    typeof raw.projectType === "string" ? raw.projectType : "",
    50
  );
  const preferredContactRaw = sanitizeInput(
    typeof raw.preferredContact === "string" ? raw.preferredContact : "WhatsApp",
    20
  );
  const message = sanitizeInput(typeof raw.message === "string" ? raw.message : "", 2000);

  // Validate Name
  if (!name) {
    errors.name = "Full name is required.";
  } else if (name.length < 2) {
    errors.name = "Name must be at least 2 characters long.";
  }

  // Validate Phone (Accepts standard international and domestic formats)
  const phonePattern = /^[+\d][\d\s()-]{7,20}$/;
  if (!phone) {
    errors.phone = "Phone number is required.";
  } else if (!phonePattern.test(phone)) {
    errors.phone = "Please enter a valid phone number (e.g. +91 98765 43210).";
  }

  // Validate Email (Optional, but if filled must be valid)
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (email && !emailPattern.test(email)) {
    errors.email = "Please enter a valid email address.";
  }

  // Validate Project Type
  if (!projectType) {
    errors.projectType = "Please select a project type.";
  }

  // Validate Preferred Contact Method
  const validContactMethods: Array<EnquiryFormData["preferredContact"]> = [
    "WhatsApp",
    "Phone",
    "Email",
  ];
  const preferredContact = validContactMethods.includes(
    preferredContactRaw as EnquiryFormData["preferredContact"]
  )
    ? (preferredContactRaw as EnquiryFormData["preferredContact"])
    : "WhatsApp";

  // Validate Message
  if (!message) {
    errors.message = "Please describe your project requirements.";
  } else if (message.length < 10) {
    errors.message = "Message must be at least 10 characters long.";
  }

  const isValid = Object.keys(errors).length === 0;

  return {
    isValid,
    isSpam,
    errors,
    sanitizedData: {
      name,
      phone,
      email: email || undefined,
      projectType,
      preferredContact,
      message,
      honeypot: honeypotVal,
    },
  };
}
