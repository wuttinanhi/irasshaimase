import { BadRequestException } from '@nestjs/common';
import { SelectQueryBuilder } from 'typeorm';
import { PaginationResponse } from './pagination.response';

export class Pagination<T> {
  private readonly MAX_ITEM_LIMIT = 50;
  private readonly MAX_PAGE_LIMIT = 9999;

  private queryBuilder: SelectQueryBuilder<T>;
  private page: number;
  private perPage: number;

  constructor(queryBuilder: SelectQueryBuilder<T>) {
    this.queryBuilder = queryBuilder;
  }

  public async paginate(page: number, limit: number, raw = false) {
    if (page < 1 || page > this.MAX_PAGE_LIMIT || limit < 1 || limit > this.MAX_ITEM_LIMIT) {
      throw new BadRequestException();
    }

    this.page = page;
    this.perPage = limit;

    const totalCountQuery = this.queryBuilder.clone().select('COUNT(*)', 'count');
    const totalCountResult = await totalCountQuery.getRawMany();
    const totalCount = +totalCountResult[0].count;

    const query = this.queryBuilder.skip((this.page - 1) * this.perPage).take(this.perPage);
    const items = await (raw ? query.getRawMany() : query.getMany());

    const response = new PaginationResponse<T>();
    response.items = items;
    response.meta = {
      currentPage: this.page,
      totalItemsInPage: items.length,
      totalItems: totalCount,
      totalPages: Math.ceil(totalCount / this.perPage),
    };

    return response;
  }
}
