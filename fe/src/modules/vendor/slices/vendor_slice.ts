import { EntityResponse, JobTitleResponse, LegalDocumentResponse, PermitResponse } from '@/models/business/responses/response';
import { CustomerResponse } from '@/models/customer/response/respose';
import { VendorResponse } from '@/models/vendor/response';

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AnyObject } from 'antd/es/_util/type';

interface VendorState {
    listVendor: VendorResponse[] | null;
    vendor: VendorResponse | null;
    listVendorProduct: [] | null
    vendorProduct: AnyObject | null
}

const initialState: VendorState = {
    listVendor: [],
    vendor: null,
    listVendorProduct: [],
    vendorProduct: null

}

const vendor = createSlice({
    name: "vendor",
    initialState,
    reducers: {
        setVendorList(state: any, action: PayloadAction<any>) {
            state.listVendor = action.payload
        },
        setVendorDetail(state: any, action: PayloadAction<any>) {
            state.vendor = action.payload.data
        },
        setVendorProductList(state, action: PayloadAction<any>) {
            state.listVendorProduct = action.payload
        },
        setVendorProductDetail(state, action: PayloadAction<any>) {
            state.vendorProduct = action.payload
        },


    },
})

export default vendor.reducer;
export const {
    setVendorList, setVendorDetail, setVendorProductList, setVendorProductDetail
} = vendor.actions;