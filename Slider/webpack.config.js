const path = require('path');

module.exports = {
    mode: 'development',
    entry: './src/index',

    output: {
        path: path.resolve(__dirname, 'public'),
        filename: 'app.js',
        publicPath: '/js'
    },

    devServer: {
        contentBase: './public'
    },

    devtool: 'inline-source-map' // remove for build
}