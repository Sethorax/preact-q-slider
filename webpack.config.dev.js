
const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');

/**
 * WEBPACK CONFIG
 */
module.exports = env => {
    return {
        entry: {
            'preact-q-slider': './demo/app.tsx',
            styles: './src/styles.scss'
        },
        module: {
            rules: [
                { test: /\.tsx?$/, loader: "ts-loader" },
                {
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
        mode: 'development',
        resolve: {
            extensions: [".ts", ".tsx", ".js"]
        },
        output: {
            filename: '[name].js',
            chunkFilename: '[name].js',
            path: path.resolve('./demo')
        }
    };
};