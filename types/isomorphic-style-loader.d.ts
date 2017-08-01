declare module 'isomorphic-style-loader/lib/withStyles' {
  import { ComponentType } from 'react'

  type Style = string & { _getCss: () => string }
  export default function withStyles<Props>(styles: any):
    (c: ComponentType<Props>) => ComponentType<Props> & {
        ComposedComponent: ComponentType<Props>,
        displayName: string,
        context: { insertCSS?: (styles: Style[]) => void }
      }
}