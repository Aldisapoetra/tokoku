"use client";

import Button from "@components/Button";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      router.push("/login");
    }

    setUser(JSON.parse(storedUser));
  }, [router]);

  const handleLogout = () => {
    const confirmLogout = confirm("Apakah anda yakin ingin logout?");
    if (!confirmLogout) {
      return;
    }
    localStorage.removeItem("user");
    localStorage.removeItem("token");

    // Membuat custom event bernama userChange
    window.dispatchEvent(new Event("userChange"));
    setUser(null);
    router.push("/login");
  };

  const handleDeleteAccount = async (id: string) => {
    if (!confirm("Anda yakin ingin menghapus akun?")) return;

    try {
      const res = await axios.delete(`http://localhost:5000/api/auth/${id}`);
      alert(res.data.message);
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.dispatchEvent(new Event("userChange"));
      router.push("/");
      console.log(res);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDashboard = () => {
    router.push("/admin");
  };

  if (!user) return <p>Memuat...</p>;

  return (
    <div className="w-full">
      <h1 className="mb-4 text-2xl font-bold text-slate-700">
        Profile Pengguna
      </h1>
      <div className="p-4">
        <div className="max-w-md space-y-2 rounded-lg border border-gray-100 p-4 shadow-md">
          <p>
            <strong>Name:</strong> {user.name}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <p>
            <strong>Peran:</strong> {user.role}
          </p>

          <div className="buttons mt-4 flex max-w-fit gap-4">
            <Button
              bg={`${user.role !== "admin" ? "hidden" : ""} bg-green-600 hover:bg-green-700`}
              onClick={handleDashboard}
            >
              Dashboard
            </Button>

            <Button
              onClick={handleLogout}
              bg="rounded bg-red-500 hover:bg-red-700"
            >
              LogOut
            </Button>
            <Button
              onClick={() => handleDeleteAccount(user.id)}
              bg="bg-red-800 hover:bg-red-900"
            >
              Hapus Akun
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
