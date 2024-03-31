import { combineReducers, configureStore } from '@reduxjs/toolkit'
import userReducer from './userSlice' // Assuming you have a user slice reducer
import productReducer from './productSlice';


const rootReducer = combineReducers({
  user: userReducer,
  product: productReducer,
  // Other reducers...
})

export type RootState = ReturnType<typeof rootReducer>

const store = configureStore({
  reducer: rootReducer,
})

export default store
