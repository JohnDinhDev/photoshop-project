const path = require('path')

module.exports = {
    mode: 'development',
    entry: {
        App: './app/assets/scripts/App.js',
        Vendor: './app/assets/scripts/Vendor.js'
    },
    output: {
        path: path.resolve(__dirname, './app/temp/scripts'),
        filename: '[name].js'
    },
    module: {
        rules: [{
            exclude: /node_modules/,
            test: /\.js$/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['env']
                }
            }
        }]
    }
}