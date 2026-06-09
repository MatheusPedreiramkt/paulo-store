"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ShoppingBag, ArrowLeft, ArrowRight, Trash2 } from "lucide-react";
import { useCart } from "@/lib/cart";
import CartItem from "@/components/CartItem";
import {
  calcCartItemSubtotal,
  formatCurrency,
  generateWhatsAppMessage,
  buildWhatsAppUrl,
} from "@/lib/utils";
import SectionTitle from "@/components/SectionTitle";

export default function CartPage() {
  const { items, clearCart, total } = useCart();
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
    <div className="min-h-screen bg-white">
      <div className="border-b border-gray-100 pt-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <SectionTitle label="Resumo do pedido" title="Meu Carrinho" theme="light" />
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 pb-20">
        {items.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center py-24 text-center"
          >
            <ShoppingBag size={56} className="text-gray-200 mb-6" />
            <h2 className="text-gray-900 font-bold text-xl mb-3">
              Seu carrinho está vazio
            </h2>
            <p className="text-gray-500 text-sm mb-8 max-w-sm">
              Adicione produtos ao carrinho para visualizá-los aqui e finalizar
              seu pedido pelo WhatsApp.
            </p>
            <Link
              href="/catalogo"
              className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-lg bg-[#02040A] hover:bg-[#111827] text-white font-semibold text-sm tracking-wide transition-colors cursor-pointer"
            >
              <ShoppingBag size={16} />
              Explorar catálogo
              <ArrowRight size={15} />
            </Link>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Items list */}
            <div className="lg:col-span-2">
              <div className="flex items-center justify-between mb-6">
                <p className="text-gray-600 text-sm">
                  {items.length} item{items.length !== 1 ? "ns" : ""} no carrinho
                </p>
                <button
                  onClick={clearCart}
                  className="flex items-center gap-1.5 text-gray-400 hover:text-red-500 text-xs font-medium transition-colors cursor-pointer"
                >
                  <Trash2 size={13} />
                  Limpar carrinho
                </button>
              </div>

              <div className="divide-y divide-gray-100">
                <AnimatePresence>
                  {items.map((item) => (
                    <CartItem key={item.id} item={item} theme="light" />
                  ))}
                </AnimatePresence>
              </div>

              <Link
                href="/catalogo"
                className="inline-flex items-center gap-1.5 text-gray-400 hover:text-gray-700 text-xs tracking-wide mt-6 transition-colors cursor-pointer"
              >
                <ArrowLeft size={13} />
                Continuar comprando
              </Link>
            </div>

            {/* Order summary */}
            <div>
              <div className="bg-[#F8FAFC] rounded-xl p-6 sticky top-24">
                <h3 className="text-gray-900 font-bold text-base mb-6">
                  Resumo do pedido
                </h3>

                <div className="space-y-3 mb-5">
                  {items.map((item) => (
                    <div key={item.id} className="flex items-start justify-between text-sm gap-3">
                      <div className="flex-1 min-w-0">
                        <p className="text-gray-700 text-xs leading-snug truncate">{item.name}</p>
                        <p className="text-gray-400 text-[11px]">
                          {item.size && `Tam: ${item.size}`}
                          {item.size && item.color && " • "}
                          {item.color && `Cor: ${item.color}`}
                        </p>
                      </div>
                      <p className="text-gray-900 font-semibold text-xs flex-shrink-0">
                        {formatCurrency(calcCartItemSubtotal(item))}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="border-t border-gray-200 pt-4 space-y-2 mb-5">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Subtotal</span>
                    <span className="text-gray-900 font-medium">{formatCurrency(cartTotal)}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Frete</span>
                    <span className="text-[#005BFF] text-xs font-medium">Via WhatsApp</span>
                  </div>
                  <div className="flex items-center justify-between font-bold pt-2 border-t border-gray-200">
                    <span className="text-gray-900">Total</span>
                    <span className="text-gray-900 text-xl">{formatCurrency(cartTotal)}</span>
                  </div>
                </div>

                <button
                  onClick={handleCheckout}
                  className="w-full py-3.5 rounded-lg bg-[#25D366] hover:bg-[#1da851] text-white font-bold flex items-center justify-center gap-2.5 shadow-md shadow-[#25D366]/20 transition-all duration-200 cursor-pointer mb-3 text-sm"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4.5 h-4.5">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  Finalizar pelo WhatsApp
                </button>

                <p className="text-gray-400 text-[11px] text-center leading-relaxed">
                  Pagamento e entrega combinados diretamente pelo WhatsApp.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
