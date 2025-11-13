import { BadRequestException } from '@nestjs/common';
import { getValueByTypeName, isEmpty } from './tools';
import { OrderSortType, PaginationType, SearchAdvance } from './types';
import { PrismaService } from 'src/prisma/prisma.service';

export async function generateConditions(
  type: 'all' | 'spesific',
  advanced_search: SearchAdvance[],
  modul: string,
  prisma: PrismaService,
) {
  let conditions = {};
  if (type === 'all') {
    conditions = {
      deleted_at: null,
    };
  } else if (type === 'spesific') {
    if (isEmpty(advanced_search as SearchAdvance[])) {
      return new BadRequestException(
        `advanced_search cannot be empty`,
      ).getResponse();
    }

    (advanced_search as SearchAdvance[]).forEach((val) => {
      if (isEmpty(prisma[modul].fields[val.dependency_id])) {
        return new BadRequestException(
          `dependency_id ${val.dependency_id} undefined`,
        ).getResponse();
      }

      const field = prisma[modul].fields[val.dependency_id];
      const valueParam = getValueByTypeName(
        field.typeName,
        val.dependency_value,
      );

      switch (val.operator) {
        case 'equal':
          Object.assign(conditions, {
            [val.dependency_id]: valueParam,
          });
          break;
        case 'like':
          Object.assign(conditions, {
            [val.dependency_id]: {
              contains: valueParam,
              mode: 'insensitive',
            },
          });
          break;
        case 'not-equal':
          Object.assign(conditions, {
            [val.dependency_id]: {
              not: valueParam,
            },
          });
          break;
      }
    });

    Object.assign(conditions, {
      deleted_at: null,
    });
  }

  return conditions;
}

export async function findDataModule(
  conditions: Record<string, any>,
  order: OrderSortType,
  pagination: PaginationType,
  prisma: PrismaService,
  module: string,
  includes: Record<string, any> | null = null,
  select: Record<string, any> | null = null,
) {
  const excludeKey = ['select', 'include'];
  let additionalConditions = {};

  if (!isEmpty(pagination)) {
    if (pagination.page === 1) {
      Object.assign(additionalConditions, {
        take: pagination.limit,
      });
    } else {
      const skip = pagination.page;
      const limit = pagination.limit + 1;

      Object.assign(additionalConditions, {
        skip: skip,
        take: limit,
      });
    }
  }

  if (!isEmpty(order)) {
    Object.assign(additionalConditions, {
      orderBy: {
        [order.dependency_id]: order.type,
      },
    });
  }

  if (!isEmpty(includes)) {
    Object.assign(additionalConditions, {
      include: includes,
    });
  }

  if (!isEmpty(select)) {
    Object.assign(additionalConditions, {
      select: select,
    });
  }

  const result = await prisma[module].findMany({
    ...additionalConditions,
    where: conditions,
  });

  const countData = await prisma[module].count({
    where: conditions,
  });

  function excludeKeys(obj, keys) {
    const result = {};
    for (const key in obj) {
      if (!keys.includes(key)) {
        result[key] = obj[key];
      }
    }
    return result;
  }

  const additionalConditionNew = excludeKeys(additionalConditions, excludeKey);

  const countDataPage = await prisma[module].count({
    where: conditions,
    ...additionalConditionNew,
  });

  return {
    data: pagination && pagination.page > 1 ? result.slice(1) : result,
    meta: {
      page: pagination.page ?? 1,
      limit: pagination.limit ?? 20,
      total_data_page: countDataPage,
      total_data: countData,
    },
  };
}
