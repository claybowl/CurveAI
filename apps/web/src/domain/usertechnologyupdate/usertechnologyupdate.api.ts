import { HttpService } from '../../core/http'
import { ApiHelper } from '../helpers/api.helper'
import { Usertechnologyupdate } from './usertechnologyupdate.model'

export class UsertechnologyupdateApi {
  static findMany(
    queryOptions?: ApiHelper.QueryOptions<Usertechnologyupdate>,
  ): Promise<Usertechnologyupdate[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/usertechnologyupdates${buildOptions}`)
  }

  static findOne(
    usertechnologyupdateId: string,
    queryOptions?: ApiHelper.QueryOptions<Usertechnologyupdate>,
  ): Promise<Usertechnologyupdate> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/usertechnologyupdates/${usertechnologyupdateId}${buildOptions}`,
    )
  }

  static createOne(
    values: Partial<Usertechnologyupdate>,
  ): Promise<Usertechnologyupdate> {
    return HttpService.api.post(`/v1/usertechnologyupdates`, values)
  }

  static updateOne(
    usertechnologyupdateId: string,
    values: Partial<Usertechnologyupdate>,
  ): Promise<Usertechnologyupdate> {
    return HttpService.api.patch(
      `/v1/usertechnologyupdates/${usertechnologyupdateId}`,
      values,
    )
  }

  static deleteOne(usertechnologyupdateId: string): Promise<void> {
    return HttpService.api.delete(
      `/v1/usertechnologyupdates/${usertechnologyupdateId}`,
    )
  }

  static findManyByUserId(
    userId: string,
    queryOptions?: ApiHelper.QueryOptions<Usertechnologyupdate>,
  ): Promise<Usertechnologyupdate[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/users/user/${userId}/usertechnologyupdates${buildOptions}`,
    )
  }

  static createOneByUserId(
    userId: string,
    values: Partial<Usertechnologyupdate>,
  ): Promise<Usertechnologyupdate> {
    return HttpService.api.post(
      `/v1/users/user/${userId}/usertechnologyupdates`,
      values,
    )
  }

  static findManyByUpdateId(
    updateId: string,
    queryOptions?: ApiHelper.QueryOptions<Usertechnologyupdate>,
  ): Promise<Usertechnologyupdate[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/technologyupdates/update/${updateId}/usertechnologyupdates${buildOptions}`,
    )
  }

  static createOneByUpdateId(
    updateId: string,
    values: Partial<Usertechnologyupdate>,
  ): Promise<Usertechnologyupdate> {
    return HttpService.api.post(
      `/v1/technologyupdates/update/${updateId}/usertechnologyupdates`,
      values,
    )
  }
}
