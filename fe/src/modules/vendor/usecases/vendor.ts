import { Dispatch } from "@reduxjs/toolkit"
import { setBtnLoading, setContentLoading, setCountData, setPagePagination } from "@/redux/basic_slice"
import { showErrorNotification, showSuccessNotification } from "@/shared/helpers/notification"
import { ModuleEnum, findRoleModule, getRolePermission } from "@/shared/roles/role"

import { UnionRepository } from "@/modules/union/repositories/uni_repository"
import { setVendorDetail, setVendorList, setVendorProductDetail, setVendorProductList } from "@/modules/vendor/slices/vendor_slice"
import { VendorResponse, VendorUpsertResponse } from "@/models/vendor/response"
import { VendorRepository } from "../repository/vendor"
import { VendorUpsertRequest } from "@/models/vendor/request"
import { UseCaseUniversalRequest } from "@/models/utils/request"
import { AnyObject } from "antd/es/_util/type"


export class VendorUseCase {
    static FindVendor = async (
        dispatch: Dispatch<any>,
        search?: string,
        p?: number, l?: number, list_status?: string, approval_action?: string
    ): Promise<VendorResponse[]> => {
        dispatch(setContentLoading(true));
        try {
            const { data } = await VendorRepository.FindEntity({ search, p, l, list_status, moduleName: ModuleEnum.VendorModule, approval_action });
            dispatch(setVendorList(data.data))
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
    ): Promise<VendorResponse> => {
        dispatch(setContentLoading(true))
        try {
            const { data } = await VendorRepository.FindEntityById({ moduleName: ModuleEnum.VendorModule, id })
            dispatch(setVendorDetail(data))
            dispatch(setContentLoading(false))
            return data.data
        } catch (err: any) {
            dispatch(setContentLoading(false))
            throw err
        }
    }

    static CreateEntity = async (
        request: VendorUpsertRequest,
        dispatch: Dispatch<any>
    ): Promise<VendorUpsertResponse> => {
        dispatch(setBtnLoading(true))
        try {
            const { data } = await UnionRepository.UniversalCreate<VendorUpsertResponse>({ body: request, moduleName: ModuleEnum.VendorModule, pathApi: 'createVendor' })
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
        request: VendorUpsertRequest,
        dispatch: Dispatch<any>
    ): Promise<VendorUpsertResponse> => {
        dispatch(setBtnLoading(true))
        try {
            const { data } = await UnionRepository.UniversalUpdate<VendorUpsertResponse>({ id, moduleName: ModuleEnum.VendorModule, body: request, pathApi: 'updateVendor' })
            showSuccessNotification(data.message)
            dispatch(setBtnLoading(false))
            return data.data
        } catch (err: any) {
            showErrorNotification(err.response?.data?.message)
            dispatch(setBtnLoading(false))
            throw err
        }
    }

    static SetVendorContact = async (body: object, dispatch: Dispatch<any>) => {
        dispatch(setContentLoading(true))
        try {
            const { data } = await VendorRepository.SetContactVendor(body)
            showSuccessNotification(data.message)

            return data.data
        } catch (err: any) {
            showErrorNotification(err.response?.data?.message)
            throw (err)
        } finally {
            dispatch(setContentLoading(false))

        }
    }
    static SetVendorLegalDocumentContact = async (body: object, dispatch: Dispatch<any>) => {
        dispatch(setContentLoading(true))
        try {
            const { data } = await VendorRepository.SetLegalDocumentVendor(body)
            showSuccessNotification(data.message)
            return data.data
        } catch (err: any) {
            showErrorNotification(err.response?.data?.message)
            throw (err)
        } finally {
            dispatch(setContentLoading(false))

        }
    }

    static SetVendorBankAccount = async (body: object, dispatch: Dispatch<any>) => {
        dispatch(setContentLoading(true))
        try {
            const { data } = await VendorRepository.SetVendorBankAccount(body)
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
            const { data } = await VendorRepository.DeleteEntity({ id: id, moduleName: ModuleEnum.VendorModule })
            showSuccessNotification(data.message)
            dispatch(setBtnLoading(false))
            return data
        } catch (err: any) {
            showErrorNotification(err.response?.data?.message)
            dispatch(setBtnLoading(false))
            throw err
        }
    }

    static FindVendorDetail = async (
        params: {
            id: string
        },
        dispatch: Dispatch<any>
    ) => {
        dispatch(setContentLoading(true))
        try {
            const { data } = await VendorRepository.FindVendorDetail<VendorResponse>({ id: params.id })
            dispatch(setVendorDetail(data.data))
            dispatch(setContentLoading(false));
            return data.data
        } catch (err: any) {
            showErrorNotification(err.response?.data?.message)
            dispatch(setContentLoading(false))
            throw err
        }
    }

    static FindVendorProduct = async (
        request: UseCaseUniversalRequest,
        dispatch: Dispatch<any>
    ) => {
        dispatch(setContentLoading(true))
        try {
            const { data } = await UnionRepository.UniversalFindData(request)
            dispatch(setVendorProductList(data.data))
            dispatch(setPagePagination(data.meta))
            return data.data
        } catch (err: any) {
            showErrorNotification(err.response?.data?.message)
            dispatch(setContentLoading(false))
            throw err
        } finally {
            dispatch(setContentLoading(false))
        }
    }

    static CreateVendorProduct = async (
        request: VendorUpsertRequest,
        dispatch: Dispatch<any>
    ): Promise<VendorUpsertResponse> => {
        dispatch(setBtnLoading(true))
        try {
            const { data } = await UnionRepository.UniversalCreate<VendorUpsertResponse>({ body: request, moduleName: ModuleEnum.VendorProductModule, pathApi: 'createVendorProduct' })
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

    static UpdateVendorProduct = async (
        request: AnyObject,
        dispatch: Dispatch<any>
    ): Promise<VendorUpsertResponse> => {
        dispatch(setBtnLoading(true))
        try {
            const { data } = await UnionRepository.UniversalUpdate<VendorUpsertResponse>({ id: request.id, body: request, moduleName: ModuleEnum.VendorProductModule, pathApi: 'updateVendorProduct' })
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

    static FindVendorProductDetail = async (
        params: {
            id: string
        },
        dispatch: Dispatch<any>
    ) => {
        dispatch(setContentLoading(true))
        try {
            const { data } = await VendorRepository.FindVendorDetail<VendorResponse>({ id: params.id })
            dispatch(setVendorProductDetail(data.data))
            return data.data
        } catch (err: any) {
            showErrorNotification(err.response?.data?.message)
            throw err
        } finally {
            dispatch(setContentLoading(false));

        }
    }

    static DeleteVendorProduct = async (
        params: {
            id: string
        },
        dispatch: Dispatch<any>
    ) => {
        dispatch(setContentLoading(true))
        try {
            const { data } = await UnionRepository.UniversalDelete({ id: params.id, pathApi: "removeVendorProduct", moduleName: ModuleEnum.VendorProductModule })
            dispatch(setVendorProductDetail(data.data))
            return data.data
        } catch (err: any) {
            showErrorNotification(err.response?.data?.message)
            throw err
        } finally {
            dispatch(setContentLoading(false));

        }
    }
}