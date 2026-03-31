import React from 'react'
import Container from './Container'
import { sortingAlgorithms } from './Algo_List';


const Content = () => {
  return (
    <div className='flex flex-col items-center  '>
      <div className="search_bar flex justify-between border-2 rounded-2xl mt-10 p-2 h-10 w-80">
        <input type="text" placeholder='Search Algo' className='outline-none w-70' />
        <img src="src\assets\react.svg" height={30} width={30} alt="image" />
      </div>
      <div className="headlin mt-40 flex flex-col items-center ">
        <h1 className='text-7xl font-bold'>Sorting Visualizer</h1>
        <p className='text-lg text-gray-600 mt-3'>Visualize how different sorting algorithms work step-by-step in real time.<br></br>
          Adjust speed, change array size, and compare algorithms interactively.</p>
      </div>

      <div className='flex mt-60 gap-10 flex-wrap justify-center'>
        {sortingAlgorithms.map((ele, index) => {
          return (
            <div key={index}>
              <Container ele={ele}></Container>
            </div>
          );

        })}
      </div>

    </div>
  )
}

export default Content