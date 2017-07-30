import * as React from 'react'
import * as ReactDOM from 'react-dom'
import * as queryString from 'query-string'
import { Action, Location } from 'history'
import createBrowserHistory from 'history/createBrowserHistory'
import { createPath } from 'history/PathUtils'
import App from './components/App'
import router from './router'

const history = createBrowserHistory()

const context = {
  insertCss: (...styles: any[]) => {
    return () => styles.map(x => x._insertCss()).forEach(f => f())
  },
}

// Switch off the native scroll restoration behavior and handle it manually
// https://developers.google.com/web/updates/2015/09/history-api-scroll-restoration
type ScrollPosition = { scrollX: number, scrollY: number }
const scrollPositionsHistory: {[key: string]: ScrollPosition} = {}

if (window.history && 'scrollRestoration' in window.history) {
  window.history.scrollRestoration = 'manual'
}

// TODO(p): type route
let onRenderComplete = function initialRenderComplete(r: any, l: Location) {
  const elem = document.getElementById('css')
  if (elem && elem.parentNode) elem.parentNode.removeChild(elem)
  onRenderComplete = function renderComplete(route, location) {
    document.title = route.title

    updateMeta('description', route.description)

    let scrollX = 0
    let scrollY = 0
    const pos = scrollPositionsHistory[location.key]
    if (pos) {
      scrollX = pos.scrollX
      scrollY = pos.scrollY
    } else {
      const targetHash = location.hash.substr(1)
      if (targetHash) {
        const target = document.getElementById(targetHash)
        if (target) {
          scrollY = window.pageYOffset + target.getBoundingClientRect().top
        }
      }
    }

    // Restore the scroll position if it was saved into the state
    // or scroll to the given #hash anchor
    // or scroll to top of the page
    window.scrollTo(scrollX, scrollY)

    // Google Analytics tracking. Don't send 'pageview' event after
    // the initial rendering, as it was already sent
    if ((window as any).ga) {
      (window as any).ga('send', 'pageview', createPath(location))
    }
  }
}

const container = document.getElementById('app')
let appInstance
let currentLocation = history.location

// Re-render the app when window.location changes
async function onLocationChange(location: Location, action: Action) {
  // Remember the latest scroll position for the previous location
  scrollPositionsHistory[currentLocation.key] = {
    scrollX: window.pageXOffset,
    scrollY: window.pageYOffset,
  }
  // Delete stored scroll position for next page if any
  if (action === 'PUSH') {
    delete scrollPositionsHistory[location.key]
  }
  currentLocation = location

  try {
    // Traverses the list of routes in the order they are defined until
    // it finds the first route that matches provided URL path string
    // and whose action method returns anything other than `undefined`.
    const route = await router.resolve({
      ...context,
      path: location.pathname,
      query: queryString.parse(location.search),
    })

    // Prevent multiple page renders during the routing process
    if (currentLocation.key !== location.key) {
      return
    }

    if (route.redirect) {
      history.replace(route.redirect)
      return
    }

    appInstance = ReactDOM.render(
      <App context={context}>
        {route.component}
      </App>,
      container,
      () => onRenderComplete(route, location),
    )
  } catch (error) {
    console.error(error)

    // Do a full page reload if error occurs during client-side navigation
    if (action && currentLocation.key === location.key) {
      window.location.reload()
    }
  }
}

// Handle client-side navigation by using HTML5 History API
// For more information visit https://github.com/mjackson/history#readme
history.listen(onLocationChange)
onLocationChange(currentLocation, "PUSH")

// DOM Utils
function updateTag(
  tagName: string, keyName: string, keyValue: string, attrName: string, attrValue: string
) {
  const node = document.head.querySelector(
    `${tagName}[${keyName}="${keyValue}"]`,
  )
  if (node && node.getAttribute(attrName) === attrValue) return

  // Remove and create a new tag in order to make it work with bookmarks in Safari
  if (node && node.parentNode) {
    node.parentNode.removeChild(node)
  }
  if (typeof attrValue === 'string') {
    const nextNode = document.createElement(tagName)
    nextNode.setAttribute(keyName, keyValue)
    nextNode.setAttribute(attrName, attrValue)
    document.head.appendChild(nextNode)
  }
}

function updateMeta(name: string, content: string) {
  updateTag('meta', 'name', name, 'content', content)
}

function updateCustomMeta(property: string, content: string) {
  updateTag('meta', 'property', property, 'content', content)
}

function updateLink(rel: string, href: string) {
  updateTag('link', 'rel', rel, 'href', href)
}
