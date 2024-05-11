import { Request } from 'express'

import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common'
import { RequestHelper } from '@server/helpers/request'
import { EventService } from '@server/libraries/event'
import { AssessmentDomainFacade } from '@server/modules/assessment/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { AssessmentApplicationEvent } from './assessment.application.event'
import { AssessmentCreateDto } from './assessment.dto'

import { UserDomainFacade } from '../../user/domain'

@Controller('/v1/users')
export class AssessmentByUserController {
  constructor(
    private userDomainFacade: UserDomainFacade,

    private assessmentDomainFacade: AssessmentDomainFacade,
    private eventService: EventService,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/user/:userId/assessments')
  async findManyUserId(
    @Param('userId') userId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const parent = await this.userDomainFacade.findOneByIdOrFail(userId)

    const items = await this.assessmentDomainFacade.findManyByUser(
      parent,
      queryOptions,
    )

    return items
  }

  @Post('/user/:userId/assessments')
  async createByUserId(
    @Param('userId') userId: string,
    @Body() body: AssessmentCreateDto,
    @Req() request: Request,
  ) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const valuesUpdated = { ...body, userId }

    const item = await this.assessmentDomainFacade.create(valuesUpdated)

    await this.eventService.emit<AssessmentApplicationEvent.AssessmentCreated.Payload>(
      AssessmentApplicationEvent.AssessmentCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }
}
