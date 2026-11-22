import { NextRequest, NextResponse } from "next/server";
import { addEnquiry } from "@/lib/data-service";
import { validateEnquiryForm } from "@/lib/validation";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const validation = validateEnquiryForm(body);
    if (!validation.isValid) {
      return NextResponse.json({ error: "Validation failed", errors: validation.errors }, { status: 400 });
    }

    // Save lead in enquiries store
    const enquiry = await addEnquiry({
      name: validation.sanitizedData.name,
      phone: validation.sanitizedData.phone,
      email: validation.sanitizedData.email || undefined,
      projectType: validation.sanitizedData.projectType,
      preferredContact: validation.sanitizedData.preferredContact,
      message: validation.sanitizedData.message,
    });

    return NextResponse.json({ success: true, data: enquiry });
  } catch {
    return NextResponse.json({ error: "Failed to record enquiry" }, { status: 500 });
  }
}
