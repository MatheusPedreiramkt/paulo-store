"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Award, Heart, Star, Truck } from "lucide-react";
import WhatsAppButton from "@/components/WhatsAppButton";
import SectionTitle from "@/components/SectionTitle";

const values = [
  {
    icon: Award,
    title: "Qualidade Premium",
    description:
      "Selecionamos cada peça com rigor para garantir o melhor material, acabamento e durabilidade.",
  },
  {
    icon: Heart,
    title: "Atendimento Personalizado",
    description:
      "Cada cliente é único. Oferecemos suporte humanizado diretamente pelo WhatsApp.",
  },
  {
    icon: Star,
    title: "Estilo e Elegância",
    description:
      "Curadoria de peças modernas e sofisticadas para quem valoriza presença e bom gosto.",
  },
  {
    icon: Truck,
    title: "Entrega para Todo Brasil",
    description:
      "Enviamos para todo o território nacional com segurança e agilidade.",
  },
];

export default function SobrePage() {
  return (
    <div className="pt-20 min-h-screen bg-white">
      {/* Hero */}
      <section className="relative py-16 overflow-hidden border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block text-[#005BFF] text-xs font-semibold tracking-[0.25em] uppercase mb-4">
                Nossa história
              </span>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-6">
                Sobre a Paulo Guimarães Store
              </h1>
              <p className="text-gray-500 text-base md:text-lg leading-relaxed mb-5">
                A Paulo Guimarães Store nasceu da paixão por moda e do desejo de
                oferecer peças premium com um atendimento próximo e personalizado.
              </p>
              <p className="text-gray-500 leading-relaxed mb-8">
                Somos uma loja especializada em moda masculina e moda íntima,
                operando 100% de forma digital e com atendimento direto pelo
                WhatsApp. Acreditamos que estilo não é luxo — é uma escolha
                acessível para quem sabe o que quer.
              </p>
              <WhatsAppButton label="Falar com a loja" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="flex justify-center lg:justify-end"
            >
              <div className="relative">
                <div className="w-64 h-64 rounded-3xl bg-gradient-to-br from-[#005BFF]/20 to-[#1E8BFF]/10 border border-[#005BFF]/20 flex items-center justify-center">
                  <Image
                    src="/logo.webp"
                    alt="Paulo Guimarães Store"
                    width={160}
                    height={160}
                    className="object-contain"
                  />
                </div>
                <div className="absolute -top-3 -right-3 w-24 h-24 rounded-2xl bg-[#005BFF]/10 border border-[#005BFF]/20 backdrop-blur-sm" />
                <div className="absolute -bottom-3 -left-3 w-16 h-16 rounded-xl bg-[#1E8BFF]/10 border border-[#1E8BFF]/20 backdrop-blur-sm" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <SectionTitle label="O que nos move" title="Nossos Valores" center theme="light" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {values.map((value, i) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300 text-center"
              >
                <div className="w-11 h-11 rounded-lg bg-[#005BFF]/8 flex items-center justify-center mx-auto mb-4">
                  <value.icon size={20} className="text-[#005BFF]" />
                </div>
                <h3 className="text-gray-900 font-bold text-sm mb-2">{value.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA dark */}
      <section className="py-20 bg-[#02040A]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Pronto para elevar seu estilo?
            </h2>
            <p className="text-white/50 mb-8">
              Explore o catálogo e monte seu pedido com facilidade.
            </p>
            <WhatsAppButton label="Falar pelo WhatsApp agora" />
          </motion.div>
        </div>
      </section>
    </div>
  );
}
