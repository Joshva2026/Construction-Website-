export interface SiteStat {
  label: string;
  value: string;
  description?: string;
}

export interface SiteService {
  id: string;
  number: string;
  title: string;
  description: string;
  image: string;
}

export interface SiteConfig {
  name: string;
  tagline: string;
  description: string;
  engineerName: string;
  phone: string;
  // WhatsApp number in international format without + or spaces
  whatsappNumber: string;
  email: string;
  address: string;
  // Opening hours; marked with TODO if not originally specified
  hours: string; // TODO: Replace with exact operating hours if different
  mapEmbedUrl: string; // Embed URL for Google Maps
  stats: {
    projectsCompleted: SiteStat;
    yearsExperience: SiteStat;
    satisfiedClients: SiteStat;
    onTimeDelivery: SiteStat;
  };
  services: SiteService[];
}

export const siteConfig: SiteConfig = {
  name: "Civil Engineering Works",
  tagline: "Building the future, one floor at a time",
  description:
    "Structural design, site supervision and turnkey construction for homes, offices and infrastructure across the region.",
  engineerName: "Er. Arjun Sharma",
  phone: "+91 98765 43210",
  whatsappNumber: "919876543210",
  email: "hello@civilengineeringworks.in",
  address: "124 MG Road, Civil Lines, Your City, India",
  hours: "Monday - Saturday: 9:00 AM - 6:30 PM", // TODO: Update with official business hours
  mapEmbedUrl:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3502.5620935510657!2d77.2090212!3d28.6139391!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd5b347eb62d%3A0x52c2b7494e204dce!2sNew%20Delhi%2C%20Delhi!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin", // TODO: Replace with exact Google Maps embed URL
  stats: {
    projectsCompleted: {
      value: "120+",
      label: "Projects Completed",
      description: "Delivered across residential, commercial and industrial sectors",
    },
    yearsExperience: {
      value: "15+",
      label: "Years of Experience",
      description: "Proven expertise in structural engineering and supervision",
    },
    satisfiedClients: {
      value: "95+",
      label: "Satisfied Clients",
      description: "Homeowners, commercial enterprises, and institutions",
    },
    onTimeDelivery: {
      value: "99%",
      label: "On-Time Delivery",
      description: "Disciplined project schedules and quality milestones",
    },
  },
  services: [
    {
      id: "structural-design",
      number: "01",
      title: "Structural Design",
      description:
        "Foundation, RCC and steel design with earthquake-resistant detailing, checked against current IS codes. We deliver complete structural drawings, calculations and reinforcement schedules.",
      image: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80",
    },
    {
      id: "site-supervision",
      number: "02",
      title: "Site Supervision",
      description:
        "Daily on-site control of quality, materials and sequence so the build matches the drawings. Concrete slump tests, cube testing, reinforcement inspection and progress reporting.",
      image: "https://images.unsplash.com/photo-1541888946425-d81bb19940f2?w=800&q=80",
    },
    {
      id: "turnkey-construction",
      number: "03",
      title: "Turnkey Construction",
      description:
        "One accountable team from groundwork to finishing, with a fixed schedule and transparent costs. We handle permits, procurement, labor and project close-out.",
      image: "https://images.unsplash.com/photo-1581589127319-27996835facc?w=800&q=80",
    },
    {
      id: "renovation-consulting",
      number: "04",
      title: "Renovation & Consulting",
      description:
        "Structural audits, retrofits, seismic strengthening and feasibility reports for existing buildings, heritage structures and new development plans.",
      image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80",
    },
  ],
};
