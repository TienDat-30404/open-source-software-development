import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Sử dụng localStorage
import authReducer from './authSlice'; // Đổi tên thành authReducer để rõ ràng

// Cấu hình Redux Persist
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth'], // Chỉ lưu trữ reducer auth
};

// Kết hợp các reducer (dù hiện tại chỉ có auth)
const rootReducer = combineReducers({
  auth: authReducer,
});

// Áp dụng persistReducer cho rootReducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Tạo Redux store
const store = configureStore({
  reducer: persistedReducer, // Sử dụng persistedReducer trực tiếp
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Bỏ qua các action của redux-persist để tránh lỗi non-serializable
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE', 'persist/PURGE'],
      },
    }),
});

// Khởi tạo persistor
const persistor = persistStore(store);

export { store, persistor };