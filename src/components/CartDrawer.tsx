"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, ShoppingBag, Trash2, ArrowRight } from "lucide-react";
import { useCart } from "@/lib/cart";
import CartItem from "./CartItem";
import { formatCurrency, generateWhatsAppMessage, buildWhatsAppUrl } from "@/lib/utils";
import Link from "next/link";

export default function CartDrawer() {
  const { items, isOpen, closeCart, clearCart, total } = useCart();
  const cartTotal = total();

  function handleCheckout() {
    const msg = generateWhatsAppMessage(
      items.map((i) => ({
        productId: i.productId,
        name: i.name,
        size: i.size,
        color: i.color,
        quantity: i.quantity,
        price: i.price,
        promoQty: i.promoQty,
        promoPrice: i.promoPrice,
        promoLabel: i.promoLabel,
      }))
    );
    window.open(buildWhatsAppUrl(msg), "_blank");
  }

  return (
    <>
      {/* Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm"
          />
        )}
      </AnimatePresence>

      {/* Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.aside
            key="drawer"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 bottom-0 z-50 w-full sm:w-[420px] bg-[#02040A] border-l border-white/5 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-white/5">
              <div className="flex items-center gap-3">
                <ShoppingBag size={20} className="text-[#005BFF]" />
                <h2 className="text-white font-bold text-lg">
                  Meu Carrinho
                </h2>
                {items.length > 0 && (
                  <span className="px-2 py-0.5 rounded-full bg-[#005BFF] text-white text-xs font-bold">
                    {items.reduce((a, i) => a + i.quantity, 0)}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2">
                {items.length > 0 && (
                  <button
                    onClick={clearCart}
                    aria-label="Limpar carrinho"
                    className="p-2 text-[#A7B0C0] hover:text-red-400 transition-colors cursor-pointer"
                  >
                    <Trash2 size={18} />
                  </button>
                )}
                <button
                  onClick={closeCart}
                  aria-label="Fechar carrinho"
                  className="p-2 text-[#A7B0C0] hover:text-white transition-colors cursor-pointer"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-6">
              <AnimatePresence>
                {items.length === 0 ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex flex-col items-center justify-center h-full py-16 text-center"
                  >
                    <ShoppingBag size={48} className="text-white/10 mb-4" />
                    <p className="text-white font-semibold mb-2">
                      Carrinho vazio
                    </p>
                    <p className="text-[#A7B0C0] text-sm mb-6">
                      Adicione produtos para continuar.
                    </p>
                    <Link
                      href="/catalogo"
                      onClick={closeCart}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#005BFF] text-white text-sm font-semibold hover:bg-[#1E8BFF] transition-colors cursor-pointer"
                    >
                      Ver catálogo
                      <ArrowRight size={14} />
                    </Link>
                  </motion.div>
                ) : (
                  items.map((item) => (
                    <CartItem key={item.id} item={item} />
                  ))
                )}
              </AnimatePresence>
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="px-6 py-5 border-t border-white/5 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[#A7B0C0] text-sm">Subtotal</span>
                  <span className="text-white font-bold text-lg">
                    {formatCurrency(cartTotal)}
                  </span>
                </div>
                <p className="text-[#A7B0C0] text-xs">
                  Frete e pagamento combinados pelo WhatsApp.
                </p>
                <button
                  onClick={handleCheckout}
                  className="w-full py-3.5 rounded-xl bg-[#25D366] hover:bg-[#1da851] text-white font-bold flex items-center justify-center gap-2.5 shadow-lg shadow-[#25D366]/20 hover:shadow-[#25D366]/40 transition-all duration-200 cursor-pointer"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  Finalizar pelo WhatsApp
                </button>
                <Link
                  href="/carrinho"
                  onClick={closeCart}
                  className="w-full py-2.5 rounded-xl border border-white/10 text-[#A7B0C0] hover:text-white hover:border-white/20 font-semibold flex items-center justify-center gap-2 text-sm transition-all duration-200 cursor-pointer"
                >
                  Ver carrinho completo
                </Link>
              </div>
            )}
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
}
