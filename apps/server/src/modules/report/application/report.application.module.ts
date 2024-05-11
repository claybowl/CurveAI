import { Module } from '@nestjs/common'
import { AuthenticationDomainModule } from '@server/modules/authentication/domain'
import { ReportDomainModule } from '../domain'
import { ReportController } from './report.controller'

import { AssessmentDomainModule } from '../../../modules/assessment/domain'

import { ReportByAssessmentController } from './reportByAssessment.controller'

@Module({
  imports: [
    AuthenticationDomainModule,
    ReportDomainModule,

    AssessmentDomainModule,
  ],
  controllers: [ReportController, ReportByAssessmentController],
  providers: [],
})
export class ReportApplicationModule {}
