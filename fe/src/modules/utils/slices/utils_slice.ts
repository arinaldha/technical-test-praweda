import { Menus } from '@/models/menu/menu';
import { ReadyOnlyFieldProps } from '@/models/utils/general';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface GeneralState {
    selectedMenu: {
        keySelected: string[],
        openPathKey: string[]
    },
    siderMenu: Menus[],
    readOnlyField: {
        moduleName: string,
        keyField: string,
        readOnly: boolean,
        placeholder: Nullable<string>
    }[]
}

const initialState: GeneralState = {
    selectedMenu: {
        keySelected: [],
        openPathKey: []
    },
    siderMenu: [],
    readOnlyField: []
}

const utils = createSlice({
    name: "utils",
    initialState,
    reducers: {
        setSiderMenu(state, action: PayloadAction<Menus[]>){
            state.siderMenu = action.payload
        },
        setSelectedMenu(state, action: PayloadAction<{
            keySelected: string[],
            openPathKey: string[]
        }>){
            state.selectedMenu = action.payload
        },
        resetUtils(state){
            state.selectedMenu = initialState.selectedMenu
        },
        setReadOnlyField(state, action: PayloadAction<ReadyOnlyFieldProps[]>){
            state.readOnlyField = action.payload
        }   
    },
})

export default utils.reducer;
export const {
    setSiderMenu,
    setSelectedMenu,
    resetUtils,
    setReadOnlyField
} = utils.actions;