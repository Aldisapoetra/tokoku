"use client";

import Button from "@components/Button";

export default function ConfirmDelete() {
  return (
    <form className="mx-auto mt-40 mb-4 flex w-full flex-col items-center gap-4 rounded-lg border border-slate-200 p-8 pb-4 text-center shadow-md sm:max-w-[300px] md:max-w-[400px]">
      <h3 className="text-xl font-semibold text-slate-700">
        Yakin Ingin Menghapus akun?
      </h3>
      {/* <label htmlFor="password">Masukan Password Anda</label> */}
      <input
        type="password"
        name="password"
        id="password"
        autoComplete="off"
        placeholder="Masukan Password"
        className="h-8 w-full rounded-lg border-2 border-slate-300 px-2"
      />
      <Button bg="bg-red-600 hover:bg-red-700">Lanjutkan</Button>
    </form>
  );
}
