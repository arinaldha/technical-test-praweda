import { EntityResponse, JobTitleResponse, LegalDocumentResponse, PermitResponse } from '@/models/business/responses/response';
import { CustomerResponse } from '@/models/customer/response/respose';

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CustomerState {
    listCustomer: CustomerResponse[] | null;
    customer: CustomerResponse | null;


}

const initialState: CustomerState = {
    listCustomer: [],
    customer: null,


}

const customer = createSlice({
    name: "customer",
    initialState,
    reducers: {
        setCustomerList(state: any, action: PayloadAction<any>) {
            state.listCustomer = action.payload
        },
        setCustomerDetail(state: any, action: PayloadAction<any>) {
            state.customer = action.payload.data
        },

    },
})

export default customer.reducer;
export const {
    setCustomerDetail, setCustomerList
} = customer.actions;