import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DatabaseHelperModule } from '../../../core/database'
import { UsertechnologyupdateDomainFacade } from './usertechnologyupdate.domain.facade'
import { Usertechnologyupdate } from './usertechnologyupdate.model'

@Module({
  imports: [
    TypeOrmModule.forFeature([Usertechnologyupdate]),
    DatabaseHelperModule,
  ],
  providers: [
    UsertechnologyupdateDomainFacade,
    UsertechnologyupdateDomainFacade,
  ],
  exports: [UsertechnologyupdateDomainFacade],
})
export class UsertechnologyupdateDomainModule {}
