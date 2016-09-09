require("babel-register");
require("babel-polyfill");

const app = require('./app');

app.listen(3100);
console.log(`Open http://mock.yuantutech.com`)

// react...

if (process.argv.length > 2 && process.argv[2].indexOf('dev') != -1){
    process.env.NODE_ENV = "dev";

    var webpack = require("webpack")
    var WebpackDevServer = require("webpack-dev-server")

    var config = require("./webpack.config.js");

    var port = "8081";
    var hosts = "127.0.0.1";
// var hosts = "192.168.31.187";

    Object.keys(config.entry).map(function(item){
        config.entry[item].unshift(`webpack-dev-server/client?http://${hosts}:${port}/`,"webpack/hot/dev-server")
    })

    var compiler = webpack(config);

    var server = new WebpackDevServer(compiler, {
        //热加载
        hot:true,
        //热加载必须的 inline
        inline:true,

        quiet: false,
        compress: false,
        historyApiFallback: true,
        stats: {
            // Config for minimal console.log mess.
            assets: true,
            colors: true,
            version: false,
            hash: true,
            timings: true,
            chunks: false,
            chunkModules: true
        }
    });

    server.listen(port);
}


