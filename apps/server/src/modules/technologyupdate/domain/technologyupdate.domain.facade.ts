import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { DatabaseHelper } from '../../../core/database'
import { RequestHelper } from '../../../helpers/request'
import { Technologyupdate } from './technologyupdate.model'

@Injectable()
export class TechnologyupdateDomainFacade {
  constructor(
    @InjectRepository(Technologyupdate)
    private repository: Repository<Technologyupdate>,
    private databaseHelper: DatabaseHelper,
  ) {}

  async create(values: Partial<Technologyupdate>): Promise<Technologyupdate> {
    return this.repository.save(values)
  }

  async update(
    item: Technologyupdate,
    values: Partial<Technologyupdate>,
  ): Promise<Technologyupdate> {
    const itemUpdated = { ...item, ...values }

    return this.repository.save(itemUpdated)
  }

  async delete(item: Technologyupdate): Promise<void> {
    await this.repository.softDelete(item.id)
  }

  async findMany(
    queryOptions: RequestHelper.QueryOptions<Technologyupdate> = {},
  ): Promise<Technologyupdate[]> {
    const query = this.databaseHelper.applyQueryOptions(
      this.repository,
      queryOptions,
    )

    return query.getMany()
  }

  async findOneByIdOrFail(
    id: string,
    queryOptions: RequestHelper.QueryOptions<Technologyupdate> = {},
  ): Promise<Technologyupdate> {
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
}
