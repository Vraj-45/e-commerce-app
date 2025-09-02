import { createSlice } from "@reduxjs/toolkit";       
import type{PayloadAction } from "@reduxjs/toolkit";
import type{ Product } from "./types";

type ProductState = {
  filters: {
    search: string;
    category?: string;
    sort?: "asc" | "desc";
  };
  selectedProduct: Product | null;
};
const initialState: ProductState = {
  filters: { search: "", category: undefined, sort: undefined },
  selectedProduct: null,
};
const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setFilters(state, action: PayloadAction<Partial<ProductState["filters"]>>) {
      state.filters = { ...state.filters, ...action.payload };
    },
    selectProduct(state, action: PayloadAction<Product | null>) {
      state.selectedProduct = action.payload;
    },
  },
});
export const { setFilters, selectProduct } = productSlice.actions;
export default productSlice.reducer;
