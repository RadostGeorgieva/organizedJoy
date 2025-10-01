import React from 'react'
import "../App.css"
import logo from "../assets/logo.png"

function Navbar() {
  return (
    <>
      <nav className="flex items-center justify-between px-6 py-3 bg-white shadow">
        {/* Logo + Brand */}
        <div className="flex items-center space-x-3">
          <a href="/" className="flex items-center">
            <img src={logo} className="h-25 w-auto" alt="Organized Joy" />
            <span className="ml-5 text-2xl font-semibold text-gray-800 tracking-wide uppercase">
              Organized Joy
            </span>
          </a>
        </div>

        {/* Menu */}
        <ul className="hidden md:flex space-x-6 text-gray-600 font-medium">
          <li><a href="#" className="hover:text-gray-900">My Collection</a></li>
          <li><a href="#" className="hover:text-gray-900">Wishlist</a></li>
          <li><a href="#" className="hover:text-gray-900">Add Item</a></li>
          <li><a href="#" className="hover:text-gray-900">About Us</a></li>
        </ul>

        {/* Hamburger for mobile */}
        <div className="md:hidden flex flex-col space-y-1 cursor-pointer">
          <span className="block h-0.5 w-6 bg-gray-800"></span>
          <span className="block h-0.5 w-6 bg-gray-800"></span>
          <span className="block h-0.5 w-6 bg-gray-800"></span>
        </div>
      </nav>
    </>
  )
}

export default Navbar
