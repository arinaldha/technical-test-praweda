import { FindDataRequest } from '@/models/request/basic_request';
import { BranchResponse, CompanyGroupResponse, CompanyPositionResponse, CompanyResponse, DepartmentResponse, EmployeeResponse } from '@/models/response/master/company_response';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CompanyState {

    companies: CompanyResponse[] | null;
    company: CompanyResponse | null;
    companyGroups: CompanyGroupResponse[] | null;
    companyGroup: CompanyGroupResponse | null;
    departments: DepartmentResponse[] | null;
    department: DepartmentResponse | null;
    branches: BranchResponse[] | null;
    branch: Nullable<BranchResponse>;
    companyPositions: CompanyPositionResponse[] | [];
    companyPosition: CompanyPositionResponse | {};
    employees: EmployeeResponse[] | null;
    employee: EmployeeResponse | null;
    initialRequestData: FindDataRequest | null

}

const initialState: CompanyState = {
    companies: null,
    company: null,
    companyGroups: null,
    companyGroup: null,
    departments: null,
    department: null,
    branches: null,
    branch: null,
    companyPositions: [],
    companyPosition: {},
    employees: null,
    employee: null,
    initialRequestData: null
}

const companySlice = createSlice({
    name: "company",
    initialState,
    reducers: {
        setCompanyList(state: any, action: PayloadAction<any>) {
            state.companies = action.payload.data
        },
        setCompanyDetail(state: any, action: PayloadAction<any>) {
            state.company = action.payload.data
        },
        setCompanyGroupList(state: any, action: PayloadAction<any>) {
            state.companyGroups = action.payload.data
        },
        setCompanyGroupDetail(state: any, action: PayloadAction<any>) {
            state.companyGroup = action.payload.data
        },
        setDepartmentList(state: any, action: PayloadAction<any>) {
            state.departments = action.payload.data
        },
        setDepartmentDetail(state: any, action: PayloadAction<any>) {
            state.department = action.payload.data
        },
        setBranchList(state: any, action: PayloadAction<any>) {
            state.branches = action.payload.data
        },
        setBranchDetail(state: any, action: PayloadAction<any>) {

            state.branch = action.payload.data
        },
        setCompanyPositionList(state: any, action: PayloadAction<any>) {
            state.companyPositions = action.payload.data
        },
        setCompanyPositionDetail(state: any, action: PayloadAction<any>) {
            state.companyPosition = action.payload.data
        },
        setEmployeeList(state: any, action: PayloadAction<any>) {
            state.employees = action.payload.data
        },
        setEmployeeDetail(state: any, action: PayloadAction<any>) {
            state.employee = action.payload.data
        },
        setInitialRequestData(state: any, action: PayloadAction<any>) {
            state.initialRequestData = action.payload.data
        }
    },
})

export default companySlice.reducer;
export const {
    setCompanyList,
    setCompanyDetail,
    setCompanyGroupList,
    setCompanyGroupDetail,
    setDepartmentList,
    setDepartmentDetail,
    setBranchList,
    setBranchDetail,
    setCompanyPositionList,
    setCompanyPositionDetail,
    setEmployeeList,
    setEmployeeDetail,
} = companySlice.actions;