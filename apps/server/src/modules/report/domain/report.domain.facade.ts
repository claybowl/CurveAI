import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { DatabaseHelper } from '../../../core/database'
import { RequestHelper } from '../../../helpers/request'
import { Report } from './report.model'

import { Assessment } from '../../assessment/domain'

@Injectable()
export class ReportDomainFacade {
  constructor(
    @InjectRepository(Report)
    private repository: Repository<Report>,
    private databaseHelper: DatabaseHelper,
  ) {}

  async create(values: Partial<Report>): Promise<Report> {
    return this.repository.save(values)
  }

  async update(item: Report, values: Partial<Report>): Promise<Report> {
    const itemUpdated = { ...item, ...values }

    return this.repository.save(itemUpdated)
  }

  async delete(item: Report): Promise<void> {
    await this.repository.softDelete(item.id)
  }

  async findMany(
    queryOptions: RequestHelper.QueryOptions<Report> = {},
  ): Promise<Report[]> {
    const query = this.databaseHelper.applyQueryOptions(
      this.repository,
      queryOptions,
    )

    return query.getMany()
  }

  async findOneByIdOrFail(
    id: string,
    queryOptions: RequestHelper.QueryOptions<Report> = {},
  ): Promise<Report> {
    if (!id) {
      this.databaseHelper.invalidQueryWhere('id')
    }

    const queryOptionsEnsured = {
      includes: queryOptions?.includes,
      filters: {
        id: id,
      },
    }

    const query = this.databaseHelper.applyQueryOptions(
      this.repository,
      queryOptionsEnsured,
    )

    const item = await query.getOne()

    if (!item) {
      this.databaseHelper.notFoundByQuery(queryOptionsEnsured.filters)
    }

    return item
  }

  async findManyByAssessment(
    item: Assessment,
    queryOptions: RequestHelper.QueryOptions<Report> = {},
  ): Promise<Report[]> {
    if (!item) {
      this.databaseHelper.invalidQueryWhere('assessment')
    }

    const queryOptionsEnsured = {
      includes: queryOptions.includes,
      orders: queryOptions.orders,
      filters: {
        ...queryOptions.filters,
        assessmentId: item.id,
      },
    }

    const query = this.databaseHelper.applyQueryOptions(
      this.repository,
      queryOptionsEnsured,
    )

    return query.getMany()
  }
}
