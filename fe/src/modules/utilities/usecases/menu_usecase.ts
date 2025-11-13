import { UpsertMenuRequest } from "@/models/request/utilities/utility_request"
import { FindDataRequest } from "@/models/request/basic_request"
import { Dispatch } from "@reduxjs/toolkit"
import { MenuResponse, UpsertMenuResponse } from "@/models/response/utilities/utility_response"
import { UtilityRepository } from "../repositories/utility_repository"
import { setAccess, setAccessList, setMenuDetail, setMenuList, setMenuOption } from "../slices/utility_slice"
import { setBtnLoading, setContentLoading, setPagePagination } from "@/redux/basic_slice"
import { UnionRepository } from "@/modules/union/repositories/uni_repository"
import { DeleteResponse } from "@/models/response/basic_response"
import { showErrorNotification, showSuccessNotification } from "@/shared/helpers/notification"
import { ModuleEnum } from "@/shared/roles/role"
import { UseCaseRepositoryRequest, UseCaseUniversalRequest } from "@/models/utils/request"
import { MenuAccess } from "@/app/(pages)/(utilities)/menu/[id]/page"

const menuModuleName = 'menus'

export class MenuUseCase {

    static CreateMenu = async (request: UpsertMenuRequest, dispatch: Dispatch<any>): Promise<any> => {
        dispatch(setBtnLoading(true))
        try {

            const { data } = await UnionRepository.UniversalCreate<UseCaseRepositoryRequest>({
                body: request,
                moduleName: ModuleEnum.MenuModule,
                pathApi: 'create'
            })
            showSuccessNotification(data.message)
            dispatch(setBtnLoading(false))
            return data.data
        } catch (err: any) {
            dispatch(showErrorNotification(err.message))
            throw err
        } finally {
            dispatch(setBtnLoading(false))
        }
    }

    static UpdateMenu = async (request: UpsertMenuRequest, dispatch: Dispatch<any>): Promise<any> => {
        dispatch(setBtnLoading(true))
        // try {
        //     const { data } = await UtilityRepository.UpdateMenu<UpsertMenuResponse>({body : request, moduleName : ModuleEnum.MenuModule, pathApi : "update"})
        //     showSuccessNotification(data.message)
        //     dispatch(setMenuDetail(data))
        //     return data
        // } catch (err: any) {
        //     dispatch(showErrorNotification(err.message))

        //     throw err
        // } finally {
        //     dispatch(setBtnLoading(false))
        // }
    }

    static createOrUpdateMenuGroupAccess = async (request: any, dispatch: Dispatch<any>): Promise<any> => {
        dispatch(setBtnLoading(true))
        try {

            const { data } = await UtilityRepository.createOrUpdateMenuGroupAccess({ body: request, moduleName: ModuleEnum.MenuModule })
            showSuccessNotification(data.message)
            dispatch(setBtnLoading(false))
            return data.data
        } catch (err: any) {
            dispatch(showErrorNotification(err.message))

            throw err
        } finally {
            dispatch(setBtnLoading(false))
        }
    }

    static findMenu = async <T>(s: string, p: number, l: number, dispatch: Dispatch<any>, show_all?: "Y" | "N", wo_children?: "Y" | "N"): Promise<UpsertMenuResponse[] | undefined> => {

        dispatch(setContentLoading(true))
        try {
            const { data } = await UtilityRepository.FindMenus<UpsertMenuResponse[]>(
                {
                    moduleName: ModuleEnum.MenuModule,
                    wo_children, show_all
                }
            )
            dispatch(setMenuList(data))
            dispatch(setPagePagination(data.meta))
            return data.data
        } catch (err: any) {
            dispatch(showErrorNotification(err.message))

            throw err
        } finally {
            dispatch(setContentLoading(false))
        }
    }

    static findMenuOption = async <T>(s: string, p: number, l: number, dispatch: Dispatch<any>, show_all?: "Y" | "N", wo_children?: "Y" | "N"): Promise<UpsertMenuResponse[] | undefined> => {

        dispatch(setContentLoading(true))
        try {
            const { data } = await UtilityRepository.FindMenus<UpsertMenuResponse[]>(
                {
                    moduleName: ModuleEnum.MenuModule,
                    wo_children, show_all
                }
            )
            dispatch(setMenuOption(data))
            dispatch(setPagePagination(data.meta))
            return data.data
        } catch (err: any) {
            dispatch(showErrorNotification(err.message))

            throw err
        } finally {
            dispatch(setContentLoading(false))
        }
    }

    static findGroupMenu = async <T>(id: string, dispatch: Dispatch<any>): Promise<any> => {

        dispatch(setContentLoading(true))
        try {
            const { data } = await UtilityRepository.FindMenuAccess<MenuAccess[]>(
                {
                    id: id,
                    moduleName: ModuleEnum.MenuModule
                }
            )
            dispatch(setAccessList(data))
            return data.data
        } catch (err: any) {
            dispatch(showErrorNotification(err.message))

            throw err
        } finally {
            dispatch(setContentLoading(false))
        }
    }

    static findMenuDetail = async (id: string, dispatch: Dispatch): Promise<MenuResponse> => {
        dispatch(setContentLoading(true))
        try {
            const { data } = await UtilityRepository.FindMenuDetail<UseCaseRepositoryRequest>({ id, moduleName: ModuleEnum.MenuModule })

            dispatch(setMenuDetail(data))
            return data
        } catch (err: any) {

            throw err
        } finally {
            dispatch(setContentLoading(false))
        }
    }

    static deleteMenu = async (id: string, dispatch: Dispatch): Promise<UpsertMenuResponse> => {
        dispatch(setContentLoading(true))
        try {
            const { data } = await UnionRepository.UniversalDelete({ id, pathApi: "remove", moduleName: ModuleEnum.MenuModule })
            showSuccessNotification(data.message)
            dispatch(setMenuDetail(data))
            return data
        } catch (err: any) {

            throw err
        } finally {
            dispatch(setContentLoading(false))
        }
    }



}