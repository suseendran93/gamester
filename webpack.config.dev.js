const webpack = require('webpack');
const merge = require('webpack-merge');

const webpackConfig = require('./webpack.config');

module.exports = merge(webpackConfig, {
    mode: "development",
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new webpack.EnvironmentPlugin({ NODE_ENV: 'development' }),
	],
	devtool: "source-map",
	devServer: {
		hot: true,
	}
});