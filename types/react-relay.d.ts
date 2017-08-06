declare module 'react-relay' {

  import { ComponentType } from 'react'

  export var graphql: any

  export var QueryRenderer: any

  export function createFragmentContainer(component: ComponentType, fragment: any): any

}
