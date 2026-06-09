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
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-white border-b border-gray-200 shadow-sm shadow-black/[0.04]"
            : "bg-white border-b border-gray-100"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-28">

            {/* Logo */}
            <Link href="/" className="flex items-center flex-shrink-0 group">
              <div
                className="relative w-28 h-28 md:w-32 md:h-32 transition-transform duration-300 group-hover:scale-[1.03]"
              >
                <Image
                  src="/logo.webp"
                  alt="Paulo Guimarães Store"
                  fill
                  priority
                  className="object-contain"
                />
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-9">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="relative group text-gray-400 hover:text-[#02040A] text-[11px] tracking-[0.22em] uppercase font-semibold transition-colors duration-300"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-px bg-[#005BFF] transition-all duration-300 group-hover:w-full" />
                </Link>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-1">
              <button
                onClick={toggleCart}
                aria-label="Abrir carrinho"
                className="relative p-3 rounded-full text-gray-400 hover:text-[#02040A] hover:bg-gray-50 transition-all duration-200 cursor-pointer"
              >
                <ShoppingBag size={21} />
                {count > 0 && (
                  <motion.span
                    key={count}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute top-1.5 right-1.5 w-[18px] h-[18px] rounded-full bg-[#005BFF] text-white text-[9px] font-bold flex items-center justify-center shadow-sm"
                  >
                    {count > 9 ? "9+" : count}
                  </motion.span>
                )}
              </button>

              <button
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label="Menu"
                className="md:hidden p-3 rounded-full text-gray-400 hover:text-[#02040A] hover:bg-gray-50 transition-all duration-200 cursor-pointer"
              >
                {menuOpen ? <X size={21} /> : <Menu size={21} />}
              </button>
            </div>

          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="fixed top-28 left-0 right-0 z-40 bg-white border-b border-gray-100 shadow-md shadow-black/[0.04] md:hidden"
          >
            <nav className="flex flex-col px-6 py-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="py-4 text-gray-400 hover:text-[#02040A] text-[11px] tracking-[0.25em] uppercase font-semibold border-b border-gray-50 last:border-0 transition-colors duration-200"
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
