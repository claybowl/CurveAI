import { AuthorizationRole as AuthorizationRoleModel } from './authorization/authorization.model'

import { User as UserModel } from './user/user.model'

import { Notification as NotificationModel } from './notification/notification.model'

import { Assessment as AssessmentModel } from './assessment/assessment.model'

import { Report as ReportModel } from './report/report.model'

import { Serviceprovider as ServiceproviderModel } from './serviceprovider/serviceprovider.model'

import { Educationalmaterial as EducationalmaterialModel } from './educationalmaterial/educationalmaterial.model'

import { Integrationphase as IntegrationphaseModel } from './integrationphase/integrationphase.model'

import { Technologyupdate as TechnologyupdateModel } from './technologyupdate/technologyupdate.model'

import { Usertechnologyupdate as UsertechnologyupdateModel } from './usertechnologyupdate/usertechnologyupdate.model'

export namespace Model {
  export class AuthorizationRole extends AuthorizationRoleModel {}

  export class User extends UserModel {}

  export class Notification extends NotificationModel {}

  export class Assessment extends AssessmentModel {}

  export class Report extends ReportModel {}

  export class Serviceprovider extends ServiceproviderModel {}

  export class Educationalmaterial extends EducationalmaterialModel {}

  export class Integrationphase extends IntegrationphaseModel {}

  export class Technologyupdate extends TechnologyupdateModel {}

  export class Usertechnologyupdate extends UsertechnologyupdateModel {}
}
