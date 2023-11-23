import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // uses localStorage by default
import authReducer from './reducers';

const rootReducer = combineReducers({
  auth: authReducer,
});

const persistConfig = {
  key: 'root', // Key for localStorage
  storage, // Define the storage type (localStorage)
  // You can also specify which reducers to persist using "whitelist" or "blacklist"
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE', 'persist/PURGE'],
    },
  }),
});

export const persistor = persistStore(store);

export default store;
