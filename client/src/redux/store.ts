import { configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import { combineReducers } from 'redux'
import {
	FLUSH,
	PAUSE,
	PERSIST,
	persistReducer,
	persistStore,
	PURGE,
	REGISTER,
	REHYDRATE,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { BoardReducer } from './board/board.slice'
import { CardReducer } from './card/active-card.slice'
import { UserReducer } from './user/user.slice'

const rootPersistConfig = {
	key: 'root',
	storage: storage,
	version: 1,
	whitelist: ['userReducer'],
}

const reducers = combineReducers({
	boardReducer: BoardReducer,
	userReducer: UserReducer,
	cardReducer: CardReducer,
})

const persistedReducer = persistReducer(rootPersistConfig, reducers)

export const store = configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
			},
		}),
})

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch: () => AppDispatch = useDispatch

export type AppStore = typeof store
