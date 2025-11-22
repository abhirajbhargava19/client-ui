"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";

function ProductCard({
  product,
  addToCart,
  accentClasses,
}: {
  product: { id: string; name: string; description: string; image: string; price: number };
  addToCart: () => void;
  accentClasses?: { bg: string; bgHover: string; text: string; border: string } | undefined;
}) {
  return (
    <div className="border rounded-lg p-4 bg-white/5">
      <Image alt={product.name} src={product.image} width={200} height={160} />
      <div className="mt-2 font-semibold">{product.name}</div>
      <div className="text-sm text-slate-400">{product.description}</div>
      <div className="mt-2 font-bold">₹{product.price}</div>
      <button
        onClick={addToCart}
        className={`mt-3 w-full py-2 rounded text-white ${accentClasses?.bg ?? "bg-blue-600"} ${accentClasses?.bgHover ?? "hover:bg-blue-700"}`}
      >
        Add
      </button>
    </div>
  );
}

export type Product = {
  id: string;
  name: string;
  description: string;
  image: string;
  price: number;
};

const products: Product[] = [
  { id: "1", name: "Margarita Pizza", description: "This is a very tasty pizza", image: "/pizza-main.png", price: 500 },
  { id: "2", name: "Pepperoni Pizza", description: "A classic favorite with spicy pepperoni", image: "/cheese.png", price: 600 },
  { id: "3", name: "BBQ Chicken Pizza", description: "Grilled chicken with BBQ sauce and cheese", image: "/chicken.png", price: 700 },
  { id: "4", name: "Veggie Pizza", description: "Loaded with fresh vegetables and cheese", image: "/jelapeno.png", price: 550 },
  { id: "5", name: "Mushroom Pizza", description: "Loaded with fresh mushrooms and cheese", image: "/mushroom.png", price: 550 },
];


const beverages = [
  { id: "b1", name: "Coca Cola", description: "330ml", image: "/coke.png", price: 80 },
  { id: "b2", name: "Pepsi", description: "330ml", image: "/pepsi.png", price: 80 },
  { id: "b3", name: "Orange Juice", description: "250ml", image: "/orange.png", price: 120 },
];

export default function Home() {
  // THEME
  const [isDark, setIsDark] = useState(true);

  // ACCENT COLOR
  const [accent, setAccent] = useState("blue");

  const accentClasses = {
    blue: { bg: "bg-blue-600", bgHover: "hover:bg-blue-700", text: "text-blue-400", border: "border-blue-400" },
    orange: { bg: "bg-orange-600", bgHover: "hover:bg-orange-700", text: "text-orange-400", border: "border-orange-400" },
  }[accent];

  // CART STATE - each item has qty
  const [cart, setCart] = useState<(Product & { qty: number })[]>([]);

  // Add single unit to cart (real-time UI update)
  const addToCart = (item: Product) => {
    setCart((prev) => {
      const exist = prev.find((p) => p.id === item.id);
      if (exist) {
        return prev.map((p) => (p.id === item.id ? { ...p, qty: p.qty + 1 } : p));
      }
      return [...prev, { ...item, qty: 1 }];
    });
  };

  // Decrement qty or remove
  const removeFromCart = (id: string) => {
    setCart((prev) => {
      const exist = prev.find((p) => p.id === id);
      if (!exist) return prev;
      if (exist.qty <= 1) return prev.filter((p) => p.id !== id);
      return prev.map((p) => (p.id === id ? { ...p, qty: p.qty - 1 } : p));
    });
  };

  // Remove item completely
  const clearItem = (id: string) => setCart((prev) => prev.filter((p) => p.id !== id));

  // Correct billing: subtotal, tax (example), final total
  const subtotal = cart.reduce((a, c) => a + c.price * c.qty, 0);
  const TAX_RATE = 0.18; // 18% GST example — change as needed
  const tax = Math.round(subtotal * TAX_RATE);
  const totalPrice = subtotal + tax;

  return (
    <div className={isDark ? "min-h-screen bg-slate-900 text-white" : "min-h-screen bg-white text-slate-900"}>
      <header className="max-w-7xl mx-auto px-4 py-5 flex items-center justify-between">
        <h1 className="text-3xl font-bold">🍕 Pizza Landing</h1>
        <div className="flex gap-3">
          <button onClick={() => setIsDark(!isDark)} className="px-4 py-2 border rounded-md">{isDark ? "Dark" : "Light"} Mode</button>
          <select value={accent} onChange={(e) => setAccent(e.target.value)} className="px-3 py-2 border rounded-md bg-transparent">
            <option value="blue">Blue</option>
            <option value="orange">Orange</option>
          </select>
        </div>
      </header>

      {/* HERO */}
      <section>
        <div className="container mx-auto flex items-center justify-between py-24">
          <div>
            <h1 className="text-7xl font-black leading-tight">
              Super Delicious Pizza in <br />
              <span className="text-primary">Only 45 Minutes</span>
            </h1>
            <p className="text-2xl mt-8 max-w-lg leading-snug">Enjoy a Free Meal if Your Order Takes More Than 45 Minutes!</p>
            <Button className="mt-8 text-lg rounded-full py-7 px-6 font-bold">Get your pizza now</Button>
          </div>
          <div><Image alt="pizza-main" src={"/pizza-main.png"} width={400} height={400} /></div>
        </div>
      </section>

      {/* PRODUCTS */}
      <section>
        <div className="container py-12 mx-auto">
          <Tabs defaultValue="pizza">
            <TabsList>
              <TabsTrigger value="pizza" className="text-md">Pizza</TabsTrigger>
              <TabsTrigger value="beverages" className="text-md">Beverages</TabsTrigger>
            </TabsList>

            <TabsContent value="pizza">
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
                {products.map((product) => (
                  <ProductCard
                    product={product}
                    key={product.id}
                    addToCart={() => addToCart(product)}
                    accentClasses={accentClasses}
                  />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="beverages">
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
                {beverages.map((product) => (
                  <ProductCard
                    product={product}
                    key={product.id}
                    addToCart={() => addToCart(product)}
                    accentClasses={accentClasses}
                  />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* CART */}
      <section className="max-w-2xl mx-auto p-5 border rounded-xl mt-6 bg-white/5">
        <h2 className="text-2xl font-bold mb-3">🛒 Cart</h2>

        {cart.length === 0 && <p className="text-slate-400">No items yet.</p>}

        {cart.map((item) => (
          <div key={item.id} className="flex items-center justify-between py-2 border-b">
            <div>
              <div className="font-medium">{item.name}</div>
              <div className="text-sm text-slate-400">₹{item.price} × {item.qty}</div>
            </div>

            <div className="flex gap-2 items-center">
              <button onClick={() => removeFromCart(item.id)} className="px-2 py-1 border rounded">-</button>
              <span className="w-6 text-center font-medium">{item.qty}</span>
              <button onClick={() => addToCart(item)} className="px-2 py-1 border rounded">+</button>
              <span className="ml-4 font-bold">₹{item.price * item.qty}</span>
              <button onClick={() => clearItem(item.id)} className="ml-3 text-sm text-red-400">Remove</button>
            </div>
          </div>
        ))}

        {cart.length > 0 && (
          <>
            <div className="mt-3 space-y-2">
              <div className="flex justify-between text-sm"><span>Subtotal</span><span>₹{subtotal}</span></div>
              <div className="flex justify-between text-sm"><span>Tax (18%)</span><span>₹{tax}</span></div>
              <div className="flex justify-between font-bold text-lg"><span>Total</span><span>₹{totalPrice}</span></div>
            </div>

            <button className={`mt-4 w-full py-3 rounded-md text-white font-bold ${accentClasses?.bg ?? "bg-blue-600"} ${accentClasses?.bgHover ?? "hover:bg-blue-700"}`}>
              Checkout
            </button>
          </>
        )}
      </section>
    </div>
  );
}
