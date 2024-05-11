import { HttpService } from '../../core/http'
import { ApiHelper } from '../helpers/api.helper'
import { Assessment } from './assessment.model'

export class AssessmentApi {
  static findMany(
    queryOptions?: ApiHelper.QueryOptions<Assessment>,
  ): Promise<Assessment[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/assessments${buildOptions}`)
  }

  static findOne(
    assessmentId: string,
    queryOptions?: ApiHelper.QueryOptions<Assessment>,
  ): Promise<Assessment> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/assessments/${assessmentId}${buildOptions}`)
  }

  static createOne(values: Partial<Assessment>): Promise<Assessment> {
    return HttpService.api.post(`/v1/assessments`, values)
  }

  static updateOne(
    assessmentId: string,
    values: Partial<Assessment>,
  ): Promise<Assessment> {
    return HttpService.api.patch(`/v1/assessments/${assessmentId}`, values)
  }

  static deleteOne(assessmentId: string): Promise<void> {
    return HttpService.api.delete(`/v1/assessments/${assessmentId}`)
  }

  static findManyByUserId(
    userId: string,
    queryOptions?: ApiHelper.QueryOptions<Assessment>,
  ): Promise<Assessment[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/users/user/${userId}/assessments${buildOptions}`,
    )
  }

  static createOneByUserId(
    userId: string,
    values: Partial<Assessment>,
  ): Promise<Assessment> {
    return HttpService.api.post(`/v1/users/user/${userId}/assessments`, values)
  }
}
