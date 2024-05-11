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
  Serviceprovider,
  ServiceproviderDomainFacade,
} from '@server/modules/serviceprovider/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { RequestHelper } from '../../../helpers/request'
import { ServiceproviderApplicationEvent } from './serviceprovider.application.event'
import {
  ServiceproviderCreateDto,
  ServiceproviderUpdateDto,
} from './serviceprovider.dto'

@Controller('/v1/serviceproviders')
export class ServiceproviderController {
  constructor(
    private eventService: EventService,
    private serviceproviderDomainFacade: ServiceproviderDomainFacade,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/')
  async findMany(@Req() request: Request) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const items = await this.serviceproviderDomainFacade.findMany(queryOptions)

    return items
  }

  @Post('/')
  async create(
    @Body() body: ServiceproviderCreateDto,
    @Req() request: Request,
  ) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const item = await this.serviceproviderDomainFacade.create(body)

    await this.eventService.emit<ServiceproviderApplicationEvent.ServiceproviderCreated.Payload>(
      ServiceproviderApplicationEvent.ServiceproviderCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }

  @Get('/:serviceproviderId')
  async findOne(
    @Param('serviceproviderId') serviceproviderId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const item = await this.serviceproviderDomainFacade.findOneByIdOrFail(
      serviceproviderId,
      queryOptions,
    )

    return item
  }

  @Patch('/:serviceproviderId')
  async update(
    @Param('serviceproviderId') serviceproviderId: string,
    @Body() body: ServiceproviderUpdateDto,
  ) {
    const item =
      await this.serviceproviderDomainFacade.findOneByIdOrFail(
        serviceproviderId,
      )

    const itemUpdated = await this.serviceproviderDomainFacade.update(
      item,
      body as Partial<Serviceprovider>,
    )
    return itemUpdated
  }

  @Delete('/:serviceproviderId')
  async delete(@Param('serviceproviderId') serviceproviderId: string) {
    const item =
      await this.serviceproviderDomainFacade.findOneByIdOrFail(
        serviceproviderId,
      )

    await this.serviceproviderDomainFacade.delete(item)

    return item
  }
}
