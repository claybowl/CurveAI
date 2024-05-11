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
  Educationalmaterial,
  EducationalmaterialDomainFacade,
} from '@server/modules/educationalmaterial/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { RequestHelper } from '../../../helpers/request'
import { EducationalmaterialApplicationEvent } from './educationalmaterial.application.event'
import {
  EducationalmaterialCreateDto,
  EducationalmaterialUpdateDto,
} from './educationalmaterial.dto'

@Controller('/v1/educationalmaterials')
export class EducationalmaterialController {
  constructor(
    private eventService: EventService,
    private educationalmaterialDomainFacade: EducationalmaterialDomainFacade,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/')
  async findMany(@Req() request: Request) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const items =
      await this.educationalmaterialDomainFacade.findMany(queryOptions)

    return items
  }

  @Post('/')
  async create(
    @Body() body: EducationalmaterialCreateDto,
    @Req() request: Request,
  ) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const item = await this.educationalmaterialDomainFacade.create(body)

    await this.eventService.emit<EducationalmaterialApplicationEvent.EducationalmaterialCreated.Payload>(
      EducationalmaterialApplicationEvent.EducationalmaterialCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }

  @Get('/:educationalmaterialId')
  async findOne(
    @Param('educationalmaterialId') educationalmaterialId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const item = await this.educationalmaterialDomainFacade.findOneByIdOrFail(
      educationalmaterialId,
      queryOptions,
    )

    return item
  }

  @Patch('/:educationalmaterialId')
  async update(
    @Param('educationalmaterialId') educationalmaterialId: string,
    @Body() body: EducationalmaterialUpdateDto,
  ) {
    const item = await this.educationalmaterialDomainFacade.findOneByIdOrFail(
      educationalmaterialId,
    )

    const itemUpdated = await this.educationalmaterialDomainFacade.update(
      item,
      body as Partial<Educationalmaterial>,
    )
    return itemUpdated
  }

  @Delete('/:educationalmaterialId')
  async delete(@Param('educationalmaterialId') educationalmaterialId: string) {
    const item = await this.educationalmaterialDomainFacade.findOneByIdOrFail(
      educationalmaterialId,
    )

    await this.educationalmaterialDomainFacade.delete(item)

    return item
  }
}
