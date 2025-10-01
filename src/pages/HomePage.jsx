import React from 'react'
import { Link } from 'react-router-dom'

const HomePage = () => {

     return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center bg-gradient-to-b from-pink-50 to-white">
      <h1 className="text-4xl font-bold mb-6 text-gray-800">
        Find Your Perfect Colors
      </h1>
      <p className="text-lg text-gray-600 mb-8 max-w-md">
        Discover the shades that make you shine. Take our quick test and see
        which colors suit you best.
      </p>
      <Link
        to="/quiz"
        className="px-6 py-3 bg-pink-600 text-white font-semibold rounded-lg shadow-md hover:bg-pink-700 transition"
      >
        Start Now
      </Link>
    </div>
  );

}

export default HomePage
