const path = require("path")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")

module.exports = (env) => {

    const isProduction = env.production === true
    const plugins = [];
    if (isProduction) {
        plugins.push(new MiniCssExtractPlugin())
    }

    return {
        entry: "./src/app.js",

        plugins,

        output: {
            path: path.join(__dirname, "public", "dist"),
            filename: "bundle.js"
        },

        mode: isProduction ? "production" : "development",

        module: {
            rules: [{
                loader: "babel-loader",
                test: /\.js$/,
                exclude: /node_modules/
            },
            {
                test: /\.s?css$/,
                use: [
                    isProduction ? MiniCssExtractPlugin.loader : "style-loader",
                    "css-loader",
                    "sass-loader"
                ]

            }]
        },

        devtool: isProduction ? "source-map" : "eval-cheap-module-source-map",

        devServer: {
            contentBase: path.join(__dirname, "public"),
            historyApiFallback: true,
            publicPath: "/dist/"
        }
    }
}

