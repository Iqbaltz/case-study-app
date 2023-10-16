import {
  PayloadAction,
  createAsyncThunk,
  createReducer,
  createSlice,
} from "@reduxjs/toolkit";

interface CartItem {
  productId: number;
  quantity: number;
}

interface EntitiesState {
  carts: CartItem[];
  products: any[];
}

const initialState = {
  carts: [],
  products: [],
} as EntitiesState;

export const fetchAllProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const res = await fetch("https://fakestoreapi.com/products");
    const data = await res.json();

    return data;
  }
);

export const entities = createSlice({
  name: "entities",
  initialState,
  reducers: {
    addProduct: (state, action) => {
      state.products.push(action.payload);
    },
    removeProduct: (state, action) => {
      state.products = state.products.filter(
        (product) => product.id !== action.payload
      );
    },
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const existingItem = state.carts.find(
        (cartItem) => cartItem.productId === action.payload.productId
      );

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.carts.push(action.payload);
      }
    },
    removeFromCart: (state, action) => {
      state.carts = state.carts.filter(
        (cart) => cart.productId !== action.payload
      );
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchAllProducts.fulfilled, (state, action) => {
      state.products = action.payload;
    });
  },
});

export const { addProduct, removeProduct, addToCart, removeFromCart } =
  entities.actions;
export default entities.reducer;
