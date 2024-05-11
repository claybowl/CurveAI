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
  Technologyupdate,
  TechnologyupdateDomainFacade,
} from '@server/modules/technologyupdate/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { RequestHelper } from '../../../helpers/request'
import { TechnologyupdateApplicationEvent } from './technologyupdate.application.event'
import {
  TechnologyupdateCreateDto,
  TechnologyupdateUpdateDto,
} from './technologyupdate.dto'

@Controller('/v1/technologyupdates')
export class TechnologyupdateController {
  constructor(
    private eventService: EventService,
    private technologyupdateDomainFacade: TechnologyupdateDomainFacade,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/')
  async findMany(@Req() request: Request) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const items = await this.technologyupdateDomainFacade.findMany(queryOptions)

    return items
  }

  @Post('/')
  async create(
    @Body() body: TechnologyupdateCreateDto,
    @Req() request: Request,
  ) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const item = await this.technologyupdateDomainFacade.create(body)

    await this.eventService.emit<TechnologyupdateApplicationEvent.TechnologyupdateCreated.Payload>(
      TechnologyupdateApplicationEvent.TechnologyupdateCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }

  @Get('/:technologyupdateId')
  async findOne(
    @Param('technologyupdateId') technologyupdateId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const item = await this.technologyupdateDomainFacade.findOneByIdOrFail(
      technologyupdateId,
      queryOptions,
    )

    return item
  }

  @Patch('/:technologyupdateId')
  async update(
    @Param('technologyupdateId') technologyupdateId: string,
    @Body() body: TechnologyupdateUpdateDto,
  ) {
    const item =
      await this.technologyupdateDomainFacade.findOneByIdOrFail(
        technologyupdateId,
      )

    const itemUpdated = await this.technologyupdateDomainFacade.update(
      item,
      body as Partial<Technologyupdate>,
    )
    return itemUpdated
  }

  @Delete('/:technologyupdateId')
  async delete(@Param('technologyupdateId') technologyupdateId: string) {
    const item =
      await this.technologyupdateDomainFacade.findOneByIdOrFail(
        technologyupdateId,
      )

    await this.technologyupdateDomainFacade.delete(item)

    return item
  }
}
