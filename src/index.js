var Koa=require('koa');

var router = require('koa-router')();  /*引入是实例化路由** 推荐*/

//实例化
var app=new Koa();

router.get('/',async (ctx)=>{
    ctx.body="首页";

})


router.get('/p1',async (ctx)=>{
  ctx.body="p1";

})


app.use(router.routes());   /*启动路由*/
app.use(router.allowedMethods());
app.listen("8001", () => console.log("服务端启动"));

