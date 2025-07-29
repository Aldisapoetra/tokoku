"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { CartItemType, formType } from "@app/types";
import { formatter } from "@utils/formatter";

export default function CheckoutPage() {
  const [cart, setCart] = useState<CartItemType[]>([]);
  const [form, setForm] = useState<formType>({
    name: "",
    address: "",
    phone: "",
  });
  const router = useRouter();

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  const handleChange = (e: {
    preventDefault: () => void;
    target: { name: any; value: any };
  }) => {
    e.preventDefault();

    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name || !form.address || !form.phone) {
      alert("Lengkapi data pengiriman!");
      return;
    }

    // misalnya selesai
    alert("Pesanan anda telah selesai!");
    localStorage.removeItem("cart");
    setCart([]);
    setForm({
      name: "",
      address: "",
      phone: "",
    });

    router.push("/checkout/success");
  };

  const totalPrice = cart.reduce((acc, item) => acc + item.price * item.qty, 0);

  return (
    <div className="mx-auto max-w-3xl p-4">
      <h1 className="mb-4 text-2xl font-bold text-slate-700">Checkout</h1>

      {cart.length === 0 ? (
        <div>
          <p>Tambahkan produk sebelum checkout</p>
          <a href="/products">Yuk, belanja!</a>
        </div>
      ) : (
        <>
          {/* Ringkasan Produk */}
          <div className="mb-8 rounded-xl border p-4 shadow-sm">
            <h3 className="mb-2 text-lg font-semibold">Ringkasan Produk:</h3>
            {cart.map((item) => (
              <div key={item._id}>
                <div className="flex justify-between">
                  <span>
                    {item.name} x {item.qty}
                  </span>
                  <span>Rp{formatter.format(item.qty * item.price)}</span>
                </div>
                <hr className="mb-2" />
              </div>
            ))}
            <div className="mt-4 text-right text-lg font-semibold text-green-600">
              Total: Rp{formatter.format(totalPrice)}
            </div>
          </div>

          {/* Detail pengiriman */}
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-4 rounded-xl border p-4"
          >
            <h3 className="text-lg font-semibold">Informasi Pengiriman:</h3>

            <input
              type="text"
              value={form.name}
              name="name"
              onChange={handleChange}
              placeholder="Nama Lengkap"
              className="h-8 rounded-lg border px-2"
              required
            />
            <textarea
              value={form.address}
              name="address"
              onChange={handleChange}
              placeholder="Alamat"
              rows={3}
              className="rounded-lg border px-2"
              required
            />
            <input
              type="text"
              value={form.phone}
              name="phone"
              onChange={handleChange}
              placeholder="Nomor HP"
              className="h-8 rounded-lg border px-2"
              required
            />
            <div className="flex w-full justify-end">
              <button className="w-max rounded-lg bg-green-600 px-3 py-1 text-lg text-white hover:bg-green-700">
                Bayar Sekarang
              </button>
            </div>
          </form>
        </>
      )}
    </div>
  );
}
