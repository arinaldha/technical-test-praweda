import cookies from 'js-cookie'
import { destroySession, saveSession } from "@/shared/helpers/session";
import { LoginRequest, LoginRequestSSO } from "@/models/request/auth/auth_request";
import { setLoginSuccess, setUserProfile } from "@/modules/auth/slices/auth_slice";
import { setBtnLoading, setContentLoading } from "@/redux/basic_slice";
import { AuthRepository } from "@/modules/auth/repositories/auth_repository";
import { showSuccessNotification, showErrorNotification } from "@/shared/helpers/notification";
import { Dispatch } from "@reduxjs/toolkit";
import { MainRepository } from '@/shared/repositories/main_repository';
import decodeToken from '@/shared/helpers/jwt_decode';
import { aesDecrypter, aesEncrypter } from '@/shared/helpers/aes_enc';
import { resetUtils, setSiderMenu } from '@/modules/utils/slices/utils_slice';
import { ModuleEnum } from '@/shared/roles/role';
import { GeneralUseCase } from '@/modules/general/usecases/general_usecase';
import { GeneralRepository } from '@/modules/general/repositories/general_repository';
import { ReadOnlyFieldValue } from '@/shared/utils/readonly-field';
import { LoginErrorResponse, LoginResponse } from '@/models/response/auth/auth_response';
import { ChangePasswordFormProps } from '@/app/(pages)/profile/_component/form-change-pwd';
import { FormForgotPassword } from '@/app/(pages)/forgot-password/page';
import { FormResetPassword } from '@/app/(pages)/reset-password/page';


const userModuleName = 'users';
export class AuthUseCase {

    static ChangePassword = async (props: ChangePasswordFormProps, dispatch: Dispatch<any>) => {
        try {
            const response = await AuthRepository.ChangePassword(props)
            showSuccessNotification("changed password successfully")

            return response
        } catch (error: any) {
            showErrorNotification(error?.message)
            throw error
        }
    }

    static ForgotPassword = async (props: FormForgotPassword, dispatch: Dispatch<any>) => {

        try {
            dispatch(setBtnLoading(true))
            let response = await AuthRepository.ForgotPassword(props)

            showSuccessNotification(response.data.message)
            return response
        } catch (error: any) {
            showErrorNotification(error.response?.data?.message)
            throw error
        } finally {
            dispatch(setBtnLoading(false))
        }


    }

    static ResetPassword = async (props: FormResetPassword, dispatch: Dispatch<any>) => {

        try {
            dispatch(setBtnLoading(true))
            let response = await AuthRepository.ResetPassword(props)

            showSuccessNotification(response.data.message)
            return response
        } catch (error: any) {
            showErrorNotification(error.response?.data?.message || error.message)
            throw error
        } finally {
            dispatch(setBtnLoading(false))
        }


    }

    static LoginByPass = async (
        request: LoginRequest,
        dispatch: Dispatch<any>
    ): Promise<LoginResponse | LoginErrorResponse> => {
        dispatch(setBtnLoading(true))
        try {

            const data = await AuthRepository.LoginByPass(request)
            const { access_token, id, roles } = data.data as LoginResponse

            const list_menu = [{
                id: '',
                menu_icon: '',
                menu_id: '',
                menu_name: 'Company',
                menu_order_no: '',
                menu_parent: '',
                menu_path: '/company',
                children: '',
                is_active : '',
            },
            {
                id: '',
                menu_icon: '',
                menu_id: '',
                menu_name: 'Employee',
                menu_order_no: '',
                menu_parent: '',
                menu_path: '/employee',
                children: '',
                is_active : '',
            },
            {
                id: '',
                menu_icon: '',
                menu_id: '',
                menu_name: 'Role Management',
                menu_order_no: '',
                menu_parent: '',
                menu_path: '/role-management',
                children: '',
                is_active : '',
            }]

            dispatch(setLoginSuccess(data))
            const dataSession = {
                id: id,
                access_token: access_token,
            }
            const lm = JSON.stringify(list_menu)
            cookies.set("access_token", access_token)
            cookies.set("list_menu", lm || "")
            dispatch(setSiderMenu(list_menu ? JSON.parse(lm) : []))
            await saveSession(dataSession)
            localStorage.setItem("roles", roles || "")

            const { key_token }: any = await decodeToken(access_token)
            const counter = aesEncrypter(key_token)

            cookies.set("ROLE_MODULE", counter)
            // const user = await AuthUseCase.GetProfile(id, dispatch)
            const decryptMenu = list_menu ? JSON.parse(lm) : []

            // const loginDataUser = [user.data, decryptMenu]

            // await GeneralUseCase.SetReadOnlyFieldValue(dispatch)

            showSuccessNotification("Sukses Login")
            return data.data
        } catch (err: any) {
            showErrorNotification(err?.response?.data?.message)
            throw err
        } finally {
            dispatch(setBtnLoading(false))

        }
    }

    static GetProfile = async (userId: string, dispatch: Dispatch<any>) => {
        dispatch(setContentLoading(true))
        try {
            const { data } = await MainRepository.FindProfileUser({ id: userId, moduleName: ModuleEnum.UserModule })


            dispatch(setUserProfile(data.data))
            dispatch(setContentLoading(false))
            return data
        } catch (err: any) {
            showErrorNotification(err.message)
            throw err
        } finally {
            dispatch(setContentLoading(false))
        }
    }

    static Logout = async (dispatch: Dispatch<any>) => {
        dispatch(setContentLoading(true))
        try {
            await destroySession()

            cookies.remove("access_token")
            cookies.remove("refresh_token")
            cookies.remove("list_menu")
            cookies.remove("tes_role")
            cookies.remove("ROLE_MODULE")
            localStorage.clear()
            dispatch(setContentLoading(false))
            dispatch(resetUtils())
            showSuccessNotification("Berhasil Logout")

            return
        } catch (err: any) {
            throw err
        } finally {
            dispatch(setContentLoading(false))
        }
    }
}