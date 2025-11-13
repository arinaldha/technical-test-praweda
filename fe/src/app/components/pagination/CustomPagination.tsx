import { Pagination } from "antd";
import React, { useState } from "react";
import "./pagination.scss";
import type { PaginationProps } from "antd";
import { useSelector } from "react-redux";


interface Props {
  handlePageChange: (page: number, limit: number) => void;
  page?: number;
  limit?: number;
}

const CustomPagination: React.FC<Props> = ({
  handlePageChange,
  page,
  limit,
}) => {
  const onChange: PaginationProps["onChange"] = (page, pageSize) => {
    return handlePageChange(page, pageSize);
  };
  const { pagePagination } = useSelector((state: any) => state.basicSlice);
  
  return (
    <div className="pagination">
      
      <Pagination
        responsive
        showSizeChanger
        pageSizeOptions={[5, 10, 20, 50]}
        total={pagePagination?.total_data}
        current={pagePagination?.page}
        onChange={onChange}
        pageSize={pagePagination?.limit}
        showTotal={(total, range) =>
          `${range[0]}-${range[1]} dari ${total} item`
        }
      />
    </div>
  )
};

export default CustomPagination;
