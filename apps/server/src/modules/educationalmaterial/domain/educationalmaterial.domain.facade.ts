import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { DatabaseHelper } from '../../../core/database'
import { RequestHelper } from '../../../helpers/request'
import { Educationalmaterial } from './educationalmaterial.model'

@Injectable()
export class EducationalmaterialDomainFacade {
  constructor(
    @InjectRepository(Educationalmaterial)
    private repository: Repository<Educationalmaterial>,
    private databaseHelper: DatabaseHelper,
  ) {}

  async create(
    values: Partial<Educationalmaterial>,
  ): Promise<Educationalmaterial> {
    return this.repository.save(values)
  }

  async update(
    item: Educationalmaterial,
    values: Partial<Educationalmaterial>,
  ): Promise<Educationalmaterial> {
    const itemUpdated = { ...item, ...values }

    return this.repository.save(itemUpdated)
  }

  async delete(item: Educationalmaterial): Promise<void> {
    await this.repository.softDelete(item.id)
  }

  async findMany(
    queryOptions: RequestHelper.QueryOptions<Educationalmaterial> = {},
  ): Promise<Educationalmaterial[]> {
    const query = this.databaseHelper.applyQueryOptions(
      this.repository,
      queryOptions,
    )

    return query.getMany()
  }

  async findOneByIdOrFail(
    id: string,
    queryOptions: RequestHelper.QueryOptions<Educationalmaterial> = {},
  ): Promise<Educationalmaterial> {
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
