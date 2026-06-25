type GalleryImage = {
  src: string;
  alt: string;
};

export const siteConfig = {
  brand: {
    name: "AURE STUDIO",
    tagline: "The People Groomers",
    theme: "Luxury • Technology • Transformation",
    colors: {
      primaryGold: "#aa784b",
      ivoryWhite: "#f4f2f2",
      deepTaupe: "#4c433b"
    }
  },
  event: {
    name: "Exclusive Launch High Tea",
    headline: "Where Beauty Meets Intelligent Luxury",
    dateLabel: "12 July 2026",
    dayLabel: "Sunday",
    timeLabel: "4:00 PM Onwards",
    isoDateTime: "2026-07-12T16:00:00+05:30",
    venue: {
      name: "AURE STUDIO",
      addressLines: [
        "First Floor, Metro Pillar 544",
        "Stadium Road",
        "Janatha, Palarivattom",
        "Ernakulam, Kerala 682025"
      ],
      mapsUrl:
        "https://www.google.com/maps/search/?api=1&query=First%20Floor%20Metro%20Pillar%20544%20Stadium%20Road%20Janatha%20Palarivattom%20Ernakulam%20Kerala%20682025",
      directionsUrl:
        "https://www.google.com/maps/dir/?api=1&destination=First%20Floor%20Metro%20Pillar%20544%20Stadium%20Road%20Janatha%20Palarivattom%20Ernakulam%20Kerala%20682025",
      embedUrl:
        "https://www.google.com/maps?q=First%20Floor%20Metro%20Pillar%20544%20Stadium%20Road%20Janatha%20Palarivattom%20Ernakulam%20Kerala%20682025&output=embed"
    }
  },
  story: {
    kicker: "A new grooming atelier for a more considered future",
    title: "Beauty, technology, wellness, and personal luxury converge.",
    body:
      "AURE STUDIO is designed as a calm, intelligent destination for transformation. Every consultation, ritual, service, and hospitality detail is shaped around the individual, blending high-touch beauty expertise with modern diagnostic technology and a quietly luxurious wellness rhythm."
  },
  highlights: [
    {
      title: "AI Mirror Consultation Experience",
      text: "Intelligent diagnostics and visual guidance for deeply personal grooming decisions."
    },
    {
      title: "Korean Scalp & Wellness Rituals",
      text: "Restorative rituals inspired by Korean wellness, scalp health, and sensory calm."
    },
    {
      title: "Luxury Hair & Beauty Services",
      text: "Precision-led styling, care, finishing, and beauty services in an elevated studio setting."
    },
    {
      title: "Signature Hospitality Experience",
      text: "Warm, elegant hosting from arrival to farewell, curated for launch guests."
    },
    {
      title: "Curated High Tea & Networking",
      text: "A refined afternoon gathering for guests, founders, creatives, and well-wishers."
    }
  ],
  invitation: {
    preReveal: "Break the golden seal",
    revealedTitle: "You are invited",
    revealedBody:
      "Join us for an intimate high tea as AURE STUDIO opens its doors to a new era of intelligent grooming and luxury wellness."
  },
  rsvp: {
    recipientEmail: "hello@aurestudio.in",
    whatsappNumber: "919999999999",
    whatsappMessage:
      "Hello AURE STUDIO, I would like to confirm my attendance for the Exclusive Launch High Tea on 12 July 2026."
  },
  social: {
    instagram: "https://instagram.com/aurestudio",
    facebook: "https://facebook.com/aurestudio",
    whatsapp: "https://wa.me/919999999999",
    website: "https://aurestudio.in"
  },
  assets: {
    logo: "/assets/brand/aure-logo-full.png",
    wordmark: "/assets/brand/aure-wordmark.png",
    mark: "/assets/brand/aure-mark.png",
    ogImage: "/assets/brand/og-aure-launch.jpg",
    whatsappPreviewImage: "/assets/brand/og-aure-launch.jpg",
    facebookPreviewImage: "/assets/brand/og-aure-launch.jpg",
    instagramShareImage: "/assets/brand/social-square.jpg",
    audio: "/audio/ambient.mp3",
    hero: "/assets/brand/hero-aure-invitation.jpg",
    invitationArtwork: "/assets/gallery/gallery-15.jpg",
    gallery: [
  { src: "/assets/gallery/gallery-01.jpg", alt: "AURE STUDIO luxury interior" },
  { src: "/assets/gallery/gallery-02.jpg", alt: "AURE STUDIO grooming station" },
  { src: "/assets/gallery/gallery-03.jpg", alt: "AURE STUDIO ambiance" },
  { src: "/assets/gallery/gallery-04.jpg", alt: "AURE STUDIO service area" },
  { src: "/assets/gallery/gallery-05.jpg", alt: "AURE STUDIO consultation space" },
  { src: "/assets/gallery/gallery-06.jpg", alt: "AURE STUDIO wellness area" },
  { src: "/assets/gallery/gallery-07.jpg", alt: "AURE STUDIO detail shot" },
  { src: "/assets/gallery/gallery-08.jpg", alt: "AURE STUDIO lounge" },
  { src: "/assets/gallery/gallery-09.jpg", alt: "AURE STUDIO entrance" },
  { src: "/assets/gallery/gallery-10.jpg", alt: "AURE STUDIO styling area" },
  { src: "/assets/gallery/gallery-11.jpg", alt: "AURE STUDIO decor detail" },
  { src: "/assets/gallery/gallery-12.jpg", alt: "AURE STUDIO lighting detail" },
  { src: "/assets/gallery/gallery-13.jpg", alt: "AURE STUDIO product display" },
  { src: "/assets/gallery/gallery-14.jpg", alt: "AURE STUDIO waiting area" },
  { src: "/assets/gallery/gallery-15.jpg", alt: "AURE STUDIO invitation artwork" }
] as GalleryImage[]
  },
  seo: {
    siteUrl: "https://aurestudio.in",
    title: "AURE STUDIO – Exclusive Launch High Tea",
    description:
      "Join us as we unveil AURE STUDIO – The People Groomers. Experience luxury, innovation, beauty, wellness, and hospitality in a world-class launch event.",
    keywords: [
      "AURE STUDIO",
      "The People Groomers",
      "Exclusive Launch High Tea",
      "Luxury beauty studio",
      "Korean wellness",
      "AI mirror consultation",
      "Kerala beauty launch"
    ]
  }
} as const;

export type SiteConfig = typeof siteConfig;
