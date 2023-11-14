const Koa=require('Koa')
// 导入koa-router
const Router=require('koa-router')
const app=new Koa();
// 创建路由对象
const router=new Router();
const fs=require('fs')
const bodyParser = require('koa-bodyparser');
app.use(bodyParser());
// 使用路由中间件
app.use(router.routes());
router.get('/',(ctx)=>{

  console.log(ctx)

    ctx.body={a:1}
})
router.get('/login',(ctx)=>{
    ctx.type='html'
    ctx.body=fs.createReadStream('./login.html')
})
router.post('/userLogin',(ctx)=>{
    ctx.body='用户名是:'+ctx.request.body.userName
})
router.get('/users/:id',(ctx)=>{
    ctx.body='这是用户的编号:'+ctx.params.id
})
app.listen("8001", () => console.log("服务端启动"));