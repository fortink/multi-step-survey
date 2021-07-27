const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

module.exports = function (env, {mode}) {
    const isEnvDevelopment = mode === 'development';

    return {
        entry: './src/index.js',
        watch: isEnvDevelopment,
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: 'main.js',
        },
        resolve: {
            extensions: ['.js', '.json', '.jsx'],
        },
        module: {
            rules: [
                {
                    test: /\.(js|mjs|jsx|ts|tsx)$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                ['@babel/preset-env', {targets: "defaults"}]
                            ]
                        }
                    }
                }
            ]
        },
        plugins: [
            new webpack.ProgressPlugin(),
            new CleanWebpackPlugin(),
            new HtmlWebpackPlugin({
                template: './public/index.html',
            })
        ],
    }
}
