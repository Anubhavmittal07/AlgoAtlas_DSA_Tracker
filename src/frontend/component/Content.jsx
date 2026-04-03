import React from 'react'
import Container from './Container'
import { sortingAlgorithms } from './Algo_List';
import { Search } from 'lucide-react'
import { Link } from 'react-router-dom';

const Content = () => {
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
          Sorting Visualizer
        </h1>

        <p className='text-lg text-gray-400 mt-4 max-w-2xl'>
          Visualize how different sorting algorithms work step-by-step in real time.
          <br />
          Adjust speed, change array size, and compare algorithms interactively
        </p>

        <div className="flex items-center border  backdrop-blur-md rounded-2xl mt-10 p-3 w-80 bg-white/10 shadow-lg"
          style={{
            borderColor: 'var(--serchbar-bg)',
          }}
        >
          <input
            type="text"
            placeholder="Search Algo"
            className="outline-none flex-1 px-2 bg-transparent"
            style={{
              color: 'var(--serchbar-color)',
            }}
          />
          <Search className="text-white" />
        </div>

      </div>
        
      <div className='flex gap-10 flex-wrap justify-center px-5 pb-20 -mt-40'>
        {sortingAlgorithms.map((ele, index) => (
          <Link to={`/algo/${ele.id}`} key={index} >
          <Container ele={ele} />
          </Link>
        ))}
      </div>

    </div>
  )
}

export default Content