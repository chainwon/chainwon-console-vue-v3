module.exports = {
    productionSourceMap: false,

    devServer: {
        proxy: {
            '/api': {
                target: "https://console.chainwon.com/api/",
                ws: true,
                changeOrigin: true,
                pathRewrite:{
                    '^/api':''
                }
            }
        }
    },

    publicPath: undefined,
    outputDir: undefined,
    assetsDir: undefined,
    runtimeCompiler: undefined,
    parallel: undefined,

    css: {
      extract: false
    }
}