const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ASSET_PATH = process.env.ASSET_PATH || '/';
const PORT = process.env.PORT || 8080;
const server_host = process.env.YOUR_HOST || '0.0.0.0';

module.exports = {
	entry: ['babel-polyfill','./src/js/index.js'], // index.js 
	output: {
		path: path.resolve(__dirname, 'dist'),
		publicPath: ASSET_PATH,
		filename: 'js/bundle.js'
	}, 
	devServer: {
		contentBase: './dist',
		hot: true,
		host: server_host,
		port: PORT
	},
	plugins: [
		new HtmlWebpackPlugin({
			filename: 'index.html',
			template: './src/index.html'
		}),
		new webpack.DefinePlugin({
	    	'process.env.ASSET_PATH': JSON.stringify(ASSET_PATH),
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