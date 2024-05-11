import { User } from '../user'

export class Integrationphase {
  id: string

  phaseDescription?: string

  currentStatus?: string

  userId: string

  user?: User

  dateCreated: string

  dateDeleted: string

  dateUpdated: string
}
