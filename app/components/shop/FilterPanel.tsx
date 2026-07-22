"use client";

import { useEffect, useMemo, useState } from "react";
import { Search } from "lucide-react";
import type { Product } from "../../shop/page";

interface FilterPanelProps {
  products: Product[];
  onFilter: (filtered: Product[]) => void;
}

const panelStyle: React.CSSProperties = {
  background: "rgba(255, 255, 255, 0.06)",
  backdropFilter: "blur(20px)",
  WebkitBackdropFilter: "blur(20px)",
  border: "1px solid rgba(255, 255, 255, 0.11)",
  borderRadius: 18,
  padding: 20,
  display: "flex",
  flexDirection: "column",
  gap: 22,
  height: "fit-content",
  position: "sticky",
  top: 84,
};

const labelStyle: React.CSSProperties = {
  fontSize: 12,
  fontWeight: 700,
  textTransform: "uppercase",
  letterSpacing: "0.06em",
  color: "rgba(251,243,230,0.5)",
  marginBottom: 10,
  display: "block",
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  background: "rgba(255,255,255,0.05)",
  border: "1px solid rgba(255,255,255,0.12)",
  borderRadius: 10,
  padding: "9px 12px",
  fontSize: 14,
  color: "#FBF3E6",
};

export default function FilterPanel({ products, onFilter }: FilterPanelProps) {
  const [search, setSearch] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const categories = useMemo(
    () => Array.from(new Set(products.map(p => p.category).filter(Boolean))).sort(),
    [products]
  );

  function toggleCategory(category: string) {
    setSelectedCategories(prev =>
      prev.includes(category) ? prev.filter(c => c !== category) : [...prev, category]
    );
  }

  useEffect(() => {
    const term = search.trim().toLowerCase();
    const min = minPrice !== "" ? Number(minPrice) : null;
    const max = maxPrice !== "" ? Number(maxPrice) : null;

    const filtered = products.filter(product => {
      const matchesSearch =
        term === "" ||
        product.name?.toLowerCase().includes(term) ||
        product.description?.toLowerCase().includes(term);

      const matchesCategory =
        selectedCategories.length === 0 || selectedCategories.includes(product.category);

      const matchesMin = min === null || product.price >= min;
      const matchesMax = max === null || product.price <= max;

      return matchesSearch && matchesCategory && matchesMin && matchesMax;
    });

    onFilter(filtered);
  }, [search, selectedCategories, minPrice, maxPrice, products, onFilter]);

  return (
    <aside style={panelStyle}>
      <div>
        <span style={labelStyle}>Buscar</span>
        <div style={{ position: "relative" }}>
          <Search
            size={14}
            style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "rgba(251,243,230,0.4)" }}
          />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Nombre o descripción..."
            style={{ ...inputStyle, paddingLeft: 32 }}
          />
        </div>
      </div>

      {categories.length > 0 && (
        <div>
          <span style={labelStyle}>Categoría</span>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {categories.map(category => (
              <label
                key={category}
                style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 14, color: "#FBF3E6", cursor: "pointer" }}
              >
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(category)}
                  onChange={() => toggleCategory(category)}
                />
                {category}
              </label>
            ))}
          </div>
        </div>
      )}

      <div>
        <span style={labelStyle}>Precio</span>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <input
            type="number"
            min={0}
            value={minPrice}
            onChange={e => setMinPrice(e.target.value)}
            placeholder="Mín."
            style={inputStyle}
          />
          <span style={{ color: "rgba(251,243,230,0.4)" }}>–</span>
          <input
            type="number"
            min={0}
            value={maxPrice}
            onChange={e => setMaxPrice(e.target.value)}
            placeholder="Máx."
            style={inputStyle}
          />
        </div>
      </div>
    </aside>
  );
}
