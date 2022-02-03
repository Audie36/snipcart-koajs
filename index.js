// First, we declare the middleware we will use
const config = require('config')
const path = require('path')
const Koa = require('koa')
const Router = require('koa-router')
const loadRoutes = require("./app/routes")
const DataLoader = require('./app/dataLoader')
const views = require('koa-views')
const serve = require('koa-static')
const app = new Koa()
const router = new Router()
// Views setup, adds render() function to ctx object
app.use(views(
  path.join(__dirname, config.get('views.path')),
  config.get('views.options')
))
//in index.js
//This line uses koa-static middleware to statically serve CSS, scripts, and images
app.use(serve(config.get('static.path')))

// in index.js
app.use(async (ctx, next) => {
  ctx.state.settings = config.get('settings')
  ctx.state.urlWithoutQuery = ctx.origin + ctx.path
  await next() 
})

// in index.js
const port = process.env.PORT || config.get('server.port')
app.listen(port, () => { console.log(`Application started - listening on port ${port}`) })

