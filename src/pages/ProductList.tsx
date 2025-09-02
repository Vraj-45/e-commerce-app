import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "../api/products";
import ProductCard from "../components/ProductCard";
import Loader from "../components/Loader";
import Filters from "../components/Filters";
import Pagination from "../components/Pagination";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../app/store";
import { setFilters } from "../features/products/productSlice";
import type { ProductsResponse, Product } from "../features/products/types";

export default function ProductList() {
  const dispatch = useDispatch();
  const { filters } = useSelector((state: RootState) => state.products);
  const [page, setPage] = useState(1);
  const limit = 12;
  const skip = (page - 1) * limit;

  const { data, isLoading, isError, isFetching } = useQuery<ProductsResponse>({
    queryKey: ["products", { skip, limit, q: filters.search, category: filters.category }],
    queryFn: () => fetchProducts({ limit, skip, q: filters.search, category: filters.category }),
    staleTime: 1000 * 60 * 2,
    refetchOnWindowFocus: false,
  });

  if (isLoading) return <Loader />;
  if (isError) return <div>Something went wrong.</div>;

  const total = data?.total ?? 0;

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <Filters
          value={filters.search}
          onSearch={(val) => dispatch(setFilters({ search: val }))}
          onCategory={(cat) => dispatch(setFilters({ category: cat }))}
        />
        {isFetching && <div className="text-sm">Updating…</div>}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {data?.products.map((p: Product) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>

      <Pagination
        current={page}
        total={total}
        pageSize={limit}
        onPageChange={(p) => setPage(p)}
      />
    </div>
  );
}
