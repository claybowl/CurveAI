import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DatabaseHelperModule } from '../../../core/database'
import { AssessmentDomainFacade } from './assessment.domain.facade'
import { Assessment } from './assessment.model'

@Module({
  imports: [TypeOrmModule.forFeature([Assessment]), DatabaseHelperModule],
  providers: [AssessmentDomainFacade, AssessmentDomainFacade],
  exports: [AssessmentDomainFacade],
})
export class AssessmentDomainModule {}
