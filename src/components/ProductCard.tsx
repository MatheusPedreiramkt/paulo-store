"use client";

import { useState } from "react";
import Link from "next/link";
import { ShoppingBag, Eye } from "lucide-react";
import { motion } from "framer-motion";
import type { Product } from "@/data/products";
import { CATEGORY_LABELS } from "@/data/products";
import { formatCurrency } from "@/lib/utils";
import { getColorHex } from "@/lib/colors";
import { useCart } from "@/lib/cart";

interface Props {
  product: Product;
  index?: number;
}

export default function ProductCard({ product, index = 0 }: Props) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);
  const [hoveredColor, setHoveredColor] = useState<string | null>(null);

  const hasColors = product.colors.length > 0;
  const displayColor = hasColors
    ? (product.colors.find((c) => c.name === hoveredColor) ?? product.colors[0])
    : null;

  const mainImage =
    displayColor?.image ??
    product.gallery?.[0] ??
    "";

  function handleAdd() {
    addItem({
      productId: product.id,
      name: product.name,
      price: product.price,
      promoQty: product.promoQty,
      promoPrice: product.promoPrice,
      promoLabel: product.promoLabel,
      image: mainImage,
      size: hasColors
        ? (displayColor!.sizes ?? product.sizes)[0]
        : product.sizes[0],
      color: hasColors ? displayColor!.name : undefined,
      quantity: 1,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.55, delay: (index % 4) * 0.04, ease: [0.22, 1, 0.36, 1] }}
      className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 flex flex-col"
    >
      {/* Imagem */}
      <Link
        href={`/produto/${product.slug}`}
        className="block relative overflow-hidden bg-gray-50"
        style={{ aspectRatio: "3/4" }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={mainImage}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-transparent group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center">
          <span className="opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-[opacity,transform] duration-300 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-gray-900 text-xs font-semibold tracking-wide shadow-lg">
            <Eye size={14} />
            Ver detalhes
          </span>
        </div>

        {/* Badges */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 max-w-[calc(100%-20px)]">
          {product.badge && (
            <span className="px-2 py-0.5 rounded-sm bg-[#005BFF] text-white text-[8px] sm:text-[9px] font-bold tracking-[0.12em] uppercase truncate">
              {product.badge}
            </span>
          )}
          {product.featured && !product.badge && (
            <span className="px-2 py-0.5 rounded-sm bg-[#02040A] text-white text-[8px] sm:text-[9px] font-bold tracking-[0.12em] uppercase">
              DESTAQUE
            </span>
          )}
          <span className="px-2 py-0.5 rounded-sm bg-white text-[#005BFF] text-[8px] sm:text-[9px] font-bold tracking-[0.12em] uppercase truncate">
            {CATEGORY_LABELS[product.category]}
          </span>
        </div>
      </Link>

      {/* Info */}
      <div className="p-4 flex flex-col flex-1">
        <Link href={`/produto/${product.slug}`}>
          <h3 className="text-gray-900 font-semibold text-sm leading-snug mb-2 hover:text-[#005BFF] transition-colors duration-200 line-clamp-2">
            {product.name}
          </h3>
        </Link>

        {/* Cor: swatches ou nota "Cores variadas" */}
        <div className="flex items-center gap-1.5 mb-3 min-h-[16px]">
          {hasColors ? (
            <>
              {product.colors.slice(0, 5).map((c) => (
                <button
                  key={c.name}
                  title={c.name}
                  aria-label={c.name}
                  onMouseEnter={() => setHoveredColor(c.name)}
                  onMouseLeave={() => setHoveredColor(null)}
                  className={`w-4 h-4 rounded-full flex-shrink-0 transition-transform duration-150 cursor-pointer ${
                    (hoveredColor ?? product.colors[0].name) === c.name
                      ? "ring-2 ring-offset-1 ring-gray-400 scale-110"
                      : "ring-1 ring-black/10"
                  }`}
                  style={{ backgroundColor: getColorHex(c.name) }}
                />
              ))}
              {product.colors.length > 5 && (
                <span className="text-gray-400 text-[10px] font-medium">
                  +{product.colors.length - 5}
                </span>
              )}
            </>
          ) : product.colorNote ? (
            <span className="text-gray-400 text-[10px] tracking-wide">
              {product.colorNote}
            </span>
          ) : null}
        </div>

        {/* Tamanhos */}
        {product.sizes.length > 0 && (
          <div className="flex items-center gap-1 mb-3 flex-wrap">
            {product.sizes.slice(0, 4).map((size) => (
              <span
                key={size}
                className="px-1.5 py-0.5 text-[10px] border border-gray-200 text-gray-400 rounded"
              >
                {size}
              </span>
            ))}
            {product.sizes.length > 4 && (
              <span className="text-gray-400 text-[10px]">+{product.sizes.length - 4}</span>
            )}
          </div>
        )}

        {product.promoLabel && (
          <p className="text-emerald-600 text-[11px] font-bold tracking-wide mb-2">
            {product.promoLabel}
          </p>
        )}

        <div className="flex flex-col gap-2 mt-auto sm:flex-row sm:items-center sm:justify-between">
          <p className="text-gray-900 font-bold text-base">
            {formatCurrency(product.price)}
          </p>

          <button
            onClick={handleAdd}
            disabled={!product.available}
            aria-label={`Adicionar ${product.name} ao carrinho`}
            className={`w-full sm:w-auto flex items-center justify-center gap-1.5 px-3.5 py-2.5 sm:py-2 rounded-lg text-xs font-semibold tracking-wide transition-colors duration-200 cursor-pointer ${
              added
                ? "bg-emerald-500 text-white"
                : "bg-[#005BFF] hover:bg-[#0047CC] text-white"
            } disabled:opacity-40 disabled:cursor-not-allowed`}
          >
            <ShoppingBag size={13} />
            <span>{added ? "Adicionado!" : "Adicionar"}</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
}
