import { Dispatch } from "@reduxjs/toolkit"
import { setBtnLoading, setContentLoading, setCountData, setPagePagination } from "@/redux/basic_slice"
import { showErrorNotification, showSuccessNotification } from "@/shared/helpers/notification"
import { ModuleEnum, findRoleModule, getRolePermission } from "@/shared/roles/role"
import { EntitiyUpsertRequest, PermitUpsertRequest } from "@/models/business/request/request"
import { EntitiyUpsertResponse, EntityResponse } from "@/models/business/responses/response"
import { UnionRepository } from "@/modules/union/repositories/uni_repository"
import { setCustomerDetail, setCustomerList } from "../slices/customer_slice"
import { CustomerResponse, CustomerUpsertResponse } from "@/models/customer/response/respose"
import { CustomerRepository } from "../repository/customer"


export class CustomerUseCase {
    static FindCustomer = async (
        dispatch: Dispatch<any>,
        search?: string,
        p?: number, l?: number, list_status?: string, approval_action?: string
    ): Promise<CustomerResponse[]> => {
        dispatch(setContentLoading(true));
        try {
            const { data } = await CustomerRepository.FindEntity({ search, p, l, list_status, moduleName: ModuleEnum.CustomerModule, approval_action });
            dispatch(setCustomerList(data.data))
            dispatch(setPagePagination(data.meta))
            dispatch(setContentLoading(false));
            return data.data
        } catch (err: any) {
            dispatch(setContentLoading(false));
            throw err;
        }
    }

    static FindEntityById = async (
        id: string,
        dispatch: Dispatch<any>
    ): Promise<CustomerResponse> => {
        dispatch(setContentLoading(true))
        try {
            const { data } = await CustomerRepository.FindEntityById({ moduleName: ModuleEnum.CustomerModule, id })
            dispatch(setCustomerDetail(data))
            dispatch(setContentLoading(false))
            return data
        } catch (err: any) {
            dispatch(setContentLoading(false))
            throw err
        }
    }

    static CreateEntity = async (
        request: CustomerUpsertRequest,
        dispatch: Dispatch<any>
    ): Promise<CustomerUpsertResponse> => {
        dispatch(setBtnLoading(true))
        try {
            const { data } = await UnionRepository.UniversalCreate<CustomerUpsertResponse>({ body: request, moduleName: ModuleEnum.CustomerModule, pathApi: 'createCustomer' })
            showSuccessNotification(data.message)
            dispatch(setBtnLoading(false))
            return data.data
        } catch (err: any) {
            if (err.response.data.message) {
                showErrorNotification(err.response?.data?.message)
                dispatch(setBtnLoading(false))
                throw err
            }
            throw err
        }
    }


    static UpdateEntity = async (
        id: string,
        request: CustomerUpsertRequest,
        dispatch: Dispatch<any>
    ): Promise<CustomerUpsertResponse> => {
        dispatch(setBtnLoading(true))
        try {
            const { data } = await UnionRepository.UniversalUpdate<CustomerUpsertResponse>({ id, moduleName: ModuleEnum.CustomerModule, body: request, pathApi: 'updateCustomer' })
            showSuccessNotification(data.message)
            dispatch(setBtnLoading(false))
            return data.data
        } catch (err: any) {
            showErrorNotification(err.response?.data?.message)
            dispatch(setBtnLoading(false))
            throw err
        }
    }

    static SetCustomerContact = async (body: object, dispatch: Dispatch<any>) => {
        dispatch(setContentLoading(true))
        try {
            const { data } = await CustomerRepository.SetContactCustomer(body)
            showSuccessNotification(data.message)

            return data.data
        } catch (err: any) {
            showErrorNotification(err.response?.data?.message)
            throw (err)
        } finally {
            dispatch(setContentLoading(false))

        }
    }
    static SetCustomerLegalDocumentContact = async (body: object, dispatch: Dispatch<any>) => {
        dispatch(setContentLoading(true))
        try {
            const { data } = await CustomerRepository.SetLegalDocumentCustomer(body)
            showSuccessNotification(data.message)
            return data.data
        } catch (err: any) {
            showErrorNotification(err.response?.data?.message)
            throw (err)
        } finally {
            dispatch(setContentLoading(false))

        }
    }
    static DeleteEntity = async (
        id: string,
        dispatch: Dispatch<any>
    ) => {
        dispatch(setBtnLoading(true))
        try {
            const { data } = await CustomerRepository.DeleteEntity({ id: id, moduleName: ModuleEnum.CustomerModule })
            showSuccessNotification(data.message)
            dispatch(setBtnLoading(false))
            return data
        } catch (err: any) {
            showErrorNotification(err.response?.data?.message)
            dispatch(setBtnLoading(false))
            throw err
        }
    }

    static FindCustomerDetail = async (
        params: {
            id: string
        },
        dispatch: Dispatch<any>
    ) => {
        dispatch(setContentLoading(true))
        try {
            const { data } = await CustomerRepository.FindCustomerDetail<CustomerResponse>({ id: params.id })
            dispatch(setCustomerDetail(data.data))
            dispatch(setContentLoading(false));
            return data.data
        } catch (err: any) {
            showErrorNotification(err.response?.data?.message)
            dispatch(setContentLoading(false))
            throw err
        }
    }
}