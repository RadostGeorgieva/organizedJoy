import React from "react";
import { NavLink } from "react-router-dom";
import AuthButton from "./AuthButton";

const links = [
  { name: "Home", path: "/" },
  { name: "My Palette", path: "/palette" },
  { name: "My Collection", path: "/collection" },
  { name: "Wishlist", path: "/wishlist" },
  { name: "About Us", path: "/about" },
];

export default function Navbar({ withBorders = false }) {
  const NavBarCore = (
    <nav className="max-w-screen-xl mx-auto px-6 py-3 flex items-center justify-between">
      {/* LEFT SIDE (logo placeholder if you want later) */}
      <div className="flex-1" />

      {/* CENTER LINKS */}
      <ul
        className="flex items-center justify-center gap-8 flex-none"
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

      {/* RIGHT SIDE (AuthButton) */}
      <div className="flex-1 flex justify-end">
        <AuthButton />
      </div>
    </nav>
  );

  if (!withBorders) return NavBarCore;

  return (
    <div className="w-full">
      <div className="border-t border-neutral-200" />
      {NavBarCore}
      <div className="border-t border-neutral-200" />
    </div>
  );
}
