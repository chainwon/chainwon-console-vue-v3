module.exports = {
    productionSourceMap: false,

    devServer: {
        proxy: {
            '/api': {
                target: "https://console.chainwon.com/api/index.php/",
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
    assetsDir: 'static',
    runtimeCompiler: undefined,
    parallel: undefined,

    css: {
      extract: false
    }
}