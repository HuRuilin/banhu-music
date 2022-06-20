const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig(
  {
    transpileDependencies: true,
    lintOnSave: process.env.NODE_ENV !== 'production',
    devServer: {
      client: {
        overlay: {
          errors: false,
          warnings: false
        }
      }
    },
    css: {
      loaderOptions: {
        scss: {
          additionalData: '@import "~@/styles/mixin.scss";@import "~@/styles/variables.scss";'
        }
      }
    }
  }
)
