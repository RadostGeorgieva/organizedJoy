import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import logo from "../assets/logo.png"

const HomePage = () => {
  return (
    
    <div className="flex flex-col items-center justify-center min-h-screen text-center bg-gradient-to-b from-pink-50 to-white">
         <NavLink className="flex flex-shrink-0 items-center mr-4 mb-6" to="/">
              <img
                className="h-100 w-auto"
                src={logo}
                alt="React Jobs"
              />
       </NavLink>
        <h1 className="text-4xl md:text-5xl font-bold text-pink-700 mb-6">Welcome to Your Color Journey</h1>
      <p className="text-lg text-gray-700 mb-10 max-w-md">
        Discover your personal palette and wardrobe.  
        Take our quick test and see which colors make you shine.
      </p>
      <Link
        to="/quiz"
        className="px-8 py-3 bg-pink-600 text-white font-semibold rounded-full shadow-md hover:bg-pink-700 transition"
      >
        Start Now
      </Link>
    </div>
  )
}

export default HomePage
