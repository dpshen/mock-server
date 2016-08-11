const xtpl = require('xtpl/lib/koa');
const router = require('koa-router')();

router.get('/view-test', async ()=>{
    console.log("==>");
    await this.render('index',{"title":"xtemplate demo", name:"dpshen"});
});

module.exports = router;