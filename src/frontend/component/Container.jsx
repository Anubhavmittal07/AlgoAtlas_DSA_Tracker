import React from 'react';
import { Heart } from 'lucide-react';

const Container = ({ ele, favour, toggleFavour }) => {
    return (
        <div className=" p-5 rounded-2xl w-80 shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer"
            style={{backgroundColor: 'var(--card-bg)',
                    color: 'var(--card-text-color)'
            }}
        >

            <img
                src={ele.image}
                alt={ele.title}
                className="rounded-xl h-40 w-full object-cover"
            />

            <h2 className="text-2xl font-bold mt-3">{ele.title}</h2>


            <p className="text-gray-400 text-sm mt-1">
                {ele.shortDescription}
            </p>

            <div className="mt-3">
                <h3 className="font-semibold text-yellow-400">Time Complexity:</h3>
                <p className="text-sm">
                    Best: {ele.timeComplexity.best} | Avg: {ele.timeComplexity.avg} | Worst: {ele.timeComplexity.worst}
                </p>
            </div>

            <div className="mt-2">
                <h3 className="font-semibold text-green-400">Space Complexity:</h3>
                <p className="text-sm">{ele.spaceComplexity}</p>
            </div>

            <div className="flex justify-between mt-3 text-sm">
                <span className="bg-blue-500 px-2 py-1 rounded">
                    {ele.category}
                </span>
                <span className="bg-purple-500 px-2 py-1 rounded">
                    {ele.difficulty}
                </span>
            </div>
{/*             
            HeartIcon */}
            <div className="relative">
  
                <div
                    onClick={(e) => {
                        e.preventDefault();   
                        e.stopPropagation();
                        toggleFavour(ele);
                    }}
                    className="absolute top-2 right-2 cursor-pointer"
                >
                    <Heart
                    className={`${
                        favour.some(item => item.id === ele.id)
                        ? "text-red-500 fill-red-500"
                        : "text-white"
                    }`}
                    />
                </div>

            </div>
        </div>
    );
};

export default Container;