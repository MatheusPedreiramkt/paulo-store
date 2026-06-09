"use client";

import { useState, useEffect } from "react";
import { notFound } from "next/navigation";
import { motion } from "framer-motion";
import { ShoppingBag, ArrowLeft, MessageCircle, Tag } from "lucide-react";
import Link from "next/link";
import { products, CATEGORY_LABELS, type ProductColor } from "@/data/products";
import { useCart } from "@/lib/cart";
import {
  formatCurrency,
  calcEffectiveTotal,
  buildWhatsAppUrl,
  generateWhatsAppMessage,
} from "@/lib/utils";
import { getColorHex } from "@/lib/colors";
import ProductCard from "@/components/ProductCard";

export default function ProductPageClient({ slug }: { slug: string }) {
  const product = products.find((p) => p.slug === slug);
  const { addItem } = useCart();

  const hasColors = !!product && product.colors.length > 0;
  const hasGallery = !!product?.gallery?.length;

  const [selectedColor, setSelectedColor] = useState<ProductColor | null>(
    hasColors ? product!.colors[0] : null
  );
  const [galleryIndex, setGalleryIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState(() => {
    if (!product) return "";
    if (hasColors) return (product.colors[0].sizes ?? product.sizes)[0] ?? "";
    return product.sizes[0] ?? "";
  });
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  if (!product) notFound();

  // Imagem principal
  const mainImage = hasColors
    ? selectedColor!.image
    : product.gallery?.[galleryIndex] ?? "";

  // Tamanhos disponíveis para a cor selecionada
  const availableSizes = hasColors
    ? (selectedColor!.sizes ?? product.sizes)
    : product.sizes;

  useEffect(() => {
    if (!availableSizes.includes(selectedSize)) {
      setSelectedSize(availableSizes[0] ?? "");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedColor]);

  const effectiveTotal = calcEffectiveTotal(product, quantity);
  const isPromo = !!(
    product.promoQty &&
    product.promoPrice &&
    quantity >= product.promoQty
  );

  const related = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  function handleAdd() {
    addItem({
      productId: product!.id,
      name: product!.name,
      price: product!.price,
      promoQty: product!.promoQty,
      promoPrice: product!.promoPrice,
      promoLabel: product!.promoLabel,
      image: mainImage,
      size: selectedSize,
      color: selectedColor?.name,
      quantity,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  function handleBuyNow() {
    const msg = generateWhatsAppMessage([
      {
        productId: product!.id,
        name: product!.name,
        color: selectedColor?.name,
        size: selectedSize,
        quantity,
        price: product!.price,
        promoQty: product!.promoQty,
        promoPrice: product!.promoPrice,
        promoLabel: product!.promoLabel,
      },
    ]);
    window.open(buildWhatsAppUrl(msg), "_blank");
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="pt-20 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-2 text-xs text-gray-400">
            <Link href="/" className="hover:text-gray-700 transition-colors">Início</Link>
            <span>/</span>
            <Link href="/catalogo" className="hover:text-gray-700 transition-colors">Catálogo</Link>
            <span>/</span>
            <span className="text-gray-700 truncate max-w-[200px]">{product.name}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 mb-20">

          {/* ── Galeria / Imagens ── */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Imagem principal */}
            <div
              className="relative overflow-hidden rounded-xl bg-gray-50 mb-3"
              style={{ aspectRatio: "3/4" }}
            >
              <motion.img
                key={mainImage}
                src={mainImage}
                alt={product.name}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.25 }}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Miniaturas — galeria (sem cor) */}
            {hasGallery && !hasColors && product.gallery!.length > 1 && (
              <div className="flex gap-2 flex-wrap">
                {product.gallery!.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setGalleryIndex(i)}
                    aria-label={`Ver imagem ${i + 1}`}
                    className={`w-16 h-20 rounded-lg overflow-hidden border-2 flex-shrink-0 transition-all cursor-pointer ${
                      galleryIndex === i
                        ? "border-[#005BFF] shadow-md"
                        : "border-gray-200 hover:border-gray-400"
                    }`}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={img} alt={`Imagem ${i + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Miniaturas — por cor */}
            {hasColors && product.colors.length > 1 && (
              <div className="flex gap-2 flex-wrap">
                {product.colors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(color)}
                    aria-label={`Ver cor ${color.name}`}
                    className={`relative w-16 h-20 rounded-lg overflow-hidden border-2 flex-shrink-0 transition-all cursor-pointer ${
                      selectedColor?.name === color.name
                        ? "border-[#005BFF] shadow-md"
                        : "border-gray-200 hover:border-gray-400"
                    }`}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={color.image} alt={color.name} className="w-full h-full object-cover" />
                    <div className="absolute bottom-0 left-0 right-0 bg-black/50 px-1 py-0.5">
                      <p className="text-white text-[8px] text-center truncate leading-tight">{color.name}</p>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </motion.div>

          {/* ── Informações ── */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-col"
          >
            <span className="inline-block text-[#005BFF] text-xs font-semibold tracking-[0.2em] uppercase mb-3">
              {CATEGORY_LABELS[product.category]}
            </span>

            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 leading-tight mb-3">
              {product.name}
            </h1>

            {/* Badge kit/unidades */}
            {product.badge && (
              <span className="inline-block mb-3 px-3 py-1 rounded-md bg-[#005BFF] text-white text-xs font-bold tracking-wider uppercase self-start">
                {product.badge}
              </span>
            )}

            {/* Preços */}
            <div className="mb-4">
              <div className="flex items-baseline gap-3">
                <p className="text-2xl font-bold text-gray-900">
                  {formatCurrency(product.price)}
                </p>
                {product.promoPrice && (
                  <p className="text-sm text-gray-400 line-through">
                    2× {formatCurrency(product.price)}
                  </p>
                )}
              </div>
              {product.promoLabel && (
                <div className="inline-flex items-center gap-1.5 mt-2 px-3 py-1.5 rounded-lg bg-emerald-50 border border-emerald-200">
                  <Tag size={13} className="text-emerald-600" />
                  <span className="text-emerald-700 text-sm font-semibold">{product.promoLabel}</span>
                </div>
              )}
            </div>

            <p className="text-gray-500 leading-relaxed text-sm mb-8 border-b border-gray-100 pb-8">
              {product.description}
            </p>

            {/* Cor: seletor ou nota "Cores variadas" */}
            {hasColors ? (
              <div className="mb-6">
                <p className="text-gray-900 text-sm font-semibold mb-2.5">
                  Cor:{" "}
                  <span className="text-[#005BFF] font-bold">{selectedColor?.name}</span>
                </p>
                <div className="flex flex-wrap gap-2">
                  {product.colors.map((color) => (
                    <button
                      key={color.name}
                      onClick={() => setSelectedColor(color)}
                      className={`flex items-center gap-2 h-10 px-3.5 rounded-lg text-sm font-semibold border transition-all duration-200 cursor-pointer ${
                        selectedColor?.name === color.name
                          ? "border-[#02040A] bg-[#02040A] text-white"
                          : "border-gray-200 text-gray-700 hover:border-gray-800 bg-white"
                      }`}
                    >
                      <span
                        className="w-3 h-3 rounded-full flex-shrink-0 border border-black/10"
                        style={{ backgroundColor: getColorHex(color.name) }}
                      />
                      {color.name}
                    </button>
                  ))}
                </div>
              </div>
            ) : product.colorNote ? (
              <div className="mb-6 flex items-center gap-2">
                <span className="text-gray-500 text-sm font-medium">Cor:</span>
                <span className="text-gray-700 text-sm font-semibold">{product.colorNote}</span>
              </div>
            ) : null}

            {/* Tamanho */}
            {availableSizes.length > 0 && (
              <div className="mb-6">
                <p className="text-gray-900 text-sm font-semibold mb-2.5">
                  Tamanho:{" "}
                  <span className="text-[#005BFF] font-bold">{selectedSize}</span>
                </p>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => {
                    const available = availableSizes.includes(size);
                    return (
                      <button
                        key={size}
                        onClick={() => available && setSelectedSize(size)}
                        disabled={!available}
                        className={`min-w-[44px] h-10 px-3 rounded-lg text-sm font-semibold border transition-all duration-200 ${
                          !available
                            ? "border-gray-100 text-gray-300 bg-gray-50 cursor-not-allowed line-through"
                            : selectedSize === size
                            ? "bg-[#02040A] border-[#02040A] text-white cursor-pointer"
                            : "bg-white border-gray-200 text-gray-700 hover:border-gray-900 cursor-pointer"
                        }`}
                      >
                        {size}
                      </button>
                    );
                  })}
                </div>
                {product.sizes.some((s) => !availableSizes.includes(s)) && (
                  <p className="text-xs text-gray-400 mt-2">
                    Tamanhos riscados indisponíveis na cor selecionada.
                  </p>
                )}
              </div>
            )}

            {/* Quantidade */}
            <div className="mb-6">
              <p className="text-gray-900 text-sm font-semibold mb-2.5">Quantidade</p>
              <div className="inline-flex items-center rounded-lg border border-gray-200 overflow-hidden">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  aria-label="Diminuir"
                  className="w-11 h-11 flex items-center justify-center text-gray-600 hover:bg-gray-50 transition-colors cursor-pointer text-lg border-r border-gray-200"
                >
                  −
                </button>
                <span className="w-12 text-center text-gray-900 font-bold text-sm">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  aria-label="Aumentar"
                  className="w-11 h-11 flex items-center justify-center text-gray-600 hover:bg-gray-50 transition-colors cursor-pointer text-lg border-l border-gray-200"
                >
                  +
                </button>
              </div>
              {product.promoQty && !isPromo && (
                <p className="text-xs text-emerald-600 font-medium mt-2">
                  Adicione +{product.promoQty - quantity} e aproveite: {product.promoLabel}
                </p>
              )}
              {isPromo && (
                <p className="text-xs text-emerald-600 font-medium mt-2">Promoção aplicada!</p>
              )}
            </div>

            {/* Total */}
            <div
              className={`rounded-xl p-4 mb-6 flex items-center justify-between transition-colors ${
                isPromo ? "bg-emerald-50 border border-emerald-100" : "bg-[#F8FAFC]"
              }`}
            >
              <div>
                <span className="text-gray-500 text-sm">Total do pedido</span>
                {isPromo && (
                  <p className="text-emerald-600 text-xs font-semibold">{product.promoLabel}</p>
                )}
              </div>
              <span className={`font-bold text-xl ${isPromo ? "text-emerald-700" : "text-gray-900"}`}>
                {formatCurrency(effectiveTotal)}
              </span>
            </div>

            {/* Ações */}
            <div className="flex flex-col sm:flex-row gap-3 mb-6">
              <button
                onClick={handleAdd}
                disabled={!product.available || !selectedSize}
                className={`flex-1 flex items-center justify-center gap-2.5 py-3.5 rounded-lg font-bold text-sm tracking-wide transition-all duration-200 cursor-pointer ${
                  added
                    ? "bg-emerald-500 text-white"
                    : "bg-[#02040A] hover:bg-[#111827] text-white"
                } disabled:opacity-40 disabled:cursor-not-allowed`}
              >
                <ShoppingBag size={17} />
                {added ? "Adicionado ao carrinho!" : "Adicionar ao carrinho"}
              </button>

              <button
                onClick={handleBuyNow}
                className="flex-1 flex items-center justify-center gap-2.5 py-3.5 rounded-lg bg-[#25D366] hover:bg-[#1da851] text-white font-bold text-sm tracking-wide shadow-md shadow-[#25D366]/20 transition-all duration-200 cursor-pointer"
              >
                <MessageCircle size={17} />
                Comprar agora
              </button>
            </div>

            <Link
              href="/catalogo"
              className="inline-flex items-center gap-1.5 text-gray-400 hover:text-gray-700 text-xs tracking-wide transition-colors cursor-pointer"
            >
              <ArrowLeft size={13} />
              Voltar ao catálogo
            </Link>
          </motion.div>
        </div>

        {/* Relacionados */}
        {related.length > 0 && (
          <div className="border-t border-gray-100 pt-12">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Produtos relacionados</h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {related.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
