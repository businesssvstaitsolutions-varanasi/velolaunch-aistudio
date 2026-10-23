import { useState } from "react";
import { ArrowRight, ChevronDown, Menu, Phone, X } from "lucide-react";
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
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="site-header" aria-label="Site header">
      <nav className="site-nav" aria-label="Primary navigation">
        <BrandMark showAttribution />
        <div className="desktop-nav">
          <div className="nav-links">
            {links.map((link) => {
              if (link.href === "/products") {
                return (
                  <div
                    key={link.href}
                    className="nav-dropdown-container"
                    onMouseEnter={() => setDropdownOpen(true)}
                    onMouseLeave={() => setDropdownOpen(false)}
                  >
                    <a
                      href="/products"
                      className="nav-link nav-products-link focus-ring"
                      aria-expanded={dropdownOpen}
                      aria-haspopup="true"
                    >
                      Our Products
                      <ChevronDown
                        size={10}
                        className={`nav-dropdown-chevron ${dropdownOpen ? "rotate-180" : ""}`}
                        aria-hidden="true"
                      />
                    </a>
                    {dropdownOpen && (
                      <div className="nav-dropdown-menu" role="menu">
                        <div className="nav-dropdown-kicker">
                          <span>Featured Products</span>
                          <span className="nav-dropdown-live-dot" />
                        </div>
                        <a
                          href="/our-apps/apex-tabs-organiser-membooster-landingpage/"
                          className="nav-dropdown-item focus-ring"
                          role="menuitem"
                          onClick={() => setDropdownOpen(false)}
                        >
                          <div className="nav-dropdown-item-icon">
                            <img
                              src="/our-apps/apex-tabs-organiser-membooster-landingpage/assets/apex-tabs-icon.png"
                              alt=""
                              width="32"
                              height="32"
                            />
                          </div>
                          <div className="nav-dropdown-item-body">
                            <div className="nav-dropdown-item-title-row">
                              <span className="nav-dropdown-item-name">Apex Tabs</span>
                              <span className="nav-dropdown-released-tag">Released</span>
                            </div>
                            <p className="nav-dropdown-item-desc">
                              Smart Tab Organizer & Memory Booster
                            </p>
                          </div>
                        </a>
                        <a
                          href="/our-apps/apex-turbo-task-planner-landingpage/"
                          className="nav-dropdown-item focus-ring"
                          role="menuitem"
                          onClick={() => setDropdownOpen(false)}
                        >
                          <div className="nav-dropdown-item-icon" style={{ background: "#1c1917", borderColor: "rgba(249, 115, 22, 0.3)" }}>
                            <img
                              src="/our-apps/apex-turbo-task-planner-landingpage/icons/icon128.png"
                              alt=""
                              width="32"
                              height="32"
                              style={{ borderRadius: "0.35rem" }}
                            />
                          </div>
                          <div className="nav-dropdown-item-body">
                            <div className="nav-dropdown-item-title-row">
                              <span className="nav-dropdown-item-name">Apex Turbo</span>
                              <span className="nav-dropdown-released-tag" style={{ background: "rgba(249, 115, 22, 0.18)", color: "#fb923c", borderColor: "rgba(251, 146, 60, 0.45)" }}>Released</span>
                            </div>
                            <p className="nav-dropdown-item-desc">
                              Task Planner & Focus Timer
                            </p>
                          </div>
                        </a>
                        <div className="nav-dropdown-divider" />
                        <a
                          href="/products"
                          className="nav-dropdown-catalog-link focus-ring"
                          onClick={() => setDropdownOpen(false)}
                        >
                          <span>Explore all products</span>
                          <ArrowRight size={13} aria-hidden="true" />
                        </a>
                      </div>
                    )}
                  </div>
                );
              }
              return (
                <a key={link.href} className="nav-link focus-ring" href={link.href}>
                  {link.label}
                </a>
              );
            })}
          </div>
          <a className="nav-phone focus-ring" href="tel:+19746271143" aria-label="Call VeloLaunch at +1 9746-2711-143">
            <Phone size={13} aria-hidden="true" />+1 9746-2711-143
          </a>
          <button className="nav-booking focus-ring" type="button" onClick={() => setBookingOpen(true)}>
            Book a Call
          </button>
          <a className="nav-cta focus-ring" href="#contact">
            Let’s Build
          </a>
        </div>
        <button
          className="mobile-menu-button focus-ring"
          type="button"
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X size={19} /> : <Menu size={20} />}
        </button>
      </nav>

      <Drawer open={menuOpen} onOpenChange={setMenuOpen}>
        <DrawerContent className="bg-[#111110] border-none text-[#d8d6d0] px-6 pb-12 pt-8 rounded-t-2xl">
          <div className="flex flex-col">
            <div className="py-3 border-b border-[#2a2a2a] flex flex-col gap-2">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-semibold tracking-wider uppercase text-neutral-400">Our Products</span>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">2 Released</span>
              </div>
              <a
                href="/our-apps/apex-tabs-organiser-membooster-landingpage/"
                onClick={closeMenu}
                className="flex items-center justify-between p-3 rounded-lg bg-[#18191b] hover:bg-[#222428] border border-[#2e3035] transition-all"
              >
                <div className="flex items-center gap-3">
                  <img
                    src="/our-apps/apex-tabs-organiser-membooster-landingpage/assets/apex-tabs-icon.png"
                    alt="Apex Tabs"
                    className="w-8 h-8 rounded"
                  />
                  <div>
                    <div className="font-semibold text-white flex items-center gap-2 text-base">
                      Apex Tabs
                      <span className="text-[10px] uppercase font-bold px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300">
                        Released
                      </span>
                    </div>
                    <div className="text-xs text-neutral-400">Smart Tab Organizer & Memory Booster</div>
                  </div>
                </div>
                <ArrowRight size={16} className="text-neutral-400" />
              </a>
              <a
                href="/our-apps/apex-turbo-task-planner-landingpage/"
                onClick={closeMenu}
                className="flex items-center justify-between p-3 rounded-lg bg-[#18191b] hover:bg-[#222428] border border-[#2e3035] transition-all"
              >
                <div className="flex items-center gap-3">
                  <img
                    src="/our-apps/apex-turbo-task-planner-landingpage/icons/icon128.png"
                    alt="Apex Turbo"
                    className="w-8 h-8 rounded"
                  />
                  <div>
                    <div className="font-semibold text-white flex items-center gap-2 text-base">
                      Apex Turbo
                      <span className="text-[10px] uppercase font-bold px-1.5 py-0.5 rounded bg-orange-500/20 text-orange-300">
                        Released
                      </span>
                    </div>
                    <div className="text-xs text-neutral-400">Task Planner & Focus Timer</div>
                  </div>
                </div>
                <ArrowRight size={16} className="text-neutral-400" />
              </a>
              <a
                href="/products"
                onClick={closeMenu}
                className="block text-xs text-neutral-400 hover:text-white mt-1 pl-1"
              >
                All products catalogue &rarr;
              </a>
            </div>

            {links.filter((l) => l.href !== "/products").map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={closeMenu}
                className="text-lg font-medium py-4 border-b border-[#2a2a2a] transition-colors hover:text-white"
              >
                {link.label}
              </a>
            ))}
            <a
              href="tel:+19746271143"
              onClick={closeMenu}
              className="text-lg font-medium py-4 border-b border-[#2a2a2a] transition-colors hover:text-white"
            >
              +1 9746-2711-143
            </a>
            <button
              type="button"
              onClick={() => {
                closeMenu();
                setBookingOpen(true);
              }}
              className="text-lg font-medium py-4 border-b border-[#2a2a2a] transition-colors hover:text-white text-left"
            >
              Book a Call
            </button>
            <a
              href="#contact"
              onClick={closeMenu}
              className="text-lg font-medium py-4 transition-colors hover:text-white text-blue-400"
            >
              Let’s Build
            </a>
          </div>
        </DrawerContent>
      </Drawer>

      <BookingModal open={bookingOpen} onOpenChange={setBookingOpen} />
    </header>
  );
}
