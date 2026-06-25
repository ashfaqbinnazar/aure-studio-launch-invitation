"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import gsap from "gsap";
import {
  CalendarDays,
  ChevronDown,
  Clock,
  MapPin,
  Navigation,
  Pause,
  Play,
  Share2,
  Sparkles,
  Volume2,
  VolumeX
} from "lucide-react";
import { siteConfig } from "@/lib/siteConfig";

type Countdown = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

const fadeUp = {
  hidden: { opacity: 0, y: 36 },
  visible: { opacity: 1, y: 0 }
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
  return (
    <motion.div
      className="splash"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.04, filter: "blur(10px)" }}
      transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
    >
      <AnimatedParticles />
      <motion.div className="splash-inner" initial={{ y: 24, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 1.15 }}>
        <motion.div className="logo-reveal" initial={{ clipPath: "inset(0 100% 0 0)" }} animate={{ clipPath: "inset(0 0% 0 0)" }} transition={{ duration: 1.4, ease: "easeInOut" }}>
          <Image src={siteConfig.assets.logo} alt={`${siteConfig.brand.name} logo`} width={1240} height={380} priority />
        </motion.div>
        <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.75, duration: 0.8 }}>
          {siteConfig.brand.tagline}
        </motion.p>
        <motion.button className="enter-button" type="button" onClick={onEnter} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.25, duration: 0.8 }}>
          Tap To Enter
          <ChevronDown size={18} />
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
    <section className="hero" ref={heroRef}>
      <AnimatedParticles />
      <motion.div className="hero-copy" style={{ y: copyY }} initial="hidden" animate="visible" transition={{ staggerChildren: 0.14 }}>
        <motion.div variants={fadeUp} className="hero-mark">
          <Image src={siteConfig.assets.logo} alt={siteConfig.brand.name} width={1040} height={340} priority />
        </motion.div>
        <motion.p variants={fadeUp} className="eyebrow">{siteConfig.event.name}</motion.p>
        <motion.h1 variants={fadeUp}>{siteConfig.event.headline}</motion.h1>
        <motion.div variants={fadeUp} className="hero-meta">
          <span>{siteConfig.event.dateLabel}</span>
          <span>{siteConfig.event.dayLabel}</span>
          <span>{siteConfig.event.timeLabel}</span>
        </motion.div>
        <motion.a variants={fadeUp} href="#details" className="primary-cta">
          <Sparkles size={18} />
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
    <section className="story section-shell" id="story">
      <SectionHeader kicker={siteConfig.story.kicker} title={siteConfig.story.title} />
      <motion.p className="story-body" initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ delay: 0.12, duration: 0.8 }} variants={fadeUp}>
        {siteConfig.story.body}
      </motion.p>
    </section>
  );
}

function Highlights() {
  return (
    <section className="highlights section-shell" id="experience">
      <SectionHeader kicker={siteConfig.brand.theme} title="An invitation into the AURE experience." />
      <div className="highlight-grid">
        {siteConfig.highlights.map((item, index) => (
          <motion.article
            className="highlight-card"
            key={item.title}
            initial={{ opacity: 0, y: 34, scale: 0.97 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ delay: index * 0.07, duration: 0.62 }}
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

function DigitalInvitation() {
  const [revealed, setRevealed] = useState(false);
  const petals = useMemo(() => Array.from({ length: 18 }), []);

  return (
    <section className="invitation section-shell" id="invitation">
      <SectionHeader kicker="Interactive invitation" title="A golden reveal for your private launch entry." />
      <motion.div className={`invite-card ${revealed ? "is-revealed" : ""}`} initial={{ opacity: 0, y: 38 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
        <div className="invite-art">
          <Image src={siteConfig.assets.invitationArtwork} alt="AURE invitation artwork" fill sizes="(max-width: 900px) 100vw, 50vw" />
        </div>
        <div className="invite-content">
          <Image src={siteConfig.assets.mark} alt="" width={92} height={92} />
          <p>{siteConfig.event.name}</p>
          <h2>{revealed ? siteConfig.invitation.revealedTitle : siteConfig.invitation.preReveal}</h2>
          <span>{revealed ? siteConfig.invitation.revealedBody : "Touch the seal to open the ceremonial invitation."}</span>
          <button type="button" onClick={() => setRevealed(true)} aria-label="Break the golden seal">
            {revealed ? <Sparkles size={18} /> : <Play size={18} />}
          </button>
        </div>
        {revealed && (
          <div className="petals" aria-hidden="true">
            {petals.map((_, index) => (
              <i
                key={index}
                style={
                  {
                    "--tx": `${Math.cos(index * 1.9) * 18}rem`,
                    "--ty": `${Math.sin(index * 1.9) * 12}rem`,
                    "--rot": `${index * 31}deg`,
                    "--delay": `${index * 0.08}s`
                  } as React.CSSProperties
                }
              />
            ))}
          </div>
        )}
      </motion.div>
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
    <section className="countdown-band" id="countdown">
      <SectionHeader kicker="Live countdown" title={`${siteConfig.event.dateLabel} at 4:00 PM IST`} />
      <div className="countdown-grid" aria-live="polite">
        {countdownEntries.map(([label, value]) => (
          <motion.div key={label} className="count-box" initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <strong suppressHydrationWarning>{value === null ? "--" : String(value).padStart(2, "0")}</strong>
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
    <section className="details section-shell" id="details">
      <SectionHeader kicker="Event details" title="An intimate Sunday high tea at AURE STUDIO." />
      <div className="detail-grid">
        {detailItems.map(({ icon: Icon, label, value }) => (
          <motion.article key={label} className="detail-item" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <Icon size={22} />
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
    <section className="location section-shell" id="location">
      <SectionHeader kicker="Location" title="Arrive at the first floor, beside Metro Pillar 544." />
      <div className="map-wrap">
        <iframe title="AURE STUDIO location map" src={siteConfig.event.venue.embedUrl} loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
      </div>
      <div className="action-row">
        <a href={siteConfig.event.venue.mapsUrl} target="_blank" rel="noreferrer">
          <MapPin size={18} />
          Open in Google Maps
        </a>
        <a href={siteConfig.event.venue.directionsUrl} target="_blank" rel="noreferrer">
          <Navigation size={18} />
          Get Directions
        </a>
        <button type="button" onClick={shareLocation}>
          <Share2 size={18} />
          Share Location
        </button>
      </div>
    </section>
  );
}

function SocialFooter() {
  return (
    <footer className="social-footer">
      <Image src={siteConfig.assets.wordmark} alt={siteConfig.brand.name} width={360} height={40} />
      <p>{siteConfig.brand.tagline} — {siteConfig.event.dateLabel}</p>
      <small>&copy; {new Date().getFullYear()} {siteConfig.brand.name}. All rights reserved.</small>
    </footer>
  );
}

export default function Home() {
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    gsap.to(".ambient-glow", {
      opacity: 0.9,
      scale: 1.08,
      duration: 5,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });
  }, []);

  return (
    <main>
      <div className="ambient-glow" aria-hidden="true" />
      {!entered && <Splash onEnter={() => setEntered(true)} />}
      <AudioControl entered={entered} />
      <Hero />
      <Story />
      <Highlights />
      <DigitalInvitation />
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
        <Pause size={16} />
      </button>
    </main>
  );
}
