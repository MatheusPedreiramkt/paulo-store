"use client";

import { Search, X } from "lucide-react";
import { CATEGORY_LABELS, type Category } from "@/data/products";

type FilterCategory = "all" | Category;

interface Props {
  search: string;
  onSearch: (v: string) => void;
  category: FilterCategory;
  onCategory: (v: FilterCategory) => void;
}

const FILTERS: { value: FilterCategory; label: string }[] = [
  { value: "all", label: "Todos" },
  { value: "moda-masculina", label: CATEGORY_LABELS["moda-masculina"] },
  { value: "moda-intima-masculina", label: CATEGORY_LABELS["moda-intima-masculina"] },
  { value: "moda-intima-feminina", label: CATEGORY_LABELS["moda-intima-feminina"] },
];

export default function ProductFilters({ search, onSearch, category, onCategory }: Props) {
  return (
    <div className="flex flex-col sm:flex-row gap-3">
      {/* Search */}
      <div className="relative flex-1">
        <Search size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Buscar produto..."
          value={search}
          onChange={(e) => onSearch(e.target.value)}
          className="w-full pl-10 pr-10 py-2.5 rounded-lg bg-white border border-gray-200 text-gray-900 placeholder-gray-400 text-sm focus:outline-none focus:border-[#005BFF] focus:ring-1 focus:ring-[#005BFF]/20 transition-all"
        />
        {search && (
          <button
            onClick={() => onSearch("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700 cursor-pointer transition-colors"
            aria-label="Limpar busca"
          >
            <X size={15} />
          </button>
        )}
      </div>

      {/* Category filters */}
      <div className="flex items-center gap-2 flex-wrap">
        {FILTERS.map((f) => (
          <button
            key={f.value}
            onClick={() => onCategory(f.value)}
            className={`px-4 py-2.5 rounded-lg text-xs font-semibold tracking-[0.08em] uppercase transition-all duration-200 cursor-pointer whitespace-nowrap ${
              category === f.value
                ? "bg-[#02040A] text-white"
                : "bg-white border border-gray-200 text-gray-600 hover:border-gray-400 hover:text-gray-900"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>
    </div>
  );
}
