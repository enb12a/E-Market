import {
  combineReducers, applyMiddleware, legacy_createStore as createStore
} from 'redux';
import { thunk } from 'redux-thunk';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistStore, persistReducer } from 'redux-persist'
import { productsReducer } from './reducers/productsListReducer';
import sortReducer from './reducers/sortByProdsReducer';
import brandReducer from './reducers/filterByBrandReducer';
import cartReducer from './reducers/cartReducer';
import favReducer from './reducers/favotireReducer';
import FilterModelReducer from './reducers/filterByModelReducer';
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
   whitelist: ['cartReducer','favReducer'] // only navigation will be persisted
};
const rootReducer = combineReducers({ productsReducer, sortReducer, brandReducer,cartReducer,favReducer,FilterModelReducer });
const persistedReducer = persistReducer(persistConfig, rootReducer)
export default () => {
  let store = createStore(persistedReducer, applyMiddleware(thunk))
  let persistor = persistStore(store)
  return { store, persistor }
}
export type RootState = ReturnType<typeof rootReducer>;