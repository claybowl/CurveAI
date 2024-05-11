import { Request } from 'express'

import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common'
import { RequestHelper } from '@server/helpers/request'
import { EventService } from '@server/libraries/event'
import { IntegrationphaseDomainFacade } from '@server/modules/integrationphase/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { IntegrationphaseApplicationEvent } from './integrationphase.application.event'
import { IntegrationphaseCreateDto } from './integrationphase.dto'

import { UserDomainFacade } from '../../user/domain'

@Controller('/v1/users')
export class IntegrationphaseByUserController {
  constructor(
    private userDomainFacade: UserDomainFacade,

    private integrationphaseDomainFacade: IntegrationphaseDomainFacade,
    private eventService: EventService,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/user/:userId/integrationphases')
  async findManyUserId(
    @Param('userId') userId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const parent = await this.userDomainFacade.findOneByIdOrFail(userId)

    const items = await this.integrationphaseDomainFacade.findManyByUser(
      parent,
      queryOptions,
    )

    return items
  }

  @Post('/user/:userId/integrationphases')
  async createByUserId(
    @Param('userId') userId: string,
    @Body() body: IntegrationphaseCreateDto,
    @Req() request: Request,
  ) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const valuesUpdated = { ...body, userId }

    const item = await this.integrationphaseDomainFacade.create(valuesUpdated)

    await this.eventService.emit<IntegrationphaseApplicationEvent.IntegrationphaseCreated.Payload>(
      IntegrationphaseApplicationEvent.IntegrationphaseCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }
}
