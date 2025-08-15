"use client";

import Button from "@components/Button";

import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function UpdateForm() {
  const { id } = useParams();
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    description: "",
    image: "",
    price: "",
    quantity: "",
  });

  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:5000/api/products/${id}`).then((res) => {
        setForm({
          name: res.data.name,
          description: res.data.description,
          image: res.data.image,
          price: res.data.price,
          quantity: res.data.quantity,
        });
      });
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      await axios.patch(
        `http://localhost:5000/api/products/${id}`,
        {
          ...form,
          price: parseInt(form.price),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      alert("Berhasil meng-update produk");
      router.push("/admin");
    } catch (err) {
      alert(err.response?.data?.message);
      console.error(err.response?.data?.message);
    }
  };

  return (
    <div className="max-w-4xl">
      <h1 className="mb-4 text-2xl font-bold text-slate-700">
        Dashboard Produk
      </h1>

      {/* form edit produk */}
      <form
        onSubmit={handleUpdate}
        className="mb-8 space-y-4 rounded-lg border border-slate-500 p-4"
      >
        <h2 className="text-lg font-semibold text-slate-700">Edit Produk</h2>
        <input
          type="text"
          name="name"
          placeholder="Nama Produk"
          value={form.name}
          onChange={handleChange}
          className="h-8 w-full rounded-lg border border-slate-400 px-2"
        />
        <textarea
          name="description"
          placeholder="Deskripsi Produk"
          value={form.description}
          onChange={handleChange}
          rows={3}
          className="w-full rounded-lg border border-slate-400 px-2"
        />
        <input
          type="text"
          name="image"
          placeholder="Gambar Produk"
          value={form.image}
          onChange={handleChange}
          className="h-8 w-full rounded-lg border border-slate-400 px-2"
        />
        <input
          type="text"
          name="price"
          placeholder="Harga Produk"
          value={form.price}
          onChange={handleChange}
          className="h-8 w-full rounded-lg border border-slate-400 px-2"
        />
        <input
          type="number"
          name="quantity"
          placeholder="Quantitas"
          value={form.quantity}
          onChange={handleChange}
          className="h-8 w-full rounded-lg border border-slate-400 px-2"
        />
        <Button bg="bg-green-600 hover:bg-green-700">Tambahkan Produk</Button>
      </form>
    </div>
  );
}
