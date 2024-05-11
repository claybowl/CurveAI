export namespace ServiceproviderApplicationEvent {
  export namespace ServiceproviderCreated {
    export const key = 'serviceprovider.application.serviceprovider.created'

    export type Payload = {
      id: string
      userId: string
    }
  }
}
