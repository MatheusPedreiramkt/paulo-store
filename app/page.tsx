"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Hero from "@/components/Hero";
import CategoryCard from "@/components/CategoryCard";
import ProductCard from "@/components/ProductCard";
import WhatsAppButton from "@/components/WhatsAppButton";
import { products, CATEGORY_LABELS, type Category } from "@/data/products";

const CATEGORIES: Category[] = [
  "moda-masculina",
  "moda-intima-masculina",
  "moda-intima-feminina",
];

const HOME_PRODUCT_SLUGS = [
  "camiseta-algodao-fio-30-penteado",
  "kit-cueca-boxer-15-unidades",
  "lingerie-com-bojo-com-detalhe-de-renda",
  "lingerie-carollis-de-bojo",
  "sutia-reforcado",
  "calcinha-fio-toda-na-renda-com-regulagem",
  "calcinha-adulto-microfibra",
  "calcinha-adulto-plus-size-lisa-cotton",
];

const shopProducts = HOME_PRODUCT_SLUGS
  .map((slug) => products.find((product) => product.slug === slug))
  .filter((product): product is NonNullable<typeof product> => Boolean(product));

export default function HomePage() {
  return (
    <>
      <Hero />

      {/* Transição Hero → seções claras */}
      <div aria-hidden style={{ height: 32, background: "linear-gradient(to bottom, #02040A, #F8FAFC)" }} />

      {/* ── CATEGORIAS — editorial, sem texto explicativo ── */}
      <section className="bg-[#F8FAFC] pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header mínimo */}
          <div className="flex items-center justify-between pt-8 pb-7 border-b border-gray-200 mb-10">
            <p className="text-[10px] font-semibold tracking-[0.3em] text-gray-400 uppercase">
              Categorias
            </p>
            <Link
              href="/catalogo"
              className="text-[10px] font-semibold tracking-[0.2em] text-gray-400 hover:text-gray-900 uppercase transition-colors inline-flex items-center gap-1.5 cursor-pointer"
            >
              Ver tudo <ArrowRight size={11} />
            </Link>
          </div>

          <div className="grid grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {CATEGORIES.map((cat, i) => (
              <CategoryCard
                key={cat}
                category={cat}
                label={CATEGORY_LABELS[cat]}
                index={i}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── PRODUTOS — nova coleção, foco nas fotos ── */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header mínimo estilo Zara */}
          <div className="flex items-center justify-between border-b border-gray-200 pb-7 mb-10">
            <p className="text-[10px] font-semibold tracking-[0.3em] text-gray-400 uppercase">
              Nova Coleção
            </p>
            <Link
              href="/catalogo"
              className="text-[10px] font-semibold tracking-[0.2em] text-gray-400 hover:text-gray-900 uppercase transition-colors inline-flex items-center gap-1.5 cursor-pointer"
            >
              Ver todos <ArrowRight size={11} />
            </Link>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-7 lg:gap-8"
          >
            {shopProducts.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </motion.div>

          <div className="mt-10 text-center">
            <Link
              href="/catalogo"
              className="inline-flex items-center gap-2 px-8 py-3.5 border border-gray-900 text-gray-900 text-xs font-bold tracking-[0.12em] uppercase hover:bg-gray-900 hover:text-white transition-all duration-200 cursor-pointer"
            >
              Ver catálogo completo
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── CTA WHATSAPP — escuro, compacto ── */}
      <section className="bg-[#02040A] py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto px-6 text-center"
        >
          <p className="text-white/40 text-[10px] font-semibold tracking-[0.35em] uppercase mb-5">
            Atendimento direto
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white leading-tight mb-8">
            Finalize seu pedido pelo WhatsApp
          </h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <WhatsAppButton label="Falar pelo WhatsApp" />
            <Link
              href="/catalogo"
              className="text-white/50 hover:text-white text-xs tracking-[0.15em] uppercase font-semibold transition-colors inline-flex items-center gap-1.5 cursor-pointer"
            >
              Ver catálogo <ArrowRight size={11} />
            </Link>
          </div>
        </motion.div>
      </section>
    </>
  );
}
