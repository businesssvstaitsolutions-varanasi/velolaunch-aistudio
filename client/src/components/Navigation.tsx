/**
 * Precision Field design reminder: navigation is a restrained floating control plane, not a decorative glass bar.
 */
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BrandMark } from "@/components/BrandMark";

const links = [
  { href: "#products", label: "Products" },
  { href: "#services", label: "Services" },
  { href: "#principles", label: "Principles" },
  { href: "#company", label: "Company" },
];

export function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="site-header" aria-label="Site header">
      <nav className="site-nav" aria-label="Primary navigation">
        <BrandMark />

        <div className="nav-links" aria-label="Desktop navigation">
          {links.map((link) => (
            <a key={link.href} className="nav-link focus-ring" href={link.href}>
              {link.label}
            </a>
          ))}
        </div>

        <Button asChild className="nav-cta">
          <a href="#contact">Start a conversation</a>
        </Button>

        <Button
          variant="ghost"
          size="icon"
          className="mobile-menu-button"
          type="button"
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X size={18} /> : <Menu size={19} />}
        </Button>
      </nav>

      {menuOpen ? (
        <div className="mobile-menu" aria-label="Mobile navigation">
          {links.map((link) => (
            <a key={link.href} href={link.href} onClick={closeMenu}>
              {link.label}
            </a>
          ))}
          <a href="#contact" onClick={closeMenu}>
            Start a conversation
          </a>
        </div>
      ) : null}
    </header>
  );
}
