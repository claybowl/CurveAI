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
  Integrationphase,
  IntegrationphaseDomainFacade,
} from '@server/modules/integrationphase/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { RequestHelper } from '../../../helpers/request'
import { IntegrationphaseApplicationEvent } from './integrationphase.application.event'
import {
  IntegrationphaseCreateDto,
  IntegrationphaseUpdateDto,
} from './integrationphase.dto'

@Controller('/v1/integrationphases')
export class IntegrationphaseController {
  constructor(
    private eventService: EventService,
    private integrationphaseDomainFacade: IntegrationphaseDomainFacade,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/')
  async findMany(@Req() request: Request) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const items = await this.integrationphaseDomainFacade.findMany(queryOptions)

    return items
  }

  @Post('/')
  async create(
    @Body() body: IntegrationphaseCreateDto,
    @Req() request: Request,
  ) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const item = await this.integrationphaseDomainFacade.create(body)

    await this.eventService.emit<IntegrationphaseApplicationEvent.IntegrationphaseCreated.Payload>(
      IntegrationphaseApplicationEvent.IntegrationphaseCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }

  @Get('/:integrationphaseId')
  async findOne(
    @Param('integrationphaseId') integrationphaseId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const item = await this.integrationphaseDomainFacade.findOneByIdOrFail(
      integrationphaseId,
      queryOptions,
    )

    return item
  }

  @Patch('/:integrationphaseId')
  async update(
    @Param('integrationphaseId') integrationphaseId: string,
    @Body() body: IntegrationphaseUpdateDto,
  ) {
    const item =
      await this.integrationphaseDomainFacade.findOneByIdOrFail(
        integrationphaseId,
      )

    const itemUpdated = await this.integrationphaseDomainFacade.update(
      item,
      body as Partial<Integrationphase>,
    )
    return itemUpdated
  }

  @Delete('/:integrationphaseId')
  async delete(@Param('integrationphaseId') integrationphaseId: string) {
    const item =
      await this.integrationphaseDomainFacade.findOneByIdOrFail(
        integrationphaseId,
      )

    await this.integrationphaseDomainFacade.delete(item)

    return item
  }
}
