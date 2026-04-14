import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../store';
import { CartItem } from './cartSlice';

enum Status {
  LOADING = 'loading',
  SUCCES = 'succes',
  ERROR = 'error',
}

type Pizza = {
  id: string;
  title: string;
  price: number;
  image: string;
  sizes: number[];
  types: number[];
  raiting: number;
};

type FetchPizzaArgs = {
  currentPage: number;
  categoryId: number;
  sortProperty: string;
};

interface PizzasSliceState {
  items: Pizza[];
  status: Status;
}

const initialState: PizzasSliceState = {
  items: [],
  status: Status.LOADING, // 'loading' | 'success' | 'error'
};

export const fetchPizzas = createAsyncThunk<Pizza[], FetchPizzaArgs>(
  'pizza/fetchPizzaStatus',
  async ({ currentPage, categoryId, sortProperty }) => {
    const { data } = await axios.get<Pizza[]>(
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
        state.status = Status.LOADING;
        state.items = [];
      })
      .addCase(fetchPizzas.fulfilled, (state, action) => {
        state.items = action.payload;
        state.status = Status.SUCCES;
      })
      .addCase(fetchPizzas.rejected, (state) => {
        state.status = Status.ERROR;
        state.items = [];
      });
  },
});

export const selectPizzas = (state: RootState) => state.pizzas;

export const { setItems } = pizzaSlice.actions;
export default pizzaSlice.reducer;
