
import React from "react";

import { UniversalUseCase } from "@/lib/company/use_case";
import { useCompanyStore } from "@/zustand/store/companies/store";
import { CompanyResponse, UpsertCompanyResponse } from "@/models/response/master/company_response";
import { ModuleEnum } from "@/shared/roles/role";
import { MetaResponse, SingleResponse } from "@/models/response/basic_response";
import { AxiosResponse } from "axios";
import { UseCaseUniversalRequest } from "@/models/utils/request";
import { UnionRepository } from "@/modules/union/repositories/uni_repository";
import useGlobalStore from "@/zustand/store/global_store";

export const useCompany = () => {
    const companyStore = useCompanyStore()
    const globalStore = useGlobalStore()

    const fetchCompanies = async (request: UseCaseUniversalRequest): Promise<CompanyResponse[]> => {
        try {
            globalStore.setContentLoading(true)
            const { base_company, search, p, l } = request
            const response: AxiosResponse<SingleResponse<CompanyResponse[]>> = await UnionRepository.RevampUniversalFindData<CompanyResponse[]>({
                moduleName: ModuleEnum.CompanyModule,
                pathApi: "findCompany",
                base_company,
                search,
                p,
                l
            })
            companyStore.setCompanyList(response.data.data as CompanyResponse[])
            globalStore.setPagePagination(response.data.meta as MetaResponse)
            return response.data.data
        } catch (error: any) {
            globalStore.setErrorMessage(error.message)
            throw error
        } finally {
            globalStore.setContentLoading(false)
        }
    }


    return {
        companies: companyStore.companies,
        fetchCompanies
    }
}