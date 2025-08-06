"use client";

import Button from "@components/Button";

export default function ConfirmDelete() {
  return (
    <div className="w-full border">
      <form className="mx-auto mt-20 flex w-full min-w-[300px] flex-col items-center gap-4 rounded-lg border border-slate-200 p-4 text-center shadow-md md:max-w-[500px] md:p-8 md:pb-4">
        <h3 className="font-semibold text-slate-700 md:text-xl">
          Masukan password anda untuk melanjutkan.
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
    </div>
  );
}
