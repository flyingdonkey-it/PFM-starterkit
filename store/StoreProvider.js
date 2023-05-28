import React from 'react';
import { Provider } from 'react-redux';
import { createWrapper } from 'next-redux-wrapper';
import { persistStore, persistReducer, REGISTER, REHYDRATE, PERSIST, FLUSH, PAUSE } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { PersistGate } from 'redux-persist/integration/react';
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducers';

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

let store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== 'production', // to make sure that redux's dev tool is only available when in dev environment.
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [REGISTER, REHYDRATE, PERSIST, FLUSH, PAUSE], // to remove errors related to using redux-persist with configureStore regarding serialization.
      },
    }),
});

let persistor = persistStore(store);

export default function StoreProvider({ children }) {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>{children}</PersistGate>
    </Provider>
  );
}

const makeStore = () => store;

export const wrapper = createWrapper(makeStore);
