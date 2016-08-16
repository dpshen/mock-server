const Koa = require('koa');
const convert = require('koa-convert');
const json = require('koa-json');
const bodyparser = require('koa-bodyparser')({
    "formLimit":"5mb",
    "jsonLimit":"5mb",
    "textLimit":"5mb"
});

const app = new Koa();
const router = require('./router');
const logger = require('./libs/logger');
const WebResult = require('./libs/WebResult');

app.use(convert(bodyparser));
app.use(convert(json()));

app.use(async (ctx, next) => {
    ctx.logger = logger;
    ctx.result = new WebResult(ctx.request);
    const start = new Date();
    await next();
    const ms = new Date() - start;
    ctx.logger.info(`${ctx.method} ${ctx.url} - ${ms}ms`);
});

router.allowedMethods();
app.use(router.routes());

// 静态服务
app.use(require('koa-static')("./build", {
    index: "index.html"
}));

app.on('error', function(err, ctx){
    console.log(err)
    logger.error('server error', err, ctx);
});

module.exports = app;