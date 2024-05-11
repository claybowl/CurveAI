export namespace IntegrationphaseApplicationEvent {
  export namespace IntegrationphaseCreated {
    export const key = 'integrationphase.application.integrationphase.created'

    export type Payload = {
      id: string
      userId: string
    }
  }
}
