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
      mapsUrl: "https://maps.app.goo.gl/akBFJ5X7LzZPMUUC6",
      directionsUrl: "https://maps.app.goo.gl/akBFJ5X7LzZPMUUC6",
      embedUrl: "https://www.google.com/maps?q=10.0015011,76.3020176&output=embed"
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
    logo: "/assets/brand/aure-logo-master.png",
    wordmark: "/assets/brand/aure-wordmark.png",
    mark: "/assets/brand/aure-mark.png",
    ogImage: "/assets/brand/aure-logo-master.png",
    audio: "/audio/ambient.mp3",
    hero: "/assets/brand/hero-aure-invitation.jpg",

  },
  seo: {
    siteUrl: "https://aure-invitation.vercel.app",
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
