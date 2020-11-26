const product = require('../models/productModels')

const { getPostData } = require('../tells')
//@desc gets all products
//@rout GET/api/product
async function getProducts(req, res){
     try{

        const products = await product.findAll()
        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify(products)) 
    }
    catch(error){
        console.log(error)
    }

}

//@desc gets one product
//@rout GET/api/product/1,2,3...
async function getProduct(req, res, id){
    try{

       const Product = await product.findById(id)
       if(!Product){
        res.writeHead(404, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify( {message: 'Product Not Found'}))


       }else{
        res.writeHead(200, { 'Content-Type': 'application/json' })
       res.end(JSON.stringify(Product))
       }
        

   }
   catch(error){
       console.log(error)
   }

}
//@desc create a product
//@rout POST /api/product
async function createProduct(req, res){
    try{
        console.log("req", req)

        const body = await getPostData(req)

        console.log("body", body)
        

       

       
           const { name, description, price } = JSON.parse(body)
        

           const Product = {
            name,
            description,
            price
           }
           console.log(Product);

           const newProduct = await product.create(Product)
           console.log(newProduct);

          res.writeHead(201, { 'Content-Type': 'application/json' })
          return res.end(JSON.stringify(newProduct))
       

       
   }
   catch(error){
       console.log(error)
   }
}

//@desc update a product
//@rout POST /api/product/1,2,3,...
   async function updateProduct(req, res, id){
    try{
        
        const Product = await product.findById(id)
        if (!Product) {
            res.writeHead(404, { 'Content-Type': 'application/json' })
           res.end(JSON.stringify( {message: 'Product Not Found'}))

        } else {
            const body = await getPostData(req)
          const { name, description, price } = JSON.parse(body)

          const productData = {
            name: name || Product.name,
            description: description || Product.description,
            price: price || Product.price
          }

         const updProduct = await product.update(id, productData)

          res.writeHead(200, { 'Content-Type': 'application/json' })
          return res.end(JSON.stringify(updProduct))
        }
        
    }
   catch(error){
       console.log(error)
   }
}
   //@desc delete a product
   //@rout DELETE /api/product/1,2,3...
async function removeProduct(req, res, id){
    try{

       const Product = await product.findById(id)
       if(!Product){
        res.writeHead(404, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify( {message: 'Product Not Found'}))


       }else{
           await product.remove(id)
        res.writeHead(200, { 'Content-Type': 'application/json' })
       res.end(JSON.stringify({ message: 'Product ' + id +' has been removed' }))
       } 
        

   }
   catch(error){
       console.log(error)
   }



}



module.exports = {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    removeProduct
}