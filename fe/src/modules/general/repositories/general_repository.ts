import { UpsertModuleRequest, UpsertPermissionRequest, UpsertSetGroupAccessRequest, UpsertSetModuleGroupRequest } from "@/models/request/utilities/utility_request";
import { DeleteResponse, SingleResponse } from "@/models/response/basic_response";
import { UpsertAutoNumberResponse } from "@/models/response/general/auto_number_response";
import { ModuleResponse } from "@/models/response/general/module_response";
import { AutoNumberingResponse } from "@/models/response/general/numbering_response";
import { SetGroupResponse } from "@/models/response/general/permission_response";
import { UseCaseRepositoryRequest } from "@/models/utils/request";

import { apiClient } from "@/shared/helpers/api_client";
import { getRolePermission, findRoleModule, ModuleEnum } from "@/shared/roles/role";
import { AxiosError, AxiosResponse } from "axios";


export class GeneralRepository {
    static async FindNumberManagement(request: UseCaseRepositoryRequest): Promise<AxiosResponse<SingleResponse<AutoNumberingResponse[]>>> {
        const {
            moduleName,
            search,
            p,
            l
        } = request

        try {
            const findRole = await findRoleModule(moduleName, 'findAutoNumbering')
            const generateRolePermission = await getRolePermission(findRole!.moduleName, findRole!.role)

            let baseUrl = `/${findRole.parentPath}/findAutoNumbering`
            if (search) {
                baseUrl += '?search=' + search + "&p" + 1
            }
            if (p && !search) {
                baseUrl = `/${findRole.parentPath}/findAutoNumbering?page=${p}&limit=${l}`
            }
            const config = { url: baseUrl, method: 'get',  }

            return await apiClient(config)
        } catch (err: any) {
            throw err
        }
    }


    static async FindDetailNumberManagement(request: UseCaseRepositoryRequest): Promise<AxiosResponse<SingleResponse<AutoNumberingResponse>>> {
        const {
            moduleName,
            id,
            rule
        } = request

        try {
            const findRole = await findRoleModule(moduleName, 'findAutoNumbering')
            const generateRolePermission = await getRolePermission(findRole!.moduleName, findRole!.role)

            let baseUrl = `/${findRole.parentPath}/findAutoNumbering/${id}`

            const config = { url: baseUrl, method: 'get',  }
            return await apiClient(config)
        } catch (err: any) {
            throw err
        }
    }

    static async DeleteNumbering(request: UseCaseRepositoryRequest): Promise<AxiosResponse<SingleResponse<DeleteResponse>>> {
        const {
            moduleName,
            id
        } = request

        try {

            const findRole = await findRoleModule(moduleName, 'removeAutoNumbering')
            const generateRolePermission = await getRolePermission(findRole!.moduleName, findRole!.role)

            let baseUrl = `/${findRole.parentPath}/removeAutoNumbering/${id}`
            const config = { url: baseUrl, method: 'delete',  }

            return await apiClient(config)
        } catch (err: any) {
            throw err
        }
    }

    static async createAutoNumbering<T>(request: UseCaseRepositoryRequest): Promise<AxiosResponse<SingleResponse<T>>> {
        const {
            moduleName,
            body
        } = request
        try {
            const findRole = await findRoleModule(moduleName, 'createAutoNumbering')
            const generateRolePermission = await getRolePermission(findRole!.moduleName, findRole!.role)

            let baseUrl = `/${findRole.parentPath}/createAutoNumbering`
            const config = { url: baseUrl, method: 'post', body: body!,  }
            return await apiClient(config)

        } catch (err: any) {
            throw err
        }
    }

    static async updateAutoNumbering<T>(request: UseCaseRepositoryRequest): Promise<AxiosResponse<SingleResponse<T>>> {
        const {
            moduleName,
            body
        } = request
        try {
            const findRole = await findRoleModule(moduleName, 'updateAutoNumbering')
            const generateRolePermission = await getRolePermission(findRole!.moduleName, findRole!.role)

            let baseUrl = `/${findRole.parentPath}/updateAutoNumbering`

            const config = { url: baseUrl, method: 'post', body: body!,  }
            return await apiClient(config)

        } catch (err: any) {
            throw err
        }
    }

    static async FindModules(request: UseCaseRepositoryRequest): Promise<AxiosResponse<SingleResponse<ModuleResponse[]>>> {
        const {
            moduleName,
            search,
            p,
            l
        } = request

        try {
            const findRole = await findRoleModule(moduleName, 'findModule')
            const generateRolePermission = await getRolePermission(findRole!.moduleName, findRole!.role)

            let baseUrl = `/${findRole.parentPath}/findModule`
            if (search) {
                baseUrl += '?search=' + search + "&page=" + 1
            }
            if (p && !search) {
                baseUrl = `/${findRole.parentPath}/findModule?page=${p}&limit=${l}`
            }
            const config = { url: baseUrl, method: 'get',  }

            return await apiClient(config)
        } catch (err: any) {

            throw err
        }
    }

    static async FindFieldModule(request: UseCaseRepositoryRequest): Promise<AxiosResponse<SingleResponse<{ key: string, label: string }[]>>> {
        const {
            moduleName,
            search,
            p,
            l,
            moduleId
        } = request

        try {
            const findRole = await findRoleModule(moduleName, 'findModule')
            const generateRolePermission = await getRolePermission(findRole!.moduleName, findRole!.role)

            let baseUrl = `/${findRole.parentPath}/findFieldModule`
            if (search) {
                baseUrl += '?search=' + search
            }
            if (p && !search) {
                baseUrl = `/${findRole.parentPath}/findFieldModule?moduleId=${moduleId}`
            }
            const config = { url: baseUrl, method: 'get',  }

            return await apiClient(config)
        } catch (err: any) {

            throw err
        }
    }

    static async FindReadonlyFieldModules(request: UseCaseRepositoryRequest): Promise<AxiosResponse<SingleResponse<ModuleResponse[]>>> {
        const {
            moduleName,
            search,
            p,
            l
        } = request

        try {
            const findRole = await findRoleModule(moduleName, 'findModule')
            const generateRolePermission = await getRolePermission(findRole!.moduleName, findRole!.role)

            let baseUrl = `/${findRole.parentPath}/findReadonlyFieldModule`
            const config = { url: baseUrl, method: 'get',  }

            return await apiClient(config)
        } catch (err: any) {

            throw err
        }
    }

    static async FindDetailModule(request: UseCaseRepositoryRequest): Promise<AxiosResponse<SingleResponse<ModuleResponse>>> {
        const {
            moduleName,
            id,
            rule
        } = request

        try {
            const findRole = await findRoleModule(moduleName, 'findAutoNumbering')
            const generateRolePermission = await getRolePermission(findRole!.moduleName, findRole!.role)

            let baseUrl = `/${findRole.parentPath}/findAutoNumbering${id}`

            const config = { url: baseUrl, method: 'get',  }
            return await apiClient(config)
        } catch (err: any) {
            throw err
        }
    }

    static async CreateModule<T>(request: UseCaseRepositoryRequest): Promise<AxiosResponse<SingleResponse<T>>> {
        const {
            moduleName,
            body
        } = request
        try {
            const findRole = await findRoleModule(moduleName, 'createModule')
            const generateRolePermission = await getRolePermission(findRole!.moduleName, findRole!.role)

            let baseUrl = `/${findRole.parentPath}/createModule`

            const config = { url: baseUrl, method: 'post', body: body!,  }
            return await apiClient(config)
        } catch (err: any) {
            throw err
        }
    }


    static async DeleteModule(request: UseCaseRepositoryRequest): Promise<AxiosResponse<SingleResponse<DeleteResponse>>> {
        const {
            moduleName,
            id
        } = request

        try {
            const findRole = await findRoleModule(moduleName, 'removeModule')
            const generateRolePermission = await getRolePermission(findRole!.moduleName, findRole!.role)

            let baseUrl = `/${findRole.parentPath}/removeModule/${id}`
            const config = { url: baseUrl, method: 'delete',  }
            return await apiClient(config)
        } catch (err: any) {
            throw err
        }
    }

    static async FindGroupPermission<T>(request: UseCaseRepositoryRequest) {
        const {
            moduleName,
            id,
            rule
        } = request

        try {
            const findRole = await findRoleModule(moduleName, 'findGroupPermission')
            const generateRolePermission = await getRolePermission(findRole!.moduleName, findRole!.role)

            let baseUrl = `/${findRole.parentPath}/findGroupPermission`
            if (id) {
                baseUrl = `/${findRole.parentPath}/findGroupPermission?group_id=${id}`
            }
            let config = { url: baseUrl, method: 'get',  }

            return await apiClient(config)
        } catch (err: any) {
            throw err
        }
    }

    static async CreateRolePermission<T>(request: UseCaseRepositoryRequest): Promise<AxiosResponse<SingleResponse<T>>> {
        const {
            moduleName,
            rule,
            body
        } = request
        try {
            const findRole = await findRoleModule(moduleName, 'create')
            const generateRolePermission = await getRolePermission(findRole!.moduleName, findRole!.role)

            const config = { url: `/${findRole.parentPath}/create`, method: 'post', body: body!,  }
            return await apiClient(config)
        } catch (err: any) {
            throw err

        }
    }

    static async SetGroupModule<T>(request: UseCaseRepositoryRequest): Promise<AxiosResponse<SingleResponse<T>>> {
        const {
            moduleName,
            body,
            rule
        } = request

        try {
            const findRole = await findRoleModule(moduleName, 'setGroupPermissionModule')
            const generateRolePermission = await getRolePermission(findRole!.moduleName, findRole!.role)
            const config = { url: `/${findRole.parentPath}/setGroupPermissionModule`, method: 'post', body: body!,  }
            return await apiClient(config)
        } catch (err: any) {
            throw err

        }
    }

    static async DeletePermission(request: UseCaseRepositoryRequest): Promise<AxiosResponse<SingleResponse<DeleteResponse>>> {
        const {
            moduleName,
            id,
            rule
        } = request

        try {
            const findRole = await findRoleModule(moduleName, 'remove')
            const generateRolePermission = await getRolePermission(findRole!.moduleName, findRole!.role)

            let baseUrl = `/${findRole.parentPath}/remove/${id}`
            const config = { url: baseUrl, method: 'delete',  }
            return await apiClient(config)
        } catch (err: any) {
            throw err
        }
    }

}