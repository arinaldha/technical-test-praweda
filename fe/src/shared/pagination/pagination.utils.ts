import { MetaPaginationDto } from './dto/meta-pagination.dto';

interface IGetOffset {
  skip: number;
  take: number;
}

export function getOffset(page: number, limit: number): IGetOffset {
  return {
    skip: (page - 1) * limit,
    take: Number(limit),
  };
}

export function getMeta(
  page: number,
  limit: number,
  count: number,
): MetaPaginationDto {
  return {
    page: +page,
    limit: +limit,
    total_data_page: Math.ceil(count / limit),
    total_data: count ? count : 0,
  };
}
