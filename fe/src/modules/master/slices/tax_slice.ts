import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { AnyObject } from "antd/es/_util/type";

interface InitialStateProps {
    taxList: AnyObject[] | null
    taxDetail: AnyObject | null
}

const initialState: InitialStateProps = {
    taxList: null,
    taxDetail: null
}

const tax = createSlice({
    name: 'tax',
    initialState,
    reducers: {
        setTaxList(state, action: PayloadAction<any>) {
            state.taxList = action.payload;
        },
        setTaxDetail(state, action: PayloadAction<any>) {
            state.taxDetail = action.payload;
        },
    }
});

export default tax.reducer;
export const {
    setTaxList,
    setTaxDetail
} = tax.actions;
