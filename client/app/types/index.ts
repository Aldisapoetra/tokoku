// export interface CartItemType {
//   _id: string;
//   name: string;
//   price: number;
//   qty: number;
// }

export interface formType {
  name: string;
  address: string;
  phone: string;
}

export interface formState {
  name: string;
  description: string;
  image: string;
  price: string;
  quantity: string;
}

export interface typeProduct {
  _id: string;
  name: string;
  price: string;
}

export interface CardProps {
  id?: string;
  name: string;
  description: string;
  price: number;
}

export interface itemType {
  id: string;
  name: string;
  price: number;
  qty: number;
}
