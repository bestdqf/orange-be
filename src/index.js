const Koa = require("koa");
const Router = require("@koa/router");
const axios = require("axios");

const app = new Koa();
const router = new Router();


const appid = 'wx81f25331c0868425'
const secret = '78ff6f8ee843494161a16dd47d058c14'

var sign = require('./utils/sign.js')

router.get("/", (ctx, next) => {
  ctx.body = "root";
  return next();
});

router.get("/login", async (ctx, next) => {
  const { code } = ctx.request.query;

  const a = await axios.get(
    `https://api.weixin.qq.com/sns/oauth2/access_token?appid=${appid}&secret=${secret}&code=${code}&grant_type=authorization_code`
  );

  console.log('----------------------------------------------------------------------------------')
  console.log(a.data)
  console.log('-------------------------------------------------------------------------------------')

   const {access_token,openid} = a.data

  const b = await axios.get(`https://api.weixin.qq.com/sns/userinfo?access_token=${access_token}&openid=${openid}&lang=zh_CN`)
  console.log(b)

  ctx.body = b.data;
  return next();
});
router.get('/getSign', async (ctx, next) => {
  // console.log(ctx)
  const { code,url } = ctx.request.query;

  const a = await axios.get(`https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${appid}&secret=${secret}`)

  console.log(a.data)
  const {access_token} = a.data
  const b = await axios.get(`https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=${access_token}&type=jsapi`)
  console.log(b.data)
  const { jsapi_ticket}  = b.data;

  const c =  sign(jsapi_ticket,url)

  ctx.body=c
  next()
})

app.use(router.routes()).use(router.allowedMethods());

app.listen("8001", () => console.log("服务端启动"));
