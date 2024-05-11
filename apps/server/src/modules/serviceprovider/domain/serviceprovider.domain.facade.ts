import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { DatabaseHelper } from '../../../core/database'
import { RequestHelper } from '../../../helpers/request'
import { Serviceprovider } from './serviceprovider.model'

@Injectable()
export class ServiceproviderDomainFacade {
  constructor(
    @InjectRepository(Serviceprovider)
    private repository: Repository<Serviceprovider>,
    private databaseHelper: DatabaseHelper,
  ) {}

  async create(values: Partial<Serviceprovider>): Promise<Serviceprovider> {
    return this.repository.save(values)
  }

  async update(
    item: Serviceprovider,
    values: Partial<Serviceprovider>,
  ): Promise<Serviceprovider> {
    const itemUpdated = { ...item, ...values }

    return this.repository.save(itemUpdated)
  }

  async delete(item: Serviceprovider): Promise<void> {
    await this.repository.softDelete(item.id)
  }

  async findMany(
    queryOptions: RequestHelper.QueryOptions<Serviceprovider> = {},
  ): Promise<Serviceprovider[]> {
    const query = this.databaseHelper.applyQueryOptions(
      this.repository,
      queryOptions,
    )

    return query.getMany()
  }

  async findOneByIdOrFail(
    id: string,
    queryOptions: RequestHelper.QueryOptions<Serviceprovider> = {},
  ): Promise<Serviceprovider> {
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
