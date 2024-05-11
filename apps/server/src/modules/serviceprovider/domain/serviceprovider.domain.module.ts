import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DatabaseHelperModule } from '../../../core/database'
import { ServiceproviderDomainFacade } from './serviceprovider.domain.facade'
import { Serviceprovider } from './serviceprovider.model'

@Module({
  imports: [TypeOrmModule.forFeature([Serviceprovider]), DatabaseHelperModule],
  providers: [ServiceproviderDomainFacade, ServiceproviderDomainFacade],
  exports: [ServiceproviderDomainFacade],
})
export class ServiceproviderDomainModule {}
