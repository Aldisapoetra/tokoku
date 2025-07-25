"use client";

import Button from "@components/Button";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const router = useRouter();

  const handleLogin = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        form,
      );
      const { token, user } = res.data;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      // Membuat custom event bernama userChange
      window.dispatchEvent(new Event("userChange"));

      alert(`Selamat Datang ${user.name}`);
      console.log(token);
      router.push("/");
    } catch (err) {
      alert(err.response?.data?.message || "Gagal Login");
      console.error(err.response?.data?.message);
    }
  };

  const handleChange = (e: { target: any }) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="pt-20">
      <form
        onSubmit={handleLogin}
        className="mx-auto mb-4 flex w-full flex-col items-center gap-4 rounded-lg border border-slate-200 p-8 pb-4 text-center shadow-md sm:max-w-[300px] md:max-w-[400px]"
      >
        <h1 className="mb-6 text-3xl font-bold text-slate-700">Login</h1>
        <input
          type="email"
          value={form.email}
          onChange={handleChange}
          name="email"
          autoComplete="email"
          placeholder="Email"
          className="h-8 w-full rounded-lg border-2 border-slate-300 px-2"
        />

        <input
          type="password"
          value={form.password}
          onChange={handleChange}
          name="password"
          autoComplete="current-password"
          placeholder="Password"
          className="h-8 w-full rounded-lg border-2 border-slate-300 px-2"
        />
        <Button bg="bg-green-600 hover:bg-green-700">Login</Button>
        <p>
          Belum punya akun? Silakan{" "}
          <Link href="/register" className="text-blue-700">
            daftar
          </Link>
        </p>
      </form>
    </div>
  );
}
