"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Category } from "@/data/products";

interface Props {
  category: Category;
  label: string;
  index: number;
}

const categoryImages: Record<Category, string> = {
  "moda-masculina":
    "/products/camiseta-algodao/verde.webp",
  "moda-intima-masculina":
    "/products/cueca-box-15un/imagem-2.webp",
  "moda-intima-feminina":
    "/products/Lingerie-com-bojo-com-detalhe-de-renda.webp",
};

export default function CategoryCard({ category, label, index }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.55, delay: index * 0.04, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link
        href={`/catalogo?categoria=${category}`}
        className="group block relative overflow-hidden cursor-pointer"
      >
        <div className="relative overflow-hidden h-[240px] sm:h-[320px] lg:h-[400px]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={categoryImages[category]}
            alt={label}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6">
          <h3 className="text-white text-base sm:text-lg font-bold tracking-wide uppercase mb-2 leading-tight">
            {label}
          </h3>
          <span className="inline-flex items-center gap-1.5 text-white/70 text-xs tracking-wider uppercase group-hover:text-white group-hover:gap-3 transition-[color,gap] duration-300">
            Comprar
            <ArrowRight size={11} />
          </span>
        </div>
      </Link>
    </motion.div>
  );
}
