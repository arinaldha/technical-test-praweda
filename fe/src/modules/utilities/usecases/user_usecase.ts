import { UpsertUserRequest } from '@/models/request/utilities/utility_request';
import { FindDataRequest } from "@/models/request/basic_request";
import { UpsertUserResponse, UserResponse } from "@/models/response/utilities/utility_response";
import { Dispatch } from "@reduxjs/toolkit";
import { setUserDetail, setUserList } from "../slices/utility_slice";
import { setBtnLoading, setContentLoading, setCountData, setPagePagination } from "@/redux/basic_slice";
import { showErrorNotification, showSuccessNotification } from "@/shared/helpers/notification";
import { MainRepository } from '@/shared/repositories/main_repository';
import { MasterRepository } from '@/modules/master/repositories/master_repository';
import { UtilityRepository } from '../repositories/utility_repository';
import { SingleResponse } from '@/models/response/basic_response';
import { UnionRepository } from '@/modules/union/repositories/uni_repository';
import { ModuleEnum } from '@/shared/roles/role';
import { AuthUseCase } from '@/modules/auth/usecases/auth_usecase';

const userModuleName = 'users'
export class UserUseCase {

    static GetAllUsers = async (
        request: FindDataRequest,
        dispatch: Dispatch<any>
    ): Promise<UserResponse[]> => {
        dispatch(setContentLoading(true));
        try {
            const { data } = await MainRepository.FindAllEmployee<UserResponse[]>({ body: request, moduleName: ModuleEnum.EmployeeModule });
            dispatch(setUserList(data));
            dispatch(setPagePagination(data.meta))
            dispatch(setContentLoading(false));
            return data.data;
        } catch (err: any) {
            dispatch(setContentLoading(false));
            throw err;
        }
    }
    static FindAllUser = async (
        s: string, p: number, l: number,
        dispatch: Dispatch<any>
    ): Promise<UserResponse[]> => {
        dispatch(setContentLoading(true));
        try {
            const { data } = await UtilityRepository.FindUsers<UserResponse[]>({ search: s, p, l, moduleName: ModuleEnum.UserModule });


            dispatch(setUserList(data));
            dispatch(setPagePagination(data.meta))
            dispatch(setContentLoading(false));
            return data.data
        } catch (err: any) {
            dispatch(setContentLoading(false));
            throw err;
        }
    }

    static GetUserDetail = async (
        id: string,
        dispatch: Dispatch<any>
    ): Promise<UserResponse> => {
        dispatch(setContentLoading(true))
        try {
            const { data } = await UtilityRepository.FindUserDetail({ id, moduleName: ModuleEnum.UserModule })
            dispatch(setUserDetail(data))
            dispatch(setContentLoading(false))
            return data
        } catch (err: any) {
            dispatch(setContentLoading(false))
            throw err
        }
    }

    static CreateUser = async (
        request: UpsertUserRequest,
        dispatch: Dispatch<any>
    ): Promise<UpsertUserResponse> => {
        dispatch(setBtnLoading(true))
        try {
            const { data } = await UtilityRepository.CreateUser<UpsertUserResponse>({ body: request, moduleName: ModuleEnum.UserModule })
            showSuccessNotification(data.message)
            dispatch(setBtnLoading(false))
            return data.data
        } catch (err: any) {
            showErrorNotification("Error create user")
            dispatch(setBtnLoading(false))
            throw err
        }
    }

    static UpdateUser = async (
        employeeId: string,
        request: UpsertUserRequest,
        dispatch: Dispatch<any>
    ): Promise<UpsertUserResponse> => {
        dispatch(setBtnLoading(true))
        try {
            const { data } = await UtilityRepository.UpdateUser<UpsertUserResponse>({ id: employeeId, moduleName: ModuleEnum.UserModule, body: request })
            showSuccessNotification(data.message)

            dispatch(setBtnLoading(false))
            return data.data
        } catch (err: any) {
            showErrorNotification("Error update user")
            dispatch(setBtnLoading(false))
            throw err
        }
    }


    static UpdateUserPhoto = async (
        userId: string,
        request: UpsertUserRequest,
        dispatch: Dispatch<any>
    ) => {
        dispatch(setBtnLoading(true))
        try {
            const { data } = await UtilityRepository.UpdateUserPhoto({ id: userId, moduleName: ModuleEnum.UserModule, body: request })
            showSuccessNotification(data.message)
            AuthUseCase.GetProfile(userId, dispatch)
            dispatch(setBtnLoading(false))
            return data.data
        } catch (err: any) {
            showErrorNotification(err.message)
            dispatch(setBtnLoading(false))
            throw err
        }
    }


    static DeleteUser = async (
        employeeId: string,
        dispatch: Dispatch<any>
    ) => {
        dispatch(setBtnLoading(true))
        try {
            const { data } = await MainRepository.DeleteMainData({ id: employeeId, moduleName: ModuleEnum.UserModule })
            showSuccessNotification(data.message)
            dispatch(setBtnLoading(false))
            return data
        } catch (err: any) {
            showErrorNotification("Error delete user")
            dispatch(setBtnLoading(false))
            throw err
        }
    }
}