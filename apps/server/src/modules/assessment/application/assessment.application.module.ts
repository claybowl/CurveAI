import { Module } from '@nestjs/common'
import { AuthenticationDomainModule } from '@server/modules/authentication/domain'
import { AssessmentDomainModule } from '../domain'
import { AssessmentController } from './assessment.controller'

import { UserDomainModule } from '../../../modules/user/domain'

import { AssessmentByUserController } from './assessmentByUser.controller'

@Module({
  imports: [
    AuthenticationDomainModule,
    AssessmentDomainModule,

    UserDomainModule,
  ],
  controllers: [AssessmentController, AssessmentByUserController],
  providers: [],
})
export class AssessmentApplicationModule {}
