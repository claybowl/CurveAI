import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DatabaseHelperModule } from '../../../core/database'
import { TechnologyupdateDomainFacade } from './technologyupdate.domain.facade'
import { Technologyupdate } from './technologyupdate.model'

@Module({
  imports: [TypeOrmModule.forFeature([Technologyupdate]), DatabaseHelperModule],
  providers: [TechnologyupdateDomainFacade, TechnologyupdateDomainFacade],
  exports: [TechnologyupdateDomainFacade],
})
export class TechnologyupdateDomainModule {}
