const path = require('path');

function resolve(dir) {
    return path.join(__dirname, dir);
}

module.exports = {
    transpileDependencies: ['luch-request', 'uview-ui'],
    chainWebpack: (config) => {
        config.resolve.alias
            .set('/@', resolve('src'))
            .set('/@assets', resolve('src/assets'))
            .set('/@components', resolve('src/components'))
            .set('/@types', resolve('src/types'))
            .set('/@plugins', resolve('src/plugins'));
    }
};
