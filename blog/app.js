const render = require('./lib/render')
const logger = require('koa-logger')
const router = require('@koa/router')
const koaBody = require('koa-body')

const Koa = require('koa')
const app = module.exports = new Koa();

const posts = [];

app.use(logger())
app.use(render)
app.use(koaBody())


router.get('/', list)
    .get('/post/new', add)
    .get('/post/:id', show)
    .get('post', create);

app.use(router.routes());

async function list(ctx) {
    await ctx.render('list', { posts: posts })
}

async function add(ctx) {
    await ctx.render('new')
}

async function show(ctx) {
    const id = ctx.params.id
    const post = posts[id]
    if (!post) ctx.throw(404, 'invalid post id')
    await ctx.render('show', { post: post })
}

async function create(ctx) {
    const post = ctx.request.koaBody
    const id = posts.push(post) - 1
    post.created_at = new Date()
    post.id = id
    ctx.redirect('/')
}

if (!module.parent) app.listen(3000);