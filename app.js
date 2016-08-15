const Koa = require('koa');
const app = new Koa();
const router = require('./router');
const logger = require('./libs/logger');


app.use(async (ctx, next) => {
    ctx.logger = logger;
    const start = new Date();
    await next();
    const ms = new Date() - start;
    console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
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