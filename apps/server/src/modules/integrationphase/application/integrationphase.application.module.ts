import { Module } from '@nestjs/common'
import { AuthenticationDomainModule } from '@server/modules/authentication/domain'
import { IntegrationphaseDomainModule } from '../domain'
import { IntegrationphaseController } from './integrationphase.controller'

import { UserDomainModule } from '../../../modules/user/domain'

import { IntegrationphaseByUserController } from './integrationphaseByUser.controller'

@Module({
  imports: [
    AuthenticationDomainModule,
    IntegrationphaseDomainModule,

    UserDomainModule,
  ],
  controllers: [IntegrationphaseController, IntegrationphaseByUserController],
  providers: [],
})
export class IntegrationphaseApplicationModule {}
