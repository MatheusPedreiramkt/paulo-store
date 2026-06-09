"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ProductCard from "./ProductCard";
import ProductFilters from "./ProductFilters";
import type { Product, Category } from "@/data/products";
import { PackageOpen } from "lucide-react";

type FilterCategory = "all" | Category;

interface Props {
  products: Product[];
  defaultCategory?: FilterCategory;
  showFilters?: boolean;
}

export default function ProductGrid({ products, defaultCategory = "all", showFilters = true }: Props) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<FilterCategory>(defaultCategory);

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchesCategory = category === "all" || p.category === category;
      const matchesSearch =
        !search ||
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.description.toLowerCase().includes(search.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [products, search, category]);

  return (
    <div>
      {showFilters && (
        <div className="mb-8">
          <ProductFilters
            search={search}
            onSearch={setSearch}
            category={category}
            onCategory={setCategory}
          />
        </div>
      )}

      <AnimatePresence mode="wait">
        {filtered.length === 0 ? (
          <motion.div
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center py-20 text-center"
          >
            <PackageOpen size={48} className="text-gray-300 mb-4" />
            <p className="text-gray-900 font-semibold text-lg mb-2">
              Nenhum produto encontrado
            </p>
            <p className="text-gray-500 text-sm">
              Tente buscar com outras palavras ou mude o filtro de categoria.
            </p>
          </motion.div>
        ) : (
          <motion.div
            key="grid"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {filtered.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {filtered.length > 0 && (
        <p className="text-gray-400 text-sm mt-8 text-center">
          {filtered.length} produto{filtered.length !== 1 ? "s" : ""} encontrado{filtered.length !== 1 ? "s" : ""}
        </p>
      )}
    </div>
  );
}
