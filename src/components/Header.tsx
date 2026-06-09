"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ShoppingBag, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/lib/cart";

const navLinks = [
  { href: "/", label: "Início" },
  { href: "/catalogo", label: "Catálogo" },
  { href: "/sobre", label: "Sobre" },
  { href: "/contato", label: "Contato" },
];

export default function Header() {
  const { itemCount, toggleCart } = useCart();
  const count = itemCount();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    handler();
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white border-b border-gray-200 shadow-lg shadow-black/5"
            : "bg-white/95 border-b border-gray-100 backdrop-blur-md"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3.5 flex-shrink-0">
              <div className="relative w-12 h-12 md:w-14 md:h-14">
                <Image
                  src="/logo.webp"
                  alt="Paulo Guimarães Store"
                  fill
                  className="object-contain"
                />
              </div>
              <div className="hidden sm:block">
                <p className="text-[#02040A] font-bold text-base leading-tight tracking-[0.12em] uppercase">
                  Paulo Guimarães
                </p>
                <p className="text-[#005BFF] text-[10px] tracking-[0.3em] uppercase font-semibold">
                  Store
                </p>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-gray-500 hover:text-[#02040A] text-xs tracking-[0.15em] uppercase font-semibold transition-colors duration-200 relative group"
                >
                  {link.label}
                  <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-[#005BFF] transition-all duration-300 group-hover:w-full" />
                </Link>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <button
                onClick={toggleCart}
                aria-label="Abrir carrinho"
                className="relative p-2.5 text-gray-600 hover:text-[#02040A] transition-colors duration-200 cursor-pointer"
              >
                <ShoppingBag size={20} />
                {count > 0 && (
                  <motion.span
                    key={count}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute top-1 right-1 w-4 h-4 rounded-full bg-[#005BFF] text-white text-[9px] font-bold flex items-center justify-center"
                  >
                    {count > 9 ? "9+" : count}
                  </motion.span>
                )}
              </button>

              <button
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label="Menu"
                className="md:hidden p-2.5 text-gray-600 hover:text-[#02040A] transition-colors cursor-pointer"
              >
                {menuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed top-20 left-0 right-0 z-40 bg-white border-b border-gray-100 shadow-lg shadow-black/5 md:hidden"
          >
            <nav className="flex flex-col px-6 py-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="py-4 text-gray-500 hover:text-[#02040A] text-xs tracking-[0.2em] uppercase font-semibold border-b border-gray-100 last:border-0 transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
