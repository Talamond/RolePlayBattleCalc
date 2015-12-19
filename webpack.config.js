var path = require('path'),
	webpack = require('webpack'),
	ExtractTextPlugin = require('extract-text-webpack-plugin'),
	HtmlWebpackPlugin = require('html-webpack-plugin'),
	autoprefixer = require('autoprefixer-core'),
	csswring = require('csswring');

module.exports = {
	entry: {
		app: [
			'webpack-dev-server/client?http://localhost:3000',
			'webpack/hot/only-dev-server',
			path.resolve(__dirname, './src/index.js')
		]
	},
	output: {
		filename: '[name].bundle.js',
		path: path.join(__dirname, '/dist/'),
		publicPath: '/'
	},

	plugins: [
		new HtmlWebpackPlugin({
			template: 'template/index.html',
			cdn: '/src/',
			chunks: ['app']
		}),
		new ExtractTextPlugin('[name].bundle.css'),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.optimize.OccurenceOrderPlugin(),
		new webpack.NoErrorsPlugin(),
		new webpack.DefinePlugin({
			__DEVELOPMENT__: true,
			'process.env': {
				'NODE_ENV': JSON.stringify('production')
			}
		})
	],

	resolve: {
		extensions: ['', '.js', '.scss', '.css'],
		modulesDirectories: ['src', 'node_modules']
	},

	resolveLoader: {
		modulesDirectories: ['web_loaders', 'web_modules', 'node_loaders', 'node_modules', 'webpack-loaders']
	},

	module: {
		loaders: [{
			test: /\.js$/,
			loaders: ['react-hot', 'babel-loader?optional[]=runtime&stage=0&plugins=jsx-control-statements/babel'],
			exclude: [/node_modules/	]
		}, {
			test: /\.js$/,
			loader: 'eslint-loader'
		}, {
			test: /\.css$/,
			loader: ExtractTextPlugin.extract('style-loader', 'css')
		}, {
			test: /\.scss$/,
			loader: ExtractTextPlugin.extract('style-loader', 'css!postcss!sass')
		}, {
			test: /\.(png|jpg|gif|ico)$/,
			loader: 'url-loader?limit=8192'
		}, {
			test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
			loader: 'file-loader'
		}, {
			test: /\.properties/,
			loader: 'locale-loader'
		}]
	},

	postcss: function() {
		return [
			autoprefixer({
				browsers: ['last 2 versions']
			}),
			csswring
		];
	},

	eslint: {
		configFile: 'eslintrc-dev'
	}
};
