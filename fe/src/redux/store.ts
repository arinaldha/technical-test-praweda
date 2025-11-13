'use client'

import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { setupListeners } from "@reduxjs/toolkit/query";
import authSlice from "@/modules/auth/slices/auth_slice";
import basicSlice from "@/redux/basic_slice";
import companySlice from '@/modules/master/slices/company_slice';
import locationSlice from '@/modules/master/slices/location_slice';
import utilitySlice from '@/modules/utilities/slices/utility_slice';
import generalSlice from '@/modules/general/slices/general_slice';
import businessSlice from '@/modules/business/slices/bussiness_slice';
import customerSlice from '@/modules/customer/slices/customer_slice'
import vendorSlice from '@/modules/vendor/slices/vendor_slice'
import bankSlice from '@/modules/finance/slices/bank'
import currencySlice from '@/modules/finance/slices/currency'
import storage from 'redux-persist/lib/storage';
import taxSlice from '@/modules/master/slices/tax_slice'
import chargeSlice from '@/modules/master/slices/charge_slice'
import {
    persistReducer, persistStore, FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist';
import storageSession from 'redux-persist/lib/storage/session';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import utilsSlice from '@/modules/utils/slices/utils_slice';
import branch_slice from '@/modules/master/slices/branch_slice';
import periodSlice from '@/modules/master/slices/period_maintenance_slice';
import unionSlice from '@/modules/union/slices/uni_slices'


const persistConfig = {
    key: 'root',
    storage: storage,
    whitelist: [
        "authSlice",
        "utilsSlice",
    ]
};

const rootReducer = combineReducers({
    branch_slice,
    basicSlice,
    authSlice,
    companySlice,
    locationSlice,
    utilitySlice,
    generalSlice,
    utilsSlice,
    businessSlice,
    customerSlice,
    vendorSlice,
    bankSlice,
    currencySlice,
    taxSlice,
    chargeSlice,
    periodSlice,
    unionSlice
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

setupListeners(store.dispatch);

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
