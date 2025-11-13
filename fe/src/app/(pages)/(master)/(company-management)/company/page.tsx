"use client";

import { UniversalUseCase } from "@/modules/union/usecases/uni_usecases";
import { ModuleEnum } from "@/shared/roles/role";
import { useCallback, useState } from "react";
import { useAppDispatch } from "@/redux/store";
import CompanyTable from "./_components/company-table";
import { useCompany } from "@/hooks/companyAction/action";
import PaginationWithZustand from "@/app/components/pagination/_comp_pagination";

export default function CompanyPage() {
  const dispatch = useAppDispatch();
  const { fetchCompanies } = useCompany();
  const [search, setSearch] = useState<string>("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const fetchDataById = useCallback(
    (id: string) => {
      UniversalUseCase.HandleFindDataById(
        {
          id: id,
          moduleName: ModuleEnum.CompanyModule,
          pathApi: "findCompany",
        },
        dispatch
      );
    },
    [dispatch]
  );

  const deleteDataById = useCallback(
    (id: string, moduleName: string, pathApi: string) => {
      UniversalUseCase.HandleDeleteDataById(
        id,
        moduleName,
        pathApi,
        dispatch
      ).then(() => {
        fetchCompanies({ moduleName, pathApi });
      });
    },
    [fetchCompanies, dispatch]
  );

  const onChangePage = (page: number, pageSize: number) => {
    setPage(page);
    setLimit(pageSize);
  };

  return (
    <>
      <CompanyTable
        title="Company"
        fetchDataById={fetchDataById}
        deleteDataById={deleteDataById}
        setSearch={setSearch}
        setPage={setPage}
        search={search}
        page={page}
        limit={limit}
      />
      <PaginationWithZustand onChangePage={onChangePage} />
    </>
  )
}
