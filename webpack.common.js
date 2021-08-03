const path = require('path');

const HtmlWebpackInlineSVGPlugin = require('html-webpack-inline-svg-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

require('webpack');

let svgCounter = 0;

module.exports = {
    context: path.resolve(__dirname, 'src'),
    entry: {
        app: './scripts/app.js',
    },
    output: {
        filename: 'assets/scripts/bundle.[contenthash].js',
        path: path.resolve(__dirname, './', 'build'),
    },
    optimization: {
        runtimeChunk: 'single',
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/u,
                    name: 'vendors',
                    chunks: 'all',
                },
            },
        },
    },
    module: {
        rules: [
            // JAVASCRIPT
            {
                test: /\.js$/u,
                exclude: /node_modules/u,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [[
                            '@babel/preset-env',
                            {
                                targets: {
                                    esmodules: true,
                                },
                            },
                        ]],
                    },
                },
            },
            // SVG
            {
                test: /\.svg$/u,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]?[contenthash]',
                        outputPath: 'assets/images',
                    },
                },
                {
                    loader: 'svgo-loader',
                    options: {
                        configFile: '../../svgo.config.js',
                    },
                }],
            },
            // IMAGES
            {
                test: /\.(jpe?g|png|gif)$/u,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]?[contenthash]',
                    outputPath: 'assets/images',
                    esModule: false,
                },
            },
            // VIDEO
            {
                test: /\.(mp4)$/u,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]?[contenthash]',
                    outputPath: 'assets/video',
                },
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Adot - test Etienne Denys',
            description: 'Test Front Etienne Denys',
            company: 'adot',
            lang: 'fr',
            url: 'test',
            template: 'index.html',
            filename: 'index.html',
            minify: {
                collapseWhitespace: true,
                removeComments: true,
                removeRedundantAttributes: true,
                removeScriptTypeAttributes: true,
                removeStyleLinkTypeAttributes: true,
                useShortDoctype: true,
            },
        }),
        // SVG RULES
        new HtmlWebpackInlineSVGPlugin({
            runPreEmit: true,
            // relative to root of the application,
            svgoConfig: [{
                cleanupIDs: {
                    remove: false,
                    minify: true,
                    prefix: {
                        toString() {
                            return `id00-${svgCounter++}`;
                        },
                    },
                },
            },
            // important when working with inline SVG, id's allow us to reference the individual symbols
            {
                cleanupAttrs: false,
            },
            {
                removeDoctype: true,
            },
            {
                removeXMLProcInst: true,
            },
            {
                removeComments: true,
            },
            // OK
            {
                removeMetadata: true,
            },
            {
                removeTitle: true,
            },
            // OK
            {
                removeDesc: true,
            },
            // OK
            {
                removeUselessDefs: true,
            },
            {
                removeEditorsNSData: true,
            },
            {
                removeEmptyAttrs: true,
            },
            {
                removeHiddenElems: true,
            },
            {
                removeEmptyText: false,
            },
            // OK
            {
                removeEmptyContainers: false,
            },
            // OK
            {
                removeViewBox: false,
            },
            // OK
            {
                cleanUpEnableBackground: true,
            },
            {
                convertStyleToAttrs: true,
            },
            {
                convertColors: false,
            },
            // OK
            {
                convertPathData: false,
            },
            // this option break "d" attribut when removing ","
            {
                convertTransform: false,
            },
            {
                removeUnknownsAndDefaults: false,
            },
            {
                removeNonInheritableGroupAttrs: true,
            },
            {
                removeUselessStrokeAndFill: true,
            },
            {
                removeUnusedNS: true,
            },
            {
                cleanupNumericValues: false,
            },
            {
                moveElemsAttrsToGroup: false,
            },
            {
                moveGroupAttrsToElems: true,
            },
            {
                collapseGroups: false,
            },
            // OK
            {
                removeRasterImages: false,
            },
            {
                mergePaths: false,
            },
            {
                convertShapeToPath: false,
            },
            {
                sortAttrs: true,
            },
            {
                transformsWithOnePath: false,
            },
            {
                removeDimensions: false,
            },
            // OK
            {
                removeAttrs: false,
            }],
        }),
    ],
};
