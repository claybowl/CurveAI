export namespace AssessmentApplicationEvent {
  export namespace AssessmentCreated {
    export const key = 'assessment.application.assessment.created'

    export type Payload = {
      id: string
      userId: string
    }
  }
}
