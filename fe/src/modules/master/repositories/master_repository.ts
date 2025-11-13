
import { DeleteResponse, SingleResponse } from "@/models/response/basic_response";
import { apiClient } from "@/shared/helpers/api_client";
import { FindDataRequest } from "@/models/request/basic_request";
import { Axios, AxiosResponse } from "axios";
import { CompanyPositionResponse, CompanyResponse, EmployeeResponse } from "@/models/response/master/company_response";
import { UserResponse } from "@/models/response/utilities/utility_response";
import { CountryResponse } from "@/models/response/master/location_response";
import { getRolePermission, findRoleModule, ModuleEnum } from "@/shared/roles/role";
import { UseCaseRepositoryRequest } from "@/models/utils/request";

type MetaProps = {
    page: number,
    limit: number,
    total_data: number
}


export class MasterRepository {
    static FindCompanyGroups = async <T>(
        request: UseCaseRepositoryRequest
    ): Promise<AxiosResponse<SingleResponse<T>>> => {
        const {
            moduleName,
            p,
            l,
            search
        } = request

        try {
            const findRole = await findRoleModule(ModuleEnum.CompanyGroupModule, 'findCompanyGroup')
            const generateRolePermission = await getRolePermission(findRole!.moduleName, findRole!.role)

            let baseUrl = `/${findRole?.parentPath}/findCompanyGroup`
            if (search) {
                baseUrl += '?search=' + search
            }
            if (p && !search) {
                baseUrl = `/${findRole?.parentPath}/findCompanyGroup?page=${p}&limit=${l}`
            }

            const config = { url: baseUrl, method: "get",  };
            return await apiClient(config);
        } catch (err: any) {
            throw err
        }
    }


    static FindCompanyGroupDetail = async <T>(
        request: UseCaseRepositoryRequest
    ): Promise<AxiosResponse<SingleResponse<T>>> => {
        const {
            moduleName,
            id,
        } = request

        try {
            const findRole = await findRoleModule(ModuleEnum.CompanyGroupModule, 'findCompanyGroup')
            const generateRolePermission = await getRolePermission(findRole!.moduleName, findRole!.role)

            const config = { url: `/${findRole?.parentPath}/findCompanyGroup/${id}`, method: "get",  };
            return await apiClient(config);
        } catch (err: any) {
            throw err
        }
    }


    static FindBranches = async <T>(
        request: {
            company_id?: string,
            departement_id?: string
        } & UseCaseRepositoryRequest
    ): Promise<AxiosResponse<SingleResponse<T>>> => {
        const {
            moduleName,
            search,
            p,
            company_id,
            departement_id,
            l
        } = request
        try {
            const findRole = await findRoleModule(ModuleEnum.BranchModule, 'findBranch')
            const generateRolePermission = await getRolePermission(ModuleEnum.BranchModule, findRole!.role)

            let baseUrl = `/${findRole?.parentPath}/findBranch`
            const paramQuery: { key: string, value: unknown }[] = []

            if (search) {
                paramQuery.push({ key: 'search', value: search })
            }

            if (p) {
                paramQuery.push({ key: 'page', value: p })
            }

            if (l) {
                paramQuery.push({ key: 'limit', value: l })
            }

            if (company_id) {
                paramQuery.push({ key: 'company_id', value: company_id })
            }

            if (departement_id) {
                paramQuery.push({ key: 'departement_id', value: departement_id })
            }

            paramQuery.forEach((value, index) => {
                if (index === 0) {
                    baseUrl += `?${value.key}=${value.value}`
                } else {
                    baseUrl += `&${value.key}=${value.value}`
                }
            })

            const config = { url: baseUrl, method: "get",  };
            return await apiClient(config);
        } catch (err: any) {
            throw err
        }
    }

    static FindBranchDetail = async <T>(
        request: UseCaseRepositoryRequest
    ): Promise<AxiosResponse<SingleResponse<T>>> => {
        const {
            moduleName,
            id
        } = request
        try {
            const findRole = await findRoleModule(ModuleEnum.BranchModule, 'findBranch')
            const generateRolePermission = await getRolePermission(findRole!.moduleName, findRole!.role)

            const config = { url: `/${findRole?.parentPath}/findBranch/${id}`, method: "get",  };
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
            search,
            p,
            l
        } = request
        try {


            const findRole = await findRoleModule(ModuleEnum.EmployeeModule, 'findEmployee')
            const generateRolePermission = await getRolePermission(findRole!.moduleName, findRole!.role)

            let baseUrl = `/${findRole?.parentPath}/findEmployee`
            if (search) {
                baseUrl += '?search=' + search
            }
            if (p && !search) {
                baseUrl = `/${findRole?.parentPath}/findEmployee?page=${p}&limit=${l}`
            }
            const config = { url: baseUrl, method: "get",  };
            return await apiClient(config);
        } catch (err: any) {
            throw err
        }
    }

    static FindCompany = async<T>(request: UseCaseRepositoryRequest): Promise<AxiosResponse<SingleResponse<CompanyResponse[]>>> => {
        const {
            moduleName,
            search,
            p,
            l
        } = request
        try {
            const findRole = await findRoleModule(ModuleEnum.CompanyModule, 'findCompany')
            const generateRolePermission = await getRolePermission(ModuleEnum.CompanyModule, findRole?.role ?? null)

            let baseUrl = `/${findRole?.parentPath}/findCompany`
            if (search) {
                baseUrl += '?search=' + search + "&p=" + 1
            }

            if (p && !search) {
                baseUrl = `/${findRole?.parentPath}/findCompany?page=${p}&limit=${l}`
            }
            const config = { url: baseUrl, method: "get",  }
            return await apiClient(config)
        } catch (err: any) {


            throw err
        }
    }

    static FindCompanyDetail = async<T>(request: UseCaseRepositoryRequest): Promise<AxiosResponse<CompanyResponse>> => {
        const {
            moduleName,
            id
        } = request
        try {
            const findRole = await findRoleModule(ModuleEnum.CompanyModule, 'findCompany')
            const generateRolePermission = await getRolePermission(findRole!.moduleName, findRole!.role)

            let baseUrl = `/${findRole?.parentPath}/findCompany`
            const config = { url: baseUrl + `/${id}`, method: "get",  }
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
            search,
            p,
            l,
            phone_code,
        } = request
        try {
            const findRole = await findRoleModule(ModuleEnum.CountryModule, 'findCountry')
            const generateRolePermission = await getRolePermission(findRole!.moduleName, findRole!.role)

            let baseUrl = `/${findRole?.parentPath}/findCountry`
            if (phone_code) {
                baseUrl = '/' + findRole?.parentPath + '/findCountry?phone-code=' + phone_code
            }
            if (search) {
                baseUrl += '?search=' + search + "&p=" + 1
            }
            if (p && !search) {
                baseUrl = `/${findRole?.parentPath}/findCountry?page=${p}&limit=${l}`
            }
            const config = { url: baseUrl, method: "get",  };

            return await apiClient(config);
        } catch (err: any) {
            throw err
        }
    }

    static FindCountryDetail = async <T>(request: UseCaseRepositoryRequest): Promise<AxiosResponse<SingleResponse<T>>> => {
        const {
            moduleName,
            id
        } = request
        try {
            const findRole = await findRoleModule(ModuleEnum.CountryModule, 'findCountry')
            const generateRolePermission = await getRolePermission(findRole!.moduleName, findRole!.role)

            const config = { url: `/${findRole?.parentPath}/findCountry/${id}`, method: 'get',  }
            return await apiClient(config)
        } catch (err: any) {
            throw err
        }
    }

    static FindEmployeeDetail = async <T>(
        request: UseCaseRepositoryRequest
    ): Promise<AxiosResponse<EmployeeResponse>> => {
        const {
            moduleName,
            id
        } = request
        try {
            const findRole = await findRoleModule(ModuleEnum.EmployeeModule, 'findEmployee')
            const generateRolePermission = await getRolePermission(findRole!.moduleName, findRole!.role)

            let baseUrl = `/${findRole?.parentPath}/findEmployee`
            const config = { url: baseUrl + `/${id}`, method: "get",  };
            return await apiClient(config);
        } catch (err: any) {
            throw err
        }
    }

    static FindCompanyPosition = async<T>(
        request: {
            company_id?: string,
            departement_id?: string
        } & UseCaseRepositoryRequest
    ): Promise<AxiosResponse<SingleResponse<CompanyPositionResponse[]>>> => {
        const {
            moduleName,
            search,
            p,
            company_id,
            departement_id,
            l
        } = request
        try {
            const findRole = await findRoleModule(ModuleEnum.CompanyPositionModule, 'findCompanyPosition')
            const generateRolePermission = await getRolePermission(findRole!.moduleName, findRole!.role)

            const paramQuery: { key: string, value: unknown }[] = []
            let baseUrl = `/${findRole?.parentPath}/findCompanyPosition`

            if (search && search.trim() !== "") {
                paramQuery.push({ key: 'search', value: search });
                paramQuery.push({ key: 'page', value: 1 });
            } else if (p) {
                paramQuery.push({ key: 'page', value: p });
            }



            if (l) {
                paramQuery.push({ key: 'limit', value: l })
            }

            if (company_id) {
                paramQuery.push({ key: 'company_id', value: company_id })
            }

            if (departement_id) {
                paramQuery.push({ key: 'departement_id', value: departement_id })
            }

            paramQuery.forEach((value, index) => {
                if (index === 0) {
                    baseUrl += `?${value.key}=${value.value}`
                } else {
                    baseUrl += `&${value.key}=${value.value}`
                }
            })

            const config = { url: baseUrl, method: "get",  };
            return await apiClient(config)
        } catch (err: any) {
            throw err
        }
    }

    static FindCompanyPositionDetail = async <T>(
        request: UseCaseRepositoryRequest
    ): Promise<AxiosResponse<CompanyPositionResponse>> => {
        const {
            moduleName,
            id
        } = request

        try {
            const findRole = await findRoleModule(ModuleEnum.CompanyPositionModule, 'findCompanyPosition')
            const generateRolePermission = await getRolePermission(findRole!.moduleName, findRole!.role)

            let baseUrl = `/${findRole?.parentPath}/findCompanyPosition`
            const config = { url: baseUrl + `/${id}`, method: "get",  };
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
            search,
            p,
            l,
            country_id
        } = request

        try {
            const findRole = await findRoleModule(ModuleEnum.CityModule, 'findCity')
            const generateRolePermission = await getRolePermission(findRole!.moduleName, findRole!.role)

            const paramQuery: { key: string, value: unknown }[] = []
            let baseUrl = `/${findRole?.parentPath}/findCity`


            if (search && search.trim() !== "") {
                paramQuery.push({ key: 'search', value: search });
                paramQuery.push({ key: 'page', value: 1 });
            } else if (p) {
                paramQuery.push({ key: 'page', value: p });
            }

            if (l) {
                paramQuery.push({ key: 'limit', value: l })
            }

            if (country_id) {
                paramQuery.push({ key: 'country_id', value: country_id })
            }


            paramQuery.forEach((value, index) => {
                if (index === 0) {
                    baseUrl += `?${value.key}=${value.value}`
                } else {
                    baseUrl += `&${value.key}=${value.value}`
                }
            })


            const config = { url: baseUrl, method: "get",  };
            return await apiClient(config);
        } catch (err: any) {
            throw err
        }
    }

    static FindCityDetail = async<T>(request: UseCaseRepositoryRequest): Promise<AxiosResponse<SingleResponse<T>>> => {
        const {
            moduleName,
            id
        } = request
        try {
            const findRole = await findRoleModule(ModuleEnum.CityModule, 'findCity')
            const generateRolePermission = await getRolePermission(findRole!.moduleName, findRole!.role)

            const config = { url: `/${findRole?.parentPath}/findCity/${id}`, method: 'get',  }
            return await apiClient(config)
        } catch (err: any) {
            throw err
        }
    }

    static FindDepartments = async <T>(
        request: {
            company_id?: string
        } & UseCaseRepositoryRequest
    ): Promise<AxiosResponse<SingleResponse<T>>> => {
        const {
            moduleName,
            company_id,
            search,
            p,
            l
        } = request
        try {
            const findRole = await findRoleModule(ModuleEnum.DepartementModule, 'findDepartement')
            const generateRolePermission = await getRolePermission(findRole!.moduleName, findRole!.role)

            let baseUrl = `/${findRole?.parentPath}/findDepartement`
            const paramQuery: { key: string, value: unknown }[] = []

            if (search && search.trim() !== "") {
                paramQuery.push({ key: 'search', value: search });
                paramQuery.push({ key: 'page', value: 1 });
            } else if (p) {
                paramQuery.push({ key: 'page', value: p });
            }

            if (l) {
                paramQuery.push({ key: 'limit', value: l })
            }

            if (company_id) {
                paramQuery.push({ key: 'company_id', value: company_id })
            }

            paramQuery.forEach((value, index) => {
                if (index === 0) {
                    baseUrl += `?${value.key}=${value.value}`
                } else {
                    baseUrl += `&${value.key}=${value.value}`
                }
            })

            const config = { url: baseUrl, method: "get",  };
            return await apiClient(config);
        } catch (err: any) {
            throw err
        }
    }

    static FindDepartmentDetail = async <T>(
        request: UseCaseRepositoryRequest
    ): Promise<AxiosResponse<SingleResponse<T>>> => {
        const {
            moduleName,
            id
        } = request
        try {
            const findRole = await findRoleModule(ModuleEnum.DepartementModule, 'findDepartement')
            const generateRolePermission = await getRolePermission(findRole!.moduleName, findRole!.role)

            let baseUrl = `/${findRole?.parentPath}/findDepartement/${id}`
            const config = { url: baseUrl, method: "get",  };
            return await apiClient(config);
        } catch (err: any) {
            throw err
        }
    }

}
