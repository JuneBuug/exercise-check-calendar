module.exports = {
    devServer: {
        proxy: {
            '/.netlify/functions': {
                target: 'http://localhost:9000', // 개발서버
                pathRewrite: {
                    "^/\\.netlify/functions": ""
                }
            }
        }
    }
}
