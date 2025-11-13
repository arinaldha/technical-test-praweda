import { BranchApprovalResponse } from "@/models/response/master/branch_response";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { AnyObject } from "antd/es/_util/type";

type InitialStateProps = {
    period: Nullable<AnyObject>
    listPeriod: AnyObject[]
    listPeriodDetail: AnyObject[]
    periodDetail: Nullable<AnyObject>
}

const initialState: InitialStateProps = {
    period: null,
    listPeriod: [],
    listPeriodDetail: [],
    periodDetail: null
}

const periodSlice = createSlice({
    name: 'period',
    initialState,
    reducers: {
        setPeriodList(state: {
            listPeriod: AnyObject[]
        }, action: PayloadAction<AnyObject[]>) {
            state.listPeriod = action.payload
        },
        setPeriodDetail(state: {
            period: Nullable<AnyObject>,
        },
            action: PayloadAction<AnyObject>) {
            state.period = action.payload
        },
        setPeriodDetailList(state: {
            listPeriodDetail: AnyObject[]
        }, action: PayloadAction<AnyObject[]>) {
            state.listPeriodDetail = action.payload
        },
        setPeriodDetailId(state: {
            periodDetail: Nullable<AnyObject>,
        },
            action: PayloadAction<AnyObject>) {
            state.periodDetail = action.payload
        }
    }
})

export const {
    setPeriodList,
    setPeriodDetail,
    setPeriodDetailList,
    setPeriodDetailId,
} = periodSlice.actions

export default periodSlice.reducer