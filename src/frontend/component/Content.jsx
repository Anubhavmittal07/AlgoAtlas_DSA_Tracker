import React from 'react'
import Container from './Container'
import { sortingAlgorithms } from './Algo_List';
import { Search } from 'lucide-react'
import { Link } from 'react-router-dom';
import { useState, useRef } from 'react';


const Content = ({ favour, toggleFavour }) => {
  const [search, Setsearch] = useState("");
  const inputRef = useRef(null);
  // filtering by search
  const filtered = sortingAlgorithms.filter((algo) => algo.title.toLowerCase().includes(search.toLowerCase()));

  return (
    <div
      className="w-full min-h-screen"
      style={{
        backgroundImage: 'var(--background-image)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >

      <div className="flex flex-col items-center justify-center min-h-screen text-center px-4">

        <h1 className='text-6xl  font-bold '>
          AlgoAtlas
        </h1>

        <p className='text-lg text-gray-400 mt-4 max-w-2xl'>
          A comprehensive platform for exploring algorithms, offering structured explanations, practice resources, and essential learning tools in one place
          <br />
        </p>

        {/* Search Bar */}

        <div onClick={() => inputRef.current.focus()}
          className="search-bar flex items-center border  backdrop-blur-md rounded-2xl mt-10 p-3 w-80 bg-white/10 shadow-lg"
          style={{
            borderColor: 'var(--serchbar-bg)',
          }}
        >
          <input
            ref={inputRef}
            type="text"
            placeholder="Search Algorithm"
            value={search}
            onChange={(e) => Setsearch(e.target.value)}
            className="outline-none flex-1 px-2 bg-transparent"
            style={{
              color: 'var(--serchbar-color)',
            }}
          />
          <Search className="text-white" />
        </div>

      </div>

      <div className='flex gap-10 flex-wrap justify-center px-5 pb-20 -mt-40'>
        {(search ? filtered : sortingAlgorithms).map((ele, index) => (
          <Link to={`/algo/${ele.id}`} key={index}>
            <Container
              ele={ele}
              favour={favour}
              toggleFavour={toggleFavour}
            />
          </Link>
        ))}
      </div>

      {/* <div className='flex gap-10 flex-wrap justify-center px-5 pb-20 -mt-40'>
        {sortingAlgorithms.map((ele, index) => (
          <Link to={`/algo/${ele.id}`} key={index} >
          <Container ele={ele} />
          </Link>
        ))}
      </div> */}

      {/* ===== ABOUT SECTION ===== */}
      <section id="about" className="about-section">
        <div className="about-container">
          <h2 className="about-title">About <span className="about-highlight">AlgoAtlas</span></h2>
          <p className="about-subtitle">
            Your one-stop destination for mastering Data Structures &amp; Algorithms through interactive visualizations.
          </p>

          <div className="about-grid">
            {/* What We Do */}
            <div className="about-card">
              <div className="about-card-icon">😘</div>
              <h3>What We Do</h3>
              <p>
                AlgoAtlas brings algorithms to life with step-by-step visual breakdowns.
                Whether it's sorting, searching, or graph traversal — we make complex logic
                easy to understand through animated, interactive demonstrations.
              </p>
            </div>

            {/* Why It Matters */}
            <div className="about-card">
              <div className="about-card-icon">🎯</div>
              <h3>Why It Matters</h3>
              <p>
                Understanding algorithms is fundamental for every developer. Our platform bridges
                the gap between theory and practice by letting you see exactly how each algorithm
                processes data in real time.
              </p>
            </div>

            {/* Features */}
            <div className="about-card">
              <div className="about-card-icon">⚡</div>
              <h3>Key Features</h3>
              <ul className="about-features-list">
                <li>Interactive algorithm visualizations</li>
                <li>Curated explanations &amp; complexity analysis</li>
                <li>Quiz-based learning &amp; assessments</li>
                <li>Wishlist to bookmark your favourites</li>
                <li>Dark &amp; Light mode support</li>
              </ul>
            </div>

            {/* Our Mission */}
            <div className="about-card">
              <div className="about-card-icon">💡</div>
              <h3>Our Mission</h3>
              <p>
                We believe that learning should be visual, engaging, and accessible to everyone.
                AlgoAtlas is built by students, for students — with the goal of making DSA
                preparation less intimidating and more enjoyable.
              </p>
            </div>
          </div>

          <div className="about-tech">
            <h3>Built With</h3>
            <div className="tech-badges">
              <span className="tech-badge">React</span>
              <span className="tech-badge">Vite</span>
              <span className="tech-badge">Tailwind CSS</span>
              <span className="tech-badge">React Router</span>
              <span className="tech-badge">Lucide Icons</span>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}

export default Content