"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, MotionConfig, useReducedMotion } from "framer-motion";
import {
  CalendarDays,
  ChevronDown,
  Clock,
  MapPin,
  Navigation,
  Pause,
  Share2,
  Sparkles,
  Volume2,
  VolumeX,
  X
} from "lucide-react";
import { siteConfig } from "@/lib/siteConfig";

type Countdown = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

const springEase: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];
const luxuryEase: [number, number, number, number] = [0.22, 1, 0.36, 1];

const fadeUp = {
  hidden: { opacity: 0, y: 36 },
  visible: { opacity: 1, y: 0, transition: { ease: springEase, duration: 0.7 } }
};

const cardReveal = {
  hidden: { opacity: 0, y: 34, scale: 0.97 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { ease: springEase, duration: 0.62 } }
};

function getCountdown(): Countdown {
  const target = new Date(siteConfig.event.isoDateTime).getTime();
  const diff = Math.max(0, target - Date.now());
  return {
    days: Math.floor(diff / 86400000),
    hours: Math.floor((diff / 3600000) % 24),
    minutes: Math.floor((diff / 60000) % 60),
    seconds: Math.floor((diff / 1000) % 60)
  };
}

type ExperienceItem = {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  particleType: "gold-dust" | "steam" | "wave" | "sheen" | "connection" | "holographic";
};

const experiences: ExperienceItem[] = [
  {
    id: "launch",
    number: "01",
    title: "Grand Unveiling",
    subtitle: "Launch Event",
    description:
      "Be among the first to step inside AURE STUDIO. An evening of quiet elegance, discovery, and introduction to a new era of intelligent beauty.",
    particleType: "gold-dust"
  },
  {
    id: "high-tea",
    number: "02",
    title: "Exclusive High Tea",
    subtitle: "Culinary Experience",
    description:
      "A refined afternoon with curated teas, artisanal patisserie, and warm hospitality. Every detail designed for intimate conversation and quiet celebration.",
    particleType: "steam"
  },
  {
    id: "wellness",
    number: "03",
    title: "Korean Scalp & Wellness Rituals",
    subtitle: "Restorative Journey",
    description:
      "Restorative rituals inspired by Korean wellness traditions. Expert scalp care, holistic treatments, and sensory calm in a space designed for deep renewal.",
    particleType: "wave"
  },
  {
    id: "beauty",
    number: "04",
    title: "Luxury Hair & Beauty Services",
    subtitle: "Precision & Care",
    description:
      "Precision-led styling, finishing, and beauty services in an elevated studio. Every treatment tailored, every detail considered for a transformative result.",
    particleType: "sheen"
  },
  {
    id: "hospitality",
    number: "05",
    title: "Signature Hospitality",
    subtitle: "Warm Welcome",
    description:
      "Warm, elegant hosting from arrival to farewell. Every guest welcomed into a space designed for comfort, privacy, and quiet, considered luxury.",
    particleType: "connection"
  },
  {
    id: "ai-mirror",
    number: "06",
    title: "AI Mirror Consultation",
    subtitle: "Intelligent Diagnostics",
    description:
      "Step before the AI Mirror for intelligent diagnostics and visual guidance. Technology meets intuition for grooming decisions that are deeply personal and precisely informed.",
    particleType: "holographic"
  }
];

const particleConfig: Record<ExperienceItem["particleType"], { count: number; color: string; size: string; duration: string }> = {
  "gold-dust": { count: 12, color: "rgba(226, 189, 134, 0.7)", size: "3px", duration: "6s" },
  steam: { count: 10, color: "rgba(244, 242, 242, 0.25)", size: "6px", duration: "9s" },
  wave: { count: 10, color: "rgba(160, 190, 160, 0.3)", size: "4px", duration: "7s" },
  sheen: { count: 12, color: "rgba(244, 242, 242, 0.5)", size: "3px", duration: "5s" },
  connection: { count: 10, color: "rgba(196, 154, 110, 0.35)", size: "4px", duration: "8s" },
  holographic: { count: 14, color: "rgba(180, 200, 230, 0.4)", size: "3px", duration: "4s" }
};

function ExperienceParticles({ type }: { type: ExperienceItem["particleType"] }) {
  const config = particleConfig[type];
  return (
    <div className="exp-particles" aria-hidden="true">
      {Array.from({ length: config.count }).map((_, i) => (
        <span
          key={i}
          style={{
            left: `${(i * 17 + 8) % 100}%`,
            width: config.size,
            height: config.size,
            background: config.color,
            animationDuration: config.duration,
            animationDelay: `${i * -0.6}s`,
            boxShadow: type === "gold-dust" || type === "sheen" || type === "holographic"
              ? `0 0 6px ${config.color}`
              : "none"
          }}
        />
      ))}
    </div>
  );
}

function ExperiencePrism() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const triggerRefs = useRef<Map<string, HTMLElement>>(new Map());

  const closeOverlay = useCallback(() => {
    setActiveId(null);
    const trigger = activeId ? triggerRefs.current.get(activeId) : null;
    if (trigger) {
      trigger.focus();
    }
  }, [activeId]);

  const handleCardKeyDown = useCallback((item: ExperienceItem, e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setActiveId(item.id);
    }
  }, []);

  useEffect(() => {
    if (activeId) {
      document.body.style.overflow = "hidden";
      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === "Escape") closeOverlay();
      };
      window.addEventListener("keydown", handleEscape);
      return () => {
        document.body.style.overflow = "";
        window.removeEventListener("keydown", handleEscape);
      };
    } else {
      document.body.style.overflow = "";
    }
  }, [activeId, closeOverlay]);

  useEffect(() => {
    if (activeId && overlayRef.current) {
      const focusable = overlayRef.current.querySelector<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (focusable) {
        const timer = setTimeout(() => focusable.focus(), 50);
        return () => clearTimeout(timer);
      }
    }
  }, [activeId]);

  const activeItem = experiences.find((e) => e.id === activeId);

  const fadeSlideUp = {
    hidden: { opacity: 0, y: 50 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.09, duration: 0.7, ease: springEase }
    })
  };

  return (
    <section className="experience-prism" ref={sectionRef} id="experiences" aria-label="Experiences">
      <motion.div
        className="prism-header"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <motion.p
          className="prism-kicker"
          variants={{
            hidden: { opacity: 0, y: 18 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: luxuryEase } }
          }}
        >
          By Invitation Only
        </motion.p>
        <motion.h2
          className="prism-title"
          variants={{
            hidden: { opacity: 0, y: 24 },
            visible: { opacity: 1, y: 0, transition: { delay: 0.15, duration: 0.9, ease: luxuryEase } }
          }}
        >
          An Invitation to Experience<br />
          <span className="prism-emphasis">A New Era of Beauty</span>
        </motion.h2>
        <motion.p
          className="prism-subtitle"
          variants={{
            hidden: { opacity: 0, y: 16 },
            visible: { opacity: 1, y: 0, transition: { delay: 0.3, duration: 0.8, ease: luxuryEase } }
          }}
        >
          Six facets. One vision. Scroll through the AURE experience.
        </motion.p>
      </motion.div>

      <div className="prism-grid" role="list">
        {experiences.map((item, index) => (
          <motion.article
            key={item.id}
            className={`prism-card ${activeId === item.id ? "is-active" : ""}`}
            custom={index}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeSlideUp}
            tabIndex={0}
            role="listitem"
            aria-label={`${item.subtitle}: ${item.title}. ${item.description}`}
            ref={(el) => { if (el) triggerRefs.current.set(item.id, el); }}
            onMouseEnter={() => setActiveId(item.id)}
            onMouseLeave={() => setActiveId(null)}
            onFocus={() => setActiveId(item.id)}
            onBlur={() => setActiveId(null)}
            onKeyDown={(e) => handleCardKeyDown(item, e)}
          >
            <div className="prism-card-inner">
              <ExperienceParticles type={item.particleType} />
              <div className="prism-card-number">{item.number}</div>
              <span className="prism-card-divider" aria-hidden="true" />
              <p className="prism-card-subtitle">{item.subtitle}</p>
              <h3 className="prism-card-title">{item.title}</h3>
              <p className="prism-card-desc">{item.description}</p>
              <div className="prism-card-glint" aria-hidden="true" />
            </div>
          </motion.article>
        ))}
      </div>

      {activeItem && (
        <motion.div
          className="prism-overlay"
          role="dialog"
          aria-modal="true"
          aria-label={`Experience details: ${activeItem.title}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: luxuryEase }}
          onClick={closeOverlay}
          ref={overlayRef}
        >
          <motion.div
            className="prism-overlay-content"
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.5, ease: springEase }}
            onClick={(e) => e.stopPropagation()}
          >
            <button className="prism-overlay-close" type="button" onClick={closeOverlay} aria-label="Close experience details">
              <X size={20} />
            </button>
            <div className="prism-overlay-body">
              <ExperienceParticles type={activeItem.particleType} />
              <span className="prism-overlay-number">{activeItem.number}</span>
              <span className="prism-card-divider" aria-hidden="true" />
              <p className="prism-overlay-subtitle">{activeItem.subtitle}</p>
              <h3 className="prism-overlay-title">{activeItem.title}</h3>
              <p className="prism-overlay-desc">{activeItem.description}</p>
              <span className="prism-overlay-footnote">Part of the AURE STUDIO launch experience</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </section>
  );
}

function AnimatedParticles() {
  return (
    <div className="particles" aria-hidden="true">
      {Array.from({ length: 28 }).map((_, index) => (
        <span
          key={index}
          style={
            {
              "--x": `${(index * 37) % 100}%`,
              "--d": `${7 + (index % 8)}s`,
              "--s": `${4 + (index % 5)}px`,
              "--delay": `${index * -0.42}s`
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
}

function AudioControl({ entered }: { entered: boolean }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [muted, setMuted] = useState(true);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (!entered || !audioRef.current) return;
    audioRef.current.volume = 0.22;
    audioRef.current.muted = false;
    audioRef.current
      .play()
      .then(() => {
        setMuted(false);
        setPlaying(true);
      })
      .catch(() => {
        setMuted(true);
        setPlaying(false);
      });
  }, [entered]);

  const toggle = async () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing && !muted) {
      audio.muted = true;
      setMuted(true);
      return;
    }
    audio.muted = false;
    await audio.play();
    setPlaying(true);
    setMuted(false);
  };

  return (
    <>
      <audio ref={audioRef} src={siteConfig.assets.audio} loop preload="metadata" />
      <button className="audio-button" type="button" onClick={toggle} aria-label={muted ? "Unmute ambient soundtrack" : "Mute ambient soundtrack"}>
        {muted ? <VolumeX size={18} /> : <Volume2 size={18} />}
      </button>
    </>
  );
}

function Splash({ onEnter }: { onEnter: () => void }) {
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") {
        if (buttonRef.current === document.activeElement || document.activeElement?.closest(".splash")) {
          onEnter();
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    buttonRef.current?.focus();
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onEnter]);

  return (
    <motion.div
      className="splash"
      role="dialog"
      aria-modal="true"
      aria-label="Welcome to AURE STUDIO launch invitation"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.9, ease: luxuryEase }}
    >
      <AnimatedParticles />
      <motion.div className="splash-inner" initial={{ y: 24, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 1.15, ease: luxuryEase }}>
        <motion.div className="logo-reveal" initial={{ clipPath: "inset(0 100% 0 0)" }} animate={{ clipPath: "inset(0 0% 0 0)" }} transition={{ duration: 1.4, ease: luxuryEase }}>
          <Image src={siteConfig.assets.logo} alt={`${siteConfig.brand.name} logo`} width={1240} height={380} quality={100} priority />
        </motion.div>
        <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.75, duration: 0.8, ease: luxuryEase }}>
          {siteConfig.brand.tagline}
        </motion.p>
        <motion.button className="enter-button" type="button" onClick={onEnter} ref={buttonRef} aria-label={`Enter the ${siteConfig.brand.name} invitation experience`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.25, duration: 0.8, ease: luxuryEase }} whileHover={{ y: -3 }} whileTap={{ scale: 0.97 }}>
          Click Here to Open
          <ChevronDown size={18} aria-hidden="true" />
        </motion.button>
      </motion.div>
    </motion.div>
  );
}

function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const copyY = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);

  return (
    <section className="hero" ref={heroRef} aria-label="Hero">
      <AnimatedParticles />
      <motion.div className="hero-copy" style={{ y: copyY }} initial="hidden" animate="visible" transition={{ staggerChildren: 0.14 }}>
        <motion.div variants={fadeUp} className="hero-mark">
          <Image src={siteConfig.assets.logo} alt={siteConfig.brand.name} width={1040} height={340} quality={100} priority />
        </motion.div>
        <motion.p variants={fadeUp} className="eyebrow">{siteConfig.event.name}</motion.p>
        <motion.h1 variants={fadeUp}>{siteConfig.event.headline}</motion.h1>
        <motion.div variants={fadeUp} className="hero-meta">
          <span>{siteConfig.event.dateLabel}</span>
          <span>{siteConfig.event.dayLabel}</span>
          <span>{siteConfig.event.timeLabel}</span>
        </motion.div>
        <motion.a variants={fadeUp} href="#details" className="primary-cta" aria-label="Scroll to event details" whileHover={{ y: -3 }} whileTap={{ scale: 0.97 }}>
          <Sparkles size={18} aria-hidden="true" />
        </motion.a>
      </motion.div>
    </section>
  );
}

function SectionHeader({ kicker, title }: { kicker: string; title: string }) {
  return (
    <motion.div className="section-header" initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.7 }} variants={fadeUp}>
      <p>{kicker}</p>
      <h2>{title}</h2>
    </motion.div>
  );
}

function Story() {
  return (
    <section className="story section-shell" id="story" aria-label="Story">
      <SectionHeader kicker={siteConfig.story.kicker} title={siteConfig.story.title} />
      <motion.p className="story-body" initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ delay: 0.12, duration: 0.8, ease: springEase }} variants={fadeUp}>
        {siteConfig.story.body}
      </motion.p>
    </section>
  );
}

function Highlights() {
  return (
    <section className="highlights section-shell" id="experience" aria-label="Highlights">
      <SectionHeader kicker={siteConfig.brand.theme} title="An invitation into the AURE experience." />
      <div className="highlight-grid" role="list">
        {siteConfig.highlights.map((item, index) => (
          <motion.article
            className="highlight-card"
            key={item.title}
            variants={cardReveal}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            transition={{ delay: index * 0.07 }}
            whileHover={{ y: -6, transition: { duration: 0.3, ease: springEase } }}
            role="listitem"
          >
            <span>{String(index + 1).padStart(2, "0")}</span>
            <h3>{item.title}</h3>
            <p>{item.text}</p>
          </motion.article>
        ))}
      </div>
    </section>
  );
}

function CountdownSection() {
  const [countdown, setCountdown] = useState<Countdown | null>(null);
  const countdownEntries: Array<[keyof Countdown, number | null]> = countdown
    ? Object.entries(countdown) as Array<[keyof Countdown, number]>
    : [
        ["days", null],
        ["hours", null],
        ["minutes", null],
        ["seconds", null]
      ];

  useEffect(() => {
    setCountdown(getCountdown());
    const id = window.setInterval(() => setCountdown(getCountdown()), 1000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <section className="countdown-band" id="countdown" aria-label="Event countdown">
      <SectionHeader kicker="Live countdown" title={`${siteConfig.event.dateLabel} at 4:00 PM IST`} />
      <div className="countdown-grid" aria-live="polite" aria-label="Time remaining until event">
        {countdownEntries.map(([label, value]) => (
          <motion.div key={label} className="count-box" initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, ease: springEase }}>
            <strong suppressHydrationWarning aria-label={`${label}: ${value === null ? "--" : value}`}>{value === null ? "--" : String(value).padStart(2, "0")}</strong>
            <span>{label}</span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function EventDetails() {
  const detailItems = [
    { icon: CalendarDays, label: "Date", value: siteConfig.event.dateLabel },
    { icon: Clock, label: "Time", value: siteConfig.event.timeLabel },
    { icon: MapPin, label: "Venue", value: siteConfig.event.venue.addressLines.join(", ") }
  ];

  return (
    <section className="details section-shell" id="details" aria-label="Event details">
      <SectionHeader kicker="Event details" title="An intimate Sunday high tea at AURE STUDIO." />
      <div className="detail-grid" role="list">
        {detailItems.map(({ icon: Icon, label, value }) => (
          <motion.article key={label} className="detail-item" role="listitem" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <Icon size={22} aria-hidden="true" />
            <span>{label}</span>
            <p>{value}</p>
          </motion.article>
        ))}
      </div>
    </section>
  );
}

function Location() {
  const shareLocation = async () => {
    const text = `${siteConfig.brand.name} launch venue: ${siteConfig.event.venue.addressLines.join(", ")}`;
    if (navigator.share) {
      await navigator.share({ title: siteConfig.brand.name, text, url: siteConfig.event.venue.mapsUrl });
      return;
    }
    await navigator.clipboard.writeText(`${text} ${siteConfig.event.venue.mapsUrl}`);
  };

  return (
    <section className="location section-shell" id="location" aria-label="Location">
      <SectionHeader kicker="Location" title="Arrive at the first floor, beside Metro Pillar 544." />
      <div className="map-wrap">
        <iframe title="AURE STUDIO location map" src={siteConfig.event.venue.embedUrl} loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
      </div>
      <motion.div className="action-row" role="group" aria-label="Location actions" initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-40px" }} variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}>
        <motion.a variants={fadeUp} href={siteConfig.event.venue.mapsUrl} target="_blank" rel="noopener noreferrer" whileHover={{ y: -3 }} whileTap={{ scale: 0.97 }}>
          <MapPin size={18} aria-hidden="true" />
          Open in Google Maps
        </motion.a>
        <motion.a variants={fadeUp} href={siteConfig.event.venue.directionsUrl} target="_blank" rel="noopener noreferrer" whileHover={{ y: -3 }} whileTap={{ scale: 0.97 }}>
          <Navigation size={18} aria-hidden="true" />
          Get Directions
        </motion.a>
        <motion.button variants={fadeUp} type="button" onClick={shareLocation} whileHover={{ y: -3 }} whileTap={{ scale: 0.97 }}>
          <Share2 size={18} aria-hidden="true" />
          Share Location
        </motion.button>
      </motion.div>
    </section>
  );
}

function SocialFooter() {
  return (
    <motion.footer className="social-footer" aria-label="Site footer" initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-40px" }} variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}>
      <motion.div variants={fadeUp}>
        <Image src={siteConfig.assets.wordmark} alt={`${siteConfig.brand.name} wordmark`} width={360} height={40} quality={100} />
      </motion.div>
      <motion.p variants={fadeUp}>{siteConfig.brand.tagline} — {siteConfig.event.dateLabel}</motion.p>
      <motion.small variants={fadeUp}>&copy; {new Date().getFullYear()} {siteConfig.brand.name}. All rights reserved.</motion.small>
    </motion.footer>
  );
}

export default function Home() {
  const [entered, setEntered] = useState(false);
  const prefersReduced = useReducedMotion();

  return (
    <MotionConfig reducedMotion="user">
      <a href="#story" className="skip-link">
        Skip to main content
      </a>
      <main>
        <motion.div
          className="ambient-glow"
          aria-hidden="true"
          animate={prefersReduced ? {} : {
            opacity: [0.5, 0.9, 0.5],
            scale: [1, 1.08, 1]
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: luxuryEase
          }}
        />
        {!entered && <Splash onEnter={() => setEntered(true)} />}
        <AudioControl entered={entered} />
        <Hero />
        <Story />
        <Highlights />
        <ExperiencePrism />
        <CountdownSection />
        <EventDetails />
        <Location />
        <SocialFooter />
        <button
          className="pause-motion"
          type="button"
          aria-label="Pause decorative motion"
          onClick={() => document.documentElement.classList.toggle("reduce-motion")}
        >
          <Pause size={16} aria-hidden="true" />
        </button>
      </main>
    </MotionConfig>
  );
}
