import github from './assets/githublogo.png'
import linkedin from './assets/linkedinlogo.png'
import face from './assets/myface.png'
import { useState, useEffect, useRef } from 'react';
import MuizIntro from './MuizIntro';
import emailjs from '@emailjs/browser';
import SimonGame from './assets/SimonGame.png';

const EMAILJS_SERVICE_ID = 'service_ced8a35';
const EMAILJS_TEMPLATE_ID = 'template_ew2y7gi';
const EMAILJS_PUBLIC_KEY = 'dbAiIXD2czrnQxLgZ';

interface Project {
  id: number;
  src: string;
  title: string;
  duration: string;
  author: string;
  tag: string [];
  language: string [];
  color: string;
  link: string;
  repo: string;
  views: string;
  ago: string;
}

interface Experience {
  id: number;
  src: string;
  title: string;
  company: string;
  duration: string;
  tag: string;
  color: string;
  link: string;
  views: string;
  ago: string;
}

// ─── Scroll Reveal ────────────────────────────────────────────────────────────


function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(entry.isIntersecting);
      },
      { threshold: (600 / window.innerHeight) } // Trigger when 600px of the element is visible
    );

    if (ref.current) observer.observe(ref.current);

    return () => observer.disconnect();
  }, []);

  return { ref, visible };
}


// ─── Channel Banner ──────────────────────────────────────────────────────────

function ChannelBanner() {
  return (
    <div className="w-full relative overflow-hidden rounded-xl mx-auto" style={{ height: '180px' }}>
      {/* Dark base */}
      <div className="absolute inset-0" style={{ background: '#080c14' }} />

      {/* Dot-grid pattern */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(59,130,246,0.25) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />

      {/* Blue glow blobs */}
      <div
        className="absolute"
        style={{
          width: '340px', height: '340px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(37,99,235,0.18) 0%, transparent 70%)',
          top: '-120px', left: '-60px',
          pointerEvents: 'none',
        }}
      />
      <div
        className="absolute"
        style={{
          width: '260px', height: '260px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(99,102,241,0.14) 0%, transparent 70%)',
          bottom: '-80px', right: '80px',
          pointerEvents: 'none',
        }}
      />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-1">
        <h1
          className="text-white font-bold tracking-tight"
          style={{ fontSize: '2.2rem', letterSpacing: '-0.02em', textShadow: '0 2px 24px rgba(59,130,246,0.35)' }}
        >
          CAN Citizen · Toronto
        </h1>
      </div>

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0"
        style={{ height: '48px', background: 'linear-gradient(to bottom, transparent, rgba(0,0,0,0.55))' }}
      />
    </div>
  );
}

// ─── Filter Chips ─────────────────────────────────────────────────────────────

function FilterChips({
  chips,
  active,
  onChange,
}: {
  chips: { label: string; value: string }[];
  active: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex gap-2 flex-wrap mb-6">
      {chips.map((c) => (
        <button
          key={c.value}
          onClick={() => onChange(c.value)}
          className="px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200"
          style={{
            background: active === c.value ? '#fff' : 'rgba(255,255,255,0.07)',
            color: active === c.value ? '#000' : 'rgba(255,255,255,0.6)',
            border: active === c.value ? '1px solid #fff' : '1px solid rgba(255,255,255,0.12)',
          }}
        >
          {c.label}
        </button>
      ))}
    </div>
  );
}

// ─── Project Card ─────────────────────────────────────────────────────────────

function ProjectCard({
  item,
  index,
  isWatchLater,
  onToggleWL,
}: {
  item: Project;
  index: number;
  isWatchLater: boolean;
  onToggleWL: (id: number) => void;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="flex flex-col"
    >
      {/* Thumbnail */}
      <div className="relative w-full rounded-xl overflow-hidden cursor-pointer" 
      style={{ aspectRatio: '16/9' }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            onClick={() => window.open(item.link, '_blank')}>
        <img
          src={item.src}
          alt={item.title}
          className="w-full h-full object-cover transition-transform duration-500"
          style={{ transform: hovered ? 'scale(1.05)' : 'scale(1)' }}
        />

        {/* Play overlay */}
        <div
          className="absolute inset-0 flex items-center justify-center transition-opacity duration-200"
          style={{ background: 'rgba(0,0,0,0.42)', opacity: hovered ? 1 : 0 }}
        >
          <div
            className="flex items-center justify-center rounded-full"
            style={{ width: 44, height: 44, background: 'rgba(255,255,255,0.92)' }}
          >
            <svg width="14" height="16" viewBox="0 0 14 16" fill="#111">
              <polygon points="0,0 14,8 0,16" />
            </svg>
          </div>
        </div>

        {/* Duration badge */}
        <div
          className="absolute bottom-2 right-2 text-white rounded"
          style={{ background: 'rgba(0,0,0,0.85)', fontSize: '11px', padding: '2px 6px', fontFamily: 'monospace', fontWeight: 700 }}
        >
          {item.duration}
        </div>

        {/* Watch Later button */}
        <button
          onClick={(e) => { e.stopPropagation(); onToggleWL(item.id); }}
          className="absolute top-2 right-2 rounded transition-all duration-150 flex items-center justify-center"
          style={{
            width: 28, height: 28,
            background: isWatchLater ? 'rgba(239,68,68,0.88)' : 'rgba(0,0,0,0.7)',
            opacity: hovered || isWatchLater ? 1 : 0,
            border: 'none',
          }}
          title={isWatchLater ? 'Remove from Watch Later' : 'Save to Watch Later'}
        >
          {isWatchLater ? (
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          ) : (
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
              <path d="M12 5v14M5 12h14" />
            </svg>
          )}
        </button>
      </div>

      {/* Meta row */}
      <div className="flex gap-3 mt-3">
        {/* Mini avatar */}
        <div
          className="flex-shrink-0 rounded-full flex items-center justify-center text-white font-semibold"
          style={{ width: 32, height: 32, background: '#2563eb', fontSize: 12 }}
        >
          MJ
        </div>

        <div className="flex flex-col min-w-0">
          <p
            className="text-white font-medium leading-snug"
            style={{ fontSize: 13, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}
          >
            {item.title}
          </p>
          <p className="text-gray-500 mt-0.5" style={{ fontSize: 11 }}>
            {item.author}
          </p>
          <p className="text-gray-500" style={{ fontSize: 11 }}>
            {item.views} &nbsp;·&nbsp; {item.ago}
          </p>

          {/* Tag pill */}
          <div className="flex flex-wrap gap-1 mt-1">
            {item.tag.map((t) => (
              <span
                key={t}
                className="self-start rounded-full"
                style={{ fontSize: 10, padding: '2px 8px', background: 'rgba(37,99,235,0.18)', color: '#7eb3f5', border: '1px solid rgba(37,99,235,0.3)' }}
              >
                {t}
              </span>
            ))}
          </div>
          <div className="flex flex-wrap gap-1 mt-1">
            {item.language.map((t) => (
              <span
                key={t}
                className="self-start rounded-full"
                style={{ fontSize: 10, padding: '2px 8px', background: 'rgba(37,99,235,0.18)', color: '#6ee7b7', border: '1px solid rgba(37,99,235,0.3)' }}
              >
                {t}
              </span>
            ))}

          </div>
        </div>
      </div>
      {/* Buttons */}
      <div className="flex gap-2 mt-3">
        <button
          onClick={() => window.open(item.repo, '_blank')}
          className="text-white rounded-full font-medium transition-all duration-200"
          style={{ background: 'rgba(255,255,255,0.08)', fontSize: 11, padding: '6px 14px', border: '1px solid rgba(255,255,255,0.12)' }}
        >
          Source
        </button>
      </div>
    </div>
  );
}

// ─── Experience Card ─

function ExperienceCard({ item, index }: { item: Experience; index: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="flex flex-col"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Thumbnail */}
      <div className="relative w-full rounded-xl overflow-hidden cursor-pointer " style={{ aspectRatio: '16/9' }} 
            onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}>
        <img
          src={item.src}
          alt={item.title}
          className="w-full h-full object-cover transition-transform duration-500"
          style={{ transform: hovered ? 'scale(1.05)' : 'scale(1)' }}
        />

        {/* Overlay */}
        <div
          className="absolute inset-0 transition-opacity duration-200"
          style={{ background: 'rgba(0,0,0,0.38)', opacity: hovered ? 1 : 0 }}
        />

        {/* Duration badge */}
        <div
          className="absolute bottom-2 right-2 text-white rounded"
          style={{ background: 'rgba(0,0,0,0.85)', fontSize: '11px', padding: '2px 6px', fontFamily: 'monospace', fontWeight: 700 }}
        >
          {item.duration}
        </div>

        {/* Tag badge on hover */}
        <div
          className="absolute top-2 left-2 transition-opacity duration-200"
          style={{ opacity: hovered ? 1 : 0 }}
        >
          <span
            className="rounded-full text-blue-400"
            style={{ fontSize: 11, padding: '3px 10px', border: '1px solid rgba(96,165,250,0.4)', background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(4px)' }}
          >
            {item.tag}
          </span>
        </div>
      </div>

      {/* Meta row */}
      <div className="flex gap-3 mt-3">
        <div
          className="flex-shrink-0 rounded-full flex items-center justify-center text-white font-semibold"
          style={{ width: 32, height: 32, background: '#2563eb', fontSize: 12 }}
        >
          MJ
        </div>

        <div className="flex flex-col min-w-0">
          <p
            className="text-white font-medium leading-snug"
            style={{ fontSize: 13, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}
          >
            {item.title}
          </p>
          <p className="text-gray-500 mt-0.5" style={{ fontSize: 11 }}>
            {item.company}
          </p>
          <p className="text-gray-500" style={{ fontSize: 11 }}>
            {item.views} &nbsp;·&nbsp; {item.ago}
          </p>

          <span
            className="mt-1 self-start rounded-full"
            style={{ fontSize: 10, padding: '2px 8px', background: 'rgba(37,99,235,0.18)', color: '#7eb3f5', border: '1px solid rgba(37,99,235,0.3)' }}
          >
            {item.tag}
          </span>
        </div>
      </div>
    </div>
  );
}

// ─── Watch Later Panel ────────────────────────────────────────────────────────

function WatchLaterPanel({ ids, projects }: { ids: Set<number>; projects: Project[] }) {
  const saved = projects.filter((p) => ids.has(p.id));
  if (!saved.length) return null;

  return (
    <div
      className="w-11/12 mx-auto mb-6 rounded-xl p-4"
      style={{ background: '#111827', border: '1px solid rgba(255,255,255,0.07)' }}
    >
      <p className="text-white font-semibold text-sm mb-3">
        Watch Later &nbsp;
        <span className="text-gray-500 font-normal">({saved.length})</span>
      </p>
      <div className="flex flex-col gap-2">
        {saved.map((p) => (
          <div key={p.id} className="flex items-center gap-3">
            <div className="rounded-lg overflow-hidden flex-shrink-0" style={{ width: 80, height: 46 }}>
              <img src={p.src} alt={p.title} className="w-full h-full object-cover" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white font-medium truncate" style={{ fontSize: 12 }}>{p.title}</p>
              <p className="text-gray-500" style={{ fontSize: 11 }}>{p.ago}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const projects: Project[] = [
  {
    id: 1,
    src: linkedin,
    title: 'AI Powered Typing Test Application',
    duration: '11:42',
    author: 'Muiz Jafri',
    tag: ['Web Dev', ' Machine Learning' ],
    language: ['Python', 'JavaScript'],
    color: '#1a2744',
    link: 'https://www.youtube.com/@muizjafri2872',
    repo: 'https://github.com/muizjafri/TypingTest',
    views: '1.2k views',
    ago: '2025',
  },
  {
    id: 2,
    src: github,
    title: 'Real-Time Object Recognition & AI Assistant',
    duration: '12:44',
    author: 'Muiz Jafri',
    tag: ['Computer Vision'],
    language: ['Python', 'TensorFlow', 'OpenCV'],
    color: '#0f2233',
    link: 'https://www.youtube.com/',
    repo: 'https://github.com/muizjafri/Object-Detection-and-Advise',
    views: '834 views',
    ago: '2025',
  },
  {
    id: 3,
    src: SimonGame,
    title: 'Simon Game',
    duration: '6:47',
    author: 'Muiz Jafri',
    tag: ['Web Dev'],
    language: ['HTML', 'CSS', 'JavaScript'],
    color: '#122033',
    link: 'https://www.youtube.com/@muizjafri2872',
    repo: 'https://github.com/muizjafri/SimonGame',
    views: '4 months',
    ago: '2026',

  },
  {
    id: 4,
    src: linkedin,
    title: 'Linkedin-email-finder',
    duration: '6:47',
    author: 'Muiz Jafri',
    tag: ['Web Dev'],
    language : ['JavaScript'],
    color: '#122033',
    link: 'https://www.youtube.com/@muizjafri2872',
    repo: 'https://github.com/muizjafri/SimonGame',
    views: '1 month',
    ago: '2026',

  },  {
    id: 5,
    src: linkedin,
    title: 'Gold-Price-Prediction ML model',
    duration: '6:47',
    author: 'Muiz Jafri',
    tag: [' Machine Learning'],
    language : ['Python', 'Pandas', 'Numpy', 'Scikit-learn', 'Matplotlib'],
    color: '#122033',
    link: 'https://www.youtube.com/@muizjafri2872',
    repo: 'https://github.com/muizjafri/SimonGame',
    views: '1 month',
    ago: '2026',

  },


];

const experiences: Experience[] = [
  {
    id: 1,
    src: linkedin,
    title: 'Software Engineer',
    company: 'Air Hawk Solutions',
    duration: '11:42',
    tag: 'Engineering',
    color: '#1a2744',
    link: 'https://your-company-url.com',
    views: '6 months',
    ago: 'Summer 2024',
  },
  {
    id: 2,
    src: github,
    title: 'Competitions Organizer',
    company: 'MIST Toronto',
    duration: '12:44',
    tag: 'Leadership',
    color: '#0f2233',
    link: 'https://your-company-url.com',
    views: '1 year',
    ago: '2023 – 2024',
  },
  {
    id: 3,
    src: github,
    title: 'Integration Camp Counsellor',
    company: 'City of Pickering',
    duration: '12:44',
    tag: 'Community',
    color: '#122033',
    link: 'https://your-company-url.com',
    views: '4 months',
    ago: 'Summer 2023',
  },
  
];

const PROJECT_CHIPS = [
  { label: 'All', value: 'all' },
  { label: 'Machine Learning', value: ' Machine Learning' },
  { label: 'Computer Vision', value: 'Computer Vision' },
  { label: 'Web Dev', value: 'Web Dev' },
];

const EXPERIENCE_CHIPS = [
  { label: 'All', value: 'all' },
  { label: 'Engineering', value: 'Engineering' },
  { label: 'Leadership', value: 'Leadership' },
  { label: 'Community', value: 'Community' },
];

function ProgressBar({ label, value, delay }: { label: string; value: number; delay: number }) {
  const { ref, visible } = useScrollReveal();
  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (visible) {
      const timeout = setTimeout(() => setWidth(value), delay);
      return () => clearTimeout(timeout);
    }
  }, [visible, value, delay]);

  return (
    <div ref={ref}>
      <div className="text-xs text-gray-400 mb-1">{label}</div>
      <div className="w-full bg-gray-800 rounded-full h-1.5 overflow-hidden">
        <div
          className="h-1.5 rounded-full relative overflow-hidden"
          style={{
            width: `${width}%`,
            background: 'linear-gradient(90deg, #3b82f6, #60a5fa)',
            transition: 'width 1s ease',
          }}
        >
          <div className="shine" />
        </div>
      </div>
    </div>
  );
}

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const { ref, visible } = useScrollReveal();
  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(24px)',
        transition: `opacity 0.5s ease ${delay}ms, transform 0.5s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}
// ─── App ──────────────────────────────────────────────────────────────────────

function ProjectsScroller({ filteredProjects, watchLater, toggleWL }: {
  filteredProjects: Project[];
  watchLater: Set<number>;
  toggleWL: (id: number) => void;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const updateArrows = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 0);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
  };

  useEffect(() => {
    updateArrows();
    const el = scrollRef.current;
    el?.addEventListener('scroll', updateArrows);
    window.addEventListener('resize', updateArrows);
    return () => {
      el?.removeEventListener('scroll', updateArrows);
      window.removeEventListener('resize', updateArrows);
    };
  }, [filteredProjects]);

  const scroll = (dir: 'left' | 'right') => {
    scrollRef.current?.scrollBy({ left: dir === 'left' ? -340 : 340, behavior: 'smooth' });
  };

  return (
    <div className="relative">
      {canScrollLeft && (
        <button
          onClick={() => scroll('left')}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-white text-black rounded-full w-9 h-9 flex items-center justify-center shadow-lg"
        >
          <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      )}

      <div
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto pb-2"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {filteredProjects.map((item, index) => (
          <div key={item.id} style={{ minWidth: '300px', maxWidth: '300px' }}>
            <ProjectCard
              item={item}
              index={index}
              isWatchLater={watchLater.has(item.id)}
              onToggleWL={toggleWL}
            />
          </div>
        ))}
      </div>

      {canScrollRight && (
        <button
          onClick={() => scroll('right')}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-white text-black rounded-full w-9 h-9 flex items-center justify-center shadow-lg"
        >
          <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      )}
    </div>
  );
}
function ExperienceScroller({filteredExperiences}: {
  filteredExperiences: Experience[];
}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const updateArrows = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 0);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
  };

  useEffect(() => {
    updateArrows();
    const el = scrollRef.current;
    el?.addEventListener('scroll', updateArrows);
    window.addEventListener('resize', updateArrows);
    return () => {
      el?.removeEventListener('scroll', updateArrows);
      window.removeEventListener('resize', updateArrows);
    };
  }, [filteredExperiences]);

  const scroll = (dir: 'left' | 'right') => {
    scrollRef.current?.scrollBy({ left: dir === 'left' ? -340 : 340, behavior: 'smooth' });
  };

  return (
    <div className="relative">
      {canScrollLeft && (
        <button
          onClick={() => scroll('left')}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-white text-black rounded-full w-9 h-9 flex items-center justify-center shadow-lg"
        >
          <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      )}

      <div
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto pb-2"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {filteredExperiences.map((item, index) => (
          <div key={item.id} style={{ minWidth: '300px', maxWidth: '300px' }}>
            <ExperienceCard
              item={item}
              index={index}
            />
          </div>
        ))}
      </div>

      {canScrollRight && (
        <button
          onClick={() => scroll('right')}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-white text-black rounded-full w-9 h-9 flex items-center justify-center shadow-lg"
        >
          <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      )}
    </div>
  );
}
function App() {
  const [activeTab, setActiveTab] = useState('aboutme');
  const [introComplete, setIntroComplete] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [watchLater, setWatchLater] = useState<Set<number>>(new Set());
  const [projectFilter, setProjectFilter] = useState('all');
  const [expFilter, setExpFilter] = useState('all');
  const [subscribed, setSubscribed] = useState(false);
  useEffect(() => {
    if("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);
  }, []);

  const toggleWL = (id: number) => {
    setWatchLater((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const filteredProjects =
    projectFilter === 'all' ? projects : projects.filter((p) => p.tag.includes(projectFilter));

  const filteredExperiences =
    expFilter === 'all' ? experiences : experiences.filter((e) => e.tag.includes(expFilter));

  const handleSend = async () => {
    if (!formData.name || !formData.email || !formData.message) return;
    setStatus('sending');
    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        { name: formData.name, email: formData.email, message: formData.message },
        EMAILJS_PUBLIC_KEY
      );
      setStatus('sent');
      setFormData({ name: '', email: '', message: '' });
    } catch {
      setStatus('error');
    }
  };

  return (
    <div className="bg-black min-h-screen text-white overflow-hidden">
      {!introComplete && <MuizIntro onComplete={() => setIntroComplete(true)} />}

      <div className="flex flex-col items-center justify-center gap-0">

        {/* ── Channel Banner ── */}
        <div className="w-11/12 mx-auto mt-4">
          <ChannelBanner />
        </div>

        {/* ── Profile Section ── */}
        <div className="w-11/12 mx-auto flex items-center gap-4 mt-4">
          <img
            src={face}
            alt="Profile"
            className="w-32 h-32 rounded-full object-cover border-4 border-blue-500"
          />
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-white">Muiz Jafri</h1>
            <p className="text-sm text-gray-400 mt-1">
              Third-year Computer Engineering student at Toronto Metropolitan University.
            </p>

            {/* Channel stats */}
            <div className="flex gap-4 mt-2 text-sm text-gray-500">
              <span> AI/ML Engineer</span>
              <span>·</span>
              <span> Full-Stack Developer</span>
              <span>·</span>
              <span>3rd year · Computer Engineering</span>
              <span>·</span>
              <span className="text-red-400">● Open to work</span>
            </div>

            <div className="flex gap-3 mt-3 flex-wrap">
              <a
                href="https://github.com/muizjafri"
                target="_blank"
                className="bg-gray-800 text-white px-4 py-2 rounded-full hover:bg-gray-700 transition duration-300 text-sm border border-gray-700"
              >
                GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/muiz-jafri-92655a20b/"
                target="_blank"
                className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-500 transition duration-300 text-sm"
              >
                LinkedIn
              </a>
              <button
                onClick={() => setSubscribed((s) => !s)}
                className="px-4 py-2 rounded-full text-sm font-medium transition-all duration-200"
                style={
                  subscribed
                    ? { background: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.6)', border: '1px solid rgba(255,255,255,0.15)' }
                    : { background: '#fff', color: '#000', border: '1px solid #fff' }
                }
              >
                {subscribed ? 'Subscribed ✓' : 'Subscribe'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── Tabs ── */}
      <div className="w-11/12 mx-auto mt-8">
        <div className="flex gap-8 border-b border-gray-800">
          {['aboutme', 'projects', 'experience'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-3 px-2 text-base font-medium transition-colors relative capitalize ${
                activeTab === tab ? 'text-white' : 'text-gray-500 hover:text-gray-300'
              }`}
            >
              {tab === 'aboutme' ? 'About Me' : tab.charAt(0).toUpperCase() + tab.slice(1)}
              {activeTab === tab && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* ── About Me Tab ── */}
{activeTab === 'aboutme' && (
  <div className="w-11/12 mx-auto mt-6">

    {/* Row 1 */}
    <Reveal delay={200}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div className="md:col-span-2 bg-gray-900 border border-gray-800 text-white rounded-2xl p-6 flex flex-col justify-between min-h-40">
          <span className="text-xs text-blue-400 uppercase tracking-widest mb-3">// whoami</span>
          <p className="text-gray-300 text-sm leading-relaxed">
            Third-year{' '}
            <span className="text-white font-semibold">Computer Engineering</span> student at
            Toronto Metropolitan University. Passionate about building web apps and exploring
            new technologies.
          </p>
          <p className="text-xs text-gray-600 mt-4">Toronto, ON 🍁</p>
        </div>
        <div className="bg-blue-600 text-white rounded-2xl p-6 flex flex-col justify-between min-h-40">
          <span className="text-xs text-blue-200 uppercase tracking-widest">Currently learning</span>
          <p className="text-2xl font-bold leading-tight mt-2">
            Cloud<br />Computing<br />& DevOps
          </p>
          <span className="text-blue-200 text-xs">AWS · Docker · K8s</span>
        </div>
      </div>
    </Reveal>

    {/* Row 2 — staggered cards */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
      {[
        { emoji: '🍜', title: 'Food Explorer', desc: 'Always love to try new food! (Favourite is Shawarma)' },
        { emoji: '🎮', title: 'Gamer', desc: 'League of Legends, Valorant, Marvel Rivals (spent too much time on them)' },
        { emoji: '📺', title: 'YouTube', desc: 'Especially Mystery and True Crime! ' },
      ].map((item, i) => (
        <Reveal key={item.title} delay={i * 100}>
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5 flex flex-col gap-2">
            <span className="text-2xl">{item.emoji}</span>
            <p className="font-semibold text-sm text-white">{item.title}</p>
            <p className="text-xs text-gray-400">{item.desc}</p>
          </div>
        </Reveal>
      ))}
    </div>

    {/* Row 3 */}
    <Reveal delay={0}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-gray-900 border border-gray-800 text-white rounded-2xl p-6">
          <span className="text-xs text-blue-400 uppercase tracking-widest">Tech focus</span>
<div className="mt-4 flex flex-col gap-4">
{[
  { label: 'Full Stack / Web Dev', width: 91.67 },
  { label: 'Machine Learning / AI', width: 66.67 },
  { label: 'Cloud / DevOps', width: 33.33 },
].map((item, i) => (
  <ProgressBar
    key={item.label}
    label={item.label}
    value={item.width}
    delay={i * 200} // ✅ stagger
  />
))}
</div>
</div>

        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 flex flex-col gap-3">
          <span className="text-xs text-blue-400 uppercase tracking-widest">// contact me</span>
          <input
            type="text"
            placeholder="Your name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="bg-gray-800 border border-gray-700 text-white text-sm rounded-xl px-4 py-2.5 placeholder-gray-500 focus:outline-none focus:border-blue-500 transition"
          />
          <input
            type="email"
            placeholder="Your email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="bg-gray-800 border border-gray-700 text-white text-sm rounded-xl px-4 py-2.5 placeholder-gray-500 focus:outline-none focus:border-blue-500 transition"
          />
          <textarea
            placeholder="Message..."
            rows={3}
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            className="bg-gray-800 border border-gray-700 text-white text-sm rounded-xl px-4 py-2.5 placeholder-gray-500 focus:outline-none focus:border-blue-500 transition resize-none"
          />
          <button
            onClick={handleSend}
            disabled={status === 'sending'}
            className="bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-medium px-4 py-2.5 rounded-xl transition"
          >
            {status === 'sending' ? 'Sending...' : 'Send message'}
          </button>
          {status === 'sent' && <p className="text-green-400 text-xs text-center">Message sent!</p>}
          {status === 'error' && <p className="text-red-400 text-xs text-center">Something went wrong. Try again.</p>}
        </div>
      </div>
    </Reveal>

  </div>
)}

      {/* ── Projects Tab ── */}
      {activeTab === 'projects' && (
        <div className="w-11/12 mx-auto mt-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-white">
              Projects{' '}
              <span className="text-gray-500 font-normal text-base">({filteredProjects.length})</span>
            </h2>
          </div>

          <FilterChips
            chips={PROJECT_CHIPS}
            active={projectFilter}
            onChange={setProjectFilter}
          />

          {/* Watch Later panel */}
          {watchLater.size > 0 && (
            <div
              className="mb-6 rounded-xl p-4"
              style={{ background: '#111827', border: '1px solid rgba(255,255,255,0.07)' }}
            >
              <p className="text-white font-semibold text-sm mb-3">
                Watch Later{' '}
                <span className="text-gray-500 font-normal">({watchLater.size})</span>
              </p>
              <div className="flex flex-col gap-2">
                {projects.filter((p) => watchLater.has(p.id)).map((p) => (
                  <div key={p.id} className="flex items-center gap-3">
                    <div className="rounded-lg overflow-hidden flex-shrink-0" style={{ width: 80, height: 46 }}>
                      <img src={p.src} alt={p.title} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-white font-medium truncate" style={{ fontSize: 12 }}>{p.title}</p>
                      <p className="text-gray-500" style={{ fontSize: 11 }}>{p.ago}</p>
                    </div>
                    <button
                      onClick={() => toggleWL(p.id)}
                      className="text-gray-500 hover:text-white transition text-lg leading-none"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          <ProjectsScroller
            filteredProjects={filteredProjects}
            watchLater={watchLater}
            toggleWL={toggleWL}
          />

          <div className="flex justify-center mt-8 mb-8">
            <a
              href="https://github.com/muizjafri?tab=repositories"
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className="group flex items-center gap-3 bg-gray-900 border border-gray-700 hover:border-blue-500 text-white px-8 py-4 rounded-full text-base font-medium transition-all duration-300 hover:bg-gray-800">
                View More Projects
                <svg
                  className="w-4 h-4 text-blue-400 group-hover:translate-x-1 transition-transform duration-200"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </button>
            </a>
          </div>
        </div>
      )}

      {/* ── Experience Tab ── */}
      {activeTab === 'experience' && (
        <div className="w-11/12 mx-auto mt-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-white">
              Experience{' '}
              <span className="text-gray-500 font-normal text-base">({filteredExperiences.length})</span>
            </h2>
          </div>

          <FilterChips
            chips={EXPERIENCE_CHIPS}
            active={expFilter}
            onChange={setExpFilter}
          />

          <ExperienceScroller filteredExperiences={filteredExperiences} />

          <div className="flex justify-center mt-8 mb-8">
            <button className="group flex items-center gap-3 bg-gray-900 border border-gray-700 hover:border-blue-500 text-white px-8 py-4 rounded-full text-base font-medium transition-all duration-300 hover:bg-gray-800">
              <svg
                className="w-4 h-4 text-blue-400 group-hover:translate-x-1 transition-transform duration-200"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                />
              </svg>
              Download my Resume!
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;