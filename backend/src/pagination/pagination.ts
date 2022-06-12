import { BadRequestException } from '@nestjs/common';
import { SelectQueryBuilder } from 'typeorm';
import { PaginationResponse } from './pagination.response';

export class Pagination<T> {
  private queryBuilder: SelectQueryBuilder<T>;
  private page: number;
  private perPage: number;

  constructor(queryBuilder: SelectQueryBuilder<T>) {
    this.queryBuilder = queryBuilder;
  }

  public async paginate(page: number, limit: number) {
    if (page < 1 || limit < 1) throw new BadRequestException();

    this.page = page;
    this.perPage = limit;

    const items = await this.queryBuilder
      .skip((this.page - 1) * this.perPage)
      .take(this.perPage)
      .getMany();

    const totalCount = await this.queryBuilder.getCount();

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
