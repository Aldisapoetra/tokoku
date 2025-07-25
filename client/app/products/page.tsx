import axios from "axios";
import Card from "../../components/Card";

export default async function ProductsPage() {
  let products = [];
  try {
    const res = await axios.get("http://localhost:5000/api/products");
    products = res.data;
  } catch (err) {
    console.error("Gagal fetch produk:", err.message);
  }

  if (!products) return <p>Memuat</p>;

  return (
    <div className="w-full">
      <h1 className="text-2xl font-bold text-slate-700">Daftar Produk</h1>
      <div className="flex w-full flex-wrap justify-center gap-4">
        {products.length !== 0
          ? products.map((product) => (
              <Card
                id={product._id}
                name={product.name}
                description={product.description}
                key={product._id}
                price={product.price}
              />
            ))
          : "Belum ada produk"}
      </div>
    </div>
  );
}
