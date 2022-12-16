import BrowserSyncPlugin from 'browser-sync-webpack-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'

export const mode = 'development'
export const entry = './src/js/canvas.js'
export const output = {
  path: __dirname + '/dist/',
  filename: './js/canvas.bundle.js'
}
export const module = {
  rules: [
    {
      test: /\.m?js$/,
      exclude: /(node_modules|bower_components)/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env']
        }
      }
    },
    {
      test: /\.(png|jpe?g|gif)$/i,
      use: [
        {
          loader: 'file-loader'
        }
      ]
    }
  ]
}
export const plugins = [
  new BrowserSyncPlugin({
    host: 'localhost',
    port: 3000,
    server: { baseDir: ['dist'] },
    files: ['./dist/*'],
    notify: false
  }),
  new HtmlWebpackPlugin({
    filename: 'index.html',
    favicon: 'favicon.ico',
    template: 'src/index.html'
  })
]
export const watch = true
export const devtool = 'source-map'
