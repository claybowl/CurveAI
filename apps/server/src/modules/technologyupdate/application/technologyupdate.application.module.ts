import { Module } from '@nestjs/common'
import { AuthenticationDomainModule } from '@server/modules/authentication/domain'
import { TechnologyupdateDomainModule } from '../domain'
import { TechnologyupdateController } from './technologyupdate.controller'

@Module({
  imports: [AuthenticationDomainModule, TechnologyupdateDomainModule],
  controllers: [TechnologyupdateController],
  providers: [],
})
export class TechnologyupdateApplicationModule {}
