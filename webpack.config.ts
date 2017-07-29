import * as path from 'path'
import * as webpack from 'webpack'
import * as _ from 'lodash'

let AssetsPlugin = require('assets-webpack-plugin') as any;

interface CommandLine {
  DEBUG?: boolean,
  VERBOSE?: boolean 
}

export default ({ DEBUG = false, VERBOSE = false }: CommandLine = {}) => {
  const ROOT = path.resolve(__dirname, 'src')
  const CSS_SCOPE_NAME = DEBUG ? '[name]_[local]_[hash:base64:3]' : '[hash:base64:4]'

  const AUTOPREFIXER_BROWSERS = [
    'Android 2.3',
    'Android >= 4',
    'Chrome >= 35',
    'Firefox >= 31',
    'Explorer >= 9',
    'iOS >= 7',
    'Opera >= 12',
    'Safari >= 7.1',
  ]

  const GLOBALS = {
    'process.env.NODE_ENV': DEBUG ? '"development"' : '"production"',
    __DEV__: DEBUG,
  }

  const postCssOptions = {
    default: {
      plugins: (loader: any) => [
        // Transfer @import rule by inlining content, e.g. @import 'normalize.css'
        // https://github.com/postcss/postcss-import
        require('postcss-import')({ path: ROOT, addDependencyTo: loader }),
        // W3C variables, e.g. :root { --color: red; } div { background: var(--color); }
        // https://github.com/postcss/postcss-custom-properties
        require('postcss-custom-properties')(),
        // W3C CSS Custom Media Queries, e.g. @custom-media --small-viewport (max-width: 30em);
        // https://github.com/postcss/postcss-custom-media
        require('postcss-custom-media')(),
        // CSS4 Media Queries, e.g. @media screen and (width >= 500px) and (width <= 1200px) { }
        // https://github.com/postcss/postcss-media-minmax
        require('postcss-media-minmax')(),
        // W3C CSS Custom Selectors, e.g. @custom-selector :--heading h1, h2, h3, h4, h5, h6;
        // https://github.com/postcss/postcss-custom-selectors
        require('postcss-custom-selectors')(),
        // W3C calc() function, e.g. div { height: calc(100px - 2em); }
        // https://github.com/postcss/postcss-calc
        require('postcss-calc')(),
        // Allows you to nest one style rule inside another
        // https://github.com/jonathantneal/postcss-nesting
        require('postcss-nesting')(),
        // W3C color() function, e.g. div { background: color(red alpha(90%)); }
        // https://github.com/postcss/postcss-color-function
        require('postcss-color-function')(),
        // W3C CSS Level4 :matches() pseudo class, e.g. p:matches(:first-child, .special) { }
        // https://github.com/postcss/postcss-selector-matches
        require('postcss-selector-matches')(),
        // Transforms :not() W3C CSS Level 4 pseudo class to :not() CSS Level 3 selectors
        // https://github.com/postcss/postcss-selector-not
        require('postcss-selector-not')(),
        // Postcss flexbox bug fixer
        // https://github.com/luisrudge/postcss-flexbugs-fixes
        require('postcss-flexbugs-fixes')(),
        // Add vendor prefixes to CSS rules using values from caniuse.com
        // https://github.com/postcss/autoprefixer
        require('autoprefixer')({ browsers: AUTOPREFIXER_BROWSERS }),
      ],
    },

    sass: {
      plugins: (loader: any) => [
        require('autoprefixer')({ browsers: AUTOPREFIXER_BROWSERS }),
      ],
    },
  }

  const commonConfig: webpack.Configuration = {
    context: ROOT,

    output: {
      path: path.resolve(__dirname, 'build/public/assets'),
      publicPath: '/assets/',
      sourcePrefix: '  ',
    },

    module: {
      rules: [
        {
          test: /\.tsx?$/,
          loader: 'awesome-typescript-loader',
        },
        {
          enforce: 'pre',
          test: /\.js$/,
          loader: 'source-map-loader',
        },
        {
          test: /\.css/,
          use: [
            'isomorphic-style-loader',
            {
              loader: 'css-loader',
              options: {
                sourceMap: DEBUG,
                // CSS Modules https://github.com/css-modules/css-modules
                modules: true,
                importLoaders: 1,
                localIdentName: CSS_SCOPE_NAME,
                // CSS Nano http://cssnano.co/options/
                minimize: !DEBUG,
              },
            },
            { loader: 'postcss-loader', options: postCssOptions.default },
          ],
        },
        {
          test: /\.scss$/,
          use: [
            'isomorphic-style-loader',
            { loader: 'css-loader', options: { sourceMap: DEBUG, minimize: !DEBUG } },
            { loader: 'postcss-loader', options: postCssOptions.sass },
            'sass-loader',
          ],
        },
        {
          test: /\.txt$/,
          loader: 'raw-loader',
        },
        {
          test: /\.(png|jpg|jpeg|gif|svg|woff|woff2)$/,
          loader: 'url-loader',
          query: {
          name: DEBUG ? '[path][name].[ext]?[hash]' : '[hash].[ext]',
          limit: 10000,
          },
        },
        {
          test: /\.(eot|ttf|wav|mp3)$/,
          loader: 'file-loader',
          query: {
          name: DEBUG ? '[path][name].[ext]?[hash]' : '[hash].[ext]',
          },
        },
      ],
    },

    resolve: {
      modules: [
        ROOT,
        'node_modules',
      ],
      extensions: ['.webpack.js', '.js', '.jsx', '.json', '.ts', '.tsx'],
      alias: {
        '~src': ROOT,
        '~components': ROOT + "/components",
      }
    },

    cache: DEBUG,

    stats: {
      colors: true,
      reasons: DEBUG,
      hash: VERBOSE,
      version: VERBOSE,
      timings: true,
      chunks: VERBOSE,
      chunkModules: VERBOSE,
      cached: VERBOSE,
      errorDetails: true,
    },

    plugins: [
      new webpack.LoaderOptionsPlugin({ debug: DEBUG })
    ],

    externals: {
      "react": "React",
      "react-dom": "ReactDOM",
    }
  }

  const clientConfig = _.merge({}, commonConfig, {
    entry: './client.tsx',

    output: {
      filename: DEBUG ? '[name].js?[hash]' : '[name].[chunkhash].js',
      chunkFilename: DEBUG ? '[name].[id].js?[hash]' : '[name].[id].[chunkhash].js',
    },

    target: 'web',

    plugins: [

      // Define free variables
      // https://webpack.github.io/docs/list-of-plugins.html#defineplugin
      new webpack.DefinePlugin({ ...GLOBALS, 'process.env.BROWSER': true }),

      // Emit a file with assets paths
      // https://github.com/sporto/assets-webpack-plugin#options
      new AssetsPlugin({
        path: path.resolve(__dirname, '../build'),
        filename: 'assets.js',
        processOutput: (x: any) => `module.exports = ${JSON.stringify(x)};`,
      }),

      // Assign the module and chunk ids by occurrence count
      // Consistent ordering of modules required if using any hashing ([hash] or [chunkhash])
      // https://webpack.github.io/docs/list-of-plugins.html#occurrenceorderplugin
      new webpack.optimize.OccurrenceOrderPlugin(true),

      ...DEBUG ? [] : [
        // Minimize all JavaScript output of chunks
        // https://github.com/mishoo/UglifyJS2#compressor-options
        new webpack.optimize.UglifyJsPlugin({
          compress: {
            screw_ie8: true, // jscs:ignore requireCamelCaseOrUpperCaseIdentifiers
            warnings: VERBOSE,
          },
          sourceMap: DEBUG,
        }),

        // A plugin for a more aggressive chunk merging strategy
        // https://webpack.github.io/docs/list-of-plugins.html#aggressivemergingplugin
        new webpack.optimize.AggressiveMergingPlugin(),
      ],
    ],

    // Choose a developer tool to enhance debugging
    // http://webpack.github.io/docs/configuration.html#devtool
    devtool: DEBUG ? 'source-map' : false,
  })

  const serverConfig = _.merge(true, {}, commonConfig, {
    entry: './server.tsx',

    output: {
      path: path.resolve(__dirname, 'build'),
      filename: 'server.js',
      chunkFilename: 'server.[name].js',
      libraryTarget: 'commonjs2',
    },

    target: 'node',

    externals: [
      /^\.\/assets$/,
      /^[@a-z][a-z\/\.\-0-9]*$/i,
    ],

    plugins: [

      // Define free variables
      // https://webpack.github.io/docs/list-of-plugins.html#defineplugin
      new webpack.DefinePlugin({ ...GLOBALS, 'process.env.BROWSER': false }),
    ],

    node: {
      console: false,
      global: false,
      process: false,
      Buffer: false,
      __filename: false,
      __dirname: false,
    },

    devtool: 'source-map',
  });
  
  return [clientConfig, serverConfig]
}