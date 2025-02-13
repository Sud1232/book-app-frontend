import { configureStore } from '@reduxjs/toolkit'
import cartSlice from "../redux/features/cart/cartSlice"
import booksApi from './features/books/booksApi'
import ordersApi from './features/orders/ordersApi'
export default configureStore({
  reducer: {
    cart: cartSlice,
    [booksApi.reducerPath]: booksApi.reducer,
    [ordersApi.reducerPath]: ordersApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(booksApi.middleware, ordersApi.middleware),

})