import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { DatabaseHelper } from '../../../core/database'
import { RequestHelper } from '../../../helpers/request'
import { Usertechnologyupdate } from './usertechnologyupdate.model'

import { User } from '../../user/domain'

import { Technologyupdate } from '../../technologyupdate/domain'

@Injectable()
export class UsertechnologyupdateDomainFacade {
  constructor(
    @InjectRepository(Usertechnologyupdate)
    private repository: Repository<Usertechnologyupdate>,
    private databaseHelper: DatabaseHelper,
  ) {}

  async create(
    values: Partial<Usertechnologyupdate>,
  ): Promise<Usertechnologyupdate> {
    return this.repository.save(values)
  }

  async update(
    item: Usertechnologyupdate,
    values: Partial<Usertechnologyupdate>,
  ): Promise<Usertechnologyupdate> {
    const itemUpdated = { ...item, ...values }

    return this.repository.save(itemUpdated)
  }

  async delete(item: Usertechnologyupdate): Promise<void> {
    await this.repository.softDelete(item.id)
  }

  async findMany(
    queryOptions: RequestHelper.QueryOptions<Usertechnologyupdate> = {},
  ): Promise<Usertechnologyupdate[]> {
    const query = this.databaseHelper.applyQueryOptions(
      this.repository,
      queryOptions,
    )

    return query.getMany()
  }

  async findOneByIdOrFail(
    id: string,
    queryOptions: RequestHelper.QueryOptions<Usertechnologyupdate> = {},
  ): Promise<Usertechnologyupdate> {
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

  async findManyByUser(
    item: User,
    queryOptions: RequestHelper.QueryOptions<Usertechnologyupdate> = {},
  ): Promise<Usertechnologyupdate[]> {
    if (!item) {
      this.databaseHelper.invalidQueryWhere('user')
    }

    const queryOptionsEnsured = {
      includes: queryOptions.includes,
      orders: queryOptions.orders,
      filters: {
        ...queryOptions.filters,
        userId: item.id,
      },
    }

    const query = this.databaseHelper.applyQueryOptions(
      this.repository,
      queryOptionsEnsured,
    )

    return query.getMany()
  }

  async findManyByUpdate(
    item: Technologyupdate,
    queryOptions: RequestHelper.QueryOptions<Usertechnologyupdate> = {},
  ): Promise<Usertechnologyupdate[]> {
    if (!item) {
      this.databaseHelper.invalidQueryWhere('update')
    }

    const queryOptionsEnsured = {
      includes: queryOptions.includes,
      orders: queryOptions.orders,
      filters: {
        ...queryOptions.filters,
        updateId: item.id,
      },
    }

    const query = this.databaseHelper.applyQueryOptions(
      this.repository,
      queryOptionsEnsured,
    )

    return query.getMany()
  }
}
