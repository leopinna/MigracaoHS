const path = require('path')

module.exports = {
  reactScriptsVersion: 'react-scripts',
  style: {
    sass: {
      loaderOptions: {
        sassOptions: {
          includePaths: ['node_modules', 'src/assets']
        }
      }
    },
    postOptions: {
      plugins: [require('postcss-rtl')()]
    }
  },
  webpack: {
    alias: {
      '@src': path.resolve(__dirname, 'src'),
      '@assets': path.resolve(__dirname, 'src/@core/assets'),
      '@components': path.resolve(__dirname, 'src/@core/components'),
      '@layouts': path.resolve(__dirname, 'src/@core/layouts'),
      '@store': path.resolve(__dirname, 'src/redux'),
      '@styles': path.resolve(__dirname, 'src/@core/scss'),
      '@configs': path.resolve(__dirname, 'src/configs'),
      '@utils': path.resolve(__dirname, 'src/utility/Utils'),
      '@hooks': path.resolve(__dirname, 'src/utility/hooks')
    }
  }
}


/* import { resolve } from 'path'

export const reactScriptsVersion = 'react-scripts'
export const style = {
  sass: {
    loaderOptions: {
      sassOptions: {
        includePaths: ['node_modules', 'src/assets']
      }
    }
  },
  postOptions: {
    plugins: [require('postcss-rtl')()]
  }
}
export const webpack = {
  alias: {
    '@src': resolve(__dirname, 'src'),
    '@assets': resolve(__dirname, 'src/@core/assets'),
    '@components': resolve(__dirname, 'src/@core/components'),
    '@layouts': resolve(__dirname, 'src/@core/layouts'),
    '@store': resolve(__dirname, 'src/redux'),
    '@styles': resolve(__dirname, 'src/@core/scss'),
    '@configs': resolve(__dirname, 'src/configs'),
    '@utils': resolve(__dirname, 'src/utility/Utils'),
    '@hooks': resolve(__dirname, 'src/utility/hooks'),
    '@apl': resolve(__dirname, 'src/APL')
  }
} */
