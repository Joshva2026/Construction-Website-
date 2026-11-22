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
    slug: "palani-road-luxury-villas",
    title: "Palani Road Luxury Duplex Enclave",
    category: "Residential",
    location: "Palani Road, Dindigul, Tamil Nadu",
    year: 2026,
    duration: "14 months",
    area: "18,500 sq ft",
    summary:
      "Exclusive gated community of premium independent 3BHK & 4BHK duplex villas with earthquake-resistant RCC frames, private gardens, and solar power integration.",
    scope: [
      "Geotechnical soil investigation & foundation design",
      "RCC framed structure with Fe550D TMT reinforcement",
      "Vaastu-compliant architectural planning & elevation",
      "Underground drainage & rainwater harvesting recharge wells",
    ],
    outcome:
      "Currently 75% complete with structural framework fully certified under IS 456 & IS 1893 seismic codes.",
    cover: "https://images.unsplash.com/photo-1600596542815-e2ad9e56782f?w=1200&auto=format&fit=crop&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1600596542815-e2ad9e56782f?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&auto=format&fit=crop&q=80",
    ],
  },
  {
    slug: "dindigul-central-trade-tower",
    title: "Dindigul Central Commercial Tower",
    category: "Commercial",
    location: "Collectorate Junction, Dindigul, Tamil Nadu",
    year: 2026,
    duration: "20 months",
    area: "42,000 sq ft",
    summary:
      "G+4 multi-tenant commercial plaza featuring basement vehicular parking, high-efficiency central VRF air conditioning, and full-height structural glass facade.",
    scope: [
      "Diaphragm retaining wall & deep basement excavation",
      "Post-tensioned RCC flat-slab construction",
      "Double-glazed acoustic thermal curtain walling",
      "Commercial fire suppression sprinkler system with NOC",
    ],
    outcome:
      "Basement parking and superstructure successfully completed; facade installation progressing ahead of schedule.",
    cover: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&auto=format&fit=crop&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&auto=format&fit=crop&q=80",
    ],
  },
  {
    slug: "nagal-nagar-heritage-retrofit",
    title: "Nagal Nagar Commercial Heritage Retrofit",
    category: "Renovation",
    location: "Nagal Nagar, Dindigul, Tamil Nadu",
    year: 2025,
    duration: "8 months",
    area: "9,200 sq ft",
    summary:
      "Structural rehabilitation and modern architectural modernization of a 45-year-old commercial banking and retail facility in prime Dindigul.",
    scope: [
      "Non-destructive rebound hammer and ultrasonic testing",
      "RCC column and beam steel encasement jacketing",
      "Structural roof crack injection & waterproofing membrane",
      "Modern contemporary ACP elevation and energy-efficient lighting",
    ],
    outcome:
      "Fully restored structural stability certified for 30+ additional service years with modern commercial street appeal.",
    cover: "https://images.unsplash.com/photo-1541888946425-d81bb19940f2?w=1200&auto=format&fit=crop&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1541888946425-d81bb19940f2?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1581589127319-27996835facc?w=1200&auto=format&fit=crop&q=80",
    ],
  },
  {
    slug: "gtn-road-residential-apartments",
    title: "GTN Road Premium Heights",
    category: "Residential",
    location: "GTN College Road, Dindigul, Tamil Nadu",
    year: 2024,
    duration: "16 months",
    area: "32,000 sq ft",
    summary:
      "Stilt + 4 floor residential apartment community with 24 custom-designed flats, automatic lift, rooftop party terrace, and 24/7 security layout.",
    scope: [
      "Raft foundation engineered for local black cotton soil",
      "High-grade M25 machine-batched ready-mix concrete",
      "Solid concrete block masonry with thermal plaster",
      "Centralized pressurized water distribution & solar lighting",
    ],
    outcome:
      "Delivered 3 weeks ahead of scheduled timeline with 100% occupancy on opening day.",
    cover: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&auto=format&fit=crop&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=1200&auto=format&fit=crop&q=80",
    ],
  },
  {
    slug: "madurai-highway-logistics-hub",
    title: "Madurai Highway Industrial PEB Warehouse",
    category: "Commercial",
    location: "Dindigul-Madurai Highway, Tamil Nadu",
    year: 2023,
    duration: "10 months",
    area: "55,000 sq ft",
    summary:
      "Heavy industrial pre-engineered steel warehouse featuring 12-meter clear height, laser-screeded heavy load flooring, and 6 motorized loading dock bays.",
    scope: [
      "Heavy industrial subgrade compaction & foundation pads",
      "High-tensile steel PEB structure with 36m clear span",
      "FM2 tolerance laser-screed floor with steel fiber reinforcement",
      "Industrial storm water canal and perimeter heavy vehicle paving",
    ],
    outcome:
      "Completed with zero lost-time injuries, operating at peak cargo capacity.",
    cover: "https://images.unsplash.com/photo-1581589127319-27996835facc?w=1200&auto=format&fit=crop&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1581589127319-27996835facc?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&auto=format&fit=crop&q=80",
    ],
  },
  {
    slug: "sirumalai-foothills-eco-residence",
    title: "Sirumalai Foothills Modern Residence",
    category: "Residential",
    location: "Sirumalai Foothills, Dindigul, Tamil Nadu",
    year: 2023,
    duration: "9 months",
    area: "5,400 sq ft",
    summary:
      "Luxury biophilic private residence built using natural local granite stone masonry combined with contemporary RCC cantilevered viewing decks.",
    scope: [
      "Terraced slope slope-stability foundation anchoring",
      "Exposed wire-cut brickwork and dressed granite civil masonry",
      "Thermal roof insulation with mud-pot hollow filler slabs",
      "Natural infinity pool and eco-friendly greywater treatment",
    ],
    outcome:
      "Won local regional architectural recognition for low embodied carbon and natural thermal comfort.",
    cover: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&auto=format&fit=crop&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600596542815-e2ad9e56782f?w=1200&auto=format&fit=crop&q=80",
    ],
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getAllProjectSlugs(): string[] {
  return projects.map((p) => p.slug);
}
