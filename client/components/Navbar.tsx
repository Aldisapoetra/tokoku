"use client";

import Link from "next/link";
import { UserCircleIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [user, setUser] = useState(null);
  // Fungsi untuk update user
  const updateUser = () => {
    const storedUser = localStorage.getItem("user");
    setUser(storedUser ? JSON.parse(storedUser) : null);
  };

  useEffect(() => {
    // Panggil saat pertama kali mount (render)
    updateUser();

    // Dengarkan event custom saat user login/logout
    window.addEventListener("userChange", updateUser);

    // Bersihkan event custom saat komponen unmount
    return () => {
      window.removeEventListener("userChange", updateUser);
    };
  }, []);

  return (
    <nav className="fixed top-0 flex w-full max-w-dvw items-center justify-between bg-gray-200 px-[65px] py-1">
      <div>
        <Link href="/">
          <h1 className="mb-[-10px] text-3xl font-semibold text-green-600">
            Tokoku
          </h1>
          <small className="text-green-600">Temukan Apapun!</small>
        </Link>
      </div>

      <ul className="flex gap-4">
        <li className="text-slate-700 duration-300 hover:text-green-600">
          <Link href="/products">Products</Link>
        </li>
        <li className="text-slate-700 duration-300 hover:text-green-600">
          <Link href="/cart">Keranjang</Link>
        </li>
        <li className="text-slate-700 duration-300 hover:text-green-600">
          <Link href={user ? "profile" : "login"} className="flex items-center">
            <UserCircleIcon className="size-6" />
            {user && <span>{user.name}</span>}
          </Link>
        </li>
      </ul>
    </nav>
  );
}
