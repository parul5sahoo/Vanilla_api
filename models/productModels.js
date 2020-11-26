let product = require('../data/product')
const { v4: uuidv4 } = require('uuid')
const { writeDataToFile } = require('../tells')

function findAll() {
    return new Promise((resolve, reject) => {
        resolve(product)
    })
}
function findById(id) {
    return new Promise((resolve, reject) => {
        const Product = product.find((p) => p.id === id)
        resolve(Product)
    })
}

function create(Product) {
    return new Promise((resolve, reject) => {
        const newProduct = {id: uuidv4(), ...Product}
        product.push(newProduct)
        writeDataToFile('./data/product.json', product)
        resolve(newProduct)
    })
}
function update(id, Product) {
    return new Promise((resolve, reject) => {
        const index = product.findIndex((p) => p.id === id)
        product[index] = {id, ...Product}

        writeDataToFile('./data/product.json', Product)
        resolve(product[index])

    })

}

function remove(id)  { 
    return new Promise((resolve, reject) => {
        product = product.filter((p) => p.id !== id)

        writeDataToFile('./data/product.json', product)
        resolve()

    })
    

}
module.exports = {
    findAll,
    findById,
    create,
    update,
    remove
}