const { defineConfig } = require('@vue/cli-service');
module.exports = defineConfig({
    transpileDependencies: true,
    devServer: {
        proxy: 'http://localhost:8080', // 백엔드 서버 주소
    },
});
