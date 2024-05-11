import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DatabaseHelperModule } from '../../../core/database'
import { ReportDomainFacade } from './report.domain.facade'
import { Report } from './report.model'

@Module({
  imports: [TypeOrmModule.forFeature([Report]), DatabaseHelperModule],
  providers: [ReportDomainFacade, ReportDomainFacade],
  exports: [ReportDomainFacade],
})
export class ReportDomainModule {}
