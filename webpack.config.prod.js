const webpack = require('webpack');
const merge = require('webpack-merge');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const webpackConfig = require('./webpack.config');

module.exports = merge(webpackConfig, {
    mode: "production",
    optimization: {
        minimizer: [
            // we specify a custom UglifyJsPlugin here to get source maps in production
            new UglifyJsPlugin({
                cache: true,
                parallel: true,
                uglifyOptions: {
                    compress: false,
                    ecma: 6,
                    mangle: true,
                    drop_console: true
                },
                sourceMap: true
            })
        ]
    },
    plugins: [
        new webpack.EnvironmentPlugin({ NODE_ENV: 'production' }),
    ],
    devtool: "source-map",
    devServer: {
        compress: true,
    },
});