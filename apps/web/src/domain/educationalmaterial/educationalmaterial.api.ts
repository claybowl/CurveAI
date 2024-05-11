import { HttpService } from '../../core/http'
import { ApiHelper } from '../helpers/api.helper'
import { Educationalmaterial } from './educationalmaterial.model'

export class EducationalmaterialApi {
  static findMany(
    queryOptions?: ApiHelper.QueryOptions<Educationalmaterial>,
  ): Promise<Educationalmaterial[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/educationalmaterials${buildOptions}`)
  }

  static findOne(
    educationalmaterialId: string,
    queryOptions?: ApiHelper.QueryOptions<Educationalmaterial>,
  ): Promise<Educationalmaterial> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/educationalmaterials/${educationalmaterialId}${buildOptions}`,
    )
  }

  static createOne(
    values: Partial<Educationalmaterial>,
  ): Promise<Educationalmaterial> {
    return HttpService.api.post(`/v1/educationalmaterials`, values)
  }

  static updateOne(
    educationalmaterialId: string,
    values: Partial<Educationalmaterial>,
  ): Promise<Educationalmaterial> {
    return HttpService.api.patch(
      `/v1/educationalmaterials/${educationalmaterialId}`,
      values,
    )
  }

  static deleteOne(educationalmaterialId: string): Promise<void> {
    return HttpService.api.delete(
      `/v1/educationalmaterials/${educationalmaterialId}`,
    )
  }
}
