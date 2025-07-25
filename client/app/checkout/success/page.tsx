"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function CheckoutSuccess() {
  useEffect(() => {
    localStorage.removeItem("cart");
  }, []);

  return (
    <div className="p-8 text-center">
      <h1 className="mb-4 text-3xl font-bold text-green-600">
        Pembayaran Berhasil🎊
      </h1>
      <p className="mb-4 text-lg">
        Terimakasih atas kepercayaan anda, pesanan anda sedang kami proses.
      </p>

      <Link href={"/"}>
        <button className="rounded bg-green-600 px-6 py-2 text-white duration-300 hover:cursor-pointer hover:bg-green-700">
          Kembali ke Beranda
        </button>
      </Link>
    </div>
  );
}
