import Link from "next/link";
import Image from "next/image";
import { MessageCircle, Mail } from "lucide-react";
import { buildWhatsAppUrl, generateWhatsAppMessage } from "@/lib/utils";

export default function Footer() {
  const waUrl = buildWhatsAppUrl(generateWhatsAppMessage([])).split("?")[0];

  return (
    <footer className="bg-[#02040A] border-t border-white/5 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="relative w-10 h-10">
                <Image
                  src="/logo.webp"
                  alt="Paulo Guimarães Store"
                  fill
                  className="object-contain"
                />
              </div>
              <div>
                <p className="text-white font-semibold text-sm tracking-wider uppercase">
                  Paulo Guimarães
                </p>
                <p className="text-[#5EBBFF] text-xs tracking-[0.2em] uppercase">
                  Store
                </p>
              </div>
            </div>
            <p className="text-[#A7B0C0] text-sm leading-relaxed max-w-xs">
              Moda masculina e moda íntima com estilo, elegância e personalidade.
              Atendimento personalizado via WhatsApp.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-white text-sm font-semibold tracking-wider uppercase mb-4">
              Navegação
            </h3>
            <ul className="space-y-2">
              {[
                { href: "/", label: "Início" },
                { href: "/catalogo", label: "Catálogo" },
                { href: "/sobre", label: "Sobre a loja" },
                { href: "/contato", label: "Contato" },
                { href: "/carrinho", label: "Carrinho" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[#A7B0C0] hover:text-[#5EBBFF] text-sm transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white text-sm font-semibold tracking-wider uppercase mb-4">
              Contato
            </h3>
            <div className="space-y-3">
              <a
                href={`https://wa.me/5521979372510`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-[#A7B0C0] hover:text-[#25D366] transition-colors duration-200 group cursor-pointer"
              >
                <MessageCircle size={18} className="flex-shrink-0" />
                <span className="text-sm">WhatsApp</span>
              </a>
              <a
                href="mailto:contato@pauloguimaraesstore.com"
                className="flex items-center gap-3 text-[#A7B0C0] hover:text-[#5EBBFF] transition-colors duration-200 cursor-pointer"
              >
                <Mail size={18} className="flex-shrink-0" />
                <span className="text-sm">E-mail</span>
              </a>
              <a
                href="https://instagram.com/paulloguimaraesrj"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-[#A7B0C0] hover:text-[#E1306C] transition-colors duration-200 cursor-pointer"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-[18px] h-[18px] flex-shrink-0">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
                <span className="text-sm">Instagram</span>
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/5 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[#A7B0C0] text-xs">
            © {new Date().getFullYear()} Paulo Guimarães Store. Todos os direitos reservados.
          </p>
          <p className="text-[#A7B0C0] text-xs">
            Atendimento via{" "}
            <a
              href={`https://wa.me/5521979372510`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#25D366] hover:underline"
            >
              WhatsApp
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
