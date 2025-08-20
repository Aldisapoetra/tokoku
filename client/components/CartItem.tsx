"use client";

import { HiMinus, HiPlus } from "react-icons/hi";

// import { CartItemType } from "@app/types";

const formatter = Intl.NumberFormat("id-ID");

export default function CartItem({ item, handleRemove }) {
  // console.log(item.name);
  return (
    <div className="flex items-center justify-between rounded border p-4 shadow-sm">
      <div>
        <h2 className="text-lg font-semibold text-slate-700">{item.name}</h2>
        <p className="font-semibold text-green-600">
          Rp{formatter.format(item.price)}
        </p>
        <div className="text-sm text-gray-700">
          <div className="flex w-fit gap-4 rounded-2xl border border-gray-300 px-2 py-1">
            <span className="text-xl">
              <HiMinus />
            </span>
            <span className="">{item.quantity}</span>
            <span className="text-xl">
              <HiPlus />
            </span>
          </div>
        </div>
      </div>

      <button
        onClick={() => handleRemove(item.id)}
        className="rounded bg-red-500 px-4 py-1 text-white hover:bg-red-600"
      >
        Hapus
      </button>
    </div>
  );
}
