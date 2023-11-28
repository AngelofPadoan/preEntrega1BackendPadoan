import { Router } from "express";
import { ProductsManagerFile } from "../managers/ProductsManagerFile.js";

const path = "products.json";
const router = Router();
const productsManagerFile = new ProductsManagerFile(path);

router.get('/', async (req, res) => {
    const products = await productsManagerFile.getProducts();

    res.send({
        status: "succes",
        productos: products
    });
});

router.get('/:pid', async (req, res) => {
    res.send({
        status: "succes",
        msg: "ruta GET ID PRODUCT"
    });
});

router.post('/', async (req, res) => {
    const { title, description, code, price, stock, category } = req.body;

    // Verificamos que todos los campos necesarios estén presentes
    if (!title || !description || !code || !price || !stock || !category) {
        return res.status(400).send({
            status: "error",
            msg: "Faltan campos obligatorios en la solicitud"
        });
    }

    // Creamos el nuevo producto con un ID autogenerado
    const product = {
        id: await generateProductId(),
        title,
        description,
        code,
        price,
        status: "active", // Dejamos el status como "active" por defecto
        stock,
        category
    };

    // Agregamos el producto utilizando el manager
    const products = await productsManagerFile.createProducts(product);

    res.status(201).send({
        status: "success",
        msg: "Producto creado",
        productos: products
    });
});

// Función para generar un ID único para el nuevo producto
async function generateProductId() {
    const products = await productsManagerFile.getProducts();
    if (products.length === 0) {
        return 1;
    } else {
        return products[products.length - 1].id + 1;
    }
}

router.put('/:pid', async (req, res) => {
    const pid = req.params.pid;

    res.send({
        status:"succes",
        msg: `ruta PUT de PRODUCT con ID: ${pid}`
    });
});

router.delete('/:pid', async (req, res) => {
    const pid = req.params.pid;

    res.send({
        status:"succes",
        msg: `ruta DELETE de PRODUCT con ID: ${pid}`
    });
});

export {router as productRouter}








// router.post('/', async (req, res) => {
//     const product = req.body;
//     const products = await productsManagerFile.createProducts(product);

//     res.send({
//         status: "succes",
//         msg: "Producto creado",
//         productos: products
//     });
// });