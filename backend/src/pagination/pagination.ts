import { BadRequestException } from '@nestjs/common';
import { SelectQueryBuilder } from 'typeorm';
import { PaginationResponse } from './pagination.response';

export class Pagination<T> {
  private queryBuilder: SelectQueryBuilder<T>;
  private page: number;
  private perPage: number;

  private readonly maxLimit = 50;

  constructor(queryBuilder: SelectQueryBuilder<T>) {
    this.queryBuilder = queryBuilder;
  }

  public async paginate(page: number, limit: number, raw = false) {
    if (page < 1 || limit < 1 || limit > this.maxLimit) throw new BadRequestException();

    this.page = page;
    this.perPage = limit;

    const query = this.queryBuilder.skip((this.page - 1) * this.perPage).take(this.perPage);
    const items = await (raw ? query.getRawMany() : query.getMany());

    const totalCountQuery = this.queryBuilder.clone().select('COUNT(*)', 'count');
    const totalCountResult = await totalCountQuery.getRawMany();
    const totalCount = +totalCountResult[0].count;

    const response = new PaginationResponse();
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
