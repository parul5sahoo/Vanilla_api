const http = require('http')
const product = require('./data/product')

const { getProducts, getProduct, createProduct, updateProduct, removeProduct } = require('./controllers/productControllers')


const server = http.createServer((req, res) => {
  if(req.url === '/api/product' && req.method === 'GET') {
     getProducts(req, res)
  }else if(req.url.match(/\/api\/product\/([0-9]+)/) && req.method === 'GET'){
     const id = req.url.split('/')[3]
     getProduct(req, res, id)

  }else if(req.url === '/api/product' && req.method === 'POST'){
    createProduct(req,res)

  }else if(req.url.match(/\/api\/product\/([0-9]+)/) && req.method === 'PUT'){
    const id = req.url.split('/')[3]
    updateProduct(req, res, id)

 }else if(req.url.match(/\/api\/product\/([0-9]+)/) && req.method === 'DELETE'){
  const id = req.url.split('/')[3]
  removeProduct(req, res, id)

}
  else {
    res.writeHead(404, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify( {message: 'Routes not found'}))
  }
  
  

})

const PORT = process.env.PORT || 5000

server.listen(PORT, () => console.log('server running on port', PORT))