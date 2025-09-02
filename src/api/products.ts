import axios from "axios";
import type {Product} from "../features/products/types";

const API_BASE = "https://dummyjson.com";

const api = axios.create({
    baseURL: API_BASE,
    timeout: 10000,
});

export type GetProductsParams = {
    limit?: number;
    skip?: number;
    q?: string;      
    sort?: "asc" | "desc"; 
    category?: string;
};

export type ProductsResponse = {
    products: Product[];
    total: number;
    skip: number;
    limit: number;
};

export async function fetchProducts(params: GetProductsParams = {}): Promise<ProductsResponse> {
    if (params.q) {
        const resp = await api.get(`/products/search`, { params: { q: params.q, limit: params.limit, skip: params.skip } });
        return resp.data as ProductsResponse;
    }
    const url = params.category ? `/products/category/${params.category}` : `/products`;
    const resp = await api.get(url, { params: { limit: params.limit, skip: params.skip } });
    return resp.data as ProductsResponse;
}

export async function fetchProductById(id: number): Promise<Product> {
    const resp = await api.get(`/products/${id}`);
    return resp.data as Product;
}
