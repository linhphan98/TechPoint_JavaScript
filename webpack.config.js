const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
	entry: ['babel-polyfill','./src/js/index.js'], // index.js 
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'js/bundle.js'
	}, 
	devServer: {
		contentBase: './dist',
		hot: true
	},
	plugins: [
		new HtmlWebpackPlugin({
			filename: 'index.html',
			template: './src/index.html'
		}),
		new webpack.DefinePlugin({
            'process.env': JSON.stringify('development')
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