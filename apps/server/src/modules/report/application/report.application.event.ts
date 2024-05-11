export namespace ReportApplicationEvent {
  export namespace ReportCreated {
    export const key = 'report.application.report.created'

    export type Payload = {
      id: string
      userId: string
    }
  }
}
