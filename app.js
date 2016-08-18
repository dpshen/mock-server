const Koa = require('koa');
const convert = require('koa-convert');
const json = require('koa-json');
const staticServer = require('./middleware/static');

const bodyparser = require('koa-bodyparser')({
    "formLimit": "5mb",
    "jsonLimit": "5mb",
    "textLimit": "5mb"
});

const app = new Koa();
const router = require('./router');
const logger = require('./libs/logger');
const WebResult = require('./libs/WebResult');

app.use(convert(bodyparser));
app.use(convert(json()));

app.use(async(ctx, next) => {
    ctx.logger = logger;
    const start = new Date();
    await next();
    const ms = new Date() - start;
    ctx.logger.info(`${ctx.method} ${ctx.url} - ${ms}ms  ${ctx.result.msg}`);
});

app.use(async(ctx, next)=> {
    ctx.result = new WebResult(ctx.request);
    await next();

    if (!ctx.body && ctx.result.code != 0) {
        ctx.set('Access-Control-Allow-Origin', ctx.request.headers.origin || '');
        ctx.set('Access-Control-Allow-Credentials', true);
        ctx.set('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
        ctx.set('Content-Type', 'application/javascript;charset=UTF-8');
        // 获取mock接口时, 不使用WebResult的结构
        ctx.body = ctx.result.toString(ctx.path.startsWith('/mock'));
    }
})

router.allowedMethods();
app.use(router.routes());

// // 静态服务
// app.use(require('koa-static')("./view/build", {
//     index: "index.html"
// }));

app.use(staticServer("./view/build",{
    index: "index.html"
}));

app.on('error', function (err, ctx) {
    logger.error(`${ctx.method} ${ctx.url}`, err);
});

module.exports = app;