const V = require('./view') // 顯示 HTML 的模組
const M = require('./model') // 存取資料的模組
const logger = require('koa-logger') // 顯示日誌(請求與回應)
const router = require('koa-router')() // 路由模組
const koaBody = require('koa-body') // 將字串訊息轉換為物件的模組

const Koa = require('koa')
const app = (module.exports = new Koa()) // 

app.use(logger()) // 伺服器將接收傳送列印
app.use(koaBody())  // 伺服器將字串轉物件

router
  .get('/', list) //list路徑
  .get('/post/new', add) //新增貼文的路徑
  .get('/post/:id', show) //第幾個資料路徑
  .post('/post', create) //接收新增貼文的路徑
 
app.use(router.routes())//伺服器所要執行的路由

// 顯示貼文列表
async function list (ctx) { // 
  const posts = M.list() //儲存貼文目錄
  ctx.body = await V.list(posts) //顯示目錄
}

// 顯示貼文畫面
async function add (ctx) { //
  ctx.body = await V.new() //
}

// 顯示貼文
async function show (ctx) {
  const id = ctx.params.id
  const post = M.get(id)
  if (!post) ctx.throw(404, 'invalid post id')
  ctx.body = await V.show(post)
}

// 接收並新增貼文，然後回到貼文列表
async function create (ctx) {
  const post = ctx.request.body
  M.add(post)
  ctx.redirect('/')
}

// 啟動伺服器
if (!module.parent) {
  app.listen(3000) 
  console.log('Server run at http://localhost:3000')
}
