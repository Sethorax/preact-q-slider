const fs = require('fs');
const path = require('path');
const webpack = require('webpack');

/**
 * WEBPACK CONFIG
 */
module.exports = env => {
    return {
        entry: {
            index: './build/entry.js'
        },
        module: {
            rules: [
                {
                    test: /\.(js|jsx)$/,
                    exclude: new RegExp(`node_modules`),
                    use: {
                        loader: 'babel-loader'
                    }
                }, {
                    test: /\.(css|sass|scss)$/,
                    exclude: /(bower_components)/,
                    use: [{
                        loader: 'style-loader',
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
                    }]
                }
            ]
        },
        mode: (env === 'dev') ? 'development' : 'production',
        plugins: [],
        output: {
            filename: 'preact-q-slider.js',
            chunkFilename: '[name].js',
            path: path.resolve('./dist')
        }
    };
};