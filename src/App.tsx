import github from './assets/githublogo.png'
import linkedin from './assets/linkedinlogo.png'
import face from './assets/myface.png'
import Toronto from './assets/Toronto.png'
import { useState } from 'react';
function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('projects');
  return (
    <>
      <div className="flex flex-col items-center justify-center gap-8">
        {/* Search Bar Component */}
        <div className="w-full my-4 max-w-2xl px-4">
          <div className="flex items-center border-2 border-gray-300 rounded-full shadow-lg overflow-hidden focus-within:border-blue-500">
            {/* Search Input */}
            <input
              type="text"
              placeholder="Search"
              className="flex-1 px-6 py-4 text-lg focus:outline-none"
            />
            
            {/* Divider Line */}
            <div className="h-14 w-px bg-gray-300"></div>
            
            {/* Magnifying Glass Icon */}
            <div className="px-6">
              <svg 
                className="w-9 h-6 text-gray-400"
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Toronto picture */}
        <div className="w-full">
          <img 
          src={Toronto} 
          alt="Toronto" 
          className="w-11/12 h-64 object-cover object-[50%_45%] mx-auto rounded-xl" />
        </div>
        {/* Profile Section */}
        <div className="w-11/12 mx-auto flex items-center gap-4">
          <img 
            src={face} 
            alt="Profile" 
            className="w-32 h-32 rounded-full object-cover border-4 border-blue-500"
          />
          <div>
          <h1 className="text-3xl font-bold">Muiz Jafri</h1>
          <p className="text-0x0">My name is Muiz Jafri and I am a third year Computer Engineering student at 
            <button onClick={()=> setIsModalOpen(true)} className="text-gray-500 hover:text-gray-900 ml-1 font-medium"> ...more</button>
          </p>
          
          <div className="flex gap-4 mt-2">
            <a href="#" className="bg-gray-800 text-white px-4 py-2 rounded-full hover:bg-gray-700 transition duration-300">
              GitHub
            </a>
            <a href="#" className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-500 transition duration-300">
              LinkedIn
            </a>
          </div>
          </div>
        </div>
      </div>
      {/* Projects Header */}
      <div className="w-11/12 mx-auto mt-8">
        <div className="flex gap-8 border-b border-gray-200">
          <button 
            onClick={() => setActiveTab('about')}
            className={`pb-3 px-2 text-base font-medium transition-colors relative
              ${activeTab === 'about' ? 'text-black' : 'text-gray-600 hover:text-gray-900'}
            `}
        >
      Projects
      {activeTab === 'about' && (
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-black" />
      )}
      {activeTab !== 'about' && (
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-transparent hover:bg-gray-400 transition-colors" />
      )}
    </button>
      <button
        onClick={() => setActiveTab('experience')}
        className={`pb-3 px-2 text-base font-medium transition-colors relative ${activeTab === 'experience' ? 'text-black' : 'text-gray-600 hover:text-gray-900'}`}>
        Experience
        {activeTab === 'experience' && (
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-black" />
      )}
      {activeTab !== 'experience' && (
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-transparent hover:bg-gray-400 transition-colors" />
      )}
      </button>
      </div>
      </div>
      <div className="w-full mt-6">
        <div className="w-11/12 mx-auto"> 
        <h2 className="text-xl font-semibold mb-4">Projects</h2>
        </div>

      </div>
      {/* PROJECT CARDS - ADD THIS SECTION */}
        <div className="w-11/12 mx-auto mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Project Card 1 */}
            <div className="cursor-pointer group">
              <div className="relative overflow-hidden rounded-xl bg-gray-200">
                <img 
                  src={linkedin}
                  alt="Project 1"
                  className="w-full aspect-video object-cover group-hover:scale-105 transition-transform duration-200"
                />
                <div className="absolute bottom-2 right-2 bg-black bg-opacity-80 text-white text-xs font-semibold px-1.5 py-0.5 rounded">
                  11:42
                </div>
              </div>
              <div className="flex gap-3 mt-3">
                <div className="flex-1">
                  <h3 className="font-medium text-sm line-clamp-2">
                    E-Commerce Website - Full Stack Application
                  </h3>
                  <div className="flex items-center gap-1 text-xs text-gray-600">
                    <span>208K views</span>
                    <span>•</span>
                    <span>1 month ago</span>
                  </div>
                </div>
                <button className="text-gray-600 hover:text-gray-900 h-6">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 16 16">
                    <circle cx="8" cy="3" r="1.5"/>
                    <circle cx="8" cy="8" r="1.5"/>
                    <circle cx="8" cy="13" r="1.5"/>
                  </svg>
                </button>
              </div>
            </div>

            {/* Project Card 2 */}
            <div className="cursor-pointer group">
              <div className="relative overflow-hidden rounded-xl bg-gray-200">
                <img 
                  src={github}
                  alt="Project 2"
                  className="w-full aspect-video object-cover group-hover:scale-105 transition-transform duration-200"
                />
                <div className="absolute bottom-2 right-2 bg-black bg-opacity-80 text-white text-xs font-semibold px-1.5 py-0.5 rounded">
                  12:44
                </div>
              </div>
              <div className="flex gap-3 mt-3">
                <div className="flex-1">
                  <h3 className="font-medium text-sm line-clamp-2">
                    Weather App with Real-Time Data
                  </h3>
                  <div className="flex items-center gap-1 text-xs text-gray-600">
                    <span>74K views</span>
                    <span>•</span>
                    <span>2 weeks ago</span>
                  </div>
                </div>
                <button className="text-gray-600 hover:text-gray-900 h-6">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 16 16">
                    <circle cx="8" cy="3" r="1.5"/>
                    <circle cx="8" cy="8" r="1.5"/>
                    <circle cx="8" cy="13" r="1.5"/>
                  </svg>
                </button>
              </div>
            </div>

            {/* Add more project cards by copying the structure above */}
          </div>
        </div>
      {isModalOpen && (<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[80vh] overflow-hidden shadow-2xl">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-2xl font-bold">Muiz Jafri</h2>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-gray-500 hover:text-gray-900 text-2xl w-8 h-8 flex items-center justify-center"
              >
                ✕
              </button>
            </div>

            {/* Modal Content - Scrollable */}
            <div className="overflow-y-auto max-h-[calc(80vh-80px)] p-6">
              {/* Description Section */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3">Description</h3>
                <p className="text-gray-700 mb-4">
                  My name is Muiz Jafri and I am a third year Computer Engineering student at Toronto Metropolitan University. 
                  I am passionate about software development and love building web applications and exploring new technologies. 
                </p>

                <div className="space-y-2 text-gray-700">
                  <p className="font-medium">Info about me outside of coding:</p>
                  <ul className="space-y-1 ml-4">
                    <li>- I love to eat food and go check out new restaurants</li>
                    <li>- I often play multiplayer video games such as League of Legends and Marvel Rivals</li>
                    <li>- I watch a ton of Youtube where my favourite channel is fern.</li>
                  </ul>
                </div>

                <div className="mt-4 space-y-2">
                  <p className="font-medium text-gray-700">Technical Skills:</p>
                  <p className="text-gray-700">
                     Languages: Web Development / Full Stack<br />
                     Frameworks & Libraries: Web Development / Full Stack<br />
                     Tools & Platforms: Machine Learning / AI <br />
                     Currently learning: Cloud Computing / DevOps
                  </p>
                </div>

                <p className="mt-4 text-gray-700">
                  I hope you enjoy my projects 🔥
                </p>
              </div>

              {/* Links Section */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3">Links</h3>
                <div className="space-y-3">
                  <a href="#" className="flex items-center gap-3 text-blue-600 hover:underline">
                    <div className="w-6 h-6 bg-gray-800 rounded flex items-center justify-center text-white text-xs">
                      G
                    </div>
                    <div>
                      <p className="font-medium">GitHub</p>
                      <p className="text-sm text-gray-600">github.com/muizjafri</p>
                    </div>
                  </a>
                  <a href="#" className="flex items-center gap-3 text-blue-600 hover:underline">
                    <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center text-white text-xs">
                      in
                    </div>
                    <div>
                      <p className="font-medium">LinkedIn</p>
                      <p className="text-sm text-gray-600">linkedin.com/in/muizjafri</p>
                    </div>
                  </a>
                </div>
              </div>

              {/* More Info Section (Collapsible) */}
              <div>
                <button className="flex items-center justify-between w-full text-left">
                  <h3 className="text-lg font-semibold">More info</h3>
                  <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
  
}

export default App