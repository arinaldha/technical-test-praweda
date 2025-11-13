import { AdvancedSearchItemRequest, FindDataRequest, OrderRequest, PaginationRequest } from "@/models/request/basic_request";

export const createFindDataRequest = (
    search: string,
    page: number,
    limit: number,
): FindDataRequest => {
    return {
        search,
        page,
        limit
    };
};

export function ErrorResponse(data: {
    error?: any;
    message?: any;
    status: number;
  }) {
    return new Response(
      JSON.stringify({
        error: data.error,
        message: data.message,
      }),
      {
        status: data.status,
        headers: { "content-type": "application/json" },
      }
    );
  }