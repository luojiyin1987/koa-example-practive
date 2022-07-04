const compose = require('koa-compose');
const Koa = require('koa');
const app = module.exports = new Koa();


async function responseTime(ctx, next) {
    const start = new Date()
    await next()
    const ms =  new Date  -start
    console.log("responseTime", ms + 'ms')
    ctx.set('X-Response-Time', ms + 'ms')
}

async function logger(ctx, next) {
    const start = new Date()
    await next()
    const ms = new Date() -start
    if ('test' != process.env.NODE_ENV) {
        console.log('%s %s - %s', ctx.method, ctx.url, ms);
      }
}

async function respond(ctx,next) {
    await next()
    if ('/' != ctx.url) return;
    console.log("respond")
    ctx.body = 'Hello World'
}

const all = compose ([
    responseTime,
    logger,
    respond
]);

app.use(all)

if (!module.parent) app.listen(3000)