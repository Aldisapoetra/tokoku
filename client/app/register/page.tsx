"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import Button from "@components/Button";
import axios from "axios";

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleRegister = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      alert("Password anda tidak konsisten");
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/auth/register", {
        name: form.name,
        email: form.email,
        password: form.password,
        role: form.email === "aldi3191@gmail.com" ? "admin" : "user",
      });

      alert("Registrasi berhasil, silakan login!");
      router.push("/login");
    } catch (err) {
      alert(err.response?.data?.message);
      console.error(err.response?.data?.message || "Registrasi gagal");
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="pt-20">
      <form
        onSubmit={handleRegister}
        className="mx-auto mb-4 flex w-full flex-col items-center gap-4 rounded-lg border border-slate-200 p-8 pb-4 text-center shadow-md sm:max-w-[300px] md:max-w-[400px]"
      >
        <h1 className="mb-6 text-3xl font-bold text-slate-700">Buat Akun</h1>
        <input
          type="text"
          name="name"
          autoComplete="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Nama Lengkap"
          className="h-8 w-full rounded-lg border-2 border-slate-300 px-2"
        />
        <input
          type="email"
          name="email"
          autoComplete="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Alamat Email"
          className="h-8 w-full rounded-lg border-2 border-slate-300 px-2"
        />
        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Password"
          className="h-8 w-full rounded-lg border-2 border-slate-300 px-2"
        />
        <input
          type="password"
          name="confirmPassword"
          value={form.confirmPassword}
          onChange={handleChange}
          placeholder="Konfirmasi Password"
          className="h-8 w-full rounded-lg border-2 border-slate-300 px-2"
        />
        <Button bg="bg-green-600 hover:bg-green-700">Register</Button>
        <p>
          Sudah punya akun? Silakan{" "}
          <Link href="/login" className="text-blue-600">
            login
          </Link>
        </p>
      </form>
    </div>
  );
}
