import { HttpService } from '../../core/http'
import { ApiHelper } from '../helpers/api.helper'
import { Integrationphase } from './integrationphase.model'

export class IntegrationphaseApi {
  static findMany(
    queryOptions?: ApiHelper.QueryOptions<Integrationphase>,
  ): Promise<Integrationphase[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/integrationphases${buildOptions}`)
  }

  static findOne(
    integrationphaseId: string,
    queryOptions?: ApiHelper.QueryOptions<Integrationphase>,
  ): Promise<Integrationphase> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/integrationphases/${integrationphaseId}${buildOptions}`,
    )
  }

  static createOne(
    values: Partial<Integrationphase>,
  ): Promise<Integrationphase> {
    return HttpService.api.post(`/v1/integrationphases`, values)
  }

  static updateOne(
    integrationphaseId: string,
    values: Partial<Integrationphase>,
  ): Promise<Integrationphase> {
    return HttpService.api.patch(
      `/v1/integrationphases/${integrationphaseId}`,
      values,
    )
  }

  static deleteOne(integrationphaseId: string): Promise<void> {
    return HttpService.api.delete(`/v1/integrationphases/${integrationphaseId}`)
  }

  static findManyByUserId(
    userId: string,
    queryOptions?: ApiHelper.QueryOptions<Integrationphase>,
  ): Promise<Integrationphase[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/users/user/${userId}/integrationphases${buildOptions}`,
    )
  }

  static createOneByUserId(
    userId: string,
    values: Partial<Integrationphase>,
  ): Promise<Integrationphase> {
    return HttpService.api.post(
      `/v1/users/user/${userId}/integrationphases`,
      values,
    )
  }
}
