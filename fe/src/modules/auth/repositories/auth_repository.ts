import { ChangePasswordFormProps } from "@/app/(pages)/profile/_component/form-change-pwd";
import { FormForgotPassword } from "@/app/(pages)/forgot-password/page";
import { LoginRequest, LoginRequestSSO } from "@/models/request/auth/auth_request";
import { LoginErrorResponse, LoginResponse } from "@/models/response/auth/auth_response";
import { SingleResponse } from "@/models/response/basic_response";
import { apiClient } from "@/shared/helpers/api_client";
import { ModuleEnum, findRoleModule, getRolePermission } from "@/shared/roles/role";

import axios, { AxiosResponse } from "axios";
import { FormResetPassword } from "@/app/(pages)/reset-password/page";

export class AuthRepository {
    static LoginByPass = async (request: LoginRequest): Promise<AxiosResponse<LoginResponse>> => {
        try {

            const data = await axios({
                method: 'post',
                url: process.env.NEXT_PUBLIC_API_URL + '/auth/login' || "",
                data: JSON.stringify({
                    username: request.username,
                    password: request.password,
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            return data
        } catch (error: any) {
            throw error
        }
    }

    static LoginBySSO = async (
        params: LoginRequestSSO
    ): Promise<AxiosResponse<LoginResponse> & LoginErrorResponse> => {
        try {
            const data = await axios({
                method: 'post',
                url: process.env.NEXT_PUBLIC_API_URL + '/auth/loginSSO' || "",
                data: JSON.stringify({
                    token_sso: params.token_sso,
                    env: params.env,
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })



            return data.data
        } catch (error) {
            throw error
        }
    }

    static ChangePassword = async <T>(params: ChangePasswordFormProps): Promise<AxiosResponse<SingleResponse<T>>> => {
        try {
            const findRole = await findRoleModule(ModuleEnum.UserModule, 'changePassword')
            const generateRolePermission = await getRolePermission(ModuleEnum.UserModule, findRole.role)
            const config = { url: `${findRole.parentPath}/changePassword`, method: 'patch', body: params,  }
            return await apiClient(config)
        } catch (error) {
            throw error
        }
    }

    static ForgotPassword = async <T>(props: FormForgotPassword): Promise<AxiosResponse<SingleResponse<T>>> => {
        try {
            const response = await axios({
                method: "post",
                url: process.env.NEXT_PUBLIC_API_URL + '/auth/forgotPassword' || "",
                data: JSON.stringify({
                    username: props.username,
                    email: props.email,
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            return response
        } catch (error) {
            throw error
        }
    }

    static ResetPassword = async <T>(props: FormResetPassword): Promise<AxiosResponse<SingleResponse<T>>> => {
        try {
            const config = {
                method: "patch",
                url: process.env.NEXT_PUBLIC_API_URL + '/auth/resetPassword/' + props.token || "",
                data: JSON.stringify({
                    new_password: props.new_password,
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            }

            const response = await axios({
                method: "patch",
                url: process.env.NEXT_PUBLIC_API_URL + '/auth/resetPassword/' + props.token || "",
                data: JSON.stringify({
                    new_password: props.new_password,
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            return response
        } catch (error) {
            throw error
        }
    }
}