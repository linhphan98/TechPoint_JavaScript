const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const PORT = process.env.PORT || 80

module.exports = {
	entry: ['babel-polyfill','./src/js/index.js'], // index.js 
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'js/bundle.js'
	}, 
	devServer: {
		contentBase: './dist',
		compress: true,
		port: PORT
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
	}
};