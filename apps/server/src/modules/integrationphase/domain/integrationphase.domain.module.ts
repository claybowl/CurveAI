import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DatabaseHelperModule } from '../../../core/database'
import { IntegrationphaseDomainFacade } from './integrationphase.domain.facade'
import { Integrationphase } from './integrationphase.model'

@Module({
  imports: [TypeOrmModule.forFeature([Integrationphase]), DatabaseHelperModule],
  providers: [IntegrationphaseDomainFacade, IntegrationphaseDomainFacade],
  exports: [IntegrationphaseDomainFacade],
})
export class IntegrationphaseDomainModule {}
