import { MenuAccess } from '@/app/(pages)/(utilities)/menu/[id]/page';
import { GroupResponse, MenuResponse, UserResponse } from '@/models/response/utilities/utility_response';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UtilityState {
    groups: GroupResponse[] | null;
    group: GroupResponse | null;
    users: UserResponse[] | null;
    user: UserResponse | null;
    menu: MenuResponse | null;
    menus: MenuResponse[] | null;
    listAccess: [] | null
    access: MenuAccess | null
    menuOption: MenuResponse[] | undefined
    groupOption: GroupResponse[] | null
}

const initialState: UtilityState = {
    groups: null,
    group: null,
    users: null,
    user: null,
    menus: null,
    menu: null,
    listAccess: null,
    access: null,
    menuOption: undefined,
    groupOption: null
}

const utility = createSlice({
    name: "utility",
    initialState,
    reducers: {
        setGroupList(state: any, action: PayloadAction<any>) {
            state.groups = action.payload.data
        },
        setGroupDetail(state: any, action: PayloadAction<any>) {
            state.group = action.payload.data
        },
        setUserList(state: any, action: PayloadAction<any>) {
            state.users = action.payload.data

        },
        setUserDetail(state: any, action: PayloadAction<any>) {
            state.user = action.payload.data
        },
        setMenuList(state: any, action: PayloadAction<any>) {
            state.menus = action.payload.data
        },
        setMenuDetail(state: any, action: PayloadAction<any>) {
            state.menu = action.payload.data[0]
        },
        setAccessList(state: any, action: PayloadAction<any>) {

            state.listAccess = action.payload.data
        },
        setAccess(state: any, action: PayloadAction<any>) {
            state.access = action.payload.data
        },
        setMenuOption(state: any, action: PayloadAction<any>) {
            state.menuOption = action.payload.data
        },
        setGroupOption(state: any, action: PayloadAction<any>) {
            state.groupOption = action.payload.data
        }

    },
})

export default utility.reducer;
export const {
    setGroupList,
    setGroupDetail,
    setUserList,
    setUserDetail,
    setMenuList,
    setMenuDetail,
    setAccessList,
    setAccess,
    setMenuOption,
    setGroupOption
} = utility.actions;