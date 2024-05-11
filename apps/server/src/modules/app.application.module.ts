import { Module } from '@nestjs/common'
import { AuthenticationApplicationModule } from './authentication/application'
import { AuthorizationApplicationModule } from './authorization/application'
import { UserApplicationModule } from './user/application'

import { AssessmentApplicationModule } from './assessment/application'

import { ReportApplicationModule } from './report/application'

import { ServiceproviderApplicationModule } from './serviceprovider/application'

import { EducationalmaterialApplicationModule } from './educationalmaterial/application'

import { IntegrationphaseApplicationModule } from './integrationphase/application'

import { TechnologyupdateApplicationModule } from './technologyupdate/application'

import { UsertechnologyupdateApplicationModule } from './usertechnologyupdate/application'

import { AiApplicationModule } from './ai/application/ai.application.module'
import { NotificationApplicationModule } from './notification/application/notification.application.module'
import { UploadApplicationModule } from './upload/application/upload.application.module'

@Module({
  imports: [
    AuthenticationApplicationModule,
    UserApplicationModule,
    AuthorizationApplicationModule,
    NotificationApplicationModule,
    AiApplicationModule,
    UploadApplicationModule,

    AssessmentApplicationModule,

    ReportApplicationModule,

    ServiceproviderApplicationModule,

    EducationalmaterialApplicationModule,

    IntegrationphaseApplicationModule,

    TechnologyupdateApplicationModule,

    UsertechnologyupdateApplicationModule,
  ],
  controllers: [],
  providers: [],
})
export class AppApplicationModule {}
