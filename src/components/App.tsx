import * as React from 'react'
import * as PropTypes from 'prop-types'

const ContextType = {
  insertCss: PropTypes.func.isRequired 
}

interface AppProps {
  context: { insertCss: (x: string) => void }
}

class App extends React.Component<AppProps, {}> {

  static childContextTypes = ContextType

  constructor(props: AppProps) {
    super(props)
  }

  getChildContext() {
    return this.props.context
  }

  render() {
    return React.Children.only(this.props.children)
  }

}

export default App