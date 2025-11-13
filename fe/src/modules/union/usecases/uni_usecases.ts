import { FindDataRequest } from "@/models/request/basic_request";
import { UseCaseUniversalRequest } from "@/models/utils/request";
import { setBtnLoading, setContentLoading, setPagePagination } from "@/redux/basic_slice";
import { showErrorNotification, showSuccessNotification } from "@/shared/helpers/notification";
import { Dispatch } from "@reduxjs/toolkit";
import { UnionRepository } from "../repositories/uni_repository";
import { SingleResponse } from "@/models/response/basic_response";
import { setDetail, setList, setOptionList } from "../slices/uni_slices";
export class UniversalUseCase {

    static HandleFindData = async <T extends Record<string, unknown>>(request: UseCaseUniversalRequest & FindDataRequest, dispatch: Dispatch): Promise<T[]> => {
        dispatch(setContentLoading(true))

        try {
            if (!request.base_company) {
                const response = await UnionRepository.RevampUniversalFindData<T[]>(request)
                const data: SingleResponse<T[]> = response.data
                dispatch(setList(data.data))
                dispatch(setPagePagination(data.meta))
                return data.data
            }
            const response = await UnionRepository.RevampUniversalFindData<T[]>(request)
            const data: SingleResponse<T[]> = response.data
            dispatch(setList(data.data))
            return data.data

        } catch (err: any) {
            showErrorNotification(err.message)

            throw err
        } finally {
            dispatch(setContentLoading(false))
        }
    }

    static HandleOptionData = async <T extends Record<string, unknown>>(request: UseCaseUniversalRequest & FindDataRequest, dispatch: Dispatch): Promise<T[]> => {
        dispatch(setContentLoading(true))

        try {
            const response = await UnionRepository.UniversalFindData<T[]>(request)
            const data: SingleResponse<T[]> = response.data
            dispatch(setOptionList(data.data))
            return data.data

        } catch (err: any) {
            showErrorNotification(err.message)
            throw err
        } finally {
            dispatch(setContentLoading(false))
        }
    }



    static HandleFindDataById = async <T extends (Record<string, any>[] | Record<string, any>)>(request: UseCaseUniversalRequest & FindDataRequest, dispatch: Dispatch): Promise<T | T[]> => {
        dispatch(setContentLoading(true))
        try {
            const response = await UnionRepository.UniversalFindDataId<T | T[]>(request);
            const data: SingleResponse<T | T[]> = response.data
            dispatch(setDetail(data.data))

            return data.data
        } catch (err: any) {
            showErrorNotification(err.message)

            throw err
        } finally {
            dispatch(setContentLoading(false))
        }
    }

    static HandleDeleteDataById = async (id: string, moduleName: string, pathApi: string, dispatch: Dispatch) => {
        dispatch(setBtnLoading(true))
        try {
            const { data } = await UnionRepository.UniversalDelete({ id: id, moduleName, pathApi })
            showSuccessNotification(data.message)
            return data.data
        } catch (err: any) {
            showErrorNotification(err.message)

            throw err
        } finally {
            dispatch(setBtnLoading(false))
        }
    }

    static HandleCreateData = async (params: {
        body: Record<string, unknown>,
        moduleName: string,
        pathApi: string
    },
        dispatch: Dispatch<any>
    ) => {
        dispatch(setBtnLoading(true))
        try {
            const { data } = await UnionRepository.UniversalCreate({
                body: params.body,
                moduleName: params.moduleName,
                pathApi: params.pathApi
            })
            showSuccessNotification(data.message)
            return data.data
        } catch (err: any) {
            showErrorNotification(err.message)

            throw err
        } finally {
            dispatch(setBtnLoading(false))
        }
    }

    static HandleUpdateDataById = async (params: {
        id: string;
        body: Record<string, unknown>,
        moduleName: string,
        pathApi: string
    },
        dispatch: Dispatch<any>
    ) => {
        dispatch(setBtnLoading(true))
        try {
            const { data } = await UnionRepository.UniversalUpdate({ id: params.id, body: params.body, moduleName: params.moduleName, pathApi: params.pathApi })
            showSuccessNotification(data.message)
            return data.data
        } catch (err: any) {
            showErrorNotification(err.message)
            throw err
        } finally {
            dispatch(setBtnLoading(false))
        }
    }

    static HandleCancelApproval = async (params: {
        id: string;
        moduleName: string,
        pathApi: string
    }, dispatch: Dispatch<any>) => {
        dispatch(setBtnLoading(false))
        try {
            const { data } = await UnionRepository.HandleCancelApproval({ id: params.id, moduleName: params.moduleName, pathApi: params.pathApi })

            showSuccessNotification(data.message)
            return data.data
        } catch (err: any) {
            showErrorNotification(err.message)
            throw err
        } finally {
            dispatch(setBtnLoading(false))
        }
    }



}