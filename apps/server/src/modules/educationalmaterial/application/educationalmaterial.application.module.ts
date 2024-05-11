import { Module } from '@nestjs/common'
import { AuthenticationDomainModule } from '@server/modules/authentication/domain'
import { EducationalmaterialDomainModule } from '../domain'
import { EducationalmaterialController } from './educationalmaterial.controller'

@Module({
  imports: [AuthenticationDomainModule, EducationalmaterialDomainModule],
  controllers: [EducationalmaterialController],
  providers: [],
})
export class EducationalmaterialApplicationModule {}
