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
  Usertechnologyupdate,
  UsertechnologyupdateDomainFacade,
} from '@server/modules/usertechnologyupdate/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { RequestHelper } from '../../../helpers/request'
import { UsertechnologyupdateApplicationEvent } from './usertechnologyupdate.application.event'
import {
  UsertechnologyupdateCreateDto,
  UsertechnologyupdateUpdateDto,
} from './usertechnologyupdate.dto'

@Controller('/v1/usertechnologyupdates')
export class UsertechnologyupdateController {
  constructor(
    private eventService: EventService,
    private usertechnologyupdateDomainFacade: UsertechnologyupdateDomainFacade,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/')
  async findMany(@Req() request: Request) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const items =
      await this.usertechnologyupdateDomainFacade.findMany(queryOptions)

    return items
  }

  @Post('/')
  async create(
    @Body() body: UsertechnologyupdateCreateDto,
    @Req() request: Request,
  ) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const item = await this.usertechnologyupdateDomainFacade.create(body)

    await this.eventService.emit<UsertechnologyupdateApplicationEvent.UsertechnologyupdateCreated.Payload>(
      UsertechnologyupdateApplicationEvent.UsertechnologyupdateCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }

  @Get('/:usertechnologyupdateId')
  async findOne(
    @Param('usertechnologyupdateId') usertechnologyupdateId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const item = await this.usertechnologyupdateDomainFacade.findOneByIdOrFail(
      usertechnologyupdateId,
      queryOptions,
    )

    return item
  }

  @Patch('/:usertechnologyupdateId')
  async update(
    @Param('usertechnologyupdateId') usertechnologyupdateId: string,
    @Body() body: UsertechnologyupdateUpdateDto,
  ) {
    const item = await this.usertechnologyupdateDomainFacade.findOneByIdOrFail(
      usertechnologyupdateId,
    )

    const itemUpdated = await this.usertechnologyupdateDomainFacade.update(
      item,
      body as Partial<Usertechnologyupdate>,
    )
    return itemUpdated
  }

  @Delete('/:usertechnologyupdateId')
  async delete(
    @Param('usertechnologyupdateId') usertechnologyupdateId: string,
  ) {
    const item = await this.usertechnologyupdateDomainFacade.findOneByIdOrFail(
      usertechnologyupdateId,
    )

    await this.usertechnologyupdateDomainFacade.delete(item)

    return item
  }
}
