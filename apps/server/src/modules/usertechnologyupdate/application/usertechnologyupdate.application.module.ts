import { Module } from '@nestjs/common'
import { AuthenticationDomainModule } from '@server/modules/authentication/domain'
import { UsertechnologyupdateDomainModule } from '../domain'
import { UsertechnologyupdateController } from './usertechnologyupdate.controller'

import { UserDomainModule } from '../../../modules/user/domain'

import { UsertechnologyupdateByUserController } from './usertechnologyupdateByUser.controller'

import { TechnologyupdateDomainModule } from '../../../modules/technologyupdate/domain'

import { UsertechnologyupdateByTechnologyupdateController } from './usertechnologyupdateByTechnologyupdate.controller'

@Module({
  imports: [
    AuthenticationDomainModule,
    UsertechnologyupdateDomainModule,

    UserDomainModule,

    TechnologyupdateDomainModule,
  ],
  controllers: [
    UsertechnologyupdateController,

    UsertechnologyupdateByUserController,

    UsertechnologyupdateByTechnologyupdateController,
  ],
  providers: [],
})
export class UsertechnologyupdateApplicationModule {}
