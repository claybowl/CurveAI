import { Module } from '@nestjs/common'
import { SocketModule } from '@server/libraries/socket'
import { AuthorizationDomainModule } from '@server/modules/authorization/domain'
import { NotificationDomainModule } from '../domain'

import { NotificationAssessmentSubscriber } from './subscribers/notification.assessment.subscriber'

import { NotificationReportSubscriber } from './subscribers/notification.report.subscriber'

import { NotificationServiceproviderSubscriber } from './subscribers/notification.serviceprovider.subscriber'

import { NotificationEducationalmaterialSubscriber } from './subscribers/notification.educationalmaterial.subscriber'

import { NotificationIntegrationphaseSubscriber } from './subscribers/notification.integrationphase.subscriber'

import { NotificationTechnologyupdateSubscriber } from './subscribers/notification.technologyupdate.subscriber'

import { NotificationUsertechnologyupdateSubscriber } from './subscribers/notification.usertechnologyupdate.subscriber'

@Module({
  imports: [AuthorizationDomainModule, NotificationDomainModule, SocketModule],
  providers: [
    NotificationAssessmentSubscriber,

    NotificationReportSubscriber,

    NotificationServiceproviderSubscriber,

    NotificationEducationalmaterialSubscriber,

    NotificationIntegrationphaseSubscriber,

    NotificationTechnologyupdateSubscriber,

    NotificationUsertechnologyupdateSubscriber,
  ],
  exports: [],
})
export class NotificationInfrastructureModule {}
