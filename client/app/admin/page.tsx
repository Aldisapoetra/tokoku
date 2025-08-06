"use client";

import Button from "@components/Button";
import axios from "axios";
import { useEffect, useState } from "react";
import { formatter } from "@utils/formatter";
import { formState } from "@app/types";
import { useRouter } from "next/navigation";

export default function AdminProductcPage() {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [user, setUser] = useState(null);
  const [form, setForm] = useState<formState>({
    name: "",
    description: "",
    image: "",
    price: "",
  });

  const router = useRouter();

  const token = localStorage.getItem("token");

  // Pemeriksaan login dan admin
  // useEffect(() => {
  //   const token = localStorage.getItem("token");
  //   const user = JSON.parse(localStorage.getItem("user"));

  //   if (!token) {
  //     return router.push("/login");
  //   }

  //   if (user.role !== "admin") {
  //     return router.push("/unauthorized");
  //   }
  // });

  // Fetch semua produk
  const fecthProducts = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:5000/api/products");
      setProducts(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fecthProducts();
  }, []);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    setUser(storedUser ? JSON.parse(storedUser) : {});
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAdd = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        "http://localhost:5000/api/products",
        { ...form, price: parseInt(form.price) },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      alert("Produk berhasil ditambahkan.");
      setForm({
        name: "",
        description: "",
        image: "",
        price: "",
      });
      fecthProducts();
      console.log(form);
    } catch (err) {
      alert(err.response?.data?.message || "Terjadi error di backend");
      console.error(err.response?.data?.message || "Gagal");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Yakin ingin menghapus produk ini?")) return;

    try {
      const res = await axios.delete(
        `http://localhost:5000/api/products/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      fecthProducts();
      alert(res.data.message);
      console.log(res.data.message);
    } catch (err) {
      alert(err.response?.data?.message || "Gagal menghapus produk");
      console.error(err.response?.data?.message || "Gagal menghapus produk");
    }
  };

  return (
    <div className="max-w-4xl">
      <h1 className="mb-4 text-2xl font-bold text-slate-700">
        Dashboard Produk
      </h1>

      {/* form tambah produk */}
      <form
        onSubmit={handleAdd}
        className="mb-8 space-y-4 rounded-lg border border-slate-500 p-4"
      >
        <h2 className="text-lg font-semibold text-slate-700">
          Tambah Produk Baru
        </h2>
        <input
          type="text"
          name="name"
          placeholder="Nama Produk"
          value={form.name}
          onChange={handleChange}
          autoComplete="off"
          className="h-8 w-full rounded-lg border border-slate-400 px-2"
        />
        <textarea
          name="description"
          placeholder="Deskripsi Produk"
          value={form.description}
          onChange={handleChange}
          autoComplete="off"
          rows={3}
          className="w-full rounded-lg border border-slate-400 px-2"
        />
        <input
          type="text"
          name="image"
          placeholder="Gambar Produk"
          value={form.image}
          onChange={handleChange}
          autoComplete="off"
          className="h-8 w-full rounded-lg border border-slate-400 px-2"
        />
        <input
          type="text"
          name="price"
          placeholder="Harga Produk"
          value={form.price}
          onChange={handleChange}
          autoComplete="off"
          className="h-8 w-full rounded-lg border border-slate-400 px-2"
        />
        <Button bg="bg-green-600 hover:bg-green-700">Tambahkan Produk</Button>
      </form>

      {/* {loading ? <p>memuat...</p> : <>sudah...</>} */}

      {loading ? (
        <div className="p-4">
          <p className="text-lg font-semibold text-slate-700">
            Belum ada produk
          </p>
        </div>
      ) : (
        <table className="border text-sm">
          <thead>
            <tr>
              <th className="border bg-slate-200 p-2">Nama</th>
              <th className="border bg-slate-200 p-2">Harga</th>
              <th className="border bg-slate-200 p-2">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td className="border-r border-b px-2">{product.name}</td>
                <td className="border-r border-b px-2">
                  Rp{formatter.format(product.price)}
                </td>
                <td className="border-r border-b px-2">
                  {" "}
                  <button
                    onClick={() => handleDelete(product._id)}
                    className="my-1 rounded-lg bg-red-500 px-2 py-1 text-sm text-white hover:cursor-pointer hover:bg-red-700"
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
