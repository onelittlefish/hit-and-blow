const path = require("path")
const CopyPlugin = require("copy-webpack-plugin")

module.exports = {
    mode: "development",
    devtool: "eval-source-map",
    entry: {
        index: "./src/presentation/index"
    },
    output: {
        path: path.join(__dirname, "dist"),
        filename: "[name].js"
    },
    resolve: {
        extensions: [".js", ".ts", ".tsx"]
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: "ts-loader"
            },
            {
                test: /\.less$/,
                use: [
                    { loader: "style-loader" }, // creates style nodes from JS strings
                    { loader: "css-loader" }, // translates CSS into CommonJS
                    { loader: "less-loader" }, // compiles Less to CSS
                ]
            },
            {
                test: /\.(png|jpe?g|gif)$/i,
                use: [
                    { loader: "file-loader" }
                ]
            }
        ]
    },
    plugins: [
        new CopyPlugin({
            patterns: [
                { from: "index.html" }
            ]
        })
    ],
    devServer: {
        hot: true,
        port: 3000
    }
}
