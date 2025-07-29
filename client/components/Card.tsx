import { formatter } from "@utils/formatter";
import Link from "next/link";

interface CardProps {
  id?: string;
  name: string;
  description: string;
  price: number;
}

export default function Card(props: CardProps) {
  return (
    <div
      className="my-4 flex h-[354px] w-[188px] flex-col justify-between overflow-hidden rounded-2xl shadow-sm"
      key={props.id}
    >
      <Link href={`/products/${props.id}`}>
        <div className="product-image h-[200px] w-full bg-linear-to-r from-white to-gray-100"></div>
        <div className="flex h-[150px] w-full flex-col items-center justify-evenly py-4">
          <div className="product-title h-max w-[150px] font-semibold">
            {props.name}
          </div>
          <div className="product-description h-max w-[150px] leading-4">
            {props.description}
          </div>
          <div className="product-price h-max w-[150px] text-xl font-semibold text-green-600">
            {`Rp${formatter.format(props.price)}`}
          </div>
        </div>
      </Link>
    </div>
  );
}
