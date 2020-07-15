const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const PORT = process.env.PORT || 8080;
const server_host = process.env.HOST || '173.255.237.135';
const webpack = require('webpack')

module.exports = {
	entry: ['babel-polyfill','./src/js/index.js'], // index.js 
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'js/bundle.js'
	}, 
	devServer: {
		contentBase: './dist',
		host: server_host,
		port: PORT,
		disableHostCheck: true
	},
	plugins: [
		new HtmlWebpackPlugin({
			filename: 'index.html',
			template: './src/index.html'
		})
	], 
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader'
				}
			}
		]
	},
	node: {
	    fs: 'empty',
	    net: 'empty',
	    tls: 'empty',
	},
};