"use client";

import { motion } from "framer-motion";

interface Props {
  label?: string;
  title: string;
  subtitle?: string;
  center?: boolean;
  theme?: "dark" | "light";
}

export default function SectionTitle({ label, title, subtitle, center = false, theme = "dark" }: Props) {
  const isLight = theme === "light";

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={center ? "text-center" : ""}
    >
      {label && (
        <span className={`inline-block text-xs font-semibold tracking-[0.28em] uppercase mb-3 ${
          isLight ? "text-[#005BFF]" : "text-[#005BFF]"
        }`}>
          {label}
        </span>
      )}
      <h2 className={`text-2xl md:text-3xl lg:text-4xl font-bold leading-tight ${
        isLight ? "text-gray-900" : "text-white"
      }`}>
        {title}
      </h2>
      {subtitle && (
        <p className={`mt-3 text-base md:text-lg max-w-2xl leading-relaxed ${
          isLight ? "text-gray-500" : "text-[#A7B0C0]"
        }`}>
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
