import { UserResponse } from '@/models/response/utilities/utility_response';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
    token: string;
    user: UserResponse | null;
    name: string;
    company_position_name: Nullable<string>
    department_name: Nullable<string>
    company_name: Nullable<string>
    branch_name: Nullable<string>
    isAuthenticated: boolean;
}

const initialState: AuthState = {
    token: "",
    user: null,
    name: "",
    company_position_name: null,
    department_name: null,
    company_name: null,
    branch_name: null,
    isAuthenticated: false,
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setLoginSuccess(state: any, action: PayloadAction<any>) {
            state.token = action.payload.access_token
            state.isAuthenticated = true
        },
        setUserProfile(state: any, action: PayloadAction<any>) {
            state.user = action.payload
            state.name = action.payload.employee?.employe_name
            state.company_position_name = action.payload.employee?.company_position?.company_position_name
            state.department_name = action.payload.employee?.departement?.departement_name
            state.company_name = action.payload.employee?.company?.company_name
            state.branch_name = action.payload.employee?.branch?.branch_name
        },
        setLogoutSuccess(state: any) {
            state.user = null
            state.isAuthenticated = false
        }
    },
})

export default authSlice.reducer;
export const {
    setLoginSuccess,
    setUserProfile,
    setLogoutSuccess
} = authSlice.actions;