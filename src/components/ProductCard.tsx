import type{ Product } from "../features/products/types";
import { Link } from "react-router-dom";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <div className="bg-white p-4 rounded shadow">
      <Link to={`/product/${product.id}`}>
        <img src={product.thumbnail || product.images?.[0]} alt={product.title} className="h-40 w-full object-cover mb-3 rounded" />
        <h3 className="font-semibold">{product.title}</h3>
        <p className="text-sm text-gray-600 line-clamp-2">{product.description}</p>
        <div className="mt-2 flex justify-between items-center">
          <div className="text-lg font-bold">₹{product.price}</div>
          <div className="text-sm text-gray-500">{Math.round((product.rating ?? 0) * 10) / 10}★</div>
        </div>
      </Link>
    </div>
  );
}
