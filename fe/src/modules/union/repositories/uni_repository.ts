import { apiClient } from "@/shared/helpers/api_client"
import { AxiosResponse } from "axios"
import { SingleResponse } from "@/models/response/basic_response"
import { getRolePermission, findRoleModule } from "@/shared/roles/role"
import { UseCaseUniversalRequest } from "@/models/utils/request"



export class UnionRepository {

    static HandleCancelApproval = async (request: UseCaseUniversalRequest) => {
        const {
            moduleName,
            pathApi,
            id
        } = request

        try {

            const findRole = await findRoleModule(moduleName, pathApi)
            const generateRolePermission = await getRolePermission(findRole!.moduleName, findRole!.role)
            const config = { url: `/${findRole?.parentPath}/${pathApi}/${id}`, method: `patch`,  }
            return await apiClient(config)
        } catch (err: any) {
            throw err
        }

    }

    static FindCoa = async <T>(coa_module: string): Promise<AxiosResponse<SingleResponse<T>>> => {
        try {
            const config = { url: "/customer/findCoa?coa_module=" + coa_module, method: "get", rule: null }
            return await apiClient(config)

        } catch (err) {
            throw err
        }

    }

    static UniversalDebounceOption = async <T>(request: UseCaseUniversalRequest): Promise<AxiosResponse<SingleResponse<T>>> => {
        try {
            const { moduleName, pathApi, search } = request
            const findRole = await findRoleModule(moduleName, pathApi)
            const generateRolePermission = await getRolePermission(findRole!.moduleName, findRole!.role)
            const config = { url: "/customer/debounceOption?search=" + search, method: "get", rule: null }
            return await apiClient(config)
        } catch (err) {
            throw err
        }
    }


    static UniversalDelete = async (request: UseCaseUniversalRequest) => {
        const {
            moduleName,
            pathApi,
            id
        } = request

        try {
            const findRole = await findRoleModule(moduleName, pathApi)
            const generateRolePermission = await getRolePermission(findRole!.moduleName, findRole!.role)

            const config = { url: `/${findRole?.parentPath}/${pathApi}/${id}`, method: `delete`,  }
            return await apiClient(config)
        } catch (err: any) {
            throw err
        }

    }

    static UniversalUpdate = async <T>(request: UseCaseUniversalRequest): Promise<AxiosResponse<SingleResponse<T>>> => {
        const {
            moduleName,
            pathApi,
            id,
            body
        } = request


        try {
            const findRole = await findRoleModule(moduleName, pathApi)
            const generateRolePermission = await getRolePermission(findRole!.moduleName, findRole!.role)
            const config = { url: `/${findRole?.parentPath}/${pathApi}/${id}`, method: `patch`, body: body!,  }
            return await apiClient(config)
        } catch (err: any) {
            throw err
        }
    }

    static async UniversalCreate<T>(request: UseCaseUniversalRequest): Promise<AxiosResponse<SingleResponse<T>>> {
        const {
            moduleName,
            pathApi,
            id,
            body
        } = request

        try {
            const findRole = await findRoleModule(moduleName, pathApi)
            const generateRolePermission = await getRolePermission(findRole!.moduleName, findRole!.role)
            const config = { url: `/${findRole?.parentPath}/${pathApi}`, method: `post`, body: body!,  }
            return await apiClient(config)
        } catch (err: any) {
            throw err
        }
    }

    static async UniversalFindData<T>(request: UseCaseUniversalRequest): Promise<AxiosResponse<SingleResponse<T>>> {
        const {
            moduleName, id, body, search, p, l, pathApi, is_active, is_base_currency, company_id, country_id, list_status, period_id, package_type_id, group_type_id, base_company, from_mapping, approval_flag, activity_flag, billing_sub_type_id, customer_id, vendor_id, employee_id, year, month, type, service, not_has_billing_actual,
            department_id, account_email, include_detail, account_type_id, transaction_group_id, flag_request, show_all, search_active_tariff, date, proforma_flag, budget_flag, order_by, product_service_flag, billing_type_id, tax_flag, currency_id, period_maintenance_id, charge_category_id, billing_type_code, charge_group_id, project_id, branch_id, tariff_account_id, tariff_license_id, tariff_server_id } = request
        try {
            const findRole = await findRoleModule(moduleName, pathApi)
            const generateRolePermission = await getRolePermission(findRole!.moduleName, findRole!.role)
            let baseUrl = `/${findRole.parentPath}/${pathApi}`
            const paramQuery: { key: string, value: unknown }[] = []
            if (search && search.trim() !== "") {
                paramQuery.push({ key: 'search', value: search });
                paramQuery.push({ key: 'page', value: p })
                paramQuery.push({ key: 'limit', value: l })
            } else if (p) {
                paramQuery.push({ key: 'page', value: p });
                paramQuery.push({ key: 'limit', value: l })
                !order_by ? paramQuery.push({ key: "order_by", value: "desc" }) : paramQuery.push({ key: "order_by", value: order_by })
            }

            if (id) {
                paramQuery.push({ key: id, value: id })
            }

            if (is_active) {
                paramQuery.push({ key: "is_active", value: is_active })
            }

            if (is_base_currency) {
                paramQuery.push({ key: "is_base_currency", value: is_base_currency })
            }

            if (company_id) {
                paramQuery.push({ key: "company_id", value: company_id })
            }

            if (country_id) {
                paramQuery.push({ key: "country_id", value: country_id })
            }

            if (period_id) {
                paramQuery.push({ key: "period_id", value: period_id })
            }

            if (package_type_id) {
                paramQuery.push({ key: "package_type_id", value: package_type_id })
            }

            if (group_type_id) {
                paramQuery.push({ key: "group_type_id", value: group_type_id })
                paramQuery.push({ key: "page", value: p })
                paramQuery.push({ key: "limit", value: l })
                paramQuery.push({ key: 'search', value: search });

            }
            if (department_id) {
                paramQuery.push({ key: "department_id", value: department_id })
            }
            if (account_email) {
                paramQuery.push({ key: "account_email", value: account_email })
            }
            if (include_detail) {
                paramQuery.push({ key: "include_detail", value: include_detail })
            }
            if (account_type_id) {
                paramQuery.push({ key: "account_type_id", value: account_type_id })
            }
            if (transaction_group_id) {
                paramQuery.push({ key: "transaction_group_id", value: transaction_group_id })
            }

            if (list_status) {
                paramQuery.push({ key: "list_status", value: list_status })
            }

            if (flag_request) {
                paramQuery.push({ key: "flag_request", value: flag_request })
            }

            if (base_company) {
                paramQuery.push({ key: "base_company", value: base_company })
            }

            if (show_all) {
                paramQuery.push({
                    key: "show_all",
                    value: show_all
                })
            }

            if (search_active_tariff) {
                paramQuery.push({
                    key: "search_active_tariff",
                    value: search_active_tariff
                })
            }

            if (billing_type_id) {
                paramQuery.push({
                    key: "billing_type_id",
                    value: billing_type_id
                })
            }

            if (tax_flag) {
                paramQuery.push({
                    key: "tax_flag",
                    value: tax_flag
                })
            }

            if (date) {
                paramQuery.push({
                    key: "date",
                    value: date
                })
            }

            if (typeof proforma_flag !== "undefined") {
                paramQuery.push({
                    key: "proforma_flag",
                    value: proforma_flag
                })
            }

            if (budget_flag) {
                paramQuery.push({
                    key: "budget_flag",
                    value: budget_flag
                })
            }

            if (product_service_flag) {
                paramQuery.push({
                    key: "product_service_flag",
                    value: product_service_flag
                })
            }

            if (currency_id) {
                paramQuery.push({
                    key: "currency_id",
                    value: currency_id
                })
            }
            if (period_maintenance_id) {
                paramQuery.push({
                    key: "period_maintenance_id",
                    value: period_maintenance_id
                })
            }


            if (charge_category_id) {
                paramQuery.push({
                    key: "charge_category_id",
                    value: charge_category_id
                })
            }

            if (billing_type_code) {
                paramQuery.push({
                    key: "billing_type_code",
                    value: billing_type_code
                })
            }
            if (charge_group_id) {
                paramQuery.push({
                    key: "charge_group_id",
                    value: charge_group_id
                })
            }

            if (project_id) {
                paramQuery.push({
                    key: "project_id",
                    value: project_id
                })
            }

            if (from_mapping) {
                paramQuery.push({
                    key: "from_mapping",
                    value: from_mapping
                })
            }

            if (branch_id) {
                paramQuery.push({
                    key: "branch_id",
                    value: branch_id
                })

            }

            if (approval_flag) {
                paramQuery.push({
                    key: "approval_flag",
                    value: approval_flag
                })
            }

            if (activity_flag) {
                paramQuery.push({
                    key: "activity_flag",
                    value: activity_flag
                })
            }

            if (billing_sub_type_id) {
                paramQuery.push({
                    key: "billing_sub_type_id",
                    value: billing_sub_type_id
                })
            }

            if (customer_id) {
                paramQuery.push({
                    key: "customer_id",
                    value: customer_id
                })
            }

            if (vendor_id) {
                paramQuery.push({
                    key: "vendor_id",
                    value: vendor_id
                })
            }

            if (employee_id) {
                paramQuery.push({
                    key: "employee_id",
                    value: employee_id
                })
            }


            if (tariff_account_id) {
                paramQuery.push({
                    key: "tariff_account_id",
                    value: tariff_account_id

                })
            }

            if (tariff_license_id) {
                paramQuery.push({
                    key: "tariff_license_id",
                    value: tariff_license_id

                })
            }

            if (tariff_server_id) {
                paramQuery.push({
                    key: "tariff_server_id",
                    value: tariff_server_id

                })
            }

            if (year) {
                paramQuery.push({
                    key: "year",
                    value: year

                })
            }
            if (month) {
                paramQuery.push({
                    key: "month",
                    value: month

                })
            }
            if (type) {
                paramQuery.push({
                    key: "type",
                    value: type

                })
            }
            if (service) {
                paramQuery.push({
                    key: "service",
                    value: service

                })
            }

            if (not_has_billing_actual) {
                paramQuery.push({
                    key: "not_has_billing_actual",
                    value: not_has_billing_actual
                })
            }




            paramQuery.forEach((value, index) => {
                if (index === 0) {
                    baseUrl += `?${value.key}=${value.value}`
                } else {
                    baseUrl += `&${value.key}=${value.value}`
                }
            })


            const config = { url: baseUrl, method: 'get',  }
            return await apiClient(config)
        } catch (err: any) {
            throw err
        }
    }

    static async RevampUniversalFindData<T>(request: UseCaseUniversalRequest): Promise<AxiosResponse<SingleResponse<T>>> {
        const {
            moduleName,
            id,
            p: page = 1,
            l: limit = 10,
            search = '',
            order_by = 'desc',
            pathApi,
            is_active,
            is_base_currency,
            company_id,
            country_id,
            list_status,
            period_id,
            package_type_id,
            group_type_id,
            base_company,
            from_mapping,
            approval_flag,
            activity_flag,
            billing_sub_type_id,
            customer_id,
            vendor_id,
            employee_id,
            year,
            month,
            type,
            service,
            not_has_billing_actual,
            department_id,
            account_email,
            include_detail,
            account_type_id,
            transaction_group_id,
            flag_request,
            show_all,
            search_active_tariff,
            date,
            proforma_flag,
            budget_flag,
            product_service_flag,
            billing_type_id,
            tax_flag,
            currency_id,
            period_maintenance_id,
            charge_category_id,
            billing_type_code,
            charge_group_id,
            project_id,
            branch_id,
            tariff_account_id,
            tariff_license_id,
            tariff_server_id
        } = request;

        try {
            const findRole = await findRoleModule(moduleName, pathApi);
            const generateRolePermission = await getRolePermission(findRole!.moduleName, findRole!.role);

            let baseUrl = `/${findRole.parentPath}/${pathApi}`;

            const paramQuery: Record<string, unknown> = {};
            

            if (search.trim() !== '') {
                paramQuery['search'] = search;
                paramQuery['page'] = page;
                paramQuery['limit'] = limit;
            } else {
                paramQuery['page'] = page;
                paramQuery['limit'] = limit;
                paramQuery['order_by'] = order_by;
            }

            const addParameterIfExists = (key: string, value: unknown) => {
                if (value !== undefined && value !== null && value !== '') {
                    paramQuery[key] = value;
                }
            };

            const optionalParams = [
                'id', 'is_active', 'is_base_currency', 'company_id', 'country_id',
                'list_status', 'period_id', 'package_type_id', 'group_type_id',
                'base_company', 'from_mapping', 'approval_flag', 'activity_flag',
                'billing_sub_type_id', 'customer_id', 'vendor_id', 'employee_id',
                'year', 'month', 'type', 'service', 'not_has_billing_actual',
                'department_id', 'account_email', 'include_detail', 'account_type_id',
                'transaction_group_id', 'flag_request', 'show_all', 'search_active_tariff',
                'date', 'proforma_flag', 'budget_flag', 'product_service_flag',
                'billing_type_id', 'tax_flag', 'currency_id', 'period_maintenance_id',
                'charge_category_id', 'billing_type_code', 'charge_group_id', 'project_id',
                'branch_id', 'tariff_account_id', 'tariff_license_id', 'tariff_server_id'
            ];

            optionalParams.forEach(param => {
                addParameterIfExists(param, request[param as keyof UseCaseUniversalRequest]);
            });

            const queryString = Object.entries(paramQuery)
                .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`)
                .join('&');

            const fullUrl = queryString ? `${baseUrl}?${queryString}` : baseUrl;

            const config = {
                url: fullUrl,
                method: 'get',
                
            };

            return await apiClient(config);

        } catch (error) {
            throw error;
        }
    }

    static async UniversalFindDataId<T>(request: UseCaseUniversalRequest): Promise<AxiosResponse<SingleResponse<T>>> {
        try {
            const { id, moduleName, pathApi } = request
            const findRole = await findRoleModule(moduleName, pathApi)
            const generateRolePermission = await getRolePermission(findRole!.moduleName, findRole!.role)

            let baseUrl = `/${findRole.parentPath}/${pathApi}/${id}`
            const config = { url: baseUrl, method: 'get',  }
            return apiClient(config)
        } catch (err: any) {
            throw err

        }
    }

}