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
// Serve static files (scripts, css, images)
app.use(serve(config.get('static.path')))

// Hydrate ctx.state with global settings, so they are available in views
app.use(async (ctx, next) => {
  ctx.state.settings = config.get('settings')
  ctx.state.urlWithoutQuery = ctx.origin + ctx.path
  await next()  // Pass control to the next middleware
})

//Start the app
const port = process.env.PORT || config.get('server.port')
app.listen(port, () => { console.log(`Application started - listening on port ${port}`) })

