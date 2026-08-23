import { useState } from "react";
import { Menu, Phone, X } from "lucide-react";
import { BrandMark } from "@/components/BrandMark";

const links = [
  { href: "/services", label: "Services" },
  { href: "/products", label: "Products" },
  { href: "/offers", label: "Offer board" },
];

export function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="site-header" aria-label="Site header">
      <nav className="site-nav" aria-label="Primary navigation">
        <BrandMark showAttribution />
        <div className="nav-links">
          {links.map((link) => <a key={link.href} className="nav-link focus-ring" href={link.href}>{link.label}</a>)}
        </div>
        <a className="nav-phone focus-ring" href="tel:+19746271143" aria-label="Call VeloLaunch at +1 9746-2711-143"><Phone size={13} aria-hidden="true" />+1 9746-2711-143</a>
        <a className="nav-cta focus-ring" href="#contact">Start a conversation</a>
        <button className="mobile-menu-button focus-ring" type="button" aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"} aria-expanded={menuOpen} onClick={() => setMenuOpen((open) => !open)}>
          {menuOpen ? <X size={19} /> : <Menu size={20} />}
        </button>
      </nav>
      {menuOpen ? <div className="mobile-menu" aria-label="Mobile navigation">
        {links.map((link) => <a key={link.href} href={link.href} onClick={closeMenu}>{link.label}</a>)}
        <a href="tel:+19746271143" onClick={closeMenu}>+1 9746-2711-143</a>
        <a href="#contact" onClick={closeMenu}>Start a conversation</a>
      </div> : null}
    </header>
  );
}
