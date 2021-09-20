const path = require("path")
const { CleanWebpackPlugin } = require("clean-webpack-plugin")
const HtmlWebpackPlugin = require("html-webpack-plugin")

const package = require("./package.json")

module.exports = {
    entry: {
        index: "./src/home/index.js",
        vendor: Object.keys(package.dependencies)
    },
    output: {
        filename: "[name].[contenthash].js",
        path: path.resolve(__dirname, "dist")
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            filename: "index.html",
            inject: true,
            chunks: ["vendor", "index"],
            template: path.resolve(__dirname, "src", "home", "index.html")
        })
    ],
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /[\\/]node_modules[\\/]/,
                use: {
                    loader: "babel-loader"
                }
            }
        ]
    }
}