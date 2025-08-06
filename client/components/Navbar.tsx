"use client";

import Link from "next/link";
import { HiMenu, HiX, HiUser } from "react-icons/hi";
import { HiUserCircle } from "react-icons/hi2";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [user, setUser] = useState(null);
  const [click, setClick] = useState(false);
  // Fungsi untuk update user
  const updateUser = () => {
    const storedUser = localStorage.getItem("user");
    setUser(storedUser ? JSON.parse(storedUser) : null);
  };

  function isClicked() {
    if (!click) setClick(true);
    if (click) setClick(false);
  }

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
    <nav className="fixed top-0 flex w-full max-w-dvw items-center justify-between bg-gray-200 px-4 py-1 md:px-[65px]">
      <div>
        <Link href="/">
          <h1 className="mb-[-10px] text-xl font-semibold text-green-600 md:text-3xl">
            Tokoku
          </h1>
          <small className="text-green-600">Temukan Apapun!</small>
        </Link>
      </div>

      {/* <div onClick={isClicked} className="sm:hidden">
        {click ? <HiMenu /> : <HiX />}
      </div> */}

      <ul className="flex items-center gap-4 text-xs sm:text-base">
        <li className="text-slate-700 duration-300 hover:text-green-600">
          <Link href="/products">Products</Link>
        </li>
        <li className="text-slate-700 duration-300 hover:text-green-600">
          <Link href="/cart">Keranjang</Link>
        </li>
        <li className="text-slate-700 duration-300 hover:text-green-600">
          <Link href={user ? "profile" : "login"} className="flex items-center">
            <HiUserCircle className="size-6" />

            {user && <span>{user.name}</span>}
          </Link>
        </li>
      </ul>
    </nav>
  );
}
