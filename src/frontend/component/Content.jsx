import React from 'react'
import Container from './Container'
import { sortingAlgorithms } from './Algo_List';
import { Search } from 'lucide-react'
import { Link } from 'react-router-dom';
import { useState, useRef } from 'react';


const Content = ({ favour, toggleFavour }) => {
  const [search,Setsearch]=useState("");
  const inputRef = useRef(null);
  // filtering by search
  const filtered=sortingAlgorithms.filter((algo)=>algo.title.toLowerCase().includes(search.toLowerCase()));

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
            onChange={(e)=>Setsearch(e.target.value)}
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
      

    </div>
  )
}

export default Content