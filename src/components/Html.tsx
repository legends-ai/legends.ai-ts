import * as React from 'react'

interface Props {
  title: string,
  description: string,
  style?: string,
  script?: string,
  children: string,
}

const Html = ({ title, description, style, script, children }: Props) => {
  return (
    <html className="no-js" lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="apple-touch-icon" href="apple-touch-icon.png" />
        <link rel="stylesheet" href="https://cdn.rawgit.com/c3js/c3/master/c3.min.css" />
        <link rel="stylesheet" href="https://code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Montserrat:200,400,700,900|Open+Sans:300,400,700" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Montserrat:200,400,700,900|Open+Sans:300,400,700" />
        <link rel="stylesheet" href="https://static.asuna.io/league/fonts/leaguedings/leaguedings.css" />
        {style && <style id="css" dangerouslySetInnerHTML={{ __html: style }} />}
      </head>
      <body>
        <div id="app" dangerouslySetInnerHTML={{ __html: children }} />
        <script src="https://unpkg.com/react@15/dist/react.min.js"></script>
        <script src="https://unpkg.com/react-dom@15/dist/react-dom.min.js"></script>
        <script src="https://d3js.org/d3.v3.min.js" />
        {script && <script id="source" src={script} />}
      </body>
    </html>
  )
}

export default Html
