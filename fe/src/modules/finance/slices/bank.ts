import { EntityResponse, JobTitleResponse, LegalDocumentResponse, PermitResponse } from '@/models/business/responses/response';

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { BankResponse } from '../repositories/bank-repository';

interface BankState {
    listBank: BankResponse[] | null;
    bank: BankResponse | null;


}

const initialState: BankState = {
    listBank: [],
    bank: null,


}

const bank = createSlice({
    name: "bank",
    initialState,
    reducers: {
        setBankList(state: any, action: PayloadAction<any>) {
            state.listBank = action.payload
        },
        setBankDetail(state: any, action: PayloadAction<any>) {
            state.bank = action.payload.data
        },

    },
})

export default bank.reducer;
export const {
setBankList,
setBankDetail
} = bank.actions;