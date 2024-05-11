import { Request } from 'express'

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
} from '@nestjs/common'
import { EventService } from '@server/libraries/event'
import {
  Assessment,
  AssessmentDomainFacade,
} from '@server/modules/assessment/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { RequestHelper } from '../../../helpers/request'
import { AssessmentApplicationEvent } from './assessment.application.event'
import { AssessmentCreateDto, AssessmentUpdateDto } from './assessment.dto'

@Controller('/v1/assessments')
export class AssessmentController {
  constructor(
    private eventService: EventService,
    private assessmentDomainFacade: AssessmentDomainFacade,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/')
  async findMany(@Req() request: Request) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const items = await this.assessmentDomainFacade.findMany(queryOptions)

    return items
  }

  @Post('/')
  async create(@Body() body: AssessmentCreateDto, @Req() request: Request) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const item = await this.assessmentDomainFacade.create(body)

    await this.eventService.emit<AssessmentApplicationEvent.AssessmentCreated.Payload>(
      AssessmentApplicationEvent.AssessmentCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }

  @Get('/:assessmentId')
  async findOne(
    @Param('assessmentId') assessmentId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const item = await this.assessmentDomainFacade.findOneByIdOrFail(
      assessmentId,
      queryOptions,
    )

    return item
  }

  @Patch('/:assessmentId')
  async update(
    @Param('assessmentId') assessmentId: string,
    @Body() body: AssessmentUpdateDto,
  ) {
    const item =
      await this.assessmentDomainFacade.findOneByIdOrFail(assessmentId)

    const itemUpdated = await this.assessmentDomainFacade.update(
      item,
      body as Partial<Assessment>,
    )
    return itemUpdated
  }

  @Delete('/:assessmentId')
  async delete(@Param('assessmentId') assessmentId: string) {
    const item =
      await this.assessmentDomainFacade.findOneByIdOrFail(assessmentId)

    await this.assessmentDomainFacade.delete(item)

    return item
  }
}
