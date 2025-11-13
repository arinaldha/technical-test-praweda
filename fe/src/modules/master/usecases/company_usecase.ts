import { UpsertCompanyPositionRequest, UpsertEmployeeRequest } from '@/models/request/master/company_request';
import { CompanyPositionResponse, EmployeeResponse, UpsertCompanyPositionResponse, UpsertEmployeeResponse } from '@/models/response/master/company_response';
import { FindDataRequest } from "@/models/request/basic_request";
import { UpsertBranchRequest, UpsertCompanyGroupRequest, UpsertCompanyRequest, UpsertDepartmentRequest } from "@/models/request/master/company_request";
import { setBtnLoading, setContentLoading, setCountData, setPagePagination } from "@/redux/basic_slice";
import { setBranchDetail, setBranchList, setCompanyDetail, setCompanyGroupDetail, setCompanyGroupList, setCompanyList, setCompanyPositionDetail, setCompanyPositionList, setDepartmentDetail, setDepartmentList, setEmployeeDetail, setEmployeeList } from "@/modules/master/slices/company_slice";
import { showErrorNotification, showSuccessNotification } from "@/shared/helpers/notification";
import { Dispatch } from "@reduxjs/toolkit";
import { BranchResponse, CompanyGroupResponse, CompanyResponse, DepartmentResponse, UpsertBranchResponse, UpsertCompanyGroupResponse, UpsertCompanyResponse, UpsertDepartmentResponse } from "@/models/response/master/company_response";
import { MainRepository } from '@/shared/repositories/main_repository';
import { MasterRepository } from '../repositories/master_repository';
import { UnionRepository } from '@/modules/union/repositories/uni_repository';
import { ModuleEnum } from '@/shared/roles/role';
import { UseCaseUniversalRequest } from '@/models/utils/request';
import { UniversalUseCase } from '@/modules/union/usecases/uni_usecases';

const companyModuleName = 'companies'
const companyGroupModuleName = 'company-groups'
const departmentModuleName = 'departements'
const branchModuleName = 'branches'
const companyPositionModuleName = 'company-positions'
const employeeModuleName = 'employees'
export class CompanyUseCase {
    // COMPANY UC
    static FindCompany = async (

        request: UseCaseUniversalRequest,
        dispatch: Dispatch<any>
    ): Promise<CompanyResponse[]> => {
        dispatch(setContentLoading(true));
        try {
            const {
                search,
                p,
                l,

            } = request
            const { data } = await UnionRepository.RevampUniversalFindData({ search, p, l, moduleName: ModuleEnum.CompanyModule, pathApi: "findCompany" });

            dispatch(setPagePagination(data.meta))
            dispatch(setCompanyList(data));
            dispatch(setContentLoading(false));
            return data.data as unknown as CompanyResponse[]
        } catch (err: any) {

            dispatch(setContentLoading(false));
            showErrorNotification(err.message)
            throw err
        }
    }

    static GetCompanyDetail = async (
        companyId: string,
        dispatch: Dispatch<any>
    ): Promise<CompanyResponse> => {
        dispatch(setContentLoading(true))
        try {
            const { data } = await MasterRepository.FindCompanyDetail<CompanyResponse>({ id: companyId, moduleName: ModuleEnum.CompanyModule })
            dispatch(setCompanyDetail(data))
            dispatch(setContentLoading(false))
            return data
        } catch (err: any) {
            dispatch(setContentLoading(false))
            showErrorNotification(err.message)
            throw err
        }
    }

    static CreateCompany = async (
        request: UpsertCompanyRequest,
        dispatch: Dispatch<any>
    ): Promise<UpsertCompanyResponse> => {
        dispatch(setBtnLoading(true))
        try {
            const { data } = await MainRepository.CreateMainData<UpsertCompanyResponse>({ body: request, moduleName: ModuleEnum.CompanyModule })
            showSuccessNotification(data.message)
            dispatch(setBtnLoading(false))
            return data.data
        } catch (err: any) {
            showErrorNotification(err.message)
            dispatch(setBtnLoading(false))
            throw err
        }
    }

    static UpdateCompany = async (
        company_id: string,
        request: UpsertCompanyRequest,
        dispatch: Dispatch<any>
    ): Promise<UpsertCompanyResponse> => {
        dispatch(setBtnLoading(true))
        try {
            const { data } = await UnionRepository.UniversalUpdate<UpsertCompanyResponse>({ id: company_id, moduleName: ModuleEnum.CompanyModule, body: request, pathApi: 'update' })
            showSuccessNotification(data.message)
            dispatch(setBtnLoading(false))
            return data.data
        } catch (err: any) {
            console.log(err)

            dispatch(setBtnLoading(false))
            showErrorNotification(err.message)
            throw err
        }
    }


    static UpdateBranch = async (
        branchId: string,
        request: UpsertBranchRequest,
        dispatch: Dispatch<any>
    ): Promise<UpsertBranchResponse> => {
        dispatch(setBtnLoading(true))
        try {
            const { data } = await UnionRepository.UniversalUpdate<UpsertBranchResponse>({ id: branchId, moduleName: ModuleEnum.BranchModule, body: request, pathApi: 'update' })
            showSuccessNotification(data.message)
            dispatch(setBtnLoading(false))
            return data.data
        } catch (err: any) {

            showErrorNotification(err.message)
            throw err
        } finally {
            dispatch(setBtnLoading(false))

        }
    }


    static DeleteCompany = async (
        companyId: string,
        dispatch: Dispatch<any>
    ) => {
        dispatch(setBtnLoading(true))
        try {
            const { data } = await MainRepository.DeleteMainData({ id: companyId, moduleName: ModuleEnum.CompanyModule })
            showSuccessNotification(data.message)
            dispatch(setBtnLoading(false))
            return data
        } catch (err: any) {
            showErrorNotification(err.message)
            throw err
        } finally {
            dispatch(setBtnLoading(false))

        }
    }

    // COMPANY GROUPS UC
    static GetAllCompanyGroups = async (
        search?: string,
        page?: number,
        limit?: number,
        dispatch?: any
    ): Promise<CompanyGroupResponse[]> => {
        dispatch(setContentLoading(true))
        try {
            const { data } = await MasterRepository.FindCompanyGroups<CompanyGroupResponse[]>({ search, p: page, l: limit, moduleName: ModuleEnum.CompanyGroupModule })
            dispatch(setCompanyGroupList(data))
            // dispatch(setPagePagination(data.meta))
            dispatch(setContentLoading(false))
            return data.data
        } catch (err: any) {
            showErrorNotification(err.message)
            throw err
        } finally {
            dispatch(setContentLoading(false))

        }
    }

    static GetCompanyGroupDetail = async (
        company_groupId: string,
        dispatch: Dispatch<any>
    ): Promise<CompanyGroupResponse> => {
        dispatch(setContentLoading(true))
        try {
            const { data } = await MasterRepository.FindCompanyGroupDetail<CompanyGroupResponse>({ id: company_groupId, moduleName: ModuleEnum.CompanyGroupModule })
            dispatch(setCompanyGroupDetail(data))
            dispatch(setContentLoading(false))
            return data.data
        } catch (err: any) {
            showErrorNotification(err.message)
            throw err
        } finally {
            dispatch(setContentLoading(false))

        }
    }

    static CreateCompanyGroup = async (
        request: UpsertCompanyGroupRequest,
        dispatch: Dispatch<any>
    ): Promise<UpsertCompanyGroupResponse> => {
        dispatch(setBtnLoading(true))
        try {
            const { data } = await MainRepository.CreateMainData<UpsertCompanyGroupResponse>({ body: request, moduleName: ModuleEnum.CompanyGroupModule })
            showSuccessNotification(data.message)
            return data.data
        } catch (err: any) {

            showErrorNotification(err.message)
            throw err
        } finally {
            dispatch(setBtnLoading(false))

        }
    }

    static UpdateCompanyGroup = async (
        request: any,
        id: string,
        dispatch: Dispatch<any>
    ): Promise<any> => {
        dispatch(setBtnLoading(true))
        try {
            const { data } = await UnionRepository.UniversalUpdate<UseCaseUniversalRequest>({ id: id, body: request, pathApi: "update", moduleName: ModuleEnum.CompanyGroupModule })
            showSuccessNotification(data.message)
            return data.data
        } catch (err: any) {
            showErrorNotification(err.message)
            throw err
        } finally {
            dispatch(setBtnLoading(false))

        }
    }

    static DeleteCompanyGroup = async (
        companyGroupId: string,
        dispatch: Dispatch<any>
    ) => {
        dispatch(setBtnLoading(true))
        try {
            const { data } = await MainRepository.DeleteMainData({ id: companyGroupId, moduleName: ModuleEnum.CompanyGroupModule })
            showSuccessNotification(data.message)
            return data
        } catch (err: any) {
            showErrorNotification(err.message)
            throw err
        } finally {
            dispatch(setBtnLoading(false))

        }
    }

    // DEPARTMENTS UC
    static GetAllDepartments = async (
        request: {
            company_id?: string
        } & FindDataRequest,
        dispatch: Dispatch<any>
    ): Promise<DepartmentResponse[]> => {
        dispatch(setContentLoading(true))
        try {
            const {
                search,
                page,
                limit,
                company_id
            } = request

            const { data } = await MasterRepository.FindDepartments<DepartmentResponse[]>({ search, p: page, l: limit, company_id, moduleName: ModuleEnum.DepartementModule })
            dispatch(setDepartmentList(data))
            dispatch(setPagePagination(data.meta))
            return data.data
        } catch (err: any) {
            showErrorNotification(err.message)
            throw err
        } finally {
            dispatch(setContentLoading(false))

        }
    }

    static GetDepartmentDetail = async (
        departementId: string,
        dispatch: Dispatch<any>
    ): Promise<DepartmentResponse> => {
        dispatch(setContentLoading(true))
        try {
            const { data } = await MasterRepository.FindDepartmentDetail<DepartmentResponse>({ id: departementId, moduleName: ModuleEnum.DepartementModule })
            dispatch(setDepartmentDetail(data))
            dispatch(setContentLoading(false))
            return data.data
        } catch (err: any) {
            showErrorNotification(err.message)
            throw err
        } finally {
            dispatch(setContentLoading(false))

        }
    }

    static CreateDepartment = async (
        request: UpsertDepartmentRequest,
        dispatch: Dispatch<any>
    ): Promise<UpsertDepartmentResponse> => {
        dispatch(setBtnLoading(true))
        try {
            const { data } = await UnionRepository.UniversalCreate<UpsertDepartmentResponse>({ body: request, moduleName: ModuleEnum.DepartementModule, pathApi: "create" })
            showSuccessNotification(data.message)
            return data.data
        } catch (err: any) {
            showErrorNotification(err.message)
            throw err
        } finally {
            dispatch(setBtnLoading(false))

        }
    }

    static UpdateDepartment = async (
        request: UpsertDepartmentRequest,
        departmentId: string,
        dispatch: Dispatch<any>
    ): Promise<UpsertDepartmentResponse> => {
        dispatch(setBtnLoading(true))
        try {
            const { data } = await UnionRepository.UniversalUpdate<UpsertDepartmentResponse>({ id: departmentId, moduleName: ModuleEnum.DepartementModule, body: request, pathApi: 'update' })
            showSuccessNotification(data.message)
            dispatch(setBtnLoading(false))
            return data.data
        } catch (err: any) {
            showErrorNotification(err.message)
            throw err
        } finally {
            dispatch(setBtnLoading(false))

        }
    }

    static DeleteDepartment = async (
        departmentId: string,
        dispatch: Dispatch<any>
    ) => {
        dispatch(setBtnLoading(true))
        try {
            const { data } = await UnionRepository.UniversalDelete({ id: departmentId, pathApi: "remove", moduleName: ModuleEnum.DepartementModule })
            showSuccessNotification(data.message)
            dispatch(setBtnLoading(false))
            return data
        } catch (err: any) {
            showErrorNotification(err.message)
            throw err
        } finally {
            dispatch(setBtnLoading(false))

        }
    }

    // BRANCHES UC
    static GetAllBranches = async (
        request: {
            company_id?: string,
            departement_id?: string
        } & FindDataRequest,
        dispatch: Dispatch<any>
    ): Promise<BranchResponse[]> => {
        dispatch(setContentLoading(true))
        const {
            departement_id,
            company_id,
            search,
            page,
            limit
        } = request
        try {
            // const { data } = await MasterRepository.FindBranches<BranchResponse[]>({ company_id, departement_id, search, p: page, l: limit, moduleName: ModuleEnum.BranchModule })
            const { data } = await UnionRepository.RevampUniversalFindData({
                moduleName: ModuleEnum.BranchModule, pathApi: "findBranch", l: limit, p: page, search, department_id: departement_id, company_id: company_id
            })
            dispatch(setBranchList(data))
            dispatch(setPagePagination(data.meta))
            dispatch(setContentLoading(false))
            return data.data as BranchResponse[]
        } catch (err: any) {
            showErrorNotification(err.message)
            throw err
        } finally {
            dispatch(setContentLoading(false))

        }
    }

    static GetBranchDetail = async (
        id: string,
        dispatch: Dispatch<any>
    ): Promise<BranchResponse> => {
        dispatch(setContentLoading(true))
        try {
            const { data } = await MasterRepository.FindBranchDetail<BranchResponse>({ id, moduleName: ModuleEnum.BranchModule })
            dispatch(setBranchDetail(data))
            dispatch(setContentLoading(false))
            return data.data
        } catch (err: any) {
            showErrorNotification(err.message)
            throw err
        } finally {
            dispatch(setContentLoading(false))

        }
    }

    static CreateBranch = async (
        request: UpsertBranchRequest,
        dispatch: Dispatch<any>
    ): Promise<UpsertBranchResponse> => {
        dispatch(setBtnLoading(true))
        try {
            const { data } = await MainRepository.CreateMainData<UpsertBranchResponse>({ body: request, moduleName: ModuleEnum.BranchModule })
            showSuccessNotification(data.message)
            dispatch(setBtnLoading(false))
            return data.data
        } catch (err: any) {
            showErrorNotification(err.message)
            throw err
        } finally {
            dispatch(setBtnLoading(false))

        }
    }


    static DeleteBranch = async (
        branchId: string,
        dispatch: Dispatch<any>
    ) => {
        dispatch(setBtnLoading(true))
        try {
            const { data } = await MainRepository.DeleteMainData({ id: branchId, moduleName: ModuleEnum.BranchModule })
            showSuccessNotification(data.message)
            dispatch(setBtnLoading(false))
            return data
        } catch (err: any) {
            showErrorNotification(err.message)
            throw err
        } finally {
            dispatch(setBtnLoading(false))

        }
    }

    // COMPANY POSITION UC
    static GetCompanyPositions = async (
        request: {
            company_id?: string,
            departement_id?: string
        } & FindDataRequest,
        dispatch: Dispatch<any>
    ): Promise<CompanyPositionResponse[]> => {
        dispatch(setContentLoading(true))
        try {
            const {
                departement_id,
                company_id,
                search,
                page,
                limit
            } = request



            const { data } = await MasterRepository.FindCompanyPosition<CompanyPositionResponse[]>({ company_id, departement_id, search, page: page, limit: limit, moduleName: ModuleEnum.CompanyPositionModule })
            dispatch(setCompanyPositionList(data))
            dispatch(setPagePagination(data.meta))
            dispatch(setContentLoading(false))
            return data.data
        } catch (err: any) {
            showErrorNotification(err.message)
            throw err
        } finally {
            dispatch(setContentLoading(false))

        }
    }

    static GetCompanyPositionDetail = async (
        id: string,
        dispatch: Dispatch<any>
    ): Promise<CompanyPositionResponse> => {
        dispatch(setContentLoading(true))
        try {
            const { data } = await MasterRepository.FindCompanyPositionDetail<CompanyPositionResponse>({ id, moduleName: ModuleEnum.CompanyPositionModule })
            dispatch(setCompanyPositionDetail(data))
            dispatch(setContentLoading(false))
            return data
        } catch (err: any) {
            showErrorNotification(err.message)
            throw err
        } finally {
            dispatch(setContentLoading(false))

        }
    }

    static CreateCompanyPosition = async (
        request: UpsertCompanyPositionRequest,
        dispatch: Dispatch<any>
    ): Promise<UpsertCompanyPositionResponse> => {
        dispatch(setBtnLoading(true))
        try {
            const { data } = await UnionRepository.UniversalCreate<UpsertCompanyPositionResponse>({ body: request, moduleName: ModuleEnum.CompanyPositionModule, pathApi: 'create' })
            showSuccessNotification(data.message)
            return data.data
        } catch (err: any) {
            showErrorNotification(err.message)
            throw err
        } finally {
            dispatch(setBtnLoading(false))

        }
    }

    static UpdateCompanyPosition = async (
        id: string,
        request: UpsertCompanyPositionRequest,
        dispatch: Dispatch<any>
    ): Promise<UpsertCompanyPositionResponse> => {
        dispatch(setBtnLoading(true))
        try {
            const { data } = await UnionRepository.UniversalUpdate<UpsertCompanyPositionResponse>({ id: id, body: request, moduleName: ModuleEnum.CompanyPositionModule, pathApi: 'update' })
            showSuccessNotification(data.message)
            return data.data
        } catch (err: any) {
            showErrorNotification(err.message)
            throw err
        } finally {
            dispatch(setBtnLoading(false))

        }
    }


    static DeleteCompanyPosition = async (
        companyPositionId: string,
        dispatch: Dispatch<any>
    ) => {
        dispatch(setBtnLoading(true))
        try {
            const { data } = await UnionRepository.UniversalDelete({ id: companyPositionId, pathApi: "remove", moduleName: ModuleEnum.CompanyPositionModule })
            showSuccessNotification(data.message)
            dispatch(setBtnLoading(false))
            return data
        } catch (err: any) {
            showErrorNotification(err.message)
            throw err
        } finally {
            dispatch(setBtnLoading(false))

        }
    }

    // EMPLOYEE UC
    static FindEmployee = async (
        search: string,
        page: number,
        limit: number,
        dispatch: Dispatch<any>
    ): Promise<EmployeeResponse[]> => {
        dispatch(setContentLoading(true));
        try {
            const { data } = await MasterRepository.FindAllEmployee<EmployeeResponse[]>({ search, p: page, l: limit, moduleName: ModuleEnum.EmployeeModule });
            dispatch(setEmployeeList(data));
            dispatch(setPagePagination(data.meta))
            dispatch(setContentLoading(false));
            return data.data;
        } catch (err: any) {
            showErrorNotification(err.message)
            throw err
        } finally {
            dispatch(setContentLoading(false))

        }
    }

    static GetEmployeeDetail = async (
        employeeId: string,
        dispatch: Dispatch<any>
    ): Promise<EmployeeResponse> => {
        dispatch(setContentLoading(true))
        try {
            const { data } = await MasterRepository.FindEmployeeDetail<EmployeeResponse>({ id: employeeId, moduleName: ModuleEnum.EmployeeModule })
            dispatch(setEmployeeDetail(data))
            return data
        } catch (err: any) {
            showErrorNotification(err.message)
            throw err
        } finally {
            dispatch(setContentLoading(false))
        }
    }

    static CreateEmployee = async (
        request: UpsertEmployeeRequest,
        dispatch: Dispatch<any>
    ): Promise<UpsertEmployeeResponse> => {
        dispatch(setBtnLoading(true))
        try {
            const { data } = await UnionRepository.UniversalCreate<UpsertEmployeeResponse>({ body: request, moduleName: ModuleEnum.EmployeeModule, pathApi: 'create' })
            showSuccessNotification(data.message)
            dispatch(setBtnLoading(false))
            return data.data
        } catch (err: any) {
            showErrorNotification(err.message)
            throw err
        } finally {
            dispatch(setBtnLoading(false))

        }
    }

    static UpdateEmployee = async (
        id: string,
        request: UpsertEmployeeRequest,
        dispatch: Dispatch<any>
    ): Promise<UpsertEmployeeResponse> => {
        dispatch(setBtnLoading(true))
        try {
            const { data } = await UnionRepository.UniversalUpdate<UpsertEmployeeResponse>({ id, moduleName: ModuleEnum.EmployeeModule, body: request, pathApi: 'update' })
            showSuccessNotification(data.message)
            dispatch(setBtnLoading(false))
            return data.data
        } catch (err: any) {
            showErrorNotification(err.message)
            throw err
        } finally {
            dispatch(setBtnLoading(false))

        }
    }

    static DeleteEmployee = async (
        employeeId: string,
        dispatch: Dispatch<any>
    ) => {
        dispatch(setBtnLoading(true))
        try {
            const { data } = await UnionRepository.UniversalDelete({ id: employeeId, moduleName: ModuleEnum.EmployeeModule, pathApi: 'remove' })
            showSuccessNotification(data.message)
            dispatch(setBtnLoading(false))
            return data
        } catch (err: any) {
            showErrorNotification(err.message)
            throw err
        } finally {
            dispatch(setBtnLoading(false))

        }
    }
}