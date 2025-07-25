"use client";

import { CartItemType } from "@app/types";

const formatter = Intl.NumberFormat("id-ID");

export default function CartItem({
  item,
  handleRemove,
}: {
  item: CartItemType;
  handleRemove: (id: string) => void;
}) {
  return (
    <div className="flex items-center justify-between rounded border p-4 shadow-sm">
      <div>
        <h2 className="text-lg font-semibold">{item.name}</h2>
        <p className="text-sm text-gray-600">Qty: {item.qty}</p>
        <p className="font-semibold text-green-600">
          Rp{formatter.format(item.price)} x {item.qty}
        </p>
      </div>

      <button
        onClick={() => handleRemove(item._id)}
        className="rounded bg-red-500 px-4 py-1 text-white hover:bg-red-600"
      >
        Hapus
      </button>
    </div>
  );
}
