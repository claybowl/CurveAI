import { User } from '../user'

import { Report } from '../report'

export class Assessment {
  id: string

  techStackDescription?: string

  aiReadinessLevel?: string

  submissionDate?: string

  userId: string

  user?: User

  dateCreated: string

  dateDeleted: string

  dateUpdated: string

  reports?: Report[]
}
