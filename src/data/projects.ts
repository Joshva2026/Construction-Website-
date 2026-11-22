export type ProjectCategory = "Residential" | "Commercial" | "Renovation";

export interface Project {
  slug: string;
  title: string;
  category: ProjectCategory;
  location: string;
  year: number;
  duration: string;
  area: string;
  summary: string;
  scope: string[];
  outcome: string;
  cover: string;
  gallery: string[];
}

export const projects: Project[] = [
  {
    slug: "green-valley-residential-tower",
    title: "Green Valley Residential Tower",
    category: "Residential",
    location: "Civil Lines, Your City",
    year: 2026,
    duration: "18 months",
    area: "45,000 sq ft",
    summary:
      "G+7 residential building with 32 apartments, RCC frame, earthquake-resistant detailing, and premium finishes. Complete structural design and high-grade concrete engineering.",
    scope: [
      "Geotechnical investigation & deep foundation pile design",
      "Earthquake-resistant RCC framed superstructure",
      "Cast-in-situ post-tensioned floor slabs",
      "Complete MEP layout and turnkey architectural finishing",
    ],
    outcome:
      "Currently 60% complete with structural frame inspected and verified against IS 1893 seismic standards, on track for early delivery.",
    cover: "https://images.unsplash.com/photo-1541888946425-d81bb19940f2?w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1541888946425-d81bb19940f2?w=1200&q=80",
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1200&q=80",
      "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1200&q=80",
    ],
  },
  {
    slug: "central-office-complex",
    title: "Central Office Complex",
    category: "Commercial",
    location: "Commercial Hub, Your City",
    year: 2026,
    duration: "24 months",
    area: "65,000 sq ft",
    summary:
      "Four-floor commercial grade-A office building with double basement parking, acoustic glazed facade, and centralized energy-efficient HVAC infrastructure.",
    scope: [
      "Deep basement shoring and diaphragm wall excavation",
      "Column-free large span structural concrete frames",
      "Integrated double-glazed thermal curtain walling",
      "Centralized HVAC and high-capacity electrical substations",
    ],
    outcome:
      "Substructure and basement retaining works successfully handed over; structural framing advancing seamlessly ahead of schedule.",
    cover: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1200&q=80",
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=80",
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&q=80",
    ],
  },
  {
    slug: "riverside-duplex-villas",
    title: "Riverside Duplex Villas",
    category: "Residential",
    location: "River Enclave, Your City",
    year: 2025,
    duration: "14 months",
    area: "4,800 sq ft",
    summary:
      "Six luxury independent duplex villas delivered turnkey with integrated rainwater harvesting systems, solar power arrays, and private landscaped courtyards.",
    scope: [
      "Custom architectural & structural engineering",
      "Thermal-insulating cavity brickwork construction",
      "10kW grid-tied rooftop solar panel integration",
      "Landscaping, boundary civil security & storm water management",
    ],
    outcome:
      "Delivered 100% on schedule and within budget, earning high accolades for thermal insulation and structural longevity.",
    cover: "https://images.unsplash.com/photo-1600596542815-e2ad9e56782f?w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1600596542815-e2ad9e56782f?w=1200&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80",
    ],
  },
  {
    slug: "city-commercial-plaza",
    title: "City Commercial Plaza",
    category: "Commercial",
    location: "Downtown, Your City",
    year: 2023,
    duration: "20 months",
    area: "8,500 sq ft",
    summary:
      "Three-storey retail plaza with underground parking, modular storefront bays, and an expansive second-floor food court.",
    scope: [
      "Heavy commercial load-bearing foundation design",
      "Rapid concrete pouring using pump technology",
      "Fire safety sprinkler and emergency exit compliance",
      "Turnkey facade fabrication & tenant shell preparation",
    ],
    outcome:
      "Handed over with 100% occupancy prior to grand opening, meeting commercial building regulatory standards.",
    cover: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&q=80",
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&q=80",
    ],
  },
  {
    slug: "heritage-school-block",
    title: "Heritage School Block Retrofit",
    category: "Renovation",
    location: "Old Town, Your City",
    year: 2022,
    duration: "8 months",
    area: "6,200 sq ft",
    summary:
      "Full seismic retrofitting, structural reinforcement, and modern educational transformation of a 60-year-old heritage institutional school building.",
    scope: [
      "Non-destructive ultrasonic pulse velocity concrete testing",
      "Reinforced concrete column and beam jacketing",
      "Roof timber truss treatment and structural steel tie installation",
      "Modern interior acoustics, lighting, and classroom upgrades",
    ],
    outcome:
      "Preserved historical facade aesthetics while certifying the structure to Zone IV earthquake safety benchmarks.",
    cover: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&q=80",
      "https://images.unsplash.com/photo-1581589127319-27996835facc?w=1200&q=80",
    ],
  },
  {
    slug: "riverfront-apartments",
    title: "Riverfront Apartments",
    category: "Residential",
    location: "River Colony, Your City",
    year: 2026,
    duration: "16 months",
    area: "28,000 sq ft",
    summary:
      "Exclusive G+4 residential enclave overlooking the riverbank, designed with deep pile foundations to counter riverbed soil settlement.",
    scope: [
      "Geotechnical riverbed soil stabilization & sheet piling",
      "Raft-cum-pile foundation engineered for high water table",
      "Cantilevered panoramic viewing balconies",
      "Integrated rooftop infinity water reservoir and gardens",
    ],
    outcome:
      "Soil stabilization and substructure works completed with zero deviation from geotechnical specifications.",
    cover: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=1200&q=80",
      "https://images.unsplash.com/photo-1541888946425-d81bb19940f2?w=1200&q=80",
    ],
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getAllProjectSlugs(): string[] {
  return projects.map((p) => p.slug);
}
