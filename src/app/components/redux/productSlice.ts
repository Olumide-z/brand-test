import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SingleProduct } from '@/types';

interface ProductState {
  productName: string;
  category: string;
  description: string;
  discount: any[];
  priceNGN: string[];
  priceUSD: string[];
  priceGBP: string[];
  size: string[];
  color: string[];
  quantity: string[];
  deliveryNGN: string[];
  deliveryUSD: string[];
  deliveryGBP: string[];
  productDetails: SingleProduct | null;
}

const initialState: ProductState = {
  productName: '',
  category: '',
  description: '',
  discount: [],
  priceNGN: [],
  priceUSD: [],
  priceGBP: [],
  size: [],
  color: [],
  quantity: [],
  deliveryNGN: [],
  deliveryUSD: [],
  deliveryGBP: [],
  productDetails: null
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setProductName: (state, action: PayloadAction<string>) => {
      state.productName = action.payload;
    },
    setCategory: (state, action: PayloadAction<string>) => {
      state.category = action.payload;
    },
    setDescription: (state, action: PayloadAction<string>) => {
      state.description = action.payload;
    },
    setDiscount: (state, action: PayloadAction<{value: string; index: number}>) => {
        const {value, index} = action.payload;
        state.discount[index] = value;
    },
    setPriceNGN: (state, action: PayloadAction<{value: string; index: number}>) => {
      const {value, index} = action.payload;
      state.priceNGN[index] = value
    },
    setPriceUSD: (state, action: PayloadAction<{value: string; index: number}>) => {
        const {value, index} = action.payload;
        state.priceUSD[index] = value
    },
    setPriceGBP: (state, action: PayloadAction<{value: string; index: number}>) => {
        const {value, index} = action.payload;
      state.priceGBP[index] = value;
    },
    setSize: (state, action: PayloadAction<{value: string; index: number}>) => {
        // console.log(action.payload)
        const {value, index} = action.payload;
        state.size[index] = value;
    },
    setColor: (state, action: PayloadAction<{value: string; index: number}>) => {
        const {value, index} = action.payload;
      state.color[index] = value;
    },
    setQuantity: (state, action: PayloadAction<{value: string; index: number}>) => {
        const {value, index} = action.payload;
      state.quantity[index] = value;
    },
    setDeliveryNGN: (state, action: PayloadAction<{value: string; index: number}>) => {
        const {value, index} = action.payload;
        state.deliveryNGN[index] = value;
    },
    setDeliveryUSD: (state, action: PayloadAction<{value: string; index: number}>) => {
        const {value, index} = action.payload;
        state.deliveryUSD[index] = value;
    },
    setDeliveryGBP: (state, action: PayloadAction<{value: string; index: number}>) => {
        const {value, index} = action.payload;
        state.deliveryGBP[index] = value
    },
    setProductDetails: (state, action: PayloadAction<SingleProduct>) => {
      state.productDetails = action.payload;
    },
  }
});

export const {
  setProductName,
  setCategory,
  setDescription,
  setDiscount,
  setPriceNGN,
  setPriceUSD,
  setPriceGBP,
  setSize,
  setColor,
  setQuantity,
  setDeliveryNGN,
  setDeliveryUSD,
  setDeliveryGBP,
  setProductDetails
} = productSlice.actions;

export default productSlice.reducer;
