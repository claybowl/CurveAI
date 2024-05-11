import { Request } from 'express'

import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common'
import { RequestHelper } from '@server/helpers/request'
import { EventService } from '@server/libraries/event'
import { UsertechnologyupdateDomainFacade } from '@server/modules/usertechnologyupdate/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { UsertechnologyupdateApplicationEvent } from './usertechnologyupdate.application.event'
import { UsertechnologyupdateCreateDto } from './usertechnologyupdate.dto'

import { TechnologyupdateDomainFacade } from '../../technologyupdate/domain'

@Controller('/v1/technologyupdates')
export class UsertechnologyupdateByTechnologyupdateController {
  constructor(
    private technologyupdateDomainFacade: TechnologyupdateDomainFacade,

    private usertechnologyupdateDomainFacade: UsertechnologyupdateDomainFacade,
    private eventService: EventService,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/update/:updateId/usertechnologyupdates')
  async findManyUpdateId(
    @Param('updateId') updateId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const parent =
      await this.technologyupdateDomainFacade.findOneByIdOrFail(updateId)

    const items = await this.usertechnologyupdateDomainFacade.findManyByUpdate(
      parent,
      queryOptions,
    )

    return items
  }

  @Post('/update/:updateId/usertechnologyupdates')
  async createByUpdateId(
    @Param('updateId') updateId: string,
    @Body() body: UsertechnologyupdateCreateDto,
    @Req() request: Request,
  ) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const valuesUpdated = { ...body, updateId }

    const item =
      await this.usertechnologyupdateDomainFacade.create(valuesUpdated)

    await this.eventService.emit<UsertechnologyupdateApplicationEvent.UsertechnologyupdateCreated.Payload>(
      UsertechnologyupdateApplicationEvent.UsertechnologyupdateCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }
}
