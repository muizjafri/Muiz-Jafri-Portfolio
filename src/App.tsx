import github from './assets/githublogo.png'
import linkedin from './assets/linkedinlogo.png'
import face from './assets/myface.png'
import Toronto from './assets/Toronto.png'
import { useState } from 'react';
import MuizIntro from './MuizIntro';

const projects = [
  {
    id: 1,
    src: linkedin,
    title: "AI Powered Typing Test Application",
    duration: "11:42",
    author: "Muiz Jafri",
  },
  {
    id: 2,
    src: github,
    title: "Real-Time Object Recognition & AI Assistant",
    duration: "12:44",
    author: "Muiz Jafri",
  },
];

const experiences = [
  {
    id: 1,
    src: linkedin,
    title: "Software Engineer",
    company: "Air Hawk Solutions",
    duration: "11:42",
  },
  {
    id: 2,
    src: github,
    title: "Competitions Organizer",
    company: "MIST Toronto",
    duration: "12:44",
  },
  {
    id: 3,
    src: github,
    title: "Integration Camp Counsellor",
    company: "City of Pickering",
    duration: "12:44",
  },
];

function App() {
  const [activeTab, setActiveTab] = useState('projects');
  const [introComplete, setIntroComplete] = useState(false);

  return (
    <div className="bg-black min-h-screen text-white">
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
              <a href=""
                className="bg-gray-800 text-white px-4 py-2 rounded-full hover:bg-gray-700 transition duration-300 text-sm border border-gray-700">
                Contact me
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
              { emoji: '🍜', title: 'Food Explorer', desc: 'Always hunting for the next great restaurant in the city.' },
              { emoji: '🎮', title: 'Gamer', desc: 'League of Legends & Marvel Rivals. Ranked grind never stops.' },
              { emoji: '📺', title: 'YouTube Addict', desc: 'Favourite channel: fern. Good taste is a skill.' },
            ].map((item) => (
              <div key={item.title} className="bg-gray-900 border border-gray-800 rounded-2xl p-5 flex flex-col gap-2">
                <span className="text-2xl">{item.emoji}</span>
                <p className="font-semibold text-sm text-white">{item.title}</p>
                <p className="text-xs text-gray-400">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 flex flex-col justify-between">
              <span className="text-xs text-blue-400 uppercase tracking-widest mb-4">Find me</span>
              <div className="flex flex-col gap-3">
                <a href="https://github.com/muizjafri" target="_blank"
                  className="flex items-center gap-3 bg-gray-800 text-white px-4 py-3 rounded-xl hover:bg-gray-700 transition text-sm font-medium border border-gray-700">
                  <span>🐙</span> GitHub
                </a>
                <a href="https://www.linkedin.com/in/muiz-jafri-92655a20b/" target="_blank"
                  className="flex items-center gap-3 bg-blue-600 text-white px-4 py-3 rounded-xl hover:bg-blue-500 transition text-sm font-medium">
                  <span>💼</span> LinkedIn
                </a>
                <a href=""
                  className="flex items-center gap-3 bg-gray-800 text-gray-300 px-4 py-3 rounded-xl hover:bg-gray-700 transition text-sm font-medium border border-gray-700">
                  <span>✉️</span> Contact me
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Projects Tab */}
      {activeTab === 'projects' && (
        <div className="w-11/12 mx-auto mt-6">
          <h2 className="text-xl font-semibold mb-4 text-white">Projects ({projects.length})</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {projects.map((project) => (
              <div key={project.id} className="cursor-pointer group">
                <div className="relative overflow-hidden rounded-xl bg-gray-900">
                  <img
                    src={project.src}
                    alt={project.title}
                    className="w-full aspect-video object-cover group-hover:scale-105 transition-transform duration-200"
                  />
                  <div className="absolute bottom-2 right-2 bg-black bg-opacity-80 text-white text-xs font-semibold px-1.5 py-0.5 rounded">
                    {project.duration}
                  </div>
                </div>
                <div className="flex gap-3 mt-3">
                  <div className="flex-1">
                    <h3 className="font-medium text-sm line-clamp-2 text-white">{project.title}</h3>
                    <p className="text-xs text-gray-400">Author: {project.author}</p>
                  </div>
                  <button className="text-gray-400 hover:text-white h-6">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 16 16">
                      <circle cx="8" cy="3" r="1.5"/>
                      <circle cx="8" cy="8" r="1.5"/>
                      <circle cx="8" cy="13" r="1.5"/>
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Experience Tab */}
      {activeTab === 'experience' && (
        <div className="w-11/12 mx-auto mt-6">
          <h2 className="text-xl font-semibold mb-4 text-white">Experience ({experiences.length})</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {experiences.map((exp) => (
              <div key={exp.id} className="cursor-pointer group">
                <div className="relative overflow-hidden rounded-xl bg-gray-900">
                  <img
                    src={exp.src}
                    alt={exp.title}
                    className="w-full aspect-video object-cover group-hover:scale-105 transition-transform duration-200"
                  />
                  <div className="absolute bottom-2 right-2 bg-black bg-opacity-80 text-white text-xs font-semibold px-1.5 py-0.5 rounded">
                    {exp.duration}
                  </div>
                </div>
                <div className="flex gap-3 mt-3">
                  <div className="flex-1">
                    <h3 className="font-medium text-sm line-clamp-2 text-white">{exp.title}</h3>
                    <p className="text-xs text-gray-400">{exp.company}</p>
                  </div>
                  <button className="text-gray-400 hover:text-white h-6">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 16 16">
                      <circle cx="8" cy="3" r="1.5"/>
                      <circle cx="8" cy="8" r="1.5"/>
                      <circle cx="8" cy="13" r="1.5"/>
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;