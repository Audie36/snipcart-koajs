module.exports = (router, productsLoader) => {
    router.get('/', async ctx => {
      // Add in user instrumentation
      newrelic.addCustomAttribute("enduser.id", "audiemoradi@msn.com")
      
      const products = await productsLoader.all()
      ctx.state.model = {
        title: 'Hey there,',
        products: products
      }
      await ctx.render('home');

    })
  }
