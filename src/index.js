const Koa = require('koa');
const Router = require('@koa/router');
// const {get} = require('./request')
const axios = require('axios')

const app = new Koa();
const router = new Router();


  // axios.get( `https://api.weixin.qq.com/sns/oauth2/access_token?appid=wx81f25331c0868425&secret=78ff6f8ee843494161a16dd47d058c14&code=${1}&grant_type=authorization_code`,).then(data=>{
  //   console.log(data)
  // })

router.get('/', (ctx, next) => {
  ctx.body="root"
  return next()
})




router.get('/login', async  (ctx, next) => {
  // console.log(ctx.request.query)

  const {code} = ctx.request.query

   const a = await axios.get( `https://api.weixin.qq.com/sns/oauth2/access_token?appid=wx81f25331c0868425&secret=78ff6f8ee843494161a16dd47d058c14&code=${code}&grant_type=authorization_code`,)


   console.log(a)

  ctx.body={a:2}
  return next()
})
// router.get('/users/:id', (ctx, next) => {
//   console.log(ctx)
//   ctx.body="users,id"
//   next()
// })

app
  .use(router.routes())
  .use(router.allowedMethods());

app.listen("8001", () => console.log("服务端启动"));

