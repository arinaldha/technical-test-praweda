// lib/useCases/universalUseCase.ts
import { UnionRepository } from "@/modules/union/repositories/uni_repository";
import { SingleResponse } from "@/models/response/basic_response";
import { useCompanyStore } from "@/zustand/store/companies/store";
import { ModuleEnum } from "@/shared/roles/role";
import { UseCaseUniversalRequest } from "@/models/utils/request";
import { CompanyResponse } from "@/models/response/master/company_response";


export class UniversalUseCase {
    static async handleFindData<T extends Record<string, unknown>>(
        request: UseCaseUniversalRequest
    ): Promise<T[]> {
        const store = useCompanyStore.getState();

        try {
            const response = await UnionRepository.RevampUniversalFindData<T[]>(request);
            const data: SingleResponse<T[]> = response.data;

            if (request.moduleName === ModuleEnum.CompanyModule) {
                store.setCompanyList(data.data as unknown as CompanyResponse[]);
            }

            return data.data;
        } catch (err: any) {
            const errorMessage = err.message || 'An error occurred';
            // store.setError(errorMessage);
            // toast.error(errorMessage);
            throw err;
        } finally {
            // store.setLoading(false);
        }
    }

    static async handleCreateData(params: {
        body: Record<string, unknown>,
        moduleName: string,
        pathApi: string
    }): Promise<any> {
        const store = useCompanyStore.getState();

        // store.setLoading(true);
        // store.setError(null);

        try {
            const { data } = await UnionRepository.UniversalCreate({
                body: params.body,
                moduleName: params.moduleName,
                pathApi: params.pathApi
            });

            if (params.moduleName === 'company') {
                // store.addCompany(data.data);
            }

            // toast.success('Successfully created');
            return data.data;
        } catch (err: any) {
            const errorMessage = err.message || 'Creation failed';
            // store.setError(errorMessage);
            // toast.error(errorMessage);
            throw err;
        } finally {
            // store.setLoading(false);
        }
    }

    // Similar methods for update, delete, etc.
}