const { merge } = require('webpack-merge');

const common = require('./webpack.common');

module.exports = () => merge(common, {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        disableHostCheck: true,
        contentBase: './dist',
        hot: true,
        openPage: './?test',
    },
    module: {
        rules: [
            {
                test: /.s?css$/u,
                use: ['style-loader', 'css-loader', 'sass-loader'],
            },
        ],
    },
    plugins: [
    ],
});
