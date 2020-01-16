
// vue.config.js
module.exports = {
    publicPath: '/', // 设置打包文件相对路径
    devServer: {
        port: '9999',
        host: "localhost",
        proxy: {
            '/apis': {
                target: 'http://localhost:8089/',  // target host
                ws: true,  // proxy websockets
                changeOrigin: true,  // needed for virtual hosted sites
                pathRewrite: {
                    '^/apis': ''  // rewrite path
                }
            },
        }
    }
};
