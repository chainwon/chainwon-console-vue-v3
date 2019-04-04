module.exports = {
    productionSourceMap: false,
    devServer: {
        proxy: {
            '/api': {
                target: "http://192.168.31.17:1005/api",
                ws: true,
                changeOrigin: true,
                pathRewrite:{
                    '^/api':''
                }
            }
        }
    }
}