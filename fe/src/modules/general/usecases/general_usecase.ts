import { Dispatch } from "@reduxjs/toolkit"
import { setBtnLoading, setContentLoading, setCountData, setPagePagination } from "@/redux/basic_slice"
import { showErrorNotification, showSuccessNotification } from "@/shared/helpers/notification"
import { UseCaseRepositoryRequest } from "@/models/utils/request"
import { ModuleEnum, findRoleModule, getRolePermission } from "@/shared/roles/role"
import { setModuleDetail, setModuleList, setAutoNumberDetail, setAutoNumberList, setListGroupAccess, setRolePermission, SetGroupModuleAccess, setGroupPermissionModule } from "../slices/general_slice"
import { ModuleResponse } from "@/models/response/general/module_response"
import { UpsertModuleRequest, UpsertPermissionRequest } from "@/models/request/utilities/utility_request"
import { UpsertModuleResponse, UpsertPermissionResponse, UpsertSetGroupAccessResponse } from "@/models/response/utilities/utility_response"

import { UpsertAutoNumberResponse } from "@/models/response/general/auto_number_response"
import { FindDataRequest } from "@/models/request/basic_request"
import { ReadOnlyFieldValue } from "@/shared/utils/readonly-field"
import { setReadOnlyField } from "@/modules/utils/slices/utils_slice"
import { GeneralRepository } from "../repositories/general_repository"
import { AnyObject } from "antd/es/_util/type"

const generalModule = 'general'
const permissionModule = 'permissions'

const type = ['module', "number"]
export class GeneralUseCase {
    static async FindNumbers(

        request: FindDataRequest,
        dispatch: Dispatch<any>) {

        dispatch(setContentLoading(true))
        try {
            const {
                search,
                page,
                limit
            } = request
            const { data } = await GeneralRepository.FindNumberManagement({ search, p: page, l: limit, moduleName: ModuleEnum.AutoNumberingModule })

            dispatch(setAutoNumberList(data.data))
            dispatch(setPagePagination(data.meta))
            return data.data
        } catch (err: any) {
            showErrorNotification(err.message)
            throw err
        } finally {
            setContentLoading(false)
        }
    }

    static async FindDetailNumberManagement(id: string, dispatch: Dispatch) {
        dispatch(setContentLoading(true))
        try {
            const { data } = await GeneralRepository.FindDetailNumberManagement({ id, moduleName: ModuleEnum.AutoNumberingModule })
            dispatch(setAutoNumberDetail(data))
            return data
        } catch (err: any) {
            showErrorNotification(err.message)
            throw err
        } finally {
            setContentLoading(false)
        }
    }

    static async deleteNumbering(id: string, dispatch: Dispatch) {
        dispatch(setContentLoading(true))
        try {
            const { data } = await GeneralRepository.DeleteNumbering({ id, moduleName: ModuleEnum.AutoNumberingModule })
            showSuccessNotification(data.message)
            dispatch(setBtnLoading(false))
            return data
        } catch (err: any) {
            showErrorNotification(err.message)
            throw err
        } finally {
            setContentLoading(false)
        }
    }

    static async FindModules(search: string, p: number, l: number, dispatch: Dispatch): Promise<ModuleResponse[]> {
        dispatch(setContentLoading(true))
        try {
            const findRole = await findRoleModule(ModuleEnum.UtilityModule, 'findModule')
            const generateRolePermission = await getRolePermission(findRole!.moduleName, findRole!.role)

            const { data } = await GeneralRepository.FindModules({ search, p, l, moduleName: ModuleEnum.UtilityModule  })
            dispatch(setModuleList(data))
            dispatch(setPagePagination(data.meta))
            return data.data
        } catch (err: any) {

            throw err
        } finally {
            setContentLoading(false)
        }
    }

    static async FindFieldModules(params: {
        search: string,
        p: number,
        l: number,
        moduleId: string,
        dispatch: Dispatch
    }): Promise<{ key: string, label: string }[]> {
        const { search, p, l, dispatch } = params
        dispatch(setContentLoading(true))
        try {
            const findRole = await findRoleModule(ModuleEnum.UtilityModule, 'findFieldModule')
            const generateRolePermission = await getRolePermission(findRole!.moduleName, findRole!.role)

            const { data } = await GeneralRepository.FindFieldModule({ search, p, l, moduleName: ModuleEnum.UtilityModule, moduleId: params.moduleId })
            dispatch(setModuleList(data))
            dispatch(setPagePagination(data.meta))
            return data.data
        } catch (err: any) {

            throw err
        } finally {
            setContentLoading(false)
        }
    }

    static async SetReadOnlyFieldValue(dispatch: Dispatch) {
        try {
            const findRole = await findRoleModule(ModuleEnum.UtilityModule, 'findModule')
            const generateRolePermission = await getRolePermission(findRole!.moduleName, findRole!.role)

            const { data } = await GeneralRepository.FindReadonlyFieldModules({ moduleName: ModuleEnum.UtilityModule  })

            if (data.success) {
                const readOnlyData = await ReadOnlyFieldValue(data.data)
                dispatch(setReadOnlyField(readOnlyData))
            }
        } catch (err: any) {
            showErrorNotification(err.message)
            throw err
        }
    }

    static async FindDetailModule(id: string, dispatch: Dispatch) {
        dispatch(setContentLoading(true))
        try {
            const { data } = await GeneralRepository.FindDetailModule({ id, moduleName: ModuleEnum.UtilityModule })
            dispatch(setModuleDetail(data))
            return data
        } catch (err: any) {
            showErrorNotification(err.message)
            throw err
        } finally {
            setContentLoading(false)
        }
    }

    static async CreateModule(request: UpsertModuleRequest, dispatch: Dispatch): Promise<UpsertModuleResponse> {
        dispatch(setBtnLoading(true))
        try {
            const { data } = await GeneralRepository.CreateModule<UpsertModuleResponse>({ body: request, moduleName: ModuleEnum.UtilityModule })
            dispatch(setModuleDetail(data))
            showSuccessNotification(data.message)

            return data.data
        } catch (err: any) {
            showErrorNotification(err.message)
            throw err
        } finally {
            setBtnLoading(false)
        }
    }

    static async DeleteModule(id: string, dispatch: Dispatch) {
        dispatch(setContentLoading(true))
        try {
            const { data } = await GeneralRepository.DeleteModule({ id, moduleName: ModuleEnum.UtilityModule })
            showSuccessNotification(data.message)
            dispatch(setBtnLoading(false))
            return data
        } catch (err: any) {
            showErrorNotification(err.message)
            throw err
        } finally {
            setContentLoading(false)
        }
    }

    static async FindGroupPermission(id: string, dispatch: Dispatch): Promise<any> {
        dispatch(setContentLoading(true))
        try {
            const { data } = await GeneralRepository.FindGroupPermission({ id: id, moduleName: ModuleEnum.PermissionModule })
            dispatch(setGroupPermissionModule(data))
            return data
        } catch (err: any) {
            showErrorNotification(err.message)
            throw err
        } finally {
            setContentLoading(false)
        }
    }

    static async setGroupPermission(request: any, dispatch: Dispatch): Promise<UpsertSetGroupAccessResponse> {
        dispatch(setBtnLoading(true))
        try {
            const { data } = await GeneralRepository.SetGroupModule<UpsertSetGroupAccessResponse>({ body: request, moduleName: ModuleEnum.PermissionModule })
            dispatch(SetGroupModuleAccess(data))
            showSuccessNotification(data.message)
            return data.data
        } catch (err: any) {
            showErrorNotification(err.message)
            throw err
        } finally {
            dispatch(setBtnLoading(false))
        }
    }

    static async CreateRole(request: UpsertPermissionRequest, dispatch: Dispatch): Promise<UpsertPermissionRequest> {
        dispatch(setContentLoading(true))
        try {
            const { data } = await GeneralRepository.CreateRolePermission<UpsertPermissionResponse>({ body: request, moduleName: ModuleEnum.PermissionModule })
            dispatch(setRolePermission(data))
            showSuccessNotification(data.message)
            setContentLoading(false)
            return data.data
        } catch (err: any) {
            showErrorNotification(err.message)
            throw err
        } finally {
            setContentLoading(false)
        }
    }

    static async DeletePermission(id: string, dispatch: Dispatch) {
        dispatch(setContentLoading(true))
        try {
            const { data } = await GeneralRepository.DeletePermission({ id, moduleName: ModuleEnum.PermissionModule })
            showSuccessNotification(data.message)
            dispatch(setBtnLoading(false))
            return data
        } catch (err: any) {
            showErrorNotification(err.message)
            throw err
        } finally {
            setContentLoading(false)
        }
    }

    static async createAutoNumbering(request: AnyObject, dispatch: Dispatch): Promise<any> {
        dispatch(setContentLoading(true))
        try {
            const { data } = await GeneralRepository.createAutoNumbering<UpsertAutoNumberResponse>({ body: request, moduleName: ModuleEnum.AutoNumberingModule })
            showSuccessNotification(data.message)
            setContentLoading(false)
            return data.data
        } catch (err: any) {
            showErrorNotification(err.message)
            throw err
        } finally {
            setContentLoading(false)
        }
    }

    static async updateAutoNumbering(request: UseCaseRepositoryRequest, dispatch: Dispatch): Promise<UpsertAutoNumberResponse> {
        dispatch(setContentLoading(true))
        try {
            const { data } = await GeneralRepository.updateAutoNumbering<UpsertAutoNumberResponse>({ body: request, moduleName: ModuleEnum.AutoNumberingModule })
            showSuccessNotification(data.message)
            setContentLoading(false)
            return data.data
        } catch (err: any) {
            showErrorNotification(err.message)
            throw err
        } finally {
            setContentLoading(false)
        }
    }
}