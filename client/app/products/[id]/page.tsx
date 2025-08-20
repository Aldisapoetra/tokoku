"use client";

import { itemType } from "@app/types";
import { formatter } from "@utils/formatter";
import axios from "axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function DetailProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost:5000/api/products/${id}`)
        .then((res) => setProduct(res.data))
        .catch((err) => console.log(`Error guys: ${err.message}`))
        .finally(() => setLoading(false));
    }
  }, [id]);

  // console.log(product);

  // const handleAddToCart = () => {
  // const cart = JSON.parse(localStorage.getItem("cart")) || [];
  // let item: itemType = {
  //   _id: product._id,
  //   name: product.name,
  //   price: product.price,
  //   qty: 1,
  // };
  // const existing = cart.find((i: { _id: string }) => i._id === item._id);
  // if (existing) {
  //   existing.qty += 1;
  // } else {
  //   cart.push(item);
  // }
  // localStorage.setItem("cart", JSON.stringify(cart));
  // alert("Berhasil menambahkan produk ke keranjang");
  // };

  const handleAddToCart = async () => {
    try {
      const token = localStorage.getItem("token");
      console.log(product._id);
      const res = await axios.post(
        "http://localhost:5000/api/cart",
        {
          productId: product._id,
          quantity: 1,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      alert(res.data.message);
      console.log(res.data.message);
    } catch (err) {
      console.error(err.response?.data?.message);
      alert("Gagal menambahkan produk ke cart");
    }
  };

  if (loading) return <p>Loading...</p>;

  return product ? (
    <div className="py-8">
      <div className="image-product h-[300px] w-full rounded-2xl bg-linear-to-r from-white to-gray-300 shadow">
        <img alt={product.image} />
      </div>
      <div className="mt-4 flex flex-col gap-4">
        <h1 className="text-2xl font-semibold text-slate-700">
          {product.name}
        </h1>
        <p>{product.description}</p>
        <p className="text-2xl font-semibold text-green-600">
          Rp{formatter.format(product.price)}
        </p>
      </div>
      <button
        onClick={handleAddToCart}
        className="mt-4 rounded-lg border-2 border-green-600 bg-green-600 px-4 py-2 font-bold text-white duration-300 hover:cursor-pointer hover:bg-transparent hover:text-green-600"
      >
        Tambahkan ke keranjang
      </button>
    </div>
  ) : (
    <div className="flex h-dvh items-center">
      <p className="mx-auto">Produk Tidak ditemukan!</p>
    </div>
  );
}
