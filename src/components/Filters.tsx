import { useEffect, useState } from "react";

export default function Filters({ value, onSearch, onCategory }: {
  value: string;
  onSearch: (s?: string) => void;
  onCategory: (c?: string) => void;
}) {
  const [q, setQ] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      if (q === "") {
        onSearch(undefined);
      } else {
        onSearch(q);
      }
    }, 1000);

    return () => {
      clearTimeout(handler);
    };
  }, [q, onSearch]);

  return (
    <form onSubmit={(e) => e.preventDefault()} className="flex gap-2 items-center">
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Search products..."
        className="border px-3 py-2 rounded w-64"
      />
      <button className="bg-blue-600 text-white px-3 py-2 rounded">Search</button>
      <select onChange={(e) => onCategory(e.target.value || undefined)} className="border px-2 py-1 rounded">
        <option value="">All</option>
        <option value="smartphones">Smartphones</option>
        <option value="laptops">Laptops</option>
        <option value="fragrances">Fragrances</option>
      </select>
    </form>
  );
}
