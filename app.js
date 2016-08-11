const xtpl = require('xtpl/lib/koa');
const Koa = require('koa');
const app = new Koa();
const router = require('./router');


app.use(async (ctx, next) => {
    const start = new Date();
    await next();
    const ms = new Date() - start;
    console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});

//xtemplate模板渲染
xtpl(app,{
    //配置模板目录，指向工程的view目录
    views: './view'
});

app.use(router.routes())
    .use(router.allowedMethods());

app.on('error', function(err, ctx){
    console.log(err)
    logger.error('server error', err, ctx);
});

module.exports = app;