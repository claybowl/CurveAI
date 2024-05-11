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
import { Report, ReportDomainFacade } from '@server/modules/report/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { RequestHelper } from '../../../helpers/request'
import { ReportApplicationEvent } from './report.application.event'
import { ReportCreateDto, ReportUpdateDto } from './report.dto'

@Controller('/v1/reports')
export class ReportController {
  constructor(
    private eventService: EventService,
    private reportDomainFacade: ReportDomainFacade,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/')
  async findMany(@Req() request: Request) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const items = await this.reportDomainFacade.findMany(queryOptions)

    return items
  }

  @Post('/')
  async create(@Body() body: ReportCreateDto, @Req() request: Request) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const item = await this.reportDomainFacade.create(body)

    await this.eventService.emit<ReportApplicationEvent.ReportCreated.Payload>(
      ReportApplicationEvent.ReportCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }

  @Get('/:reportId')
  async findOne(@Param('reportId') reportId: string, @Req() request: Request) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const item = await this.reportDomainFacade.findOneByIdOrFail(
      reportId,
      queryOptions,
    )

    return item
  }

  @Patch('/:reportId')
  async update(
    @Param('reportId') reportId: string,
    @Body() body: ReportUpdateDto,
  ) {
    const item = await this.reportDomainFacade.findOneByIdOrFail(reportId)

    const itemUpdated = await this.reportDomainFacade.update(
      item,
      body as Partial<Report>,
    )
    return itemUpdated
  }

  @Delete('/:reportId')
  async delete(@Param('reportId') reportId: string) {
    const item = await this.reportDomainFacade.findOneByIdOrFail(reportId)

    await this.reportDomainFacade.delete(item)

    return item
  }
}
