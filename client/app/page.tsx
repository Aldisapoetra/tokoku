"use client";

import axios from "axios";
import Card from "../components/Card";
import { useEffect, useState } from "react";

export default function Page() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/products")
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Memuat data...</p>;
  if (!products) return <p>Gagal memuat data!</p>;

  return (
    <div className="w-full">
      <h1 className="text-2xl font-bold text-slate-700">
        Selamat Datang di Tokoku!
      </h1>

      <div>
        <div className="flex flex-wrap justify-center gap-4 pt-4">
          {products.length !== 0
            ? products.map((product) => (
                <Card
                  key={product._id}
                  name={product.name}
                  description={product.description}
                  price={product.price}
                  id={product._id}
                />
              ))
            : "Belum ada produk"}
        </div>
      </div>
    </div>
  );
}
