import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Loader from "../components/Loader";

async function fetchProductById(id: number) {
  const res = await fetch(`https://dummyjson.com/products/${id}`);
  if (!res.ok) throw new Error("Failed to fetch product");
  return res.json();
}

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  rating: number;
  thumbnail: string;
  images: string[];
}

export default function ProductDetails() {
  const { id } = useParams<{ id: string }>();
  const productId = Number(id);

  const { data: product, isLoading, isError } = useQuery<Product>({
    queryKey: ["product", productId],
    queryFn: () => fetchProductById(productId),
    staleTime: 1000 * 60 * 5,
    enabled: !!productId,
  });

  if (isLoading) return <Loader />;
  if (isError) return <div>Product not found.</div>;
  if (!product) return <div>No product found.</div>;

  return (
    <div className="bg-white p-6 rounded shadow">
      <div className="flex flex-col md:flex-row gap-6">
        <img
          className="w-full md:w-1/3 h-72 object-cover rounded"
          src={product.thumbnail || product.images?.[0]}
          alt={product.title}
        />
        <div className="flex-1">
          <h2 className="text-2xl font-bold">{product.title}</h2>
          <p className="text-gray-600 mt-2">{product.description}</p>
          <div className="mt-4 flex items-center gap-4">
            <div className="text-3xl font-bold">₹{product.price}</div>
            <div className="text-sm text-gray-500">{product.rating} ★</div>
          </div>
          <div className="mt-6">
            <button className="px-4 py-2 bg-green-600 text-white rounded">
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
