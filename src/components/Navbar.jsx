import React from 'react'
import "../App.css"
import logo from "../assets/logo.png"

function Navbar() {
  return (
    <>
      <nav className="flex items-center justify-between px-6 py-4 bg-pink-50 shadow-sm">
        {/* Logo + Brand */}
        <div className="flex items-center space-x-3">
          <a href="/" className="flex items-center">
            <img src={logo} className="h-12 w-auto" alt="Colored Logo" />
          </a>
        </div>

        {/* Menu */}
        <ul className="hidden md:flex space-x-8 text-pink-700 font-semibold">
          <li><a href="#" className="hover:text-pink-900 transition">My Palette</a></li>
          <li><a href="#" className="hover:text-pink-900 transition">My Collection</a></li>
          <li><a href="#" className="hover:text-pink-900 transition">Wishlist</a></li>
          <li><a href="#" className="hover:text-pink-900 transition">About Us</a></li>
        </ul>

        {/* Hamburger for mobile */}
        <div className="md:hidden flex flex-col space-y-1 cursor-pointer">
          <span className="block h-0.5 w-6 bg-pink-700"></span>
          <span className="block h-0.5 w-6 bg-pink-700"></span>
          <span className="block h-0.5 w-6 bg-pink-700"></span>
        </div>
      </nav>
    </>
  )
}

export default Navbar
