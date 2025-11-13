import { FindDataRequest } from "@/models/request/basic_request";
import { GroupResponse, UpsertGroupResponse } from "@/models/response/utilities/utility_response";
import { Dispatch } from "@reduxjs/toolkit";
import { setGroupDetail, setGroupList, setGroupOption } from "../slices/utility_slice";
import { setBtnLoading, setContentLoading, setCountData, setPagePagination } from "@/redux/basic_slice";
import { UpsertGroupRequest } from "@/models/request/utilities/utility_request";
import { showErrorNotification, showSuccessNotification } from "@/shared/helpers/notification";
import { MainRepository } from "@/shared/repositories/main_repository";
import { UtilityRepository } from "../repositories/utility_repository";
import { MasterRepository } from "@/modules/master/repositories/master_repository";
import { UnionRepository } from "@/modules/union/repositories/uni_repository";
import { ModuleEnum } from "@/shared/roles/role";

const groupModuleName = 'groups'
export class GroupUseCase {
    static GetAllGroups = async (
        search: string,
        p: number, l: number,
        dispatch: Dispatch<any>
    ): Promise<GroupResponse[]> => {
        dispatch(setContentLoading(true));
        try {
            const { data } = await UtilityRepository.FindGroups<GroupResponse[]>({ search, p, l, moduleName: ModuleEnum.GroupModule });
            dispatch(setGroupList(data));
            dispatch(setPagePagination(data.meta))
            dispatch(setContentLoading(false));
            return data.data
        } catch (err: any) {
            dispatch(setContentLoading(false));
            throw err;
        }
    }

    static GroupOption = async (
  
        dispatch: Dispatch<any>
    ): Promise<GroupResponse[]> => {
        dispatch(setContentLoading(true));
        try {
            const { data } = await UtilityRepository.FindGroupOption<GroupResponse[]>({ moduleName: ModuleEnum.GroupModule });
            dispatch(setGroupOption(data));
            dispatch(setContentLoading(false));
            return data.data
        } catch (err: any) {
            dispatch(setContentLoading(false));
            throw err;
        }
    }

    static GetGroupDetail = async (
        id: string,
        dispatch: Dispatch<any>
    ): Promise<GroupResponse> => {
        dispatch(setContentLoading(true))
        try {
            const { data } = await UtilityRepository.FindGroupDetail({ moduleName: ModuleEnum.GroupModule, id })
            dispatch(setGroupDetail(data))
            dispatch(setContentLoading(false))
            return data
        } catch (err: any) {
            dispatch(setContentLoading(false))
            throw err
        }
    }

    static CreateGroup = async (
        request: UpsertGroupRequest,
        dispatch: Dispatch<any>
    ): Promise<UpsertGroupResponse> => {
        dispatch(setBtnLoading(true))
        try {
            const { data } = await UnionRepository.UniversalCreate<UpsertGroupResponse>({ body: request, moduleName: ModuleEnum.GroupModule, pathApi: 'create' })
            showSuccessNotification(data.message)
            dispatch(setBtnLoading(false))
            return data.data
        } catch (err: any) {
            showErrorNotification("Error create group")
            dispatch(setBtnLoading(false))
            throw err.response
        }
    }

    static UpdateGroup = async (
        id: string,
        request: UpsertGroupRequest,
        dispatch: Dispatch<any>
    ): Promise<UpsertGroupResponse> => {
        dispatch(setBtnLoading(true))
        try {
            const { data } = await UnionRepository.UniversalUpdate<UpsertGroupResponse>({ id, moduleName: ModuleEnum.GroupModule, body: request, pathApi: 'update' })
            showSuccessNotification(data.message)
            dispatch(setBtnLoading(false))
            return data.data
        } catch (err: any) {
            showErrorNotification("Error update group")
            dispatch(setBtnLoading(false))
            throw err
        }
    }

    static DeleteGroup = async (
        employeeId: string,
        dispatch: Dispatch<any>
    ) => {
        dispatch(setBtnLoading(true))
        try {
            const { data } = await MainRepository.DeleteMainData({ id: employeeId, moduleName: ModuleEnum.GroupModule })
            showSuccessNotification(data.message)
            dispatch(setBtnLoading(false))
            return data
        } catch (err: any) {
            showErrorNotification(err.message)
            dispatch(setBtnLoading(false))
            throw err
        }
    }
}