import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import WhatsAppButton from "@/components/WhatsAppButton";

export const metadata: Metadata = {
  title: "Paulo Guimarães Store — Moda com Estilo e Elegância",
  description:
    "Catálogo online de moda masculina e moda íntima. Peças selecionadas com qualidade premium. Compre pelo WhatsApp com facilidade.",
  keywords: "moda masculina, moda íntima, roupas masculinas, lingerie, cueca, pijama, WhatsApp",
  openGraph: {
    title: "Paulo Guimarães Store",
    description: "Moda com estilo, elegância e personalidade.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="h-full">
      <body className="min-h-full flex flex-col bg-white text-gray-900 antialiased">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <CartDrawer />
        <WhatsAppButton variant="floating" />
      </body>
    </html>
  );
}
