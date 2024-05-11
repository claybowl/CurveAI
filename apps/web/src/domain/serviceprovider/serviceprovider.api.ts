import { HttpService } from '../../core/http'
import { ApiHelper } from '../helpers/api.helper'
import { Serviceprovider } from './serviceprovider.model'

export class ServiceproviderApi {
  static findMany(
    queryOptions?: ApiHelper.QueryOptions<Serviceprovider>,
  ): Promise<Serviceprovider[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/serviceproviders${buildOptions}`)
  }

  static findOne(
    serviceproviderId: string,
    queryOptions?: ApiHelper.QueryOptions<Serviceprovider>,
  ): Promise<Serviceprovider> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/serviceproviders/${serviceproviderId}${buildOptions}`,
    )
  }

  static createOne(values: Partial<Serviceprovider>): Promise<Serviceprovider> {
    return HttpService.api.post(`/v1/serviceproviders`, values)
  }

  static updateOne(
    serviceproviderId: string,
    values: Partial<Serviceprovider>,
  ): Promise<Serviceprovider> {
    return HttpService.api.patch(
      `/v1/serviceproviders/${serviceproviderId}`,
      values,
    )
  }

  static deleteOne(serviceproviderId: string): Promise<void> {
    return HttpService.api.delete(`/v1/serviceproviders/${serviceproviderId}`)
  }
}
