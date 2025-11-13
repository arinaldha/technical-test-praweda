import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type UniSlice = {
    list: Record<string, unknown>[];
    detail: Nullable<Record<string, unknown>> | Nullable<Record<string, unknown>[]>;
    optionList: Record<string, any>[];
}

const initialState: UniSlice = {
    list: [],
    detail: null,
    optionList: []

}

const unionSlice = createSlice({
    name: "union",
    initialState,
    reducers: {
        setList(state, action: PayloadAction<Record<string, unknown>[]>) {
            state.list = action.payload
        },
        setDetail(state, action: PayloadAction<Record<string, any> | Record<string, any>[]>) {
            state.detail = action.payload
        },
        setOptionList(state, action: PayloadAction<Record<string, unknown>[]>) {
            state.optionList = action.payload
        }
    },
})

export default unionSlice.reducer;
export const {
    setList, setDetail, setOptionList

} = unionSlice.actions;