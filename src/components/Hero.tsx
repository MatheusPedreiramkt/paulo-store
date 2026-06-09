"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Check, ShoppingBag } from "lucide-react";

const highlights = [
  "Enviamos para todo o Brasil",
  "Atendimento pelo WhatsApp",
  "Produtos selecionados",
];

const departments = [
  {
    title: "Moda Masculina",
    description: "Camisetas • Calças • Conjuntos",
  },
  {
    title: "Roupa Íntima Masculina",
    description: "Cuecas • Kits • Conforto",
  },
  {
    title: "Roupa Íntima Feminina",
    description: "Lingeries • Conjuntos • Moda íntima",
  },
];

export default function Hero() {
  return (
    <section
      className="relative w-full min-h-[840px] sm:min-h-[720px] lg:min-h-[700px] bg-[#02040A] overflow-hidden"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/hero.webp"
        alt="Paulo Guimarães Store — Moda Masculina, Íntima Masculina e Íntima Feminina"
        className="absolute inset-0 w-full h-full object-cover object-center"
      />

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(90deg, rgba(2,4,10,0.70) 0%, rgba(2,4,10,0.45) 35%, rgba(2,4,10,0.20) 100%)",
        }}
      />

      <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#02040A]/60 to-transparent pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-[#02040A]/75 to-transparent pointer-events-none" />

      <div className="relative z-10 min-h-[840px] sm:min-h-[720px] lg:min-h-[700px] flex items-center pb-56 sm:pb-40 pt-24">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: "easeOut" }}
          className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        >
          <div className="max-w-[650px]">
            <h1 className="text-white font-bold text-[28px] sm:text-[38px] lg:text-[56px] leading-[0.98] mb-6">
              Moda masculina,
              <br />
              íntima masculina
              <br />e feminina.
            </h1>

            <p className="text-white/72 text-base sm:text-lg leading-relaxed max-w-xl mb-6 sm:mb-8">
              Peças selecionadas para quem busca conforto, estilo e qualidade.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 mb-6 sm:mb-8">
              <Link
                href="/catalogo"
                className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 bg-white text-[#02040A] font-bold text-xs tracking-[0.14em] uppercase rounded-lg hover:bg-white/90 transition-all duration-200 cursor-pointer"
              >
                <ShoppingBag size={16} />
                Ver catálogo
                <ArrowRight size={14} />
              </Link>

            </div>

            <div className="flex flex-col sm:flex-row sm:flex-wrap gap-2.5 sm:gap-x-4">
              {highlights.map((item) => (
                <span
                  key={item}
                  className="inline-flex items-center gap-2 text-white/72 text-[11px] sm:text-xs lg:text-sm font-medium"
                >
                  <Check size={14} className="text-[#5EBBFF] flex-shrink-0" />
                  {item}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, delay: 0.15, ease: "easeOut" }}
        className="absolute left-0 right-0 bottom-0 z-20 px-4 sm:px-6 lg:px-8 pb-5 sm:pb-7"
      >
        <div className="max-w-7xl mx-auto border-y border-white/10 bg-white/10 backdrop-blur-md">
          <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-white/10">
            {departments.map((department) => (
              <Link
                key={department.title}
                href="/catalogo"
                className="group px-5 py-4 sm:px-6 sm:py-5 transition-colors hover:bg-white/8 cursor-pointer"
              >
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <h2 className="text-white text-sm font-bold tracking-[0.12em] uppercase mb-1.5">
                      {department.title}
                    </h2>
                    <p className="text-white/55 text-xs sm:text-sm leading-relaxed">
                      {department.description}
                    </p>
                  </div>
                  <ArrowRight
                    size={15}
                    className="text-white/35 group-hover:text-white transition-colors flex-shrink-0"
                  />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
