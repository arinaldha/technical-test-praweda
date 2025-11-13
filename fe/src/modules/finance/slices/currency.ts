import { EntityResponse, JobTitleResponse, LegalDocumentResponse, PermitResponse } from '@/models/business/responses/response';

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CurrencyResponse } from '../repositories/currency-repository';
import { AnyObject } from 'antd/es/_util/type';

interface CurrencyState {
    listCurrency: CurrencyResponse[] | null;
    currency: CurrencyResponse | null;
    listExchangeRate
    : AnyObject[] | null;
    exchangeRate: AnyObject | null


}

const initialState: CurrencyState = {
    listCurrency: [],
    currency: null,
    listExchangeRate: [],
    exchangeRate: null


}

const currency = createSlice({
    name: "currency",
    initialState,
    reducers: {
        setCurrencyList(state: any, action: PayloadAction<any>) {
            state.listCurrency = action.payload
        },
        setCurrencyDetail(state: any, action: PayloadAction<any>) {
            state.currency = action.payload.data
        },
        setExchangeRateList(state: any, action: PayloadAction<any>) {
            state.listExchangeRate = action.payload
        },
        setExchangeRateDetail(state, action: PayloadAction<any>) {
            state.exchangeRate = action.payload.data
        }


    },
})

export default currency.reducer;
export const {
    setCurrencyList, setCurrencyDetail, setExchangeRateList, setExchangeRateDetail
} = currency.actions;