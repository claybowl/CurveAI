import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DatabaseHelperModule } from '../../../core/database'
import { EducationalmaterialDomainFacade } from './educationalmaterial.domain.facade'
import { Educationalmaterial } from './educationalmaterial.model'

@Module({
  imports: [
    TypeOrmModule.forFeature([Educationalmaterial]),
    DatabaseHelperModule,
  ],
  providers: [EducationalmaterialDomainFacade, EducationalmaterialDomainFacade],
  exports: [EducationalmaterialDomainFacade],
})
export class EducationalmaterialDomainModule {}
