"use client";

import { Minus, Plus, Trash2 } from "lucide-react";
import { motion } from "framer-motion";
import type { CartItem as CartItemType } from "@/lib/cart";
import { useCart } from "@/lib/cart";
import { calcCartItemSubtotal, formatCurrency } from "@/lib/utils";

interface Props {
  item: CartItemType;
  /** light = página carrinho (fundo branco), dark = drawer (fundo escuro) */
  theme?: "light" | "dark";
}

export default function CartItem({ item, theme = "dark" }: Props) {
  const { updateQuantity, removeItem } = useCart();
  const isLight = theme === "light";
  const subtotal = calcCartItemSubtotal(item);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: 16 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -16 }}
      className={`flex gap-3 py-4 ${isLight ? "border-b border-gray-100" : "border-b border-white/5"}`}
    >
      {/* Image */}
      <div className={`w-16 h-20 rounded-lg overflow-hidden flex-shrink-0 ${isLight ? "border border-gray-100" : "border border-white/10"}`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <p className={`text-sm font-semibold leading-snug truncate ${isLight ? "text-gray-900" : "text-white"}`}>
          {item.name}
        </p>
        <div className="flex gap-2 mt-0.5 flex-wrap">
          {item.size && (
            <span className={`text-xs ${isLight ? "text-gray-400" : "text-[#A7B0C0]"}`}>Tam: {item.size}</span>
          )}
          {item.color && (
            <span className={`text-xs ${isLight ? "text-gray-400" : "text-[#A7B0C0]"}`}>• Cor: {item.color}</span>
          )}
        </div>
        <p className="text-[#005BFF] text-sm font-bold mt-1">
          {formatCurrency(subtotal)}
        </p>

        {/* Quantity + remove */}
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center gap-0.5">
            <button
              onClick={() => updateQuantity(item.id, item.quantity - 1)}
              aria-label="Diminuir quantidade"
              className={`w-7 h-7 rounded-md flex items-center justify-center transition-colors cursor-pointer ${
                isLight
                  ? "border border-gray-200 text-gray-600 hover:bg-gray-50"
                  : "bg-white/5 hover:bg-white/10 text-white"
              }`}
            >
              <Minus size={11} />
            </button>
            <span className={`w-8 text-center text-sm font-semibold ${isLight ? "text-gray-900" : "text-white"}`}>
              {item.quantity}
            </span>
            <button
              onClick={() => updateQuantity(item.id, item.quantity + 1)}
              aria-label="Aumentar quantidade"
              className={`w-7 h-7 rounded-md flex items-center justify-center transition-colors cursor-pointer ${
                isLight
                  ? "border border-gray-200 text-gray-600 hover:bg-gray-50"
                  : "bg-white/5 hover:bg-white/10 text-white"
              }`}
            >
              <Plus size={11} />
            </button>
          </div>

          <button
            onClick={() => removeItem(item.id)}
            aria-label="Remover item"
            className={`transition-colors cursor-pointer ${
              isLight ? "text-gray-300 hover:text-red-400" : "text-[#A7B0C0] hover:text-red-400"
            }`}
          >
            <Trash2 size={14} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
