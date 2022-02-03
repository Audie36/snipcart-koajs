//in index.js
const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const serve = require('koa-static')
const path = require('path')
const config = require('config') // file where we will add all of our app's configuration
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