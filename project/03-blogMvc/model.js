const M = module.exports = {}

const posts = [] //資料儲存的路由

M.add = function (post) {
  const id = posts.push(post) - 1 //將資料順序減一為資料名稱
  post.created_at = new Date() //新日期
  post.id = id
}

M.get = function (id) {
  return posts[id]
}

M.list = function () {
  return posts
}
