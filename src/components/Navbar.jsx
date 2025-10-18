// components/Navbar.jsx
import React from "react";
import { NavLink } from "react-router-dom";

const links = [
  { name: "Home", path: "/" },
  { name: "My Palette", path: "/palette" },
  { name: "My Collection", path: "/collection" },
  { name: "Wishlist", path: "/wishlist" },
  { name: "About Us", path: "/about" },
];

export default function Navbar({ withBorders = false }) {
  const NavBarCore = (
    <nav className="max-w-screen-xl mx-auto px-6">
      <ul
        className="flex items-center justify-center gap-8 py-3"
        role="menubar"
        aria-label="Primary"
      >
        {links.map((l) => (
          <li key={l.name} role="none">
            <NavLink
              to={l.path}
              role="menuitem"
              className={({ isActive }) =>
                [
                  "text-base font-medium tracking-wide",
                  "text-neutral-900 hover:underline underline-offset-4",
                  isActive ? "underline" : "",
                ].join(" ")
              }
            >
              {l.name}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );

  if (!withBorders) return NavBarCore;

  // optional variant: navbar renders its own hairlines
  return (
    <div className="w-full">
      <div className="border-t border-neutral-200" />
      {NavBarCore}
      <div className="border-t border-neutral-200" />
      
    </div>
  );
}
