import { AiApi } from './ai/ai.api'
import { AuthenticationApi } from './authentication/authentication.api'
import { AuthorizationApi } from './authorization/authorization.api'
import { UploadApi } from './upload/upload.api'

import { UserApi } from './user/user.api'

import { NotificationApi } from './notification/notification.api'

import { AssessmentApi } from './assessment/assessment.api'

import { ReportApi } from './report/report.api'

import { ServiceproviderApi } from './serviceprovider/serviceprovider.api'

import { EducationalmaterialApi } from './educationalmaterial/educationalmaterial.api'

import { IntegrationphaseApi } from './integrationphase/integrationphase.api'

import { TechnologyupdateApi } from './technologyupdate/technologyupdate.api'

import { UsertechnologyupdateApi } from './usertechnologyupdate/usertechnologyupdate.api'

export namespace Api {
  export class Ai extends AiApi {}
  export class Authentication extends AuthenticationApi {}
  export class Authorization extends AuthorizationApi {}
  export class Upload extends UploadApi {}

  export class User extends UserApi {}

  export class Notification extends NotificationApi {}

  export class Assessment extends AssessmentApi {}

  export class Report extends ReportApi {}

  export class Serviceprovider extends ServiceproviderApi {}

  export class Educationalmaterial extends EducationalmaterialApi {}

  export class Integrationphase extends IntegrationphaseApi {}

  export class Technologyupdate extends TechnologyupdateApi {}

  export class Usertechnologyupdate extends UsertechnologyupdateApi {}
}
