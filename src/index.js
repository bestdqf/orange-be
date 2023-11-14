const Koa = require('koa');
const Router = require('@koa/router');

const app = new Koa();
const router = new Router();

router.get('/', (ctx, next) => {
  // ctx.router available
  ctx.body="root"
  next()
})


router.get('/users', (ctx, next) => {
  ctx.body="users"
  next()
})
router.get('/users/:id', (ctx, next) => {
  console.log(ctx)
  ctx.body="users,id"
  next()
})

app
  .use(router.routes())
  .use(router.allowedMethods());

app.listen("8001", () => console.log("服务端启动"));

