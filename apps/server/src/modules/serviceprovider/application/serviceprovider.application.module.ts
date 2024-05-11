import { Module } from '@nestjs/common'
import { AuthenticationDomainModule } from '@server/modules/authentication/domain'
import { ServiceproviderDomainModule } from '../domain'
import { ServiceproviderController } from './serviceprovider.controller'

@Module({
  imports: [AuthenticationDomainModule, ServiceproviderDomainModule],
  controllers: [ServiceproviderController],
  providers: [],
})
export class ServiceproviderApplicationModule {}
