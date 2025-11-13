import { BankMappingResponse, BranchApprovalResponse } from "@/models/response/master/branch_response";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type InitialStateProps = {
    branchApproval: Nullable<BranchApprovalResponse>
    branchApprovals: BranchApprovalResponse[]
    bankMappingList: BankMappingResponse[] | null
    bankMapping: Nullable<BankMappingResponse>
}

const initialState: InitialStateProps = {
    branchApproval: null,
    branchApprovals: [],
    bankMappingList: [],
    bankMapping: null
}

const branchSlice = createSlice({
    name: 'branch',
    initialState,
    reducers: {
        setBranchApprovalList(state: {
            branchApprovals: BranchApprovalResponse[]
        }, action: PayloadAction<BranchApprovalResponse[]>) {
            state.branchApprovals = action.payload
        },
        setBranchApproval(state: {
            branchApproval: Nullable<BranchApprovalResponse>,
        },
            action: PayloadAction<BranchApprovalResponse>) {
            state.branchApproval = action.payload
        },
        setBankMappingList(state: {
            bankMappingList: Nullable<BankMappingResponse[]>
        }, action: PayloadAction<BankMappingResponse[]>) {
            state.bankMappingList = action.payload
        },
        setBankMapping(state: {
            bankMapping: Nullable<BankMappingResponse>,
        },
            action: PayloadAction<BankMappingResponse>) {
            state.bankMapping = action.payload
        }
    }
})

export const {
    setBranchApproval,
    setBranchApprovalList,
    setBankMapping,
    setBankMappingList
} = branchSlice.actions

export default branchSlice.reducer