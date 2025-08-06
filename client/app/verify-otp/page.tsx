"use client";

import Button from "@components/Button";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function verifyOtpPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const emailFromQuerry = searchParams.get("email") || "";

  const [otp, setOtp] = useState("");
  const [email, setEmail] = useState(emailFromQuerry);
  const [isResending, setIsResending] = useState(false);

  useEffect(() => {
    if (!emailFromQuerry) {
      router.push("/register");
    }
  }, [emailFromQuerry, router]);

  const handleVerify = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/verify-otp",
        {
          email,
          otpCode: otp,
        },
      );

      alert(res.data.message);
      router.push("/login");
    } catch (err) {
      alert(
        err?.response?.data?.message || "Terjadi kesalahan saat verifikasi OTP",
      );
      console.error(
        err?.response?.data?.message || "Terjadi kesalahan saat verifikasi OTP",
      );
    }
  };

  const handleResendOtp = async () => {
    try {
      setIsResending(true);
      const res = await axios.post(
        "http://localhost:5000/api/auth/resend-otp",
        { email },
      );
      alert(res.data.message);
      console.log("aldi");
    } catch (err: any) {
      if (
        err?.response?.data?.message === "getaddrinfo ENOTFOUND smtp.gmail.com"
      ) {
        return alert("Email tidak valid");
      }
      alert(
        err?.response?.data?.message ||
          "Terjadi kesalahan saat mengirim ulang OTP",
      );
      console.error(
        err?.response?.data?.message ||
          "Terjadi kesalahan saat mengirim ulang OTP",
      );
      console.log(err);
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="pt-20">
      <form
        onSubmit={handleVerify}
        className="mx-auto mb-4 flex w-full flex-col items-center gap-4 rounded-lg border border-slate-200 p-8 pb-4 text-center shadow-md sm:max-w-[300px] md:max-w-[400px]"
      >
        <h1 className="mb-6 text-3xl font-bold text-slate-700">
          Verifikasi OTP
        </h1>
        <p>
          Kami telah mengirimkan kode OTP ke alamat email <b>{email}</b>
        </p>
        <input
          type="text"
          name="otp"
          placeholder="Masukan Kode OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          className="h-8 w-full rounded-lg border-2 border-slate-300 px-2"
        />
        <Button bg="bg-green-600 hover:bg-green-700 duration-300">
          Verifikasi
        </Button>
      </form>
      <button type="button" onClick={handleResendOtp} disabled={isResending}>
        {isResending ? "Mengirim ulang.." : "Kirim ulang OTP"}
      </button>
    </div>
  );
}
