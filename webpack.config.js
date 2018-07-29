const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

/**
 * WEBPACK CONFIG
 */
module.exports = env => {
    return {
        entry: {
            styles: './src/styles.scss'
        },
        module: {
            rules: [
                {
                    test: /\.(css|sass|scss)$/,
                    exclude: /(bower_components)/,
                    use: [{
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            sourceMap: (env === 'dev')
                        }
                    }, {
                        loader: 'css-loader',
                        options: {
                            sourceMap: (env === 'dev'),
                            minimize: true
                        }
                    }, {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: (env === 'dev')
                        }
                    }, {
                        loader: 'postcss-loader'
                    }]
                }
            ]
        },
        plugins: [
            new MiniCssExtractPlugin({
                filename: "[name].css",
                chunkFilename: "[id].css"
            })
        ],
        mode: (env === 'dev') ? 'development' : 'production',
        output: {
            filename: '[name].js',
            chunkFilename: '[name].js',
            path: path.resolve('./dist/styles')
        }
    };
};