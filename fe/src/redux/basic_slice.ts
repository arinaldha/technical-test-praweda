import { MetaResponse, UploadFileResponse } from '@/models/response/basic_response';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface BasicState {
    isBtnLoading: boolean;
    isContentLoading: boolean;
    errorMessage: string;
    successMessage: string;
    pagePagination?: MetaResponse | null
    countData: number;
    imageUrl: Nullable<UploadFileResponse>
}

const initialState: BasicState = {
    isBtnLoading: false,
    isContentLoading: false,
    errorMessage: "",
    successMessage: "",
    pagePagination: null,
    countData: 0,
    imageUrl: null

};

const basicSlice = createSlice({
    name: "basic",
    initialState,
    reducers: {
        setBtnLoading: (state, action: PayloadAction<boolean>) => {
            state.isBtnLoading = action.payload;
        },
        setContentLoading: (state, action: PayloadAction<boolean>) => {
            state.isContentLoading = action.payload;
        },
        setErrorMessage: (state, action: PayloadAction<string>) => {
            state.errorMessage = action.payload;
        },
        setSuccessMessage: (state, action: PayloadAction<string>) => {
            state.successMessage = action.payload;
        },
        setPagePagination: (state, action: PayloadAction<MetaResponse>) => {
            state.pagePagination = action.payload;
        },
        setCountData: (state, action: PayloadAction<number>) => {
            state.countData = action.payload;
        },
        setImageUrl: (state, action: PayloadAction<UploadFileResponse>) => {
            state.imageUrl = action.payload
        }

    },
});

export default basicSlice.reducer;
export const {
    setBtnLoading,
    setContentLoading,
    setErrorMessage,
    setSuccessMessage,
    setPagePagination,
    setCountData,
    setImageUrl
} = basicSlice.actions;