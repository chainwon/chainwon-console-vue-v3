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
    }
}