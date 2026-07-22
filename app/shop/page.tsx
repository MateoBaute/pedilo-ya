'use client'

import { useState, useEffect } from "react";
import FilterPanel from "@/app/components/shop/FilterPanel";

export interface Product {
    id: number;
    name: string;
    description: string;
    category: string;
    price: number;
    location?: string;
}

export default function Shop() {
    const [products, setProducts] = useState<Product[]>([]);
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

    async function fetchProducts() {
        try {
            const l = localStorage.getItem("location");

            const response = await fetch('/api/products', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ location: l }),
            })
            const data = await response.json();
            if (data.success) {
                setProducts(data.list);
                setFilteredProducts(data.list);
            }
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    }

    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <div style={{ minHeight: "100vh", background: "#0f0906", color: "#FBF3E6" }}>
            <div style={{
                maxWidth: 1180, margin: "0 auto", padding: "28px",
                display: "grid", gridTemplateColumns: "260px 1fr", gap: 28,
                alignItems: "start",
            }}>
                <FilterPanel products={products} onFilter={setFilteredProducts} />

                <main>
                    <h1 style={{ fontFamily: "var(--font-display)", fontSize: 32, fontWeight: 800, marginBottom: 6 }}>
                        Shop
                    </h1>
                    <p style={{ color: "rgba(251,243,230,0.6)", marginBottom: 24 }}>Welcome to our shop!</p>

                    {filteredProducts.length !== 0 ? (
                        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                            {filteredProducts.map(product => (
                                <div
                                    key={product.id}
                                    style={{
                                        background: "rgba(255,255,255,0.05)",
                                        border: "1px solid rgba(255,255,255,0.1)",
                                        borderRadius: 14, padding: 16,
                                    }}
                                >
                                    <h2 style={{ fontSize: 17, fontWeight: 700 }}>{product.name}</h2>
                                    <p style={{ color: "rgba(251,243,230,0.6)", fontSize: 14 }}>{product.description}</p>
                                    <p style={{ fontFamily: "var(--font-mono)", fontSize: 14, marginTop: 6, color: "#FFC145" }}>
                                        ${product.price}
                                    </p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p>No products available for the selected location.</p>
                    )}
                </main>
            </div>
        </div>
    )
}
