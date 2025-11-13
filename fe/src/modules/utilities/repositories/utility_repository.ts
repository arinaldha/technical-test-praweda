
import { SingleResponse } from "@/models/response/basic_response"
import { AxiosResponse } from "axios"
import { apiClient } from "@/shared/helpers/api_client"

import { GroupResponse, MenuResponse, UserResponse } from "@/models/response/utilities/utility_response"
import { getRolePermission, findRoleModule } from "@/shared/roles/role"
import { UseCaseRepositoryRequest, UseCaseUniversalRequest } from "@/models/utils/request"
import getFormData from "@/shared/helpers/format_data"
import { UpsertUserRequest } from "@/models/request/utilities/utility_request"



export class UtilityRepository {
    static FindUsers = async <T>(
        request: UseCaseRepositoryRequest
    ): Promise<AxiosResponse<SingleResponse<T>>> => {
        const {
            moduleName,
            search,
            p,
            l
        } = request
        try {
            const findRole = await findRoleModule(moduleName, 'findUser')
            const generateRolePermission = await getRolePermission(moduleName, findRole!.role)

            let baseUrl = `/${findRole?.parentPath}/findUser`
            if (search) {
                baseUrl += '?search=' + search
            }
            if (p && !search) {
                baseUrl = `/${findRole?.parentPath}/findUser?page=${p}&limit=${l}`
            }
            const config = { url: baseUrl, method: `get`,  }
            return await apiClient(config)
        } catch (err: any) {
            throw err
        }
    }
    static FindUserDetail = async (
        request: UseCaseRepositoryRequest
    ): Promise<AxiosResponse<UserResponse>> => {
        const {
            moduleName,
            id,
            search,
            p,
            l
        } = request
        try {
            const findRole = await findRoleModule(moduleName, 'findUser')
            const generateRolePermission = await getRolePermission(moduleName, findRole!.role)

            const config = { url: `/${findRole?.parentPath}/findUser/${id}`, method: `get`,  }
            return await apiClient(config)
        } catch (err: any) {
            throw err
        }
    }

    static async CreateUser<T>(
        request: UseCaseRepositoryRequest
    ): Promise<AxiosResponse<SingleResponse<T>>> {
        const {
            moduleName,
            id,
            search,
            p,
            l,
            body
        } = request

        try {
            const findRole = await findRoleModule(moduleName, 'createUser')
            const generateRolePermission = await getRolePermission(moduleName, findRole!.role)
            const formBody = getFormData(body)
            const config = { url: `/${findRole?.parentPath}/createUser`, method: `post`, body: formBody!,  }
            return await apiClient(config)
        } catch (err: any) {
            throw err
        }
    }

    static async UpdateUser<T>(
        request: UseCaseRepositoryRequest
    ): Promise<AxiosResponse<SingleResponse<T>>> {
        const {
            moduleName,
            id,
            search,
            p,
            l,
            body
        } = request

        try {
            const findRole = await findRoleModule(moduleName, 'updateUser')
            const generateRolePermission = await getRolePermission(moduleName, findRole!.role)
            const formBody = getFormData(body)
            const config = { url: `/${findRole?.parentPath}/updateUser/${id}`, method: `patch`, body: formBody!,  }
            return await apiClient(config)
        } catch (err: any) {
            throw err
        }
    }

    static async UpdateUserPhoto<T>(
        request: {
            body: UpsertUserRequest;
            moduleName: string;
            id: string;

        }
    ): Promise<AxiosResponse<SingleResponse<T>>> {
        const {
            moduleName,
            id,
            body
        } = request

        try {
            const findRole = await findRoleModule(moduleName, 'update')
            const generateRolePermission = await getRolePermission(moduleName, findRole!.role)

            const config = { url: `/${findRole?.parentPath}/update/${id}`, method: `patch`, body,  }
            return await apiClient(config)
        } catch (err: any) {
            throw err
        }
    }


    static FindGroups = async <T>(
        request: UseCaseRepositoryRequest
    ): Promise<AxiosResponse<SingleResponse<T>>> => {
        const {
            moduleName,
            id,
            search,
            p,
            l,
            body
        } = request

        try {
            const findRole = await findRoleModule(moduleName, 'findGroup')
            const generateRolePermission = await getRolePermission(moduleName, findRole!.role)

            let baseUrl = `/${findRole?.parentPath}/findGroup`
            if (search) {
                baseUrl += '?search=' + search
            }
            if (p && !search) {
                baseUrl = `/${findRole?.parentPath}/findGroup?page=${p}&limit=${l}`
            }
            let config = { url: baseUrl, method: `get`,  }
            return await apiClient(config)

        } catch (err: any) {
            throw err
        }
    }

    static FindGroupOption = async <T>(
        request: UseCaseRepositoryRequest
    ): Promise<AxiosResponse<SingleResponse<T>>> => {
        const {
            moduleName,
            id,
            search,
            p,
            l,
            body
        } = request

        try {
            const findRole = await findRoleModule(moduleName, 'findGroup')
            const generateRolePermission = await getRolePermission(moduleName, findRole!.role)

            let baseUrl = `/${findRole?.parentPath}/findGroup`
            if (search) {
                baseUrl += '?search=' + search
            }
            if (p && !search) {
                baseUrl = `/${findRole?.parentPath}/findGroup?page=${p}&limit=${l}`
            }
            let config = { url: baseUrl, method: `get`,  }
            return await apiClient(config)

        } catch (err: any) {
            throw err
        }
    }
    static async FindGroupDetail(
        request: UseCaseRepositoryRequest
    ): Promise<AxiosResponse<GroupResponse>> {
        const {
            moduleName,
            id,
            search,
            p,
            l,
            body
        } = request

        try {
            const findRole = await findRoleModule(moduleName, 'findGroup')
            const generateRolePermission = await getRolePermission(moduleName, findRole!.role)

            const config = { url: `/${findRole?.parentPath}/findGroup/${id}`, method: `get`,  }
            return await apiClient(config)
        } catch (err: any) {
            throw err
        }
    }

    static FindMenus = async <T>(
        request: { wo_children?: "Y" | "N", show_all?: "Y" | "N" } & UseCaseRepositoryRequest
    ): Promise<AxiosResponse<SingleResponse<T>>> => {
        const {
            moduleName,
            id,
            search,
            p,
            l,
            body,
            wo_children,
            show_all
        } = request

        try {
            const findRole = await findRoleModule(moduleName, 'findMenu')
            const generateRolePermission = await getRolePermission(moduleName, findRole!.role)
            let baseUrl = `/${findRole?.parentPath}/findMenu?limit=250`
            if (wo_children === "Y") {
                baseUrl += `&wo_children=Y`
            }
            if (show_all === "Y") {
                baseUrl += `&show_all=Y`
            }


            const config = { url: baseUrl, method: `get`,  }
            return await apiClient(config)
        } catch (err: any) {
            throw err
        }
    }

    static FindMenuAccess = async <T>(
        request: UseCaseRepositoryRequest
    ): Promise<AxiosResponse<SingleResponse<T>>> => {
        const {
            moduleName,
            id,
            search,
            p,
            l,
            body
        } = request

        try {
            const findRole = await findRoleModule(moduleName, 'findGroupMenu')
            const generateRolePermission = await getRolePermission(moduleName, findRole!.role)
            let config = { url: `/${findRole?.parentPath}/findGroupMenu`, method: `get`,  }

            if (id) {
                config = { url: `/${findRole?.parentPath}/findGroupMenu?group_id=${id}`, method: `get`,  }
            }

            return await apiClient(config)
        } catch (err: any) {
            throw err
        }
    }
    static FindMenuDetail = async <T>(
        request: UseCaseRepositoryRequest
    ): Promise<AxiosResponse<MenuResponse>> => {
        const {
            moduleName,
            id,
            search,
            p,
            l,
            body
        } = request

        try {
            const findRole = await findRoleModule(moduleName, 'findMenu')
            const generateRolePermission = await getRolePermission(moduleName, findRole!.role)

            const config = { url: `/${findRole?.parentPath}/findMenu/${id}`, method: `get`,  }
            return await apiClient(config)
        } catch (err: any) {
            throw err
        }
    }

    // static UpdateMenu = async <T>(request: UseCaseUniversalRequest): Promise<AxiosResponse<SingleResponse<T>>> => {
    //     try {
    //         const {
    //             moduleName,
    //             id,
    //             body
    //         } = request
    //         const findRole = await findRoleModule(moduleName, 'update')
    //         const generateRolePermission = await getRolePermission(moduleName, findRole!.role)

    //         const config = { url: `/${findRole?.parentPath}/update/${body!.id}`, method: `patch`, , body: body! }
    //         return await apiClient(config)
    //     } catch (err: any) {
    //         throw err

    //     }
    // }

    static CreateModule = async (
        request: UseCaseRepositoryRequest
    ) => {
        const {
            moduleName,
            id,
            search,
            p,
            l,
            body
        } = request

        try {
            const findRole = await findRoleModule(moduleName, 'createModule')
            const generateRolePermission = await getRolePermission(moduleName, findRole!.role)

            const config = { url: `${findRole?.parentPath}/createModule`, method: `post`, body: body!,  }
            return await apiClient(config)
        } catch (err: any) {
            throw err
        }
    }
    static FindModules = async (
        request: UseCaseRepositoryRequest
    ) => {
        const {
            moduleName,
            id,
            search,
            p,
            l,
            body
        } = request

        try {
            const findRole = await findRoleModule(moduleName, 'findAllModuleList')
            const generateRolePermission = await getRolePermission(moduleName, findRole!.role)

            const config = { url: `/${findRole?.parentPath}/findAllModuleList`, method: `get`,  }
            return await apiClient(config)
        } catch (err: any) {
            throw err
        }
    }
    static FindModuleDetail = async (
        request: UseCaseRepositoryRequest
    ) => {
        const {
            moduleName,
            id,
            search,
            p,
            l,
            body
        } = request

        try {
            const findRole = await findRoleModule(moduleName, 'findModule')
            const generateRolePermission = await getRolePermission(moduleName, findRole!.role)

            const config = { url: `/${findRole?.parentPath}/findModule/${id}`, method: `get`,  }
            return await apiClient(config)
        } catch (err: any) {
            throw err
        }
    }

    static createOrUpdateMenuGroupAccess = async (request: UseCaseRepositoryRequest) => {
        const {
            moduleName,
            id,
            search,
            p,
            l,
            body
        } = request
        try {

            const findRole = await findRoleModule(moduleName, 'createOrUpdateMenuGroupAccess')
            const generateRolePermission = await getRolePermission(moduleName, findRole!.role)
            const config = { url: `${findRole?.parentPath}/createOrUpdateMenuGroupAccess`, method: `post`, body: body!,  }

            return await apiClient(config)
        } catch (err: any) {
            throw err
        }
    }


}
