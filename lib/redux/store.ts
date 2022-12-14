import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from '@reduxjs/toolkit';
import clockReducer from './reducers/clockReducer';
import appConfigReducer from './reducers/appConfigReducer';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
const config = {
  key: 'root',
  storage: AsyncStorage,
  debug: true, //to get useful logging
};

const reducers = combineReducers({
  appConfig: appConfigReducer,
  clock: clockReducer,
  // other reducers goes here...
});

const persistedReducer = persistReducer(config, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  // for avoiding error, more details here: https://redux-toolkit.js.org/api/getDefaultMiddleware
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof reducers>;
