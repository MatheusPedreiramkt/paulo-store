"use client";

import { MessageCircle } from "lucide-react";
import { motion } from "framer-motion";
import { buildWhatsAppUrl, generateWhatsAppMessage, WHATSAPP_NUMBER } from "@/lib/utils";

interface Props {
  items?: Array<{
    productId?: string;
    name: string;
    size?: string;
    color?: string;
    quantity: number;
    price: number;
    promoQty?: number;
    promoPrice?: number;
    promoLabel?: string;
  }>;
  label?: string;
  variant?: "primary" | "outline" | "floating";
  className?: string;
}

export default function WhatsAppButton({
  items = [],
  label = "Comprar pelo WhatsApp",
  variant = "primary",
  className = "",
}: Props) {
  const href =
    items.length > 0
      ? buildWhatsAppUrl(generateWhatsAppMessage(items))
      : `https://wa.me/${WHATSAPP_NUMBER}`;

  const base =
    "inline-flex items-center gap-2.5 font-semibold tracking-wide transition-all duration-200 cursor-pointer";

  const variants = {
    primary:
      "px-6 py-3 rounded-xl bg-[#25D366] hover:bg-[#1da851] text-white shadow-lg shadow-[#25D366]/20 hover:shadow-[#25D366]/40 hover:scale-[1.02]",
    outline:
      "px-6 py-3 rounded-xl border border-[#25D366] text-[#25D366] hover:bg-[#25D366]/10",
    floating:
      "fixed bottom-6 right-6 z-40 p-4 rounded-full bg-[#25D366] hover:bg-[#1da851] text-white shadow-xl shadow-[#25D366]/30 hover:scale-110",
  };

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      whileTap={{ scale: 0.96 }}
      className={`${base} ${variants[variant]} ${className}`}
    >
      <MessageCircle size={variant === "floating" ? 24 : 18} />
      {variant !== "floating" && <span>{label}</span>}
    </motion.a>
  );
}
