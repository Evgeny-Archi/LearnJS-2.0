const path = require('path');

module.exports = {
    mode: 'development',
    entry: './src/index',

    output: {
        path: path.resolve(__dirname, 'public/js'),
        filename: 'array.js',
        publicPath: '/js'
    },

    devServer: {
        contentBase: path.join(__dirname, 'public'),
    },

    devtool: 'cheap-eval-source-map'
}