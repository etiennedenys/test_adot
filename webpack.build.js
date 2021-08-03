const CompressionPlugin = require('compression-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');
const { merge } = require('webpack-merge');

const common = require('./webpack.common');

module.exports = () => merge(common, {
    mode: 'production',
    optimization: {
        minimize: true,
        minimizer: [
            new TerserJSPlugin({
            }),
            new CssMinimizerPlugin({
            }),
        ],
    },
    module: {
        rules: [{
            test: /\.scss$/u,
            use: [{
                loader: MiniCssExtractPlugin.loader,
                options: {
                    publicPath: '../../',
                },
            },
            // Translates CSS into CommonJS
            'css-loader',
            // Compiles Sass to CSS
            'sass-loader',
            ]
        }],
    },
    plugins: [
        // CSS RULES
        new MiniCssExtractPlugin({
            filename: 'assets/styles/styles.css',
            chunkFilename: '[id].css?[contenthash]',
        }),
        // GZIP RULES
        new CompressionPlugin({
            filename: '[path][name].gz[query]',
            algorithm: 'gzip',
            test: /\.(js|css|html|svg)$/u,
            threshold: 10240,
            minRatio: 0.8,
        }),
        // BROTLICOMPRESS RULES
        new CompressionPlugin({
            filename: '[path][name].br[query]',
            algorithm: 'brotliCompress',
            test: /\.(js|css|html|svg)$/u,
            compressionOptions: {
                level: 11,
            },
            threshold: 10240,
            minRatio: 0.8,
        }),
    ],
});
