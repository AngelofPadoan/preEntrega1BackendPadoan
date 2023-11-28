import { Router } from "express";
import { CartsManagerFile } from "../managers/CartsManagerFile.js";
import { ProductsManagerFile } from "../managers/ProductsManagerFile.js";


const pathCarts = "carts.json";
const pathProducts = "products.json";
const router = Router();
const cartsManagerFile = new CartsManagerFile(pathCarts);
const productsManagerFile = new ProductsManagerFile(pathProducts);

router.get('/', async (req, res) => {
    const carts = await cartsManagerFile.getCarts();

    res.send({
        status: "succes",
        carts: carts 
    });
});

router.get('/:cid', async (req, res) => {
    const cid = req.params.cid;
    const cart = await cartsManagerFile.getCart(cid);

    res.send({
        status: "succes",
        msg: `ruta GET CART con ID: ${cid}`,
        cart: cart
    });
});

router.post('/', async (req, res) => {
    const newCart = await cartsManagerFile.createCart();

    res.send({
        status: "succes",
        msg: "Cart created",
        cart: newCart
    });
});

router.post('/:cid/product/:pid', async (req, res) => {
    const cid = req.params.cid;
    const pid = req.params.pid;
    const quantity = req.body.quantity || 1;

    // Verificar si el producto existe en la tienda
    const product = await productsManagerFile.getProductById(pid);

    if (!product) {
        return res.status(404).send({
            status: "error",
            msg: `Product not found. PID: ${pid}`
        });
    }

    const cart = await cartsManagerFile.addToCart(cid, pid, quantity);

    res.send({
        status: "succes",
        msg: `ruta POST CART - Agrego producto al carrito. PID: ${pid} CID: ${cid}`,
        cart: cart
    });
});

router.put('/:cid', async (req, res) => {
    const cid = req.params.cid;

    res.send({
        status:"succes",
        msg: `ruta PUT de CART con ID: ${cid}`
    });
});

router.delete('/:cid', async (req, res) => {
    const cid = req.params.cid;
    await cartsManagerFile.deleteCart(cid);

    res.send({
        status:"succes",
        msg: `ruta DELETE de CART con ID: ${cid}`
    });
});

export {router as cartRouter}


