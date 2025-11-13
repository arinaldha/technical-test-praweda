import { EntityResponse, JobTitleResponse, LegalDocumentResponse, PermitResponse } from '@/models/business/responses/response';

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface BussinessState {
    listEntry: EntityResponse[] | null;
    entry: EntityResponse | null;
    listPermit: PermitResponse[] | null;
    permit: PermitResponse | null
    documents: LegalDocumentResponse[] | null
    document: LegalDocumentResponse | null
    listJob: JobTitleResponse[] | null
    job: JobTitleResponse | null

}

const initialState: BussinessState = {
    listEntry: [],
    entry: null,
    listPermit: [],
    permit: null,
    documents: [],
    document: null,
    listJob: [],
    job: null

}

const bussiness = createSlice({
    name: "bussiness",
    initialState,
    reducers: {
        setBussinessList(state: any, action: PayloadAction<any>) {
            state.listEntry = action.payload
        },
        setBussinessDetail(state: any, action: PayloadAction<any>) {
            state.entry = action.payload.data
        },
        setPermitList(state: any, action: PayloadAction<any>) {
            state.listPermit = action.payload
        },
        setPermitDetail(state: any, action: PayloadAction<any>) {
            state.permit = action.payload.data
        },
        setLegalDocumentList(state: any, action: PayloadAction<any>) {
            state.documents = action.payload
        },
        SetLegalDocDetail(state: any, action: PayloadAction<any>) {
            state.document = action.payload.data
        },
        SetJobTitleList(state: any, action: PayloadAction<any>) {
            state.listJob = action.payload
        },
        setJobTitleDetail(state: any, action: PayloadAction<any>) {
            state.job = action.payload.data
        }
    },
})

export default bussiness.reducer;
export const {
    setBussinessList,
    setBussinessDetail,
    setPermitList,
    setPermitDetail,
    setLegalDocumentList,
    SetLegalDocDetail,
    SetJobTitleList,
    setJobTitleDetail,
} = bussiness.actions;