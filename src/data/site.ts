export interface SiteStat {
  label: string;
  endValue: number;
  suffix?: string;
  description?: string;
}

export interface SiteService {
  id: string;
  number: string;
  title: string;
  description: string;
  image: string;
  features: string[];
}

export interface SiteConfig {
  name: string;
  tagline: string;
  description: string;
  engineerName: string;
  phone: string;
  whatsappNumber: string;
  email: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  hours: string;
  mapEmbedUrl: string;
  stats: {
    projectsCompleted: SiteStat;
    yearsExperience: SiteStat;
    satisfiedClients: SiteStat;
    onTimeDelivery: SiteStat;
  };
  services: SiteService[];
}

export const siteConfig: SiteConfig = {
  name: "Joshva Construction",
  tagline: "Engineering Excellence & Architectural Precision in Tamil Nadu",
  description:
    "Leading civil engineering and turnkey construction company based in Dindigul, Tamil Nadu. Specializing in independent duplex villas, commercial complexes, structural design, and turnkey execution across South India.",
  engineerName: "Er. M. Joshva Priyan, B.E. (Civil)",
  phone: "+91 98765 43210",
  whatsappNumber: "919876543210",
  email: "joshvaconstruction@gmail.com",
  address: "Palani Road, Near Collectorate, Dindigul, Tamil Nadu - 624004, India",
  city: "Dindigul",
  state: "Tamil Nadu",
  pincode: "624004",
  hours: "Monday - Saturday: 8:30 AM - 7:00 PM (Sunday by Appointment)",
  // Real Google Maps embed centered directly on Dindigul, Tamil Nadu
  mapEmbedUrl:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d62744.15931668832!2d77.94071373513184!3d10.367312384910815!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b00ab4270c8f5f3%3A0xc6cbfa848d533da8!2sDindigul%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1710000000000!5m2!1sen!2sin",
  stats: {
    projectsCompleted: {
      endValue: 126,
      suffix: "+",
      label: "Projects Completed",
      description: "Delivered across Dindigul, Madurai, Trichy and Coimbatore",
    },
    yearsExperience: {
      endValue: 15,
      suffix: "+",
      label: "Years of Experience",
      description: "Licensed civil engineering and structural expertise",
    },
    satisfiedClients: {
      endValue: 110,
      suffix: "+",
      label: "Satisfied Clients",
      description: "Homeowners, commercial builders & industrial partners",
    },
    onTimeDelivery: {
      endValue: 99,
      suffix: "%",
      label: "On-Time Delivery",
      description: "Disciplined scheduling and milestone tracking",
    },
  },
  services: [
    {
      id: "structural-design",
      number: "01",
      title: "Structural Design & Planning",
      description:
        "Comprehensive 2D/3D architectural CAD planning, RCC foundation design, earthquake-resistant reinforcement detailing, and structural stability certifications adhering to Indian Standard (IS) codes.",
      image: "/images/indian-rcc-site.jpg",
      features: ["Seismic IS Code Detailing", "Soil Assessment & Pile Design", "Full 2D/3D CAD Blueprints"],
    },
    {
      id: "turnkey-construction",
      number: "02",
      title: "Turnkey Civil Construction",
      description:
        "Complete end-to-end building contracts for independent duplex houses, luxury villas, and multi-storey apartments. We handle raw material sourcing, labor supervision, and total handover with fixed-cost guarantees.",
      image: "/images/indian-contemporary-villa.jpg",
      features: ["Fixed Cost & Schedule", "Grade-A Bricks & Steel", "Transparent Stage Handover"],
    },
    {
      id: "commercial-industrial",
      number: "03",
      title: "Commercial & Pre-Engineered Buildings",
      description:
        "Construction of commercial complexes, shopping malls, institutional halls, and pre-engineered steel warehouses (PEB) with heavy-duty laser-screeded flooring and modern glass curtain walls.",
      image: "/images/indian-commercial-complex.jpg",
      features: ["PEB Heavy Steel Framing", "Laser-Screed Flooring", "HVAC & Fire Safety Integration"],
    },
    {
      id: "renovation-remodeling",
      number: "04",
      title: "Renovation & Structural Retrofitting",
      description:
        "Structural health audits, column jacketing, roof waterproofing, seismic retrofitting, and modern elevation remodeling for existing residential and heritage commercial properties in Tamil Nadu.",
      image: "/images/indian-elevation-renovation.jpg",
      features: ["Non-Destructive Testing", "Column & Beam Jacketing", "Elevation Makeovers"],
    },
  ],
};
