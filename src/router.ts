import * as Router from 'universal-router'
import routes from './routes'

export interface ActionArgs {
  next: () => Promise<any>,
  query: {[key: string]: string},
  params: {[key: string]: string},
  region: string
}

// TODO(p): type universal router
export default new Router(routes)
