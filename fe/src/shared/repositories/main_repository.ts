import { DeleteResponse, SingleResponse } from '@/models/response/basic_response';
import { apiClient } from '@/shared/helpers/api_client';
import { FindDataRequest } from '@/models/request/basic_request';
import { AxiosResponse } from 'axios';
import { UseCaseRepositoryRequest } from '@/models/utils/request';
import { getRolePermission, findRoleModule } from '../roles/role';
import getFormData from '../helpers/format_data';


export class MainRepository {
    static FindMainData = async <T>(
        request: UseCaseRepositoryRequest
    ): Promise<AxiosResponse<SingleResponse<T>>> => {
        const {
            moduleName,
            body
        } = request
        try {
            const findRole = await findRoleModule(moduleName, 'find')
            const generateRolePermission = await getRolePermission(findRole!.moduleName, findRole!.role)

            const config = { url: `/${findRole?.parentPath}/find`, method: "post", body: body!,  };
            return await apiClient(config);
        } catch (err: any) {

            throw err
        }
    }

    static FindProfileUser = async <T>(
        request: UseCaseRepositoryRequest
    ): Promise<AxiosResponse<SingleResponse<T>>> => {
        const {
            moduleName,
            id
        } = request

        try {
            const findRole = await findRoleModule(moduleName, 'findUser')
            const generateRolePermission = await getRolePermission(findRole!.moduleName, findRole!.role)

            const config = { url: `/${findRole?.parentPath}/findUser/${id}`, method: "get",  };
            return await apiClient(config);
        } catch (err: any) {
            throw err
        }
    }

    static FindCompanyGroups = async <T>(
        request: UseCaseRepositoryRequest
    ): Promise<AxiosResponse<SingleResponse<T>>> => {
        const {
            moduleName,
            search,
            p,
            body
        } = request
        try {
            const findRole = await findRoleModule(moduleName, 'findCompanyGroup')
            const generateRolePermission = await getRolePermission(findRole!.moduleName, findRole!.role)

            let baseUrl = `/${findRole?.parentPath}/findCompanyGroup`
            if (search) {
                baseUrl += '?search=' + search
            }

            if (p && !search) {
                baseUrl += '?page=' + p
            }

            const config = { url: baseUrl, method: "get", body: body!,  };
            return await apiClient(config);
        } catch (err: any) {
            throw err
        }
    }

    static FindAllGroups = async <T>(
        request: UseCaseRepositoryRequest
    ): Promise<AxiosResponse<SingleResponse<T>>> => {
        const {
            moduleName,
            body
        } = request
        try {
            const findRole = await findRoleModule(moduleName, 'findGroup')
            const generateRolePermission = await getRolePermission(findRole!.moduleName, findRole!.role)

            const config = { url: `/${findRole?.parentPath}/findGroup`, method: "get", body: body!,  };
            return await apiClient(config);
        } catch (err: any) {

            throw err
        }
    }

    static FindBranches = async <T>(
        request: UseCaseRepositoryRequest
    ): Promise<AxiosResponse<SingleResponse<T>>> => {
        const {
            moduleName,
            body
        } = request
        try {
            const findRole = await findRoleModule(moduleName, 'findBranch')
            const generateRolePermission = await getRolePermission(findRole!.moduleName, findRole!.role)

            const config = { url: `/${findRole?.parentPath}/findBranch`, method: "get", body: body!,  };
            return await apiClient(config);
        } catch (err: any) {

            throw err
        }
    }


    static FindAllEmployee = async <T>(
        request: UseCaseRepositoryRequest
    ): Promise<AxiosResponse<SingleResponse<T>>> => {
        const {
            moduleName,
            body
        } = request
        try {
            const findRole = await findRoleModule(moduleName, 'findEmployee')
            const generateRolePermission = await getRolePermission(findRole!.moduleName, findRole!.role)

            const config = { url: `/${findRole?.parentPath}/findEmployee`, method: "get", body: body!,  };
            return await apiClient(config);
        } catch (err: any) {

            throw err
        }
    }

    static FindUser = async <T>(
        request: UseCaseRepositoryRequest
    ): Promise<AxiosResponse<SingleResponse<T>>> => {
        const {
            moduleName,
            body
        } = request
        try {
            const findRole = await findRoleModule(moduleName, 'findUser')
            const generateRolePermission = await getRolePermission(findRole!.moduleName, findRole!.role)

            const config = { url: `/${findRole?.parentPath}/findUser`, method: "get", body: body!,  };
            return await apiClient(config);
        } catch (err: any) {

            throw err
        }
    }


    static GetAllCompanies = async<T>(
        request: UseCaseRepositoryRequest
    ): Promise<AxiosResponse<SingleResponse<T>>> => {
        const {
            moduleName,
            body
        } = request
        try {
            const findRole = await findRoleModule(moduleName, 'findCompany')
            const generateRolePermission = await getRolePermission(findRole!.moduleName, findRole!.role)

            const config = { url: `/${findRole?.parentPath}/findCompany`, method: "get", body: body!,  }
            return await apiClient(config)
        } catch (err: any) {

            throw err
        }
    }

    static FindCompanyDetail = async<T>(
        request: UseCaseRepositoryRequest
    ): Promise<AxiosResponse<SingleResponse<T>>> => {
        const {
            moduleName,
            body
        } = request
        try {
            const findRole = await findRoleModule(moduleName, 'findCompany')
            const generateRolePermission = await getRolePermission(findRole!.moduleName, findRole!.role)

            const config = { url: `/${findRole?.parentPath}/findCompany`, method: "get", body: body!,  }
            return await apiClient(config)
        } catch (err: any) {

            throw err
        }
    }

    static FindAllDepartment = async<T>(
        request: UseCaseRepositoryRequest
    ): Promise<AxiosResponse<SingleResponse<T>>> => {
        const {
            moduleName,
            body
        } = request
        try {
            const findRole = await findRoleModule(moduleName, 'findDepartement')
            const generateRolePermission = await getRolePermission(findRole!.moduleName, findRole!.role)

            const config = { url: `/${findRole?.parentPath}/findDepartement`, method: "get", body: body!,  }
            return await apiClient(config)
        } catch (err: any) {

            throw err
        }
    }

    static FindCompanyPositions = async<T>(
        request: UseCaseRepositoryRequest
    ): Promise<AxiosResponse<SingleResponse<T>>> => {
        const {
            moduleName,
            body
        } = request
        try {
            const findRole = await findRoleModule(moduleName, 'findCompanyPosition')
            const generateRolePermission = await getRolePermission(findRole!.moduleName, findRole!.role)

            const config = { url: `/${findRole?.parentPath}/findCompanyPosition`, method: "get", body: body!,  }
            return await apiClient(config)
        } catch (err: any) {

            throw err
        }
    }

    static FindCountries = async <T>(
        request: UseCaseRepositoryRequest
    ): Promise<AxiosResponse<SingleResponse<T>>> => {
        const {
            moduleName,
            p,
            l,
            search
        } = request
        try {
            const findRole = await findRoleModule(moduleName, 'findCountry')
            const generateRolePermission = await getRolePermission(findRole!.moduleName, findRole!.role)

            const config = { url: `/${findRole?.parentPath}/findCountry`, method: "get",  };

            return await apiClient(config);
        } catch (err: any) {

            throw err
        }
    }

    static FindCities = async <T>(
        request: UseCaseRepositoryRequest
    ): Promise<AxiosResponse<SingleResponse<T>>> => {
        const {
            moduleName,
            body
        } = request

        try {
            const findRole = await findRoleModule(moduleName, 'findCity')
            const generateRolePermission = await getRolePermission(findRole!.moduleName, findRole!.role)

            const config = { url: `/${findRole?.parentPath}/findCity`, method: "get", body: body!,  };

            return await apiClient(config);
        } catch (err: any) {

            throw err
        }
    }

    static CreateMainData = async <T>(
        request: UseCaseRepositoryRequest
    ): Promise<AxiosResponse<SingleResponse<T>>> => {
        const {
            moduleName,
            body
        } = request
        try {
            const findRole = await findRoleModule(moduleName, 'create')
            const generateRolePermission = await getRolePermission(findRole!.moduleName, findRole!.role)

            const config = { url: `/${findRole?.parentPath}/create`, method: "post", body: body!,  };

            return await apiClient(config);
        } catch (err: any) {
            throw err
        }
    }



    static UpdateMainData = async <T>(
        request: UseCaseRepositoryRequest
    ): Promise<AxiosResponse<SingleResponse<T>>> => {
        const {
            moduleName,
            id,
            body
        } = request
        try {
            const findRole = await findRoleModule(moduleName, 'updateUser')
            const generateRolePermission = await getRolePermission(findRole!.moduleName, findRole!.role)

            const formBody = getFormData(body)
            const config = { url: `/${findRole?.parentPath}/updateUser/${id}`, method: "patch", body: formBody!,  };
            return await apiClient(config);
        } catch (err: any) {
            throw err
        }
    }

    static DeleteMainData = async (
        request: UseCaseRepositoryRequest
    ): Promise<AxiosResponse<SingleResponse<DeleteResponse>>> => {
        const {
            moduleName,
            id
        } = request
        try {
            const findRole = await findRoleModule(moduleName, 'remove')
            const generateRolePermission = await getRolePermission(findRole!.moduleName, findRole!.role)

            const config = { url: `/${findRole?.parentPath}/remove/${id}`, method: "delete",  };
            return await apiClient(config);
        } catch (err: any) {
            throw err
        }
    }
}
