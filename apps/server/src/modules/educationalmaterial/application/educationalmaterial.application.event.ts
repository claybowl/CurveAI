export namespace EducationalmaterialApplicationEvent {
  export namespace EducationalmaterialCreated {
    export const key =
      'educationalmaterial.application.educationalmaterial.created'

    export type Payload = {
      id: string
      userId: string
    }
  }
}
