import { ModulePermissionResponse, ModuleResponse } from '@/models/response/general/module_response';
import { AutoNumberingResponse } from '@/models/response/general/numbering_response';
import { SetGroupResponse } from '@/models/response/general/permission_response';

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface GeneralState {
    autoNumberList: AutoNumberingResponse[] | null;
    autoNumber: AutoNumberingResponse | object;
    listModule: ModuleResponse[] | null;
    module: ModuleResponse | {}
    listAccess: SetGroupResponse[]
    groupAccess: object
    permission: ModulePermissionResponse | object
    moduleAccess: object
    sideBar: any
    groupModule: {}
}

const initialState: GeneralState = {
    autoNumberList: [],
    autoNumber: {},
    listModule: [],
    module: {},
    listAccess: [],
    groupAccess: {},
    permission: {},
    moduleAccess: {},
    sideBar: null,
    groupModule: {}
}

const general = createSlice({
    name: "general",
    initialState,
    reducers: {
        setAutoNumberList(state: any, action: PayloadAction<any>) {
            state.autoNumberList = action.payload
        },
        setAutoNumberDetail(state: any, action: PayloadAction<any>) {
            state.autoNumber = action.payload.data
        },
        setModuleList(state: any, action: PayloadAction<any>) {
            state.listModules = action.payload.data
        },
        setModuleDetail(state: any, action: PayloadAction<any>) {
            state.module = action.payload.data
        },
        setListGroupAccess(state: any, action: PayloadAction<any>) {
            state.listAccess = action.payload.data
        },
        SetGroupMenuAccess(state: any, action: PayloadAction<any>) {
            state.groupAccess = action.payload.data
        },
        SetGroupModuleAccess(state: any, action: PayloadAction<any>) {
            state.moduleAccess = action.payload.data
        },
        setRolePermission(state: any, action: PayloadAction<any>) {
            state.permission = action.payload.data
        },
        setSiderMenu(state: any, action: PayloadAction<any>) {
            state.sideBar = action.payload.data
        },
        setGroupPermissionModule(state: any, action: PayloadAction<any>) {

            state.groupModule = action.payload.data[0]
            

        }

    },
})

export default general.reducer;
export const {
    setAutoNumberList,
    setAutoNumberDetail,
    setModuleList,
    setModuleDetail,
    setListGroupAccess,
    SetGroupMenuAccess,
    setRolePermission,
    SetGroupModuleAccess,
    setSiderMenu,
    setGroupPermissionModule
} = general.actions;