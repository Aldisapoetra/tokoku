"use client";

import { CartItemType } from "@app/types";
import Button from "@components/Button";
import CartItem from "@components/CartItem";
import { formatter } from "@utils/formatter";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function CartPage() {
  const router = useRouter();
  const [cart, setCart] = useState<CartItemType[]>([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Pengecekan user login atau belum
    const storedUser = localStorage.getItem("user");
    setUser(storedUser ? storedUser : null);

    // Inisialisasi isi Cart
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  const handleRemove = (id: string) => {
    const updatedCart = cart.filter((item) => item._id !== id);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const handleClick = () => {
    router.push("/products");
  };

  const totalPrice = cart.reduce((acc, item) => acc + item.price * item.qty, 0);

  if (!user) {
    return (
      <div className="rounded-lg border border-red-500 bg-yellow-200 p-4 font-semibold text-red-500">
        Anda belum login, silakan login terlebih dahulu!
      </div>
    );
  }

  return (
    <div className="w-full">
      <h1 className="mb-4 text-2xl font-bold text-slate-700">
        Keranjang Belanja
      </h1>

      {cart.length === 0 ? (
        <div className="p-4">
          <h3 className="mb-4 rounded-lg border border-red-500 bg-yellow-200 p-4 font-semibold text-red-500">
            Keranjang kamu masih kosong.
          </h3>
          <Button bg="bg-green-600 hover:bg-green-700" onClick={handleClick}>
            Belanja sekarang
          </Button>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {cart.map((item) => (
            <CartItem key={item._id} item={item} handleRemove={handleRemove} />
          ))}

          <div className="mt-4 text-right">
            <h3 className="mb-4 text-xl font-semibold text-green-700">
              Total: Rp{formatter.format(totalPrice)}
            </h3>
            <a
              href="/checkout"
              className="rounded bg-green-600 px-3 py-2 text-right font-semibold text-white duration-300 hover:bg-green-700"
            >
              Checkout
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
