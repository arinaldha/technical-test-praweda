import { CompanyResponse } from "@/models/response/master/company_response";
import { create } from "zustand";
import { persist, createJSONStorage, PersistOptions } from "zustand/middleware";

export type CompanyState = {
  companies: CompanyResponse[];
  company: Nullable<CompanyResponse>;
};

export type ActionMasterCompany = {
  setCompanyList: (companies: CompanyResponse[]) => void;
  setCompany: (company: CompanyResponse | null) => void;
};

type CompanyStore = CompanyState & ActionMasterCompany;

export const useCompanyStore = create<CompanyStore>()(
  persist(
    (set) => ({
      companies: [],
      company: null,
      setCompanyList: (companies: CompanyResponse[]) => set({ companies }),
      setCompany: (company: CompanyResponse | null) => set({ company }),
    }),
    {
      name: "company-store",
      storage: createJSONStorage(() => localStorage),
    } as PersistOptions<CompanyStore> 
  )
);
