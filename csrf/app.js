const Koa = require('koa')
const koaBody = require('koa-body')
const session = require('koa-session')
const CSRF = require('koa-csrf')
const router = require('@koa/router')();

const app = module.exports = new Koa();

app.keys = ['session key', 'csrf example']
app.use(session(app))
app.use(koaBody())

app.use(new CSRF())

router.get('/token', token)
    .post('/post', post)

app.use(router.routes())

async function token(ctx) {
    ctx.body = ctx.csrf
}

async function post(ctx) {
    ctx.body = { ok: true }
}

if (!module.parent) app.listen(3000)