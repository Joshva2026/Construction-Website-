/*
 * Default content for the site.
 * The admin panel edits a copy of this in the browser's localStorage.
 * To publish changes permanently, export the JSON from the admin panel
 * and replace this object (or import it on each device).
 *
 * HERO FOOTAGE (the scroll-driven real construction video):
 *  - heroMedia.video: path or URL to a real construction video, e.g. "assets/site-timelapse.mp4"
 *    Best results: H.264 MP4, short (10-30 s), 1280px wide or more, keyframe every frame:
 *      ffmpeg -i raw.mp4 -vf scale=1920:-2 -c:v libx264 -g 1 -keyint_min 1 -crf 23 -an assets/site-timelapse.mp4
 *  - OR heroMedia.photos: list of image URLs in order of progress (e.g. foundation -> finished building)
 *  - The video/photos are scrubbed with the scroll: scroll down = construction moves forward.
 */
const DEFAULT_DATA = {
  settings: {
    brandName: "Civil Engineering Works",
    engineerName: "Er. Your Name",
    heroTitle: "Building the future, one floor at a time",
    heroTagline: "Structural design, site supervision and turnkey construction for homes, offices and infrastructure.",
    phone: "+91 00000 00000",
    email: "hello@example.com",
    address: "Your city, India",
    whatsapp: "",
    footerNote: "Licensed civil engineer. Quality, safety and on-time delivery."
  },
  heroMedia: {
    video: "assets/site-timelapse-scroll.mp4",
    photos: []
  },
  // Passwords are stored as SHA-256 hashes. null = default password "admin123" is set on first run.
  adminHash: null,
  workingSites: [
    {
      id: "w1",
      name: "Green Valley Residential Tower",
      location: "Your city",
      type: "Residential",
      status: "In progress",
      progress: 60,
      startDate: "2026-02-01",
      image: "",
      description: "G+7 residential building with 32 apartments, RCC frame and earthquake-resistant detailing."
    },
    {
      id: "w2",
      name: "Central Office Complex",
      location: "Your city",
      type: "Commercial",
      status: "In progress",
      progress: 25,
      startDate: "2026-08-15",
      image: "",
      description: "Four-floor commercial building with basement parking and modern facade work."
    }
  ],
  completedSites: [
    {
      id: "c1",
      name: "Riverside Duplex Villas",
      location: "Your city",
      type: "Residential",
      year: 2025,
      area: "4,800 sq ft",
      client: "Private client",
      image: "",
      description: "Six independent duplex villas completed on schedule with rainwater harvesting."
    },
    {
      id: "c2",
      name: "District Warehouse",
      location: "Your city",
      type: "Industrial",
      year: 2024,
      area: "12,000 sq ft",
      client: "Logistics company",
      image: "",
      description: "Pre-engineered steel warehouse with heavy-duty flooring and loading docks."
    }
  ],
  enquiries: []
};
