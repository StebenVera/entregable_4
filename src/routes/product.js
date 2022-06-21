const express = require('express');
const product = require('../controller/Product');
const router = express.Router();
router.use((req,res,next) => {
    console.log(Date.now());
    next();
})
router.get('/', async(req, res) => {
    const resProduct = await product.getAll();
    if(!resProduct.status) {
        return res.status(200).json({message: resProduct.message, status: true});
    }
    return res.status(200).json({message: resProduct.message, products: resProduct.products,status: true})
})

router.get('/:id', async(req, res) => {
    const { id } = req.params;
    const resProduct = await product.getById(id);
    if(!resProduct.status) {
        return res.status(200).json({message: resProduct.message, status: true});
    }
    return res.status(200).json({message: resProduct.message, products: resProduct.products, status: true})
});

router.post('/', async(req, res) => {
    const { title, price, thumbnail } = req.body;
    console.log(title);
    console.log(price);
    console.log(thumbnail);

    const resProduct = await product.createProduct(title, price, thumbnail);
    return res.status(200).json({message: resProduct.message, id: resProduct.id});
});

router.put('/', async(req, res) => {
    const { id, title, price, thumbnail } = req.body;

    const resProduct = await product.updateProduct(id, title, price, thumbnail);
    if(!resProduct.status) {
        return res.status(200).json({message: resProduct.message, status: true});
    }

    return res.status(200).json({message: resProduct.message, status: true});

});

router.delete('/:id', async(req, res) => {
    const { id } = req.params;
    const resProduct = await product.deleteProduct(id);
    if(!resProduct.status) {
        return res.status(200).json({message: resProduct.message, status: true})
    }
    return res.status(200).json({message: resProduct.message, status: true});
});
module.exports = router;