import face from './assets/myface.png';
import { useState, useEffect, useRef } from 'react';
import MuizIntro from './MuizIntro';
import emailjs from '@emailjs/browser';
import SimonGame from './assets/SimonGame.png';
import objectDetection from './assets/ThumbnailObjectDetection.png';
import TypingTest from './assets/TypingTest.png';
import EmailFinderio from './assets/EmailFinderio.png';
import MIST from './assets/MIST_Toronto.png';
import Goku from './assets/Gokuthumbsup.png';
import Pickering from './assets/Pickering.png';
import Placeholder from './assets/Droneimagee.png';
import resume from './assets/ProductManagementMuizJ.pdf';
import DENC from './assets/DENC.png';
import V4TMU from './assets/vision4all.png';

const EMAILJS_SERVICE_ID = 'service_ced8a35';
const EMAILJS_TEMPLATE_ID = 'template_ew2y7gi';
const EMAILJS_PUBLIC_KEY = 'dbAiIXD2czrnQxLgZ';

// Interfaces 

interface Project {
  id: number;
  src: string;
  title: string;
  duration: string;
  author: string;
  tag: string[];
  language: string[];
  color: string;
  link: string;
  repo: string;
  views: string;
  ago: string;
  description: string;
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
  description: string;
}

// Data

const projects: Project[] = [
  {
    id: 1,
    src: TypingTest,
    title: 'TypeForge',
    duration: '11:42',
    author: 'Muiz Jafri',
    tag: ['Web Dev', ' Machine Learning'],
    language: ['Python', 'JavaScript'],
    color: '#1a2744',
    link: 'https://youtu.be/lVE4nV1knP8',
    repo: 'https://github.com/muizjafri/TypingTest',
    views: '1.2k views',
    ago: '2025',
    description:
      'TypeForge is an AI powered typing test that can generate custom passages in real time based on any theme described. This is built with React and TypeScript frontend served through a FastAPI backend and uses Groq API to run Llama 3.3 to instantly generate themed words. Check the video below to see how it works!',
  },
  {
    id: 2,
    src: objectDetection,
    title: 'VisionAI',
    duration: '12:44',
    author: 'Muiz Jafri',
    tag: ['Computer Vision'],
    language: ['Python', 'Flask', 'OpenCV'],
    color: '#0f2233',
    link: 'https://youtu.be/n2pJuosRAaE',
    repo: 'https://github.com/muizjafri/Object-Detection-and-Advise',
    views: '834 views',
    ago: '2025',
    description:
      'VisionAI is a real time object detection web app where users can scan their surroundings and receive AI generated fun facts and advice from what the camera sees. Used Grounding DINO for object detection and Llama from the Hugging Face Inference API. I used Flask to build and serve the web application. Check the video below to see how it works!',
  },
  {
    id: 3,
    src: SimonGame,
    title: 'Simon Game',
    duration: '2:17',
    author: 'Muiz Jafri',
    tag: ['Web Dev'],
    language: ['HTML', 'CSS', 'JavaScript'],
    color: '#122033',
    link: 'https://youtu.be/l5ekmBkEPyQ',
    repo: 'https://github.com/muizjafri/SimonGame',
    views: '4 months',
    ago: '2026',
    description:
      'Simple Simon game built with vanilla JavaScript, HTML and CSS. Check the video below to see how it works!',
  },
  {
    id: 4,
    src: EmailFinderio,
    title: 'EmailFinderio',
    duration: '6:47',
    author: 'Muiz Jafri',
    tag: ['Web Dev'],
    language: ['JavaScript'],
    color: '#122033',
    link: 'https://youtu.be/WyT0WOq_FqM',
    repo: 'https://github.com/muizjafri/linkedin-email-finder-extension',
    views: '1 month',
    ago: '2026',
    description:
      'EmailFinderio is a web application that helps users find email addresses of professionals using the Hunter.io API. Check the video below to see how it works!',
  },
  {
    id: 5,
    src: Goku,
    title: 'Gold-Price-Prediction ML model (In Progress)',
    duration: '6:47',
    author: 'Muiz Jafri',
    tag: [' Machine Learning'],
    language: ['Python', 'Pandas', 'Numpy', 'Scikit-learn', 'Matplotlib'],
    color: '#122033',
    link: 'https://www.youtube.com/@muizjafri2872',
    repo: 'https://github.com/muizjafri/Gold-Price-Predictor',
    views: '1 month',
    ago: '2026',
    description:
      'Using historical gold price data, I built a machine learning model to predict future gold prices. I used various regression algorithms and compared their performance to find the best fit for the data.',
  },
  {
    id: 6,
    src: Goku,
    title: 'Plant Classification Neural Network (In Progress)',
    duration: '6:47',
    author: 'Muiz Jafri',
    tag: [' Machine Learning'],
    language: ['Python', 'TensorFlow'],
    color: '#122033',
    link: 'https://www.youtube.com/@muizjafri2872',
    repo: 'https://github.com/muizjafri/PlantClassification.git',
    views: '1 month',
    ago: '2026',
    description:
      'Trying to build a neural network that can classify different types of plants based on their images.',
  },
];

const experiences: Experience[] = [
    {
    id: 1,
    src: V4TMU,
    title: 'Vice-President of Events',
    company: 'Vision4All TMU',
    duration: '20:24',
    tag: 'Project Management, Community',
    color: '#1a2744',
    link: 'https://your-company-url.com',
    views: 'Present',
    ago: 'Aug 2024 – Present',
    description: 'Led fundraising and awareness initiatives by improving how our team tracked donor engagement. Built simple systems to organize outreach data, identify trends, and help the team focus on the campaigns that would have the biggest impact.'
  },
  {
    id: 2,
    src: DENC,
    title: 'Fundraising Organizer',
    company: 'Durham Employment and Newcomer Centre',
    duration: '2:00',
    tag: 'Project Management',
    color: '#1a2744',
    link: 'https://your-company-url.com',
    views: '2 months',
    ago: 'Summer 2026',
    description: 'Managed fundraising data across 100+ donors and sponsors by creating dashboards that made campaign performance easier to understand. Used those insights to help prioritize outreach efforts and improve coordination across the team.'
  },
  {
    id: 3,
    src: Placeholder,
    title: 'Technical Systems',
    company: 'Air Hawk Solutions',
    duration: '11:42',
    tag: 'Project Management, Engineering',
    color: '#1a2744',
    link: 'https://your-company-url.com',
    views: '12 months',
    ago: 'Summer 2025 - Summer 2026',
    description: 'Worked on an autonomous drone platform by building AI pipelines for processing sensor data and supporting real-time object detection. Collaborated across hardware and software, balancing model performance, system constraints, and project timelines to deliver reliable solutions.',
  },
  {
    id: 4,
    src: MIST,
    title: 'Competitions Organizer',
    company: 'MIST Toronto',
    duration: '12:44',
    tag: 'Project Management',
    color: '#0f2233',
    link: 'https://your-company-url.com',
    views: '1 year',
    ago: '2025 – 2026',
    description: 'Coordinated academic competitions by working with judges, volunteers, and event organizers throughout the planning process. Balanced changing priorities, solved logistical challenges, and helped ensure events ran smoothly from start to finish.',
  },
  {
    id: 5,
    src: Pickering,
    title: 'Integration Camp Counsellor',
    company: 'City of Pickering',
    duration: '12:44',
    tag: 'Community',
    color: '#122033',
    link: 'https://your-company-url.com',
    views: '4 months',
    ago: 'Summer 2025',
    description: 'Supported children with special needs by adapting activities to each individuals abilities and interests. The role strengthened my communication, problem-solving, and ability to understand different user needs when making decisions.',
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
  { label: 'Product Management', value: 'Product Management' },
  { label: 'Engineering', value: 'Engineering' },
  { label: 'Community', value: 'Community' },
];

// ─── Theme  

function useTheme() {
  const [isDark, setIsDark] = useState(true);
  const toggle = () => setIsDark((d) => !d);
  return { isDark, toggle };
}

// ─── Scroll Reveal Hook 

function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 600 / window.innerHeight }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return { ref, visible };
}

// ─── Theme Toggle Button 

function ThemeToggle({ isDark, onToggle }: { isDark: boolean; onToggle: () => void }) {
  return (
    <button
      onClick={onToggle}
      title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        zIndex: 9999,
        width: '48px',
        height: '48px',
        borderRadius: '50%',
        border: isDark ? '1.5px solid rgba(255,255,255,0.15)' : '1.5px solid rgba(0,0,0,0.12)',
        background: isDark ? 'rgba(30,30,40,0.95)' : 'rgba(255,255,255,0.95)',
        backdropFilter: 'blur(12px)',
        boxShadow: isDark
          ? '0 4px 24px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.05)'
          : '0 4px 24px rgba(0,0,0,0.12), 0 0 0 1px rgba(0,0,0,0.06)',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'all 0.25s ease',
        fontSize: '20px',
      }}
    >
      {isDark ? '🌞' : '🌑'}
    </button>
  );
}

// ─── Channel Banner 

function ChannelBanner({ isDark }: { isDark: boolean }) {
  return (
    <div className="w-full relative overflow-hidden rounded-xl mx-auto" style={{ height: '180px' }}>
      <div className="absolute inset-0" style={{ background: isDark ? '#080c14' : '#dbeafe' }} />
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: isDark
            ? 'radial-gradient(circle, rgba(59,130,246,0.25) 1px, transparent 1px)'
            : 'radial-gradient(circle, rgba(37,99,235,0.15) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />
      <div
        className="absolute"
        style={{
          width: '340px', height: '340px', borderRadius: '50%',
          background: isDark
            ? 'radial-gradient(circle, rgba(37,99,235,0.18) 0%, transparent 70%)'
            : 'radial-gradient(circle, rgba(37,99,235,0.12) 0%, transparent 70%)',
          top: '-120px', left: '-60px', pointerEvents: 'none',
        }}
      />
      <div
        className="absolute"
        style={{
          width: '260px', height: '260px', borderRadius: '50%',
          background: isDark
            ? 'radial-gradient(circle, rgba(99,102,241,0.14) 0%, transparent 70%)'
            : 'radial-gradient(circle, rgba(99,102,241,0.10) 0%, transparent 70%)',
          bottom: '-80px', right: '80px', pointerEvents: 'none',
        }}
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-1">
        <h1
          className="font-bold tracking-tight"
          style={{
            fontSize: '2.2rem',
            letterSpacing: '-0.02em',
            color: isDark ? '#fff' : '#1e3a8a',
            textShadow: isDark
              ? '0 2px 24px rgba(59,130,246,0.35)'
              : '0 2px 24px rgba(37,99,235,0.15)',
          }}
        >
          CAN Citizen · Toronto
        </h1>
      </div>
      <div
        className="absolute bottom-0 left-0 right-0"
        style={{
          height: '48px',
          background: isDark
            ? 'linear-gradient(to bottom, transparent, rgba(0,0,0,0.55))'
            : 'linear-gradient(to bottom, transparent, rgba(219,234,254,0.6))',
        }}
      />
    </div>
  );
}

// ─── Filter Chips 

function FilterChips({
  chips,
  active,
  onChange,
  isDark,
}: {
  chips: { label: string; value: string }[];
  active: string;
  onChange: (v: string) => void;
  isDark: boolean;
}) {
  return (
    <div className="flex gap-2 flex-wrap mb-6">
      {chips.map((c) => (
        <button
          key={c.value}
          onClick={() => onChange(c.value)}
          className="px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200"
          style={{
            background: active === c.value
              ? (isDark ? '#fff' : '#1d4ed8')
              : (isDark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.05)'),
            color: active === c.value
              ? (isDark ? '#000' : '#fff')
              : (isDark ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.55)'),
            border: active === c.value
              ? (isDark ? '1px solid #fff' : '1px solid #1d4ed8')
              : (isDark ? '1px solid rgba(255,255,255,0.12)' : '1px solid rgba(0,0,0,0.12)'),
          }}
        >
          {c.label}
        </button>
      ))}
    </div>
  );
}

// ─── Project Modal

function ProjectModal({
  project,
  onClose,
  isDark,
}: {
  project: Project;
  onClose: () => void;
  isDark: boolean;
}) {
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose]);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  const bg = isDark ? '#0f172a' : '#ffffff';
  const border = isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)';
  const textPrimary = isDark ? '#f1f5f9' : '#111827';
  const textMuted = isDark ? '#94a3b8' : '#6b7280';
  const divider = isDark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.07)';
  const linkRowBg = isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.03)';
  const linkRowHoverBg = isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)';

  return (
    <div
      onClick={handleBackdropClick}
      style={{
        position: 'fixed', inset: 0, zIndex: 10000,
        background: 'rgba(0,0,0,0.65)', backdropFilter: 'blur(6px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '16px', animation: 'fadeIn 0.18s ease',
      }}
    >
      <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        .modal-link-row:hover { background: ${linkRowHoverBg} !important; }
      `}</style>

      <div
        style={{
          background: bg, border: `1px solid ${border}`, borderRadius: '16px',
          width: '100%', maxWidth: '520px', maxHeight: '90vh', overflowY: 'auto',
          boxShadow: isDark
            ? '0 32px 80px rgba(0,0,0,0.8), 0 0 0 1px rgba(255,255,255,0.05)'
            : '0 32px 80px rgba(0,0,0,0.18)',
          animation: 'slideUp 0.22s ease', scrollbarWidth: 'none',
        }}
      >
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 20px 16px 20px', borderBottom: `1px solid ${divider}` }}>
          <h2 style={{ fontSize: '17px', fontWeight: 700, color: textPrimary, margin: 0, paddingRight: '12px', lineHeight: 1.3 }}>
            {project.title}
          </h2>
          <button
            onClick={onClose}
            style={{ flexShrink: 0, width: '32px', height: '32px', borderRadius: '50%', border: `1px solid ${border}`, background: 'transparent', color: textMuted, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', lineHeight: 1, transition: 'all 0.15s ease' }}
            title="Close"
          >
            ✕
          </button>
        </div>

        {/* Thumbnail */}
        <div style={{ padding: '16px 20px 0 20px' }}>
          <div style={{ width: '100%', aspectRatio: '16/9', borderRadius: '10px', overflow: 'hidden', border: `1px solid ${border}` }}>
            <img src={project.src} alt={project.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
        </div>

        {/* Body */}
        <div style={{ padding: '20px' }}>
          <div style={{ marginBottom: '20px' }}>
            <h3 style={{ fontSize: '15px', fontWeight: 700, color: textPrimary, margin: '0 0 10px 0' }}>Description</h3>
            <p style={{ fontSize: '13.5px', lineHeight: 1.7, color: isDark ? '#cbd5e1' : '#374151', margin: 0 }}>
              {project.description}
            </p>
          </div>

          {/* Tags */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '20px' }}>
            {project.tag.map((t) => (
              <span key={t} style={{ fontSize: '11px', padding: '3px 10px', borderRadius: '999px', background: 'rgba(37,99,235,0.18)', color: '#7eb3f5', border: '1px solid rgba(37,99,235,0.3)' }}>
                {t}
              </span>
            ))}
            {project.language.map((l) => (
              <span key={l} style={{ fontSize: '11px', padding: '3px 10px', borderRadius: '999px', background: 'rgba(37,99,235,0.18)', color: '#6ee7b7', border: '1px solid rgba(37,99,235,0.3)' }}>
                {l}
              </span>
            ))}
          </div>

          <div style={{ height: '1px', background: divider, marginBottom: '20px' }} />

          {/* Links */}
          <div style={{ marginBottom: '20px' }}>
            <h3 style={{ fontSize: '15px', fontWeight: 700, color: textPrimary, margin: '0 0 10px 0' }}>Links</h3>
            <a
              href={project.repo}
              target="_blank"
              rel="noopener noreferrer"
              className="modal-link-row"
              style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 12px', borderRadius: '10px', background: linkRowBg, textDecoration: 'none', marginBottom: '8px', transition: 'background 0.15s ease', border: `1px solid ${border}` }}
            >
              <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill={isDark ? '#e2e8f0' : '#374151'}>
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                </svg>
              </div>
              <div>
                <p style={{ fontSize: '13px', fontWeight: 600, color: textPrimary, margin: 0 }}>Source Code</p>
                <p style={{ fontSize: '11px', color: '#60a5fa', margin: 0 }}>github.com</p>
              </div>
            </a>
          </div>

          {project.link.includes('youtube.com/@') ? (
            <div style={{ width: '100%', padding: '13px', borderRadius: '10px', background: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.05)', border: `1px solid ${border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
              <span style={{ fontWeight: 700, fontSize: '14px', color: textMuted }}>Work in Progress!</span>
            </div>
          ) : (
            <a href={project.link} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', display: 'block' }}>
              <button
                style={{ width: '100%', padding: '13px', borderRadius: '10px', background: '#dc2626', color: '#fff', fontWeight: 700, fontSize: '14px', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', transition: 'background 0.2s ease' }}
                onMouseEnter={(e) => (e.currentTarget.style.background = '#b91c1c')}
                onMouseLeave={(e) => (e.currentTarget.style.background = '#dc2626')}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                  <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
                Proceed to Video
              </button>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Experience Modal

function ExperienceModal({
  experience,
  onClose,
  isDark,
}: {
  experience: Experience;
  onClose: () => void;
  isDark: boolean;
}) {
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose]);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  const bg = isDark ? '#0f172a' : '#ffffff';
  const border = isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)';
  const textPrimary = isDark ? '#f1f5f9' : '#111827';
  const textMuted = isDark ? '#94a3b8' : '#6b7280';
  const divider = isDark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.07)';

  return (
    <div
      onClick={handleBackdropClick}
      style={{ position: 'fixed', inset: 0, zIndex: 10000, background: 'rgba(0,0,0,0.65)', backdropFilter: 'blur(6px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px', animation: 'fadeIn 0.18s ease' }}
    >
      <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
      <div style={{ background: bg, border: `1px solid ${border}`, borderRadius: '16px', width: '100%', maxWidth: '520px', maxHeight: '90vh', overflowY: 'auto', boxShadow: isDark ? '0 32px 80px rgba(0,0,0,0.8)' : '0 32px 80px rgba(0,0,0,0.18)', animation: 'slideUp 0.22s ease', scrollbarWidth: 'none' }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 20px 16px 20px', borderBottom: `1px solid ${divider}` }}>
          <h2 style={{ fontSize: '17px', fontWeight: 700, color: textPrimary, margin: 0, paddingRight: '12px' }}>{experience.title}</h2>
          <button onClick={onClose} style={{ flexShrink: 0, width: '32px', height: '32px', borderRadius: '50%', border: `1px solid ${border}`, background: 'transparent', color: textMuted, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px' }}>✕</button>
        </div>
        {/* Thumbnail */}
        <div style={{ padding: '16px 20px 0 20px' }}>
          <div style={{ width: '100%', aspectRatio: '16/9', borderRadius: '10px', overflow: 'hidden', border: `1px solid ${border}` }}>
            <img src={experience.src} alt={experience.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
        </div>
        {/* Body */}
        <div style={{ padding: '20px' }}>
          <div style={{ marginBottom: '20px' }}>
            <h3 style={{ fontSize: '15px', fontWeight: 700, color: textPrimary, margin: '0 0 10px 0' }}>Description</h3>
            <p style={{ fontSize: '13.5px', lineHeight: 1.7, color: isDark ? '#cbd5e1' : '#374151', margin: 0 }}>{experience.description}</p>
          </div>
          <div style={{ height: '1px', background: divider, marginBottom: '20px' }} />
          <div style={{ marginBottom: '20px' }}>
            <h3 style={{ fontSize: '15px', fontWeight: 700, color: textPrimary, margin: '0 0 10px 0' }}>More info</h3>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 0', borderBottom: `1px solid ${divider}` }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={textMuted} strokeWidth="1.8"><rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>
              <span style={{ fontSize: '13px', color: textMuted }}>{experience.ago}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 0' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={textMuted} strokeWidth="1.8"><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></svg>
              <span style={{ fontSize: '13px', color: textMuted }}>{experience.views}</span>
            </div>
          </div>
          <a href={experience.link} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', display: 'block' }}>
          </a>
        </div>
      </div>
    </div>
  );
}

// ─── Project Card

function ProjectCard({
  item,
  isWatchLater,
  onToggleWL,
  isDark,
  onOpenModal,
}: {
  item: Project;
  index: number;
  isWatchLater: boolean;
  onToggleWL: (id: number) => void;
  isDark: boolean;
  onOpenModal: (project: Project) => void;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <div className="flex flex-col">
      <div
        className="relative w-full rounded-xl overflow-hidden cursor-pointer"
        style={{ aspectRatio: '16/9' }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={() => onOpenModal(item)}
      >
        <img
          src={item.src}
          alt={item.title}
          className="w-full h-full object-cover transition-transform duration-500"
          style={{ transform: hovered ? 'scale(1.05)' : 'scale(1)' }}
        />
        <div
          className="absolute inset-0 flex items-center justify-center transition-opacity duration-200"
          style={{ background: 'rgba(0,0,0,0.42)', opacity: hovered ? 1 : 0 }}
        >
          <div className="flex items-center justify-center rounded-full" style={{ width: 44, height: 44, background: 'rgba(255,255,255,0.92)' }}>
            <svg width="14" height="16" viewBox="0 0 14 16" fill="#111"><polygon points="0,0 14,8 0,16" /></svg>
          </div>
        </div>
        <div
          className="absolute bottom-2 right-2 text-white rounded"
          style={{ background: 'rgba(0,0,0,0.85)', fontSize: '11px', padding: '2px 6px', fontFamily: 'monospace', fontWeight: 700 }}
        >
          {item.duration}
        </div>
        <button
          onClick={(e) => { e.stopPropagation(); onToggleWL(item.id); }}
          className="absolute top-2 right-2 rounded transition-all duration-150 flex items-center justify-center"
          style={{ width: 28, height: 28, background: isWatchLater ? 'rgba(239,68,68,0.88)' : 'rgba(0,0,0,0.7)', opacity: hovered || isWatchLater ? 1 : 0, border: 'none' }}
          title={isWatchLater ? 'Remove from Watch Later' : 'Save to Watch Later'}
        >
          {isWatchLater ? (
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>
          ) : (
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5"><path d="M12 5v14M5 12h14" /></svg>
          )}
        </button>
      </div>

      <div className="flex gap-3 mt-3">
        <div className="flex-shrink-0 rounded-full flex items-center justify-center text-white font-semibold" style={{ width: 32, height: 32, background: '#2563eb', fontSize: 12 }}>
          MJ
        </div>
        <div className="flex flex-col min-w-0">
          <p
            className="font-medium leading-snug cursor-pointer hover:underline"
            style={{ fontSize: 13, color: isDark ? '#fff' : '#111', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}
            onClick={() => onOpenModal(item)}
          >
            {item.title}
          </p>
          <p style={{ fontSize: 11, color: '#6b7280' }} className="mt-0.5">{item.author}</p>
          <p style={{ fontSize: 11, color: '#6b7280' }}>{item.views} &nbsp;·&nbsp; {item.ago}</p>
          <div className="flex flex-wrap gap-1 mt-1">
            {item.tag.map((t) => (
              <span key={t} className="self-start rounded-full" style={{ fontSize: 10, padding: '2px 8px', background: 'rgba(37,99,235,0.18)', color: '#7eb3f5', border: '1px solid rgba(37,99,235,0.3)' }}>{t}</span>
            ))}
          </div>
          <div className="flex flex-wrap gap-1 mt-1">
            {item.language.map((t) => (
              <span key={t} className="self-start rounded-full" style={{ fontSize: 10, padding: '2px 8px', background: 'rgba(37,99,235,0.18)', color: '#6ee7b7', border: '1px solid rgba(37,99,235,0.3)' }}>{t}</span>
            ))}
          </div>
        </div>
      </div>

      <div className="flex gap-2 mt-3">
        <button
          onClick={() => window.open(item.repo, '_blank')}
          className="rounded-full font-medium transition-all duration-200"
          style={{ fontSize: 11, padding: '6px 14px', background: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)', color: isDark ? '#fff' : '#111', border: isDark ? '1px solid rgba(255,255,255,0.12)' : '1px solid rgba(0,0,0,0.12)' }}
        >
          Source
        </button>
      </div>
    </div>
  );
}

// ─── Experience Card 

function ExperienceCard({
  item,
  isDark,
  onOpenModal,
}: {
  item: Experience;
  index: number;
  isDark: boolean;
  onOpenModal: (exp: Experience) => void;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="flex flex-col"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className="relative w-full rounded-xl overflow-hidden cursor-pointer"
        style={{ aspectRatio: '16/9' }}
        onClick={() => onOpenModal(item)}
      >
        <img
          src={item.src}
          alt={item.title}
          className="w-full h-full object-cover transition-transform duration-500"
          style={{ transform: hovered ? 'scale(1.05)' : 'scale(1)' }}
        />
        <div className="absolute inset-0 transition-opacity duration-200" style={{ background: 'rgba(0,0,0,0.38)', opacity: hovered ? 1 : 0 }} />
        <div className="absolute bottom-2 right-2 text-white rounded" style={{ background: 'rgba(0,0,0,0.85)', fontSize: '11px', padding: '2px 6px', fontFamily: 'monospace', fontWeight: 700 }}>
          {item.duration}
        </div>
        <div className="absolute top-2 left-2 transition-opacity duration-200" style={{ opacity: hovered ? 1 : 0 }}>
          <span className="rounded-full text-blue-400" style={{ fontSize: 11, padding: '3px 10px', border: '1px solid rgba(96,165,250,0.4)', background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(4px)' }}>
            {item.tag}
          </span>
        </div>
      </div>

      <div className="flex gap-3 mt-3">
        <div className="flex-shrink-0 rounded-full flex items-center justify-center text-white font-semibold" style={{ width: 32, height: 32, background: '#2563eb', fontSize: 12 }}>
          MJ
        </div>
        <div className="flex flex-col min-w-0">
          <p
            className="font-medium leading-snug cursor-pointer hover:underline"
            style={{ fontSize: 13, color: isDark ? '#fff' : '#111', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}
            onClick={() => onOpenModal(item)}
          >
            {item.title}
          </p>
          <p style={{ fontSize: 11, color: '#6b7280' }} className="mt-0.5">{item.company}</p>
          <p style={{ fontSize: 11, color: '#6b7280' }}>{item.views} &nbsp;·&nbsp; {item.ago}</p>
          <span className="mt-1 self-start rounded-full" style={{ fontSize: 10, padding: '2px 8px', background: 'rgba(37,99,235,0.18)', color: '#7eb3f5', border: '1px solid rgba(37,99,235,0.3)' }}>
            {item.tag}
          </span>
        </div>
      </div>
    </div>
  );
}

// ─── Progress Bar 

function ProgressBar({ label, value, delay, isDark }: { label: string; value: number; delay: number; isDark: boolean }) {
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
      <div className="text-xs mb-1" style={{ color: isDark ? '#9ca3af' : '#6b7280' }}>{label}</div>
      <div className="w-full rounded-full h-1.5 overflow-hidden" style={{ background: isDark ? '#1f2937' : '#e5e7eb' }}>
        <div
          className="h-1.5 rounded-full relative overflow-hidden"
          style={{ width: `${width}%`, background: 'linear-gradient(90deg, #3b82f6, #60a5fa)', transition: 'width 1s ease' }}
        />
      </div>
    </div>
  );
}

// ─── Reveal 

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

// ─── Projects Scroller

function ProjectsScroller({
  filteredProjects,
  watchLater,
  toggleWL,
  isDark,
  onOpenModal,
}: {
  filteredProjects: Project[];
  watchLater: Set<number>;
  toggleWL: (id: number) => void;
  isDark: boolean;
  onOpenModal: (project: Project) => void;
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

  const scroll = (dir: 'left' | 'right') =>
    scrollRef.current?.scrollBy({ left: dir === 'left' ? -340 : 340, behavior: 'smooth' });

  const arrowStyle = { background: isDark ? '#fff' : '#111', color: isDark ? '#000' : '#fff' };

  return (
    <div className="relative">
      {canScrollLeft && (
        <button onClick={() => scroll('left')} className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 rounded-full w-9 h-9 flex items-center justify-center shadow-lg" style={arrowStyle}>
          <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
        </button>
      )}
      <div ref={scrollRef} className="flex gap-6 overflow-x-auto pb-2" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
        {filteredProjects.map((item, index) => (
          <div key={item.id} style={{ minWidth: '300px', maxWidth: '300px' }}>
            <ProjectCard item={item} index={index} isWatchLater={watchLater.has(item.id)} onToggleWL={toggleWL} isDark={isDark} onOpenModal={onOpenModal} />
          </div>
        ))}
      </div>
      {canScrollRight && (
        <button onClick={() => scroll('right')} className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 rounded-full w-9 h-9 flex items-center justify-center shadow-lg" style={arrowStyle}>
          <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
        </button>
      )}
    </div>
  );
}

// ─── Experience Scroller 

function ExperienceScroller({
  filteredExperiences,
  isDark,
  onOpenModal,
}: {
  filteredExperiences: Experience[];
  isDark: boolean;
  onOpenModal: (exp: Experience) => void;
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

  const scroll = (dir: 'left' | 'right') =>
    scrollRef.current?.scrollBy({ left: dir === 'left' ? -340 : 340, behavior: 'smooth' });

  const arrowStyle = { background: isDark ? '#fff' : '#111', color: isDark ? '#000' : '#fff' };

  return (
    <div className="relative">
      {canScrollLeft && (
        <button onClick={() => scroll('left')} className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 rounded-full w-9 h-9 flex items-center justify-center shadow-lg" style={arrowStyle}>
          <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
        </button>
      )}
      <div ref={scrollRef} className="flex gap-6 overflow-x-auto pb-2" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
        {filteredExperiences.map((item, index) => (
          <div key={item.id} style={{ minWidth: '300px', maxWidth: '300px' }}>
            <ExperienceCard item={item} index={index} isDark={isDark} onOpenModal={onOpenModal} />
          </div>
        ))}
      </div>
      {canScrollRight && (
        <button onClick={() => scroll('right')} className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 rounded-full w-9 h-9 flex items-center justify-center shadow-lg" style={arrowStyle}>
          <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
        </button>
      )}
    </div>
  );
}

// ─── App 

function App() {
  const { isDark, toggle } = useTheme();
  const [activeTab, setActiveTab] = useState('aboutme');
  const [introComplete, setIntroComplete] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [watchLater, setWatchLater] = useState<Set<number>>(new Set());
  const [projectFilter, setProjectFilter] = useState('all');
  const [expFilter, setExpFilter] = useState('all');
  const [subscribed, setSubscribed] = useState(false);
  const [activeProjectModal, setActiveProjectModal] = useState<Project | null>(null);
  const [activeExpModal, setActiveExpModal] = useState<Experience | null>(null);

  useEffect(() => {
    if ('scrollRestoration' in window.history) window.history.scrollRestoration = 'manual';
    window.scrollTo(0, 0);
  }, []);

  const bg = isDark ? '#000' : '#f8fafc';
  const cardBg = isDark ? '#111827' : '#fff';
  const cardBorder = isDark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.08)';
  const textPrimary = isDark ? '#fff' : '#111';
  const textMuted = isDark ? '#9ca3af' : '#6b7280';
  const textAccent = isDark ? '#60a5fa' : '#1d4ed8';
  const inputBg = isDark ? '#1f2937' : '#f1f5f9';
  const inputBorder = isDark ? '#374151' : '#cbd5e1';
  const tabBorder = isDark ? '#1f2937' : '#e2e8f0';

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
    <div className="min-h-screen overflow-hidden transition-colors duration-300" style={{ background: bg, color: textPrimary }}>
      {!introComplete && <MuizIntro onComplete={() => setIntroComplete(true)} />}

      {/* Modals */}
      {activeProjectModal && (
        <ProjectModal project={activeProjectModal} onClose={() => setActiveProjectModal(null)} isDark={isDark} />
      )}
      {activeExpModal && (
        <ExperienceModal experience={activeExpModal} onClose={() => setActiveExpModal(null)} isDark={isDark} />
      )}

      <ThemeToggle isDark={isDark} onToggle={toggle} />

      <div className="flex flex-col items-center justify-center gap-0">
        {/* Banner */}
        <div className="w-11/12 mx-auto mt-4">
          <ChannelBanner isDark={isDark} />
        </div>

        {/* Profile */}
        <div className="w-11/12 mx-auto flex items-center gap-4 mt-4">
          <img src={face} alt="Profile" className="w-32 h-32 rounded-full object-cover border-4 border-blue-500" />
          <div className="flex-1">
            <h1 className="text-3xl font-bold" style={{ color: textPrimary }}>Muiz Jafri</h1>
            <p className="text-sm mt-1" style={{ color: textMuted }}>
              Third-year Computer Engineering student at Toronto Metropolitan University.
            </p>
            <div className="flex gap-4 mt-2 text-sm flex-wrap" style={{ color: textMuted }}>
              <span>Product Management</span>
              <span>·</span>
              <span>AI/ML Engineer</span>
              <span>·</span>
              <span>Full-Stack Developer</span>
              <span>·</span>
              <span>3rd year · Computer Engineering</span>
              <span>·</span>
              <span className="text-green-400">● Open to work</span>
            </div>
            <div className="flex gap-3 mt-3 flex-wrap">
              <a href="https://github.com/muizjafri" target="_blank" className="px-4 py-2 rounded-full text-sm border transition duration-300" style={{ background: isDark ? '#1f2937' : '#f1f5f9', color: textPrimary, border: `1px solid ${isDark ? '#374151' : '#cbd5e1'}` }}>
                GitHub
              </a>
              <a href="https://www.linkedin.com/in/muiz-jafri-92655a20b/" target="_blank" className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-500 transition duration-300 text-sm">
                LinkedIn
              </a>
              <button
                onClick={() => setSubscribed((s) => !s)}
                className="px-4 py-2 rounded-full text-sm font-medium transition-all duration-200"
                style={
                  subscribed
                    ? { background: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.05)', color: isDark ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.5)', border: isDark ? '1px solid rgba(255,255,255,0.15)' : '1px solid rgba(0,0,0,0.12)' }
                    : { background: isDark ? '#fff' : '#111', color: isDark ? '#000' : '#fff', border: isDark ? '1px solid #fff' : '1px solid #111' }
                }
              >
                {subscribed ? 'Subscribed ✓' : 'Subscribe'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="w-11/12 mx-auto mt-8">
        <div className="flex gap-8" style={{ borderBottom: `1px solid ${tabBorder}` }}>
          {['aboutme', 'projects', 'experience'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className="pb-3 px-2 text-base font-medium transition-colors relative capitalize"
              style={{ color: activeTab === tab ? textPrimary : textMuted }}
            >
              {tab === 'aboutme' ? 'About Me' : tab.charAt(0).toUpperCase() + tab.slice(1)}
              {activeTab === tab && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500" />}
            </button>
          ))}
        </div>
      </div>

      {/* ── About Me Tab ── */}
      {activeTab === 'aboutme' && (
        <div className="w-11/12 mx-auto mt-6">
          <Reveal delay={200}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div className="md:col-span-2 rounded-2xl p-6 flex flex-col justify-between min-h-40" style={{ background: cardBg, border: `1px solid ${cardBorder}` }}>
                <span className="text-xs uppercase tracking-widest mb-3" style={{ color: textAccent }}>// who am i</span>
                <p className="text-sm leading-relaxed" style={{ color: isDark ? '#d1d5db' : '#374151' }}>
                  Third-year <span className="font-semibold" style={{ color: textPrimary }}>Computer Engineering</span> student at
                  Toronto Metropolitan University. Passionate about product strategy, software engineering, and applying AI to build things people actually want to use.
                </p>
                <p className="text-xs mt-4" style={{ color: isDark ? '#4b5563' : '#9ca3af' }}>Toronto, ON 🍁</p>
              </div>
              <div className="bg-blue-600 text-white rounded-2xl p-6 flex flex-col justify-between min-h-40">
                <span className="text-xs text-blue-200 uppercase tracking-widest">Currently learning</span>
                <p className="text-2xl font-bold leading-tight mt-2">Product<br />Discovery<br /></p>
                <span className="text-blue-200 text-xs">User Research · Roadmapping · Collaboration </span>
              </div>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            {[
              { emoji: '🌯', title: 'Food Explorer', desc: 'Always love to try new food! (Favourite is Shawarma)' },
              { emoji: '🎮', title: 'Gamer', desc: 'League of Legends, Valorant, Marvel Rivals (spent too much time on them)' },
              { emoji: '📺', title: 'YouTube', desc: 'Especially Mystery and True Crime!' },
            ].map((item, i) => (
              <Reveal key={item.title} delay={i * 100}>
                <div className="rounded-2xl p-5 flex flex-col gap-2" style={{ background: cardBg, border: `1px solid ${cardBorder}` }}>
                  <span className="text-2xl">{item.emoji}</span>
                  <p className="font-semibold text-sm" style={{ color: textPrimary }}>{item.title}</p>
                  <p className="text-xs" style={{ color: textMuted }}>{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="rounded-2xl p-6" style={{ background: cardBg, border: `1px solid ${cardBorder}` }}>
                <span className="text-xs uppercase tracking-widest" style={{ color: textAccent }}>Tech focus</span>
                <div className="mt-4 flex flex-col gap-4">
                  {[
                    { label: 'Product Management', width: 91.67 },
                    { label: 'AI/ Machine Learning', width: 90 },
                    { label: 'Full Stack / Web Dev', width: 76 },
                   
                  ].map((item, i) => (
                    <ProgressBar key={item.label} label={item.label} value={item.width} delay={i * 200} isDark={isDark} />
                  ))}
                </div>
              </div>

              <div className="rounded-2xl p-6 flex flex-col gap-3" style={{ background: cardBg, border: `1px solid ${cardBorder}` }}>
                <span className="text-xs uppercase tracking-widest" style={{ color: textAccent }}>// contact me</span>
                <input type="text" placeholder="Your name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="text-sm rounded-xl px-4 py-2.5 focus:outline-none transition" style={{ background: inputBg, border: `1px solid ${inputBorder}`, color: textPrimary }} />
                <input type="email" placeholder="Your email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="text-sm rounded-xl px-4 py-2.5 focus:outline-none transition" style={{ background: inputBg, border: `1px solid ${inputBorder}`, color: textPrimary }} />
                <textarea placeholder="Message..." rows={3} value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} className="text-sm rounded-xl px-4 py-2.5 focus:outline-none transition resize-none" style={{ background: inputBg, border: `1px solid ${inputBorder}`, color: textPrimary }} />
                <button onClick={handleSend} disabled={status === 'sending'} className="bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-medium px-4 py-2.5 rounded-xl transition">
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
            <h2 className="text-xl font-semibold" style={{ color: textPrimary }}>
              Projects <span className="font-normal text-base" style={{ color: textMuted }}>({filteredProjects.length})</span>
            </h2>
            <span className="text-right italic text-xs" style={{ color: textMuted }}>↓ Click on the videos to watch!</span>
          </div>

          <FilterChips chips={PROJECT_CHIPS} active={projectFilter} onChange={setProjectFilter} isDark={isDark} />

          {watchLater.size > 0 && (
            <div className="mb-6 rounded-xl p-4" style={{ background: cardBg, border: `1px solid ${cardBorder}` }}>
              <p className="font-semibold text-sm mb-3" style={{ color: textPrimary }}>
                Watch Later <span className="font-normal" style={{ color: textMuted }}>({watchLater.size})</span>
              </p>
              <div className="flex flex-col gap-2">
                {projects.filter((p) => watchLater.has(p.id)).map((p) => (
                  <div key={p.id} className="flex items-center gap-3">
                    <div className="rounded-lg overflow-hidden flex-shrink-0" style={{ width: 80, height: 46 }}>
                      <img src={p.src} alt={p.title} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate" style={{ fontSize: 12, color: textPrimary }}>{p.title}</p>
                      <p style={{ fontSize: 11, color: textMuted }}>{p.ago}</p>
                    </div>
                    <button onClick={() => toggleWL(p.id)} className="transition text-lg leading-none" style={{ color: textMuted }}>✕</button>
                  </div>
                ))}
              </div>
            </div>
          )}

          <ProjectsScroller filteredProjects={filteredProjects} watchLater={watchLater} toggleWL={toggleWL} isDark={isDark} onOpenModal={setActiveProjectModal} />

          <div className="flex justify-center mt-8 mb-8">
            <a href="https://github.com/muizjafri?tab=repositories" target="_blank" rel="noopener noreferrer">
              <button className="group flex items-center gap-3 px-8 py-4 rounded-full text-base font-medium transition-all duration-300" style={{ background: cardBg, color: textPrimary, border: `1px solid ${isDark ? '#374151' : '#cbd5e1'}` }}>
                View More Projects
                <svg className="w-4 h-4 text-blue-400 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
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
            <h2 className="text-xl font-semibold" style={{ color: textPrimary }}>
              Experience <span className="font-normal text-base" style={{ color: textMuted }}>({filteredExperiences.length})</span>
            </h2>
          </div>

          <FilterChips chips={EXPERIENCE_CHIPS} active={expFilter} onChange={setExpFilter} isDark={isDark} />

          <ExperienceScroller filteredExperiences={filteredExperiences} isDark={isDark} onOpenModal={setActiveExpModal} />

          <div className="flex justify-center mt-8 mb-8">
            <a href={resume} download="MuizJafriResume.pdf">
              <button className="group flex items-center gap-3 px-8 py-4 rounded-full text-base font-medium transition-all duration-300" style={{ background: cardBg, color: textPrimary, border: `1px solid ${isDark ? '#374151' : '#cbd5e1'}` }}>
                <svg className="w-4 h-4 text-blue-400 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Download my Resume!
              </button>
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;