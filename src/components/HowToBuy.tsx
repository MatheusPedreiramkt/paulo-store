"use client";

import { motion } from "framer-motion";
import { ShoppingBag, ShoppingCart, MessageCircle, CreditCard } from "lucide-react";

const steps = [
  {
    icon: ShoppingBag,
    number: "01",
    title: "Escolha suas peças",
    description: "Navegue pelo catálogo e selecione as peças que chamaram sua atenção.",
  },
  {
    icon: ShoppingCart,
    number: "02",
    title: "Adicione ao carrinho",
    description: "Escolha tamanho, cor e quantidade. Adicione ao carrinho com um clique.",
  },
  {
    icon: MessageCircle,
    number: "03",
    title: "Finalize pelo WhatsApp",
    description: "Clique em finalizar e seu pedido será enviado automaticamente pelo WhatsApp.",
  },
  {
    icon: CreditCard,
    number: "04",
    title: "Combine o pagamento",
    description: "Combine o pagamento e entrega diretamente com a loja de forma rápida e simples.",
  },
];

export default function HowToBuy() {
  return (
    <section className="py-20 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="text-[#005BFF] text-xs font-semibold tracking-[0.28em] uppercase">
            Simples assim
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-3 mb-4">
            Como comprar
          </h2>
          <p className="text-gray-500 text-lg max-w-xl mx-auto">
            Processo rápido e descomplicado. Em poucos passos seu pedido está feito.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300 group"
            >
              {/* Step number watermark */}
              <span className="absolute top-4 right-5 text-gray-100 font-black text-5xl leading-none select-none group-hover:text-[#005BFF]/8 transition-colors">
                {step.number}
              </span>

              {/* Icon */}
              <div className="w-11 h-11 rounded-lg bg-[#005BFF]/8 flex items-center justify-center mb-5">
                <step.icon size={20} className="text-[#005BFF]" />
              </div>

              <h3 className="text-gray-900 font-bold text-sm mb-2">{step.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{step.description}</p>

              {/* Connector */}
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-10 -right-3 w-6 h-px bg-gradient-to-r from-gray-200 to-transparent z-10" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
