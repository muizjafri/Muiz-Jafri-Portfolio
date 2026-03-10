import github from './assets/githublogo.png'
import linkedin from './assets/linkedinlogo.png'
import face from './assets/myface.png'
import Toronto from './assets/Toronto.png'
import { useState } from 'react';
import MuizIntro from './MuizIntro';
import emailjs from '@emailjs/browser';

const EMAILJS_SERVICE_ID = 'service_ced8a35';
const EMAILJS_TEMPLATE_ID = 'template_ew2y7gi';
const EMAILJS_PUBLIC_KEY = 'dbAiIXD2czrnQxLgZ';

interface Project {
  id: number;
  src: string;
  title: string;
  duration: string;
  author: string;
  tag: string;
  color: string;
}

interface Experience {
  id: number;
  src: string;
  title: string;
  company: string;
  duration: string;
  tag: string;
  color: string;
}

const STACK_OFFSET = 30;

function StackedCards<T extends { id: number }>({
  items,
  renderCard,
}: {
  items: T[];
  renderCard: (item: T, index: number) => React.ReactNode;
}) {
  return (
    <div style={{ paddingBottom: `${items.length * STACK_OFFSET}px` }}>
      {items.map((item, i) => (
        <div
          key={item.id}
          style={{
            position: 'sticky',
            top: `${80 + i * STACK_OFFSET}px`,
            zIndex: i + 1,
            marginBottom: '1rem',
            transition: 'transform 0.2s ease',
          }}
          className="hover:scale-[1.02] hover:z-50"
        >
          {renderCard(item, i)}
        </div>
      ))}
    </div>
  );
}

function ProjectCard({ item, index }: { item: Project; index: number }) {
  return (
    <div
      className="rounded-2xl overflow-hidden border border-gray-800 shadow-2xl"
      style={{
        background: `linear-gradient(135deg, ${item.color} 0%, #111827 100%)`,
        boxShadow: `0 ${8 + index * 4}px ${24 + index * 8}px rgba(0,0,0,0.5)`,
      }}
    >
      <div className="flex flex-col md:flex-row">
        <div className="relative md:w-2/5 overflow-hidden">
          <img src={item.src} alt={item.title} className="w-full h-48 md:h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/30" />
          <div className="absolute bottom-3 right-3 bg-black/70 backdrop-blur-sm text-white text-xs font-mono px-2 py-1 rounded-lg">
            {item.duration}
          </div>
        </div>
        <div className="flex-1 p-6 flex flex-col justify-between">
          <div>
            <span className="inline-block text-xs text-blue-400 border border-blue-400/30 bg-blue-400/10 px-2 py-0.5 rounded-full mb-3">
              {item.tag}
            </span>
            <h3 className="text-white font-bold text-lg leading-tight mb-2">{item.title}</h3>
            <p className="text-gray-400 text-sm">by {item.author}</p>
          </div>
          <div className="mt-4 flex gap-2">
            <button className="bg-blue-600 hover:bg-blue-500 transition text-white text-xs px-4 py-2 rounded-full font-medium">
              View Project
            </button>
            <button className="bg-white/10 hover:bg-white/20 transition text-white text-xs px-4 py-2 rounded-full font-medium">
              Source Code
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function ExperienceCard({ item, index }: { item: Experience; index: number }) {
  return (
    <div
      className="rounded-2xl overflow-hidden border border-gray-800 shadow-2xl"
      style={{
        background: `linear-gradient(135deg, ${item.color} 0%, #111827 100%)`,
        boxShadow: `0 ${8 + index * 4}px ${24 + index * 8}px rgba(0,0,0,0.5)`,
      }}
    >
      <div className="flex flex-col md:flex-row">
        <div className="relative md:w-2/5 overflow-hidden">
          <img src={item.src} alt={item.title} className="w-full h-48 md:h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/30" />
          <div className="absolute bottom-3 right-3 bg-black/70 backdrop-blur-sm text-white text-xs font-mono px-2 py-1 rounded-lg">
            {item.duration}
          </div>
        </div>
        <div className="flex-1 p-6 flex flex-col justify-between">
          <div>
            <span className="inline-block text-xs text-blue-400 border border-blue-400/30 bg-blue-400/10 px-2 py-0.5 rounded-full mb-3">
              {item.tag}
            </span>
            <h3 className="text-white font-bold text-lg leading-tight mb-1">{item.title}</h3>
            <p className="text-gray-400 text-sm font-medium">{item.company}</p>
          </div>
          <div className="mt-4">
            <button className="bg-blue-600 hover:bg-blue-500 transition text-white text-xs px-4 py-2 rounded-full font-medium">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

const projects: Project[] = [
  {
    id: 1,
    src: linkedin,
    title: "AI Powered Typing Test Application",
    duration: "11:42",
    author: "Muiz Jafri",
    tag: "Machine Learning",
    color: "#1a2744",
  },
  {
    id: 2,
    src: github,
    title: "Real-Time Object Recognition & AI Assistant",
    duration: "12:44",
    author: "Muiz Jafri",
    tag: "Computer Vision",
    color: "#0f2233",
  },
];

const experiences: Experience[] = [
  {
    id: 1,
    src: linkedin,
    title: "Software Engineer",
    company: "Air Hawk Solutions",
    duration: "11:42",
    tag: "Engineering",
    color: "#1a2744",
  },
  {
    id: 2,
    src: github,
    title: "Competitions Organizer",
    company: "MIST Toronto",
    duration: "12:44",
    tag: "Leadership",
    color: "#0f2233",
  },
  {
    id: 3,
    src: github,
    title: "Integration Camp Counsellor",
    company: "City of Pickering",
    duration: "12:44",
    tag: "Community",
    color: "#122033",
  },
];

function App() {
  const [activeTab, setActiveTab] = useState('aboutme');
  const [introComplete, setIntroComplete] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  const handleSend = async () => {
    if (!formData.name || !formData.email || !formData.message) return;
    setStatus('sending');
    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
        },
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

      <div className="flex flex-col items-center justify-center gap-8">
        {/* Search Bar */}
        <div className="w-full my-4 max-w-2xl px-4">
          <div className="flex items-center border-2 border-gray-700 rounded-full shadow-lg overflow-hidden focus-within:border-blue-500 bg-gray-900">
            <input
              type="text"
              placeholder="Search"
              className="flex-1 px-6 py-4 text-lg focus:outline-none bg-transparent text-white placeholder-gray-500"
            />
            <div className="h-14 w-px bg-gray-700"></div>
            <div className="px-6">
              <svg className="w-9 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Toronto Banner */}
        <div className="w-full">
          <img src={Toronto} alt="Toronto" className="w-11/12 h-64 object-cover object-[50%_45%] mx-auto rounded-xl" />
        </div>

        {/* Profile Section */}
        <div className="w-11/12 mx-auto flex items-center gap-4">
          <img src={face} alt="Profile" className="w-32 h-32 rounded-full object-cover border-4 border-blue-500" />
          <div>
            <h1 className="text-3xl font-bold text-white">Muiz Jafri</h1>
            <p className="text-sm text-gray-400 mt-1">
              Third-year Computer Engineering student at Toronto Metropolitan University.
            </p>
            <div className="flex gap-4 mt-3">
              <a href="https://github.com/muizjafri" target="_blank"
                className="bg-gray-800 text-white px-4 py-2 rounded-full hover:bg-gray-700 transition duration-300 text-sm border border-gray-700">
                GitHub
              </a>
              <a href="https://www.linkedin.com/in/muiz-jafri-92655a20b/" target="_blank"
                className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-500 transition duration-300 text-sm">
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
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
              {activeTab === tab && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500" />}
            </button>
          ))}
        </div>
      </div>

      {/* About Me Tab */}
      {activeTab === 'aboutme' && (
        <div className="w-11/12 mx-auto mt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div className="md:col-span-2 bg-gray-900 border border-gray-800 text-white rounded-2xl p-6 flex flex-col justify-between min-h-40">
              <span className="text-xs text-blue-400 uppercase tracking-widest mb-3">// whoami</span>
              <p className="text-gray-300 text-sm leading-relaxed">
                Third-year <span className="text-white font-semibold">Computer Engineering</span> student
                at Toronto Metropolitan University. Passionate about building web apps and
                exploring new technologies.
              </p>
              <p className="text-xs text-gray-600 mt-4">Toronto, ON 🍁</p>
            </div>
            <div className="bg-blue-600 text-white rounded-2xl p-6 flex flex-col justify-between min-h-40">
              <span className="text-xs text-blue-200 uppercase tracking-widest">Currently learning</span>
              <p className="text-2xl font-bold leading-tight mt-2">Cloud<br />Computing<br />& DevOps</p>
              <span className="text-blue-200 text-xs">AWS · Docker · K8s</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            {[
              { emoji: '🍜', title: 'Food Explorer', desc: 'Always love to try new food!' },
              { emoji: '🎮', title: 'Gamer', desc: 'League of Legends, Valorant, Marvel Rivals (spent too much time on them)' },
              { emoji: '📺', title: 'YouTube Addict', desc: 'Favourite channel: fern.' },
            ].map((item) => (
              <div key={item.title} className="bg-gray-900 border border-gray-800 rounded-2xl p-5 flex flex-col gap-2">
                <span className="text-2xl">{item.emoji}</span>
                <p className="font-semibold text-sm text-white">{item.title}</p>
                <p className="text-xs text-gray-400">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Tech Focus */}
            <div className="bg-gray-900 border border-gray-800 text-white rounded-2xl p-6">
              <span className="text-xs text-blue-400 uppercase tracking-widest">Tech focus</span>
              <div className="mt-4 flex flex-col gap-3">
                {[
                  { label: "Full Stack / Web Dev", width: "w-11/12" },
                  { label: "Machine Learning / AI", width: "w-8/12" },
                  { label: "Cloud / DevOps", width: "w-4/12" },
                ].map((item) => (
                  <div key={item.label}>
                    <p className="text-xs text-gray-400 mb-1">{item.label}</p>
                    <div className="w-full bg-gray-800 rounded-full h-1.5">
                      <div className={`bg-blue-500 h-1.5 rounded-full ${item.width}`} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact Form */}
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
        </div>
      )}

      {/* Projects Tab */}
      {activeTab === 'projects' && (
        <div className="w-11/12 mx-auto mt-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-white">Projects ({projects.length})</h2>
            <span className="text-xs text-gray-500 italic">↓ scroll to explore</span>
          </div>
          <StackedCards
            items={projects}
            renderCard={(item, index) => <ProjectCard item={item} index={index} />}
          />
          <div className="flex justify-center mt-5 mb-8">
            <a href="https://github.com/muizjafri?tab=repositories" target="_blank" rel="noopener noreferrer">
              <button className="group flex items-center gap-3 bg-gray-900 border border-gray-700 hover:border-blue-500 text-white px-8 py-4 rounded-full text-base font-medium transition-all duration-300 hover:bg-gray-800">
                View More Projects
                <svg className="w-4 h-4 text-blue-400 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
            </a>
          </div>
        </div>
      )}

      {/* Experience Tab */}
      {activeTab === 'experience' && (
        <div className="w-11/12 mx-auto mt-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-white">Experience ({experiences.length})</h2>
            <span className="text-xs text-gray-500 italic">↓ scroll to explore</span>
          </div>
          <StackedCards
            items={experiences}
            renderCard={(item, index) => <ExperienceCard item={item} index={index} />}
          />
          <div className="flex justify-center mt-5 mb-8">
            <button className="group flex items-center gap-3 bg-gray-900 border border-gray-700 hover:border-blue-500 text-white px-8 py-4 rounded-full text-base font-medium transition-all duration-300 hover:bg-gray-800">
              <svg className="w-4 h-4 text-blue-400 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
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