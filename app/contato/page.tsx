"use client";

import { motion } from "framer-motion";
import { MessageCircle, Mail, Clock, MapPin } from "lucide-react";
import SectionTitle from "@/components/SectionTitle";

const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const channels = [
  {
    Icon: MessageCircle,
    title: "WhatsApp",
    description: "Canal principal de atendimento. Resposta rápida!",
    action: "Enviar mensagem",
    href: "https://wa.me/5521979372510",
    color: "#25D366",
  },
  {
    Icon: InstagramIcon,
    title: "Instagram",
    description: "Acompanhe novidades, lançamentos e promoções.",
    action: "Seguir no Instagram",
    href: "https://instagram.com/paulloguimaraesrj",
    color: "#E1306C",
  },
  {
    Icon: Mail,
    title: "E-mail",
    description: "Para dúvidas, parcerias ou solicitações formais.",
    action: "Enviar e-mail",
    href: "mailto:contato@pauloguimaraesstore.com",
    color: "#5EBBFF",
  },
];

export default function ContatoPage() {
  return (
    <div className="pt-24 min-h-screen bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 pt-6">
          <SectionTitle
            label="Fale conosco"
            title="Entre em Contato"
            subtitle="Estamos disponíveis para tirar dúvidas, auxiliar com pedidos e o que mais precisar."
            center
            theme="light"
          />
        </div>

        {/* Channels */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {channels.map((channel, i) => (
            <motion.a
              key={channel.title}
              href={channel.href}
              target={channel.href.startsWith("http") ? "_blank" : undefined}
              rel={channel.href.startsWith("http") ? "noopener noreferrer" : undefined}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -3 }}
              className="group bg-white rounded-xl p-8 border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 text-center block cursor-pointer"
              style={
                {
                  "--channel-color": channel.color,
                } as React.CSSProperties
              }
            >
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-5 transition-colors duration-300"
                style={{
                  background: `${channel.color}15`,
                  border: `1px solid ${channel.color}30`,
                }}
              >
                <channel.Icon style={{ color: channel.color }} />
              </div>
              <h3 className="text-gray-900 font-bold text-lg mb-2">{channel.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed mb-5">
                {channel.description}
              </p>
              <span
                className="inline-flex items-center gap-1.5 text-sm font-semibold transition-opacity"
                style={{ color: channel.color }}
              >
                {channel.action} →
              </span>
            </motion.a>
          ))}
        </div>

        {/* Info cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-[#F8FAFC] rounded-xl p-6"
          >
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-[#005BFF]/8 flex items-center justify-center flex-shrink-0">
                <Clock size={18} className="text-[#005BFF]" />
              </div>
              <div>
                <h4 className="text-gray-900 font-semibold text-sm mb-2">Horário de Atendimento</h4>
                <p className="text-gray-500 text-sm leading-relaxed">
                  Segunda a Sexta: 9h às 18h<br />
                  Sábado: 9h às 13h<br />
                  Domingo e Feriados: Fechado
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-[#F8FAFC] rounded-xl p-6"
          >
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-[#005BFF]/8 flex items-center justify-center flex-shrink-0">
                <MapPin size={18} className="text-[#005BFF]" />
              </div>
              <div>
                <h4 className="text-gray-900 font-semibold text-sm mb-2">Atendimento Digital</h4>
                <p className="text-gray-500 text-sm leading-relaxed">
                  Somos 100% online.<br />
                  Entregamos para todo o Brasil.<br />
                  Sem loja física.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
