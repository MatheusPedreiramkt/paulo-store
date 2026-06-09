"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import SectionTitle from "@/components/SectionTitle";
import ProductGrid from "@/components/ProductGrid";
import { products, type Category } from "@/data/products";

function CatalogContent() {
  const params = useSearchParams();
  const cat = params.get("categoria") as Category | null;

  return (
    <div className="pt-24 pb-20 min-h-screen bg-white">
      {/* Page header */}
      <div className="border-b border-gray-100 mb-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <SectionTitle
            label="Catálogo completo"
            title="Todos os Produtos"
            subtitle="Explore nossa coleção completa. Filtre por categoria ou busque pelo nome."
            theme="light"
          />
        </div>
      </div>

      <div className="bg-[#F8FAFC] py-10 min-h-[60vh]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ProductGrid
            products={products}
            defaultCategory={cat ?? "all"}
            showFilters
          />
        </div>
      </div>
    </div>
  );
}

export default function CatalogPage() {
  return (
    <Suspense
      fallback={
        <div className="pt-24 pb-20 min-h-screen bg-white flex items-center justify-center">
          <div className="w-7 h-7 rounded-full border-2 border-[#005BFF] border-t-transparent animate-spin" />
        </div>
      }
    >
      <CatalogContent />
    </Suspense>
  );
}
