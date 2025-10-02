import React from 'react'
import logo from "../assets/logo.png"
import { NavLink } from 'react-router-dom'

function Navbar() {
  return (
    <>
      <nav className="flex items-center justify-between px-6 py-4 bg-pink-50 shadow-sm">
        {/* Logo + Brand */}
        <div className="flex items-center space-x-3">
          <NavLink to="/" className="flex items-center">
            <img src={logo} className="h-12 w-auto" alt="Colored Logo" />
          </NavLink>
        </div>

        {/* Menu */}
        <ul className="hidden md:flex space-x-4 font-semibold">
          {[
            { name: "My Palette", path: "/" },
            { name: "My Collection", path: "/collection" },
            { name: "Wishlist", path: "/wishlist" },
            { name: "About Us", path: "/about" },
          ].map((link) => (
            <li key={link.name}>
              <NavLink
                to={link.path}
                className={({ isActive }) =>
                   `inline-flex items-center justify-center px-3 py-3 text-base rounded-full transition shadow-md ${
                    isActive
                      ? "bg-pink-600 text-white"
                      : "bg-white text-pink-700 hover:bg-pink-600 hover:text-white"
                  }`
                }
              >
                {link.name}
              </NavLink>
            </li>
          ))}
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
