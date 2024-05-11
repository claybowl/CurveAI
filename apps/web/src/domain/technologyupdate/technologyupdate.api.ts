import { HttpService } from '../../core/http'
import { ApiHelper } from '../helpers/api.helper'
import { Technologyupdate } from './technologyupdate.model'

export class TechnologyupdateApi {
  static findMany(
    queryOptions?: ApiHelper.QueryOptions<Technologyupdate>,
  ): Promise<Technologyupdate[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/technologyupdates${buildOptions}`)
  }

  static findOne(
    technologyupdateId: string,
    queryOptions?: ApiHelper.QueryOptions<Technologyupdate>,
  ): Promise<Technologyupdate> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/technologyupdates/${technologyupdateId}${buildOptions}`,
    )
  }

  static createOne(
    values: Partial<Technologyupdate>,
  ): Promise<Technologyupdate> {
    return HttpService.api.post(`/v1/technologyupdates`, values)
  }

  static updateOne(
    technologyupdateId: string,
    values: Partial<Technologyupdate>,
  ): Promise<Technologyupdate> {
    return HttpService.api.patch(
      `/v1/technologyupdates/${technologyupdateId}`,
      values,
    )
  }

  static deleteOne(technologyupdateId: string): Promise<void> {
    return HttpService.api.delete(`/v1/technologyupdates/${technologyupdateId}`)
  }
}
