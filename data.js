/*
 * Default content for the Civil Engineering Works construction site.
 * Admin panel edits a copy in localStorage. Export JSON from admin to
 * publish changes permanently by replacing this object in data.js.
 */
const DEFAULT_DATA = {
  settings: {
    brandName: "Civil Engineering Works",
    engineerName: "Er. Arjun Sharma",
    heroTitle: "Building the future, one floor at a time",
    heroTagline: "Structural design, site supervision and turnkey construction for homes, offices and infrastructure across the region.",
    phone: "+91 98765 43210",
    email: "hello@civilengineeringworks.in",
    address: "124 MG Road, Civil Lines, Your City, India",
    whatsapp: "919876543210",
    footerNote: "Licensed civil engineer. Quality, safety and on-time delivery."
  },
  heroMedia: {
    video: "",
    photos: []
  },
  adminHash: null,
  workingSites: [
    {
      id: "w1",
      name: "Green Valley Residential Tower",
      location: "Your City",
      type: "Residential",
      status: "In progress",
      progress: 60,
      startDate: "2026-02-01",
      image: "https://images.unsplash.com/photo-1541888946425-d81bb19940f2?w=800&q=80",
      description: "G+7 residential building with 32 apartments, RCC frame, earthquake-resistant detailing, and premium finishes. Structural design, foundation and superstructure in progress."
    },
    {
      id: "w2",
      name: "Central Office Complex",
      location: "Your City",
      type: "Commercial",
      status: "In progress",
      progress: 25,
      startDate: "2026-08-15",
      image: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80",
      description: "Four-floor commercial building with basement parking, modern glass facade, and central HVAC system. Excavation and substructure works underway."
    },
    {
      id: "w3",
      name: "Riverfront Apartments",
      location: "River Colony",
      type: "Residential",
      status: "Planning",
      progress: 10,
      startDate: "2026-10-01",
      image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&q=80",
      description: "Luxury G+4 apartment complex with river views, swimming pool, and landscaped gardens. Soil testing and approvals completed."
    },
    {
      id: "w4",
      name: "Industrial Warehouse Unit",
      location: "Industrial Area",
      type: "Industrial",
      status: "In progress",
      progress: 45,
      startDate: "2026-05-10",
      image: "https://images.unsplash.com/photo-1581589127319-27996835facc?w=800&q=80",
      description: "Pre-engineered steel warehouse with heavy-duty flooring, loading docks, and 12-meter clear height. Primary structure erected."
    }
  ],
  completedSites: [
    {
      id: "c1",
      name: "Riverside Duplex Villas",
      location: "Your City",
      type: "Residential",
      year: 2025,
      area: "4,800 sq ft",
      client: "Private client",
      image: "https://images.unsplash.com/photo-1600596542815-e2ad9e56782f?w=800&q=80",
      description: "Six independent duplex villas completed on schedule with rainwater harvesting, solar panels, and private gardens."
    },
    {
      id: "c2",
      name: "District Warehouse",
      location: "Industrial Area",
      type: "Industrial",
      year: 2024,
      area: "12,000 sq ft",
      client: "Logistics company",
      image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80",
      description: "Pre-engineered steel warehouse with heavy-duty flooring, loading docks, and office block. Delivered two weeks ahead of schedule."
    },
    {
      id: "c3",
      name: "City Commercial Plaza",
      location: "Downtown",
      type: "Commercial",
      year: 2023,
      area: "8,500 sq ft",
      client: "Retail chain",
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80",
      description: "Three-storey retail plaza with basement parking, storefronts, and food court. Full turnkey delivery including interiors."
    },
    {
      id: "c4",
      name: "Heritage School Block",
      location: "Old Town",
      type: "Infrastructure",
      year: 2022,
      area: "6,200 sq ft",
      client: "School trust",
      image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80",
      description: "Renovation and seismic retrofitting of heritage school building with modern classrooms, library, and computer lab."
    }
  ],
  enquiries: []
};
