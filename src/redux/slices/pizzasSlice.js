import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  items: [],
  status: 'loading', // 'loading' | 'success' | 'error'
};

export const fetchPizzas = createAsyncThunk(
  'pizza/fetchPizzaStatus',
  async ({ currentPage, categoryId, sortProperty }) => {
    const { data } = await axios.get(
      `https://69bd240a2bc2a25b22ad7544.mockapi.io/items?page=${currentPage}&limit=4&${categoryId ? `category=${categoryId}` : ''}&sortBy=${sortProperty}&order=desc`,
    );
    return data;
  },
);

const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload;
    },
  },
  //  Используем builder callback
  extraReducers: (builder) => {
    builder
      .addCase(fetchPizzas.pending, (state) => {
        state.status = 'loading';
        state.items = [];
      })
      .addCase(fetchPizzas.fulfilled, (state, action) => {
        state.items = action.payload;
        state.status = 'success';
      })
      .addCase(fetchPizzas.rejected, (state) => {
        state.status = 'error';
        state.items = [];
      });
  },
});

export const selectPizzas = (state) => state.pizzas;
export const selectPizzaById = (id) => (state) => state.cart.items.find((obj) => obj.id === id);

export const { setItems } = pizzaSlice.actions;
export default pizzaSlice.reducer;
