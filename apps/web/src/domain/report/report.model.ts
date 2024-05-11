import { Assessment } from '../assessment'

export class Report {
  id: string

  insights?: string

  recommendations?: string

  assessmentId: string

  assessment?: Assessment

  dateCreated: string

  dateDeleted: string

  dateUpdated: string
}
