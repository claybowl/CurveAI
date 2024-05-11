import { Module } from '@nestjs/common'
import { AuthenticationDomainModule } from './authentication/domain'
import { AuthorizationDomainModule } from './authorization/domain'

import { UserDomainModule } from './user/domain'

import { NotificationDomainModule } from './notification/domain'

import { AssessmentDomainModule } from './assessment/domain'

import { ReportDomainModule } from './report/domain'

import { ServiceproviderDomainModule } from './serviceprovider/domain'

import { EducationalmaterialDomainModule } from './educationalmaterial/domain'

import { IntegrationphaseDomainModule } from './integrationphase/domain'

import { TechnologyupdateDomainModule } from './technologyupdate/domain'

import { UsertechnologyupdateDomainModule } from './usertechnologyupdate/domain'

@Module({
  imports: [
    AuthenticationDomainModule,
    AuthorizationDomainModule,
    UserDomainModule,
    NotificationDomainModule,

    AssessmentDomainModule,

    ReportDomainModule,

    ServiceproviderDomainModule,

    EducationalmaterialDomainModule,

    IntegrationphaseDomainModule,

    TechnologyupdateDomainModule,

    UsertechnologyupdateDomainModule,
  ],
  controllers: [],
  providers: [],
})
export class AppDomainModule {}
