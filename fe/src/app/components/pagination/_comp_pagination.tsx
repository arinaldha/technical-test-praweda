import React, { useState } from "react";
import type { PaginationProps } from "antd";
import { Pagination } from "antd";
import useGlobalStore from "@/zustand/store/global_store";
import "./pagination.scss";

export type CustomPaginationProps = {
  onChangePage: (page: number, pageSize: number) => void;
};

const PaginationWithZustand: React.FC<CustomPaginationProps> = ({
  onChangePage,
}: CustomPaginationProps) => {
  const { pagePagination } = useGlobalStore();
  const onChange: PaginationProps["onChange"] = (page, pageSize) => {
    return onChangePage(page, pageSize);
  };

  return (
    <div className="pagination">
      <Pagination
        showSizeChanger
        pageSizeOptions={[10, 20, 50, 100]}
        responsive
        onChange={onChange}
        total={pagePagination?.total_data}
        defaultPageSize={pagePagination?.limit ?? 10}
        current={pagePagination?.page ?? 1}
        showTotal={(total, range) =>
          `${range[0]} - ${range[1]} from ${total} item`
        }
      />
      
    </div>
  );
};

export default PaginationWithZustand;
