import { Request } from 'express'

import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common'
import { RequestHelper } from '@server/helpers/request'
import { EventService } from '@server/libraries/event'
import { ReportDomainFacade } from '@server/modules/report/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { ReportApplicationEvent } from './report.application.event'
import { ReportCreateDto } from './report.dto'

import { AssessmentDomainFacade } from '../../assessment/domain'

@Controller('/v1/assessments')
export class ReportByAssessmentController {
  constructor(
    private assessmentDomainFacade: AssessmentDomainFacade,

    private reportDomainFacade: ReportDomainFacade,
    private eventService: EventService,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/assessment/:assessmentId/reports')
  async findManyAssessmentId(
    @Param('assessmentId') assessmentId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const parent =
      await this.assessmentDomainFacade.findOneByIdOrFail(assessmentId)

    const items = await this.reportDomainFacade.findManyByAssessment(
      parent,
      queryOptions,
    )

    return items
  }

  @Post('/assessment/:assessmentId/reports')
  async createByAssessmentId(
    @Param('assessmentId') assessmentId: string,
    @Body() body: ReportCreateDto,
    @Req() request: Request,
  ) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const valuesUpdated = { ...body, assessmentId }

    const item = await this.reportDomainFacade.create(valuesUpdated)

    await this.eventService.emit<ReportApplicationEvent.ReportCreated.Payload>(
      ReportApplicationEvent.ReportCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }
}
