import { useState } from "react";
import { Menu, Phone, X } from "lucide-react";
import { BrandMark } from "@/components/BrandMark";
import { BookingModal } from "@/components/BookingModal";
import { Drawer, DrawerContent } from "@/components/ui/drawer";

const links = [
  { href: "/products", label: "Products" },
  { href: "/services", label: "Services" },
  { href: "/why-velolaunch", label: "Why VeloLaunch" },
  { href: "/#work", label: "Work" },
  { href: "/about", label: "About" },
];

export function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="site-header" aria-label="Site header">
      <nav className="site-nav" aria-label="Primary navigation">
        <BrandMark showAttribution />
        <div className="desktop-nav">
          <div className="nav-links">
            {links.map((link) => <a key={link.href} className="nav-link focus-ring" href={link.href}>{link.label}</a>)}
          </div>
          <a className="nav-phone focus-ring" href="tel:+19746271143" aria-label="Call VeloLaunch at +1 9746-2711-143"><Phone size={13} aria-hidden="true" />+1 9746-2711-143</a>
          <button className="nav-booking focus-ring" type="button" onClick={() => setBookingOpen(true)}>Book a Call</button>
          <a className="nav-cta focus-ring" href="#contact">Let’s Build</a>
        </div>
        <button className="mobile-menu-button focus-ring" type="button" aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"} aria-expanded={menuOpen} onClick={() => setMenuOpen((open) => !open)}>
          {menuOpen ? <X size={19} /> : <Menu size={20} />}
        </button>
      </nav>

      <Drawer open={menuOpen} onOpenChange={setMenuOpen}>
        <DrawerContent className="bg-[#111110] border-none text-[#d8d6d0] px-6 pb-12 pt-8 rounded-t-2xl">
          <div className="flex flex-col">
            {links.map((link) => (
              <a 
                key={link.href} 
                href={link.href} 
                onClick={closeMenu}
                className="text-lg font-medium py-4 border-b border-[#2a2a2a] transition-colors hover:text-white"
              >
                {link.label}
              </a>
            ))}
            <a href="tel:+19746271143" onClick={closeMenu} className="text-lg font-medium py-4 border-b border-[#2a2a2a] transition-colors hover:text-white">
              +1 9746-2711-143
            </a>
            <button 
              type="button" 
              onClick={() => { closeMenu(); setBookingOpen(true); }}
              className="text-lg font-medium py-4 border-b border-[#2a2a2a] transition-colors hover:text-white text-left"
            >
              Book a Call
            </button>
            <a href="#contact" onClick={closeMenu} className="text-lg font-medium py-4 transition-colors hover:text-white text-blue-400">
              Let’s Build
            </a>
          </div>
        </DrawerContent>
      </Drawer>

      <BookingModal open={bookingOpen} onOpenChange={setBookingOpen} />
    </header>
  );
}
