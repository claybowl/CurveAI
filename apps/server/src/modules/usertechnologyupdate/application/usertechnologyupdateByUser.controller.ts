import { Request } from 'express'

import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common'
import { RequestHelper } from '@server/helpers/request'
import { EventService } from '@server/libraries/event'
import { UsertechnologyupdateDomainFacade } from '@server/modules/usertechnologyupdate/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { UsertechnologyupdateApplicationEvent } from './usertechnologyupdate.application.event'
import { UsertechnologyupdateCreateDto } from './usertechnologyupdate.dto'

import { UserDomainFacade } from '../../user/domain'

@Controller('/v1/users')
export class UsertechnologyupdateByUserController {
  constructor(
    private userDomainFacade: UserDomainFacade,

    private usertechnologyupdateDomainFacade: UsertechnologyupdateDomainFacade,
    private eventService: EventService,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/user/:userId/usertechnologyupdates')
  async findManyUserId(
    @Param('userId') userId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const parent = await this.userDomainFacade.findOneByIdOrFail(userId)

    const items = await this.usertechnologyupdateDomainFacade.findManyByUser(
      parent,
      queryOptions,
    )

    return items
  }

  @Post('/user/:userId/usertechnologyupdates')
  async createByUserId(
    @Param('userId') userId: string,
    @Body() body: UsertechnologyupdateCreateDto,
    @Req() request: Request,
  ) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const valuesUpdated = { ...body, userId }

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
